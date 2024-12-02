import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/my.jpeg";
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
    I’m a passionate developer who loves turning ideas into functional and engaging web applications.  
    <br />
    <br />I specialize in 
    <i>
      <b className="purple"> Python, Django,</b>
    </i> and 
    <i>
      <b className="purple"> Modern JavaScript.</b>
    </i>
    <br />
    <br />
    My interests lie in crafting impactful 
    <i>
      <b className="purple"> web applications and digital products.</b>
    </i>
    <br />
    <br />
    I enjoy building innovative solutions and strive to create experiences that make a difference.
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
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
