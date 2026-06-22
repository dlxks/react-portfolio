import { Icon } from "@iconify/react";
import SectionHeading from "../components/SectionHeading";
import profilePic from "../assets/profile.jpg";

const BIO =
  "I'm an aspiring front-end / web developer with a solid academic foundation in Information Technology and hands-on experience from personal and academic projects using Laravel, React, and modern web tooling. I'm eager to contribute to real-world projects and grow in a collaborative, forward-thinking environment.";

function About({ profile }) {
  const details = [
    { label: "Birthday", value: profile.birthday },
    { label: "Age", value: profile.age },
    { label: "Phone", value: profile.contact },
    { label: "Degree", value: profile.degree },
    { label: "Email", value: profile.email },
    { label: "Address", value: profile.address },
  ];

  return (
    <div className="container section">
      <SectionHeading eyebrow="Get to know me" title="About">
        {BIO}
      </SectionHeading>

      <div className="about__grid">
        <figure className="about__photo" data-aos="fade-up">
          <img src={profilePic} alt={`${profile.name ?? "Profile"} portrait`} />
        </figure>

        <div className="about__body" data-aos="fade-up" data-aos-delay="100">
          <h3 className="about__role">Front-End Developer &amp; Web Developer</h3>
          <dl className="about__details">
            {details.map(
              (d) =>
                d.value != null &&
                d.value !== "" && (
                  <div className="about__detail" key={d.label}>
                    <dt>
                      <Icon icon="bi:caret-right-fill" width="14" height="14" />
                      {d.label}
                    </dt>
                    <dd>{d.value}</dd>
                  </div>
                ),
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default About;
