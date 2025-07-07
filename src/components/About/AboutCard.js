import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
  Hi, I’m Suhaib — a passionate and driven Python Developer with over a year of experience in building full-stack web applications.  
  <br /><br />
  My coding journey began with foundational languages like <b className="purple">C and Java</b>, which helped shape my logical thinking and problem-solving skills. Eventually, I discovered my passion for web development, diving deep into <b className="purple">Python</b> and mastering the <b className="purple">Django framework</b> to create robust, scalable applications.
  <br /><br />
  Over time, I’ve expanded my tech stack to include <b className="purple">JavaScript, React.js, PostgreSQL, REST APIs</b>, and cloud tools like <b className="purple">AWS EC2</b>, allowing me to deliver end-to-end solutions across various industries.
  <br /><br />
  I’ve worked on several real-world projects including:
  <br />
  <ul>
    <li><b className="purple">Homestead Projects</b> – an apartment listing web app.</li>
    <li><b className="purple">Aquahealthy</b> – a water treatment service and product booking platform.</li>
    <li><b className="purple">Mazlo Footwear</b> – an e-commerce footwear showcase.</li>
    <li><b className="purple">Creativio</b> – an animated React-based agency portfolio.</li>
    <li><b className="purple">Hopuz Printers</b> – a corporate WordPress website.</li>
    <li><b className="purple">Viowin Edu Cafe</b> – a static education website.</li>
    <li><b className="purple">SSAOCO</b> – a freelance information web project.</li>
  </ul>
  <br />
  Currently, I’m working as a <a href="#" className="purple">Web Developer</a> at an advertising company, where I combine design and backend logic to build creative, impactful solutions.
  <br /><br />
  <b>Beyond coding</b>, I enjoy:
  <br />
  <ImPointRight /> Playing games to unwind and stay inspired.<br />
  <ImPointRight /> Traveling to explore cultures and perspectives.<br /><br />
  I’m driven by the goal of using technology to solve real-world problems and create meaningful digital experiences.
</p>


        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
