import { useState } from "react";
import { Table, Button, Modal, Form, Alert, Card } from "react-bootstrap";
import { supabase } from "../../lib/supabase";

const EntityManager = ({
  data,
  endpoint,
  onUpdate,
  title,
  fields,
  columns,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [exactDates, setExactDates] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleClose = () => {
    setShowModal(false);
    setStatus({ type: "", message: "" });
  };

  const handleShowAdd = () => {
    setFormData({});
    setExactDates({});
    setIsEditing(false);
    setShowModal(true);
  };

  const handleShowEdit = (item) => {
    // Process fields if needed (e.g. array to string)
    const processedData = { ...item };
    const newExactDates = {};
    fields.forEach(f => {
      if (f.type === 'array-textarea' && Array.isArray(processedData[f.name])) {
        processedData[f.name] = processedData[f.name].join('\n');
      }
      if (f.type === 'date' || f.type === 'date-range') {
        const val = processedData[f.name] || '';
        if (val.includes(',') || val.split(' ').length > 2 || (val.split('-').length === 3 && val.length > 7)) {
          newExactDates[f.name] = true;
        }
      }
    });
    setFormData(processedData);
    setExactDates(newExactDates);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus({ type: "info", message: "Uploading file..." });
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("uploads").getPublicUrl(filePath);

      setFormData({ ...formData, [fieldName]: data.publicUrl });
      setStatus({ type: "success", message: "File uploaded successfully!" });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "danger",
        message: "An error occurred while uploading.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    // Pre-process form data before sending (e.g., textarea string back to array)
    const payload = { ...formData };
    fields.forEach((f) => {
      if (f.type === "array-textarea" && typeof payload[f.name] === "string") {
        payload[f.name] = payload[f.name]
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s !== "");
      }
    });

    try {
      if (isEditing) {
        const { id, ...updateData } = payload;
        const { error } = await supabase
          .from(endpoint)
          .update(updateData)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(endpoint).insert([payload]);
        if (error) throw error;
      }

      handleClose();
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
      setStatus({
        type: "danger",
        message: err.message || "An error occurred while saving.",
      });
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        `Are you sure you want to delete this ${title.toLowerCase()}?`,
      )
    )
      return;
    try {
      const { error } = await supabase.from(endpoint).delete().eq("id", id);

      if (error) throw error;

      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while deleting.");
    }
  };

  const toInputDate = (str, isExact) => {
    if (!str || str === 'Present' || str.includes(' - ')) return '';
    const d = new Date(str);
    if (!isNaN(d)) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return isExact ? `${yyyy}-${mm}-${dd}` : `${yyyy}-${mm}`;
    }
    return '';
  };

  const fromInputDate = (val, isExact) => {
    if (!val) return '';
    if (val === 'Present') return 'Present';
    const parts = val.split('-');
    if (parts.length < 2) return val;
    if (isExact && parts.length === 3) {
      const d = new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    const d = new Date(parts[0], parseInt(parts[1]) - 1);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleRangeChange = (name, index, value, isPresent = false, isExact = false) => {
    let parts = (formData[name] || '').split(' - ');
    if (parts.length < 2) parts = [parts[0] || '', ''];
    
    if (isPresent) {
      parts[index] = value;
    } else {
      parts[index] = fromInputDate(value, isExact);
    }
    
    let finalValue = '';
    const p0 = parts[0] ? parts[0].trim() : '';
    const p1 = parts[1] ? parts[1].trim() : '';
    
    if (p0 && p1) {
      finalValue = `${p0} - ${p1}`;
    } else if (p0) {
      finalValue = p0;
    } else if (p1) {
      finalValue = `- ${p1}`;
    }
    
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  return (
    <div className="mt-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0 fw-bold text-secondary">{title}s</h6>
        <Button
          variant="primary"
          size="sm"
          className="px-3"
          onClick={handleShowAdd}
        >
          + Add {title}
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table hover responsive size="sm" className="mb-0 align-middle">
            <thead className="bg-light text-muted">
              <tr>
                <th
                  className="fw-normal py-2 ps-3 border-bottom-0"
                  style={{ fontSize: "0.85rem" }}
                >
                  ID
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="fw-normal py-2 border-bottom-0"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {col.label}
                  </th>
                ))}
                <th
                  className="fw-normal py-2 pe-3 text-end border-bottom-0"
                  style={{ fontSize: "0.85rem" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-bottom">
                  <td
                    className="ps-3 text-muted"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {item.id}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{ fontSize: "0.9rem", maxWidth: "200px" }}
                      className="text-truncate"
                    >
                      {item[col.key]}
                    </td>
                  ))}
                  <td className="pe-3 text-end">
                    <Button
                      variant="link"
                      size="sm"
                      className="me-2 p-0 text-decoration-none"
                      style={{ fontSize: "0.85rem" }}
                      onClick={() => handleShowEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-decoration-none text-danger"
                      style={{ fontSize: "0.85rem" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="text-center py-4 text-muted small border-bottom-0"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg" dialogClassName="admin-modal" centered>
        <Modal.Header closeButton className="border-bottom-0 pb-0">
          <Modal.Title className="fs-5 fw-bold text-dark">
            {isEditing ? "Edit" : "Add"} {title}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="pt-2">
            {status.message && (
              <Alert variant={status.type} className="py-2 px-3 small">
                {status.message}
              </Alert>
            )}
            {fields.map((field) => (
              <Form.Group className="mb-3" key={field.name}>
                <Form.Label className="small mb-1 text-muted fw-medium">
                  {field.label}
                </Form.Label>
                {field.type === "textarea" ||
                field.type === "array-textarea" ? (
                  <Form.Control
                    as="textarea"
                    size="sm"
                    rows={field.rows || 3}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={
                      field.type === "array-textarea"
                        ? "Enter each point on a new line"
                        : ""
                    }
                  />
                ) : field.type === "file" ? (
                  <div>
                    <Form.Control
                      type="file"
                      size="sm"
                      onChange={(e) => handleFileUpload(e, field.name)}
                      className="mb-2 text-muted"
                    />
                    <Form.Control
                      type="text"
                      size="sm"
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder="Or enter URL manually"
                    />
                  </div>
                ) : field.type === 'date' ? (
                  <div>
                    <Form.Check 
                      type="switch"
                      label="Exact Date"
                      className="mb-2 text-muted small"
                      checked={exactDates[field.name] || false}
                      onChange={(e) => setExactDates({...exactDates, [field.name]: e.target.checked})}
                    />
                    <Form.Control
                      type={exactDates[field.name] ? "date" : "month"}
                      size="sm"
                      name={field.name}
                      value={toInputDate(formData[field.name], exactDates[field.name])}
                      onChange={(e) => handleChange({ target: { name: field.name, value: fromInputDate(e.target.value, exactDates[field.name]) }})}
                      required={field.required}
                    />
                  </div>
                ) : field.type === 'date-range' ? (
                  <div>
                    <Form.Check 
                      type="switch"
                      label="Exact Date"
                      className="mb-2 text-muted small"
                      checked={exactDates[field.name] || false}
                      onChange={(e) => setExactDates({...exactDates, [field.name]: e.target.checked})}
                    />
                    <div className="d-flex align-items-center gap-2">
                      <Form.Control
                        type={exactDates[field.name] ? "date" : "month"}
                        size="sm"
                        value={toInputDate(formData[field.name]?.split(' - ')[0], exactDates[field.name])}
                        onChange={(e) => handleRangeChange(field.name, 0, e.target.value, false, exactDates[field.name])}
                        required={field.required}
                      />
                      <span className="text-muted small">to</span>
                      <Form.Control
                        type={exactDates[field.name] ? "date" : "month"}
                        size="sm"
                        value={toInputDate(formData[field.name]?.split(' - ')[1], exactDates[field.name])}
                        onChange={(e) => handleRangeChange(field.name, 1, e.target.value, false, exactDates[field.name])}
                        disabled={formData[field.name]?.split(' - ')[1] === 'Present'}
                      />
                      <Form.Check 
                        type="checkbox"
                        label="Present"
                        className="small ms-2 mb-0"
                        checked={formData[field.name]?.split(' - ')[1] === 'Present'}
                        onChange={(e) => {
                           if (e.target.checked) handleRangeChange(field.name, 1, 'Present', true, exactDates[field.name]);
                           else handleRangeChange(field.name, 1, '', true, exactDates[field.name]);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <Form.Control
                    type={field.type || "text"}
                    size="sm"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer className="border-top-0 pt-0">
            <Button
              variant="light"
              size="sm"
              className="px-4"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" className="px-4" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EntityManager;
