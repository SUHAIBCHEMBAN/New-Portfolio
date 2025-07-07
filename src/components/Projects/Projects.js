import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import homestead from "../../Assets/Projects/Homesteadprojects.png";
import hopuz from "../../Assets/Projects/hopuz.png";
// import aquahealthy from "../../Assets/Projects/aquahealthy.png";
import mazlo from "../../Assets/Projects/mazlo.png";
import creativio from "../../Assets/Projects/creativio.png";
import viowin from "../../Assets/Projects/viowin.png";
import bridal from "../../Assets/Projects/organza.png";
import ssaoco from "../../Assets/Projects/ssaocoh.png"
import mcare from "../../Assets/Projects/M-CARE.png";
import bluestar from "../../Assets/Projects/Bluestart.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

        <Col md={4} className="project-card">
            <ProjectCard
              imgPath={homestead}
              isBlog={false}
              title="Homestead Projects "
              description="HomesteadProjects is a dynamic, user-friendly, and responsive website designed to cater to the needs of an apartment business. The platform offers an engaging and interactive experience for users, allowing them to seamlessly explore and browse through detailed apartment listings. With a focus on functionality and aesthetics, the website ensures compatibility across all devices, delivering an optimal browsing experience. Hosted on AWS, it leverages robust cloud infrastructure to guarantee fast loading times, high availability, and reliable performance. HomesteadProjects redefines convenience by providing a streamlined solution for discovering and connecting with potential apartments effortlessly."
              ghLink="https://github.com/SUHAIBCHEMBAN/"
              demoLink="https://www.homesteadprojects.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={hopuz} // replace with actual image import
              isBlog={false}
              title="Hopuz Printers & Packagers"
              description="Hopuz Printers & Packagers is a dynamic WordPress-based website crafted for a professional printing and packaging company. Fully responsive and content-rich, it highlights the company’s services and products with a clean layout. The site ensures smooth navigation, optimized performance, and cross-device compatibility for a seamless user experience."
              ghLink={null}
              demoLink="https://www.hopuz.in" // Replace with your actual URL
            />
          </Col>

          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={aquahealthy} // replace with actual image import
              isBlog={false}
              title="Aquahealthy Water Treatment"
              description="Aquahealthy is a dynamic, user-focused platform designed for a certified water purifier and treatment company. It showcases services and products with full functionality for users to book services or order products online. Hosted on AWS, it offers responsive design, optimal performance, and easy interaction across all devices."
              ghLink="https://github.com/SUHAIBCHEMBAN/aquahealthy" // Optional
              demoLink="https://www.aquahealthy.in"
            />
        </Col> */}

        <Col md={4} className="project-card">
          <ProjectCard
            imgPath={mazlo} // replace with actual image import
            isBlog={false}
            title="Mazlo Footwear"
            description="Mazlo Footwear is a modern, responsive e-commerce-style website tailored for a footwear brand. Though still in its early phase without a payment gateway, it supports all other key e-commerce features like product display, filtering, and cart functionality. Built with scalability in mind, it’s ready for full online store integration."
            ghLink="https://github.com/SUHAIBCHEMBAN/" // Optional
            demoLink="https://www.mazlofootwear.com" // Replace with actual domain
          />
        </Col>

        <Col md={4} className="project-card">
          <ProjectCard
            imgPath={creativio} // replace with actual image import
            isBlog={false}
            title="Creativio Media & Advertising"
            description="Creativio is a sleek, dynamic website for a media and advertising agency, blending React-based UI with interactive animations and 3D visuals. Focused on showcasing services and portfolio, the site delivers a visually rich experience while maintaining responsiveness and fast loading across all devices."
            ghLink="https://github.com/SUHAIBCHEMBAN/" // Optional
            demoLink="https://www.creativio.in"
          />
        </Col>

        <Col md={4} className="project-card">
          <ProjectCard
            imgPath={viowin} // replace with actual image import
            isBlog={false}
            title="Viowin Edu Cafe"
            description="Viowin Edu Cafe is a clean, static informational website built for an educational institution. It provides concise details about online and distance learning programs with a focus on clarity and accessibility. Fully responsive and user-friendly, it ensures an efficient browsing experience for students on any device."
            ghLink={null}
            demoLink="https://www.viowin.org"
          />
        </Col>


         <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bridal}
              isBlog={false}
              title="Organza Bridal"
              description="Organza Bridal Hues is a beautifully designed static, responsive website crafted to elevate the online presence of a bridal business. With its elegant and sophisticated design, the website provides an immersive experience for users, allowing them to explore a curated collection of bridal products and services effortlessly. Built with attention to detail, the site highlights the business's offerings in a visually appealing and user-friendly manner. Hosted on AWS, it ensures optimal performance, seamless accessibility, and reliability, delivering a smooth browsing experience across all devices. Organza Bridal Hues is a perfect blend of style and functionality, catering to modern bridal needs."
              ghLink="https://github.com/SUHAIBCHEMBAN/"
              demoLink="https://www.organzabridal.in/"
            />
          </Col>    

        <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ssaoco}
              isBlog={false}
              title="SSAOCO Info Website"
              description=" 
              As part of my freelance work I developed an informational website for SSAOCO (Sameer Sharaf Al Otaibi Trading Company), a leading supplier of automation and instrumentation devices in the Middle East, headquartered in Jeddah, Saudi Arabia. The website highlights their expertise in industrial machine parts, hydraulic and pneumatic machinery, and global logistics solutions.  
              
              The design ensures a professional look, responsive functionality, and easy access to key services and company information, reflecting SSAOCO’s excellence since its founding in 2008."
              ghLink="#"
              demoLink="https://ssaoco.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mcare}
              isBlog={false}
              title="HOSPITAL MANAGEMENT"
              description="This Hospital Management System is a comprehensive project developed using Python and Django. It streamlines and automates various hospital operations, ensuring efficient patient management, appointment scheduling, staff coordination, and record-keeping. The system features an intuitive interface, robust database management, and secure access controls, making it an ideal solution for enhancing hospital administration and patient care."
              ghLink="https://github.com/SUHAIBCHEMBAN/M-CARE"
              demoLink="https://www.mcareclinicservice.live/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bluestar}
              isBlog={false}
              title="BLUE STAR CLONE WEB"
              description="
                  Welcome to the Blue Start Clone, This project is a responsive front-end web clone of the Blue Star website, built using HTML, CSS, media queries, and Bootstrap. The clone replicates the design and functionality of the original Blue Star site, featuring core components such as the homepage, product sections, promotional banners, and an intuitive navigation system. The aim is to create a similar user experience to the original, demonstrating advanced web development and design skills."
              ghLink="https://github.com/SUHAIBCHEMBAN/Blue-Star"
              demoLink="https://suhaibchemban.github.io/Blue-Star/"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
