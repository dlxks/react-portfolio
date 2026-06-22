/** Ensure a URL has a protocol so it works as an external href. */
export const getFullUrl = (url) =>
  !url ? "" : url.startsWith("http") ? url : `https://${url}`;

/** First word of a string (e.g. a person's first name). Safe on undefined. */
export const firstWord = (text = "") => text.trim().split(" ")[0] ?? "";

/** Capitalize the first letter of a string. */
export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() + text.slice(1);
