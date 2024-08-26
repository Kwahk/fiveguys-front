import "./PageCss.css";
import IntelliJLogo from "../assets/IntelliJ.png";
import VSCodeLogo from "../assets/vscode.png";
import DockerLogo from "../assets/docker.png";
import AWSLogo from "../assets/aws.png";
import FooterComponent from "./common/FooterComponent";

const Intro = () => {
  return (
    <>
      <div className="intro-container">
        <div className="card-grid">
          <div className="card">
            <img src={IntelliJLogo} alt="IntelliJ" className="card-image intellij" />
            <div className="card-hover-content">
              Java
              <br />
              Spring Boot
              <br />
              Spring JPA
              <br />
              MariaDB
              <br />
              JWT
            </div>
          </div>
          <div className="card">
            <img src={VSCodeLogo} alt="VSCode" className="card-image vscode" />
            <div className="card-hover-content">
              JavaScript
              <br />
              React + Vite
            </div>
          </div>
          <div className="card">
            <img src={DockerLogo} alt="Docker" className="card-image docker" />
            <div className="card-hover-content">
              Docker Compose
              <br />
              Images
              <br />- Java
              <br />- React + Vite
              <br />- MariaDB
            </div>
          </div>
          <div className="card">
            <img src={AWSLogo} alt="AWS" className="card-image aws" />
            <div className="card-hover-content">
              EC2 (Hosting)
              <br />· Spring Boot
              <br />· React
              <br />· Security
              <br />· CI/CD
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Intro;
