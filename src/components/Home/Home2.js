import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/me.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

  function Home2() {
            return (
              <Container fluid className="home-about-section" id="about">
                <Container>
                  <Row>
                  <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple">INTRODUCE</span> MYSELF
            </h1>
            <p className="home-about-body">
            I’m a passionate full-stack web developer with a strong background in 
            <b className="purple"> Python (Django), REST APIs</b>, and 
            <b className="purple"> modern JavaScript frameworks</b> like React.js.
            <br /><br />
            I specialize in building high-performance, scalable web applications and love 
            crafting clean, functional user experiences.
            <br /><br />
            Currently, I’m focused on delivering impactful solutions for 
            <b className="purple"> startups, businesses, and personal brands</b>.
          </p>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img 
                src={myImg} 
                alt="avatar" 
                style={{ 
                    borderRadius: '50%', 
                    width: '250px', // Adjust size as needed
                    height: '250px', // Adjust size as needed
                    objectFit: 'cover' 
                }} 
            />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/SUHAIBCHEMBAN"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/shuhaiibc"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/suhaib-c-114b10292/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/_.shuhaiiib/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
              <li>
              <a
                className="btn btn-primary mt-3"
                href="/Suhaib_Resume.pdf" // Add your actual resume path
                download
              >
                Download Resume
              </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
