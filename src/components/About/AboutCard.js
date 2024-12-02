import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
          Hi, I’m Suhaib, a passionate and driven Python Developer with over a year of experience in web development. My journey into the world of coding began with foundational languages like C and Java, which later led me to explore web design. I eventually discovered Python and immersed myself in its ecosystem, mastering frameworks like Django to build robust and dynamic applications.

Over the years, I’ve expanded my skill set by learning SQL, data structures, JavaScript, and React JS, allowing me to excel as a full-stack developer. I’ve applied my skills to real-world projects, including a major hospital management system, designed to improve user experience and operational efficiency. Additionally, I gained valuable freelance experience working on an information web project for <a href="www.ssaoco.com">SSAOCO </a>, further honing my ability to deliver tailored solutions.
<br />  <br />
Currently, I’m working as a <a href="#"> Web Developer </a> at an advertising company, where I combine creativity and technical expertise to deliver impactful digital experiences.

Beyond the Code
When I’m not immersed in coding, you can find me:
<br /> <br />
<ImPointRight /> Playing games to relax and inspire creativity.<br /> <br />
<ImPointRight /> Traveling to explore new cultures and gain fresh perspectives.<br /> <br />
I’m passionate about leveraging technology to solve real-world problems and strive to create solutions that truly make a difference.
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
