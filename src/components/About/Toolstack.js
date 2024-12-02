import React from "react";
import { Col, Row } from "react-bootstrap"; 
import {
  SiVisualstudiocode,
  SiPycharm, 
  SiEclipseide,
  SiCodepen,
  SiNotion,
  SiVercel,
  SiOverleaf,
  SiGithub,
  SiWordpress,
  SiCanva,
  SiFigma,
  SiCpanel,
  SiGodaddy,
  SiPostman,
  SiCodewars,
  SiLeetcode,
  SiMonkeytype,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiNotion />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiCodepen />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiEclipseide />
      </Col>
       <Col xs={4} md={2} className="tech-icons">
        <SiPycharm />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiOverleaf />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVercel />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGithub />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiWordpress />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiCanva />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFigma />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiCpanel />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGodaddy />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiCodewars />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiLeetcode />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMonkeytype />
      </Col>
    </Row>
  );
}

export default Toolstack;
