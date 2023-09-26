import React from "react";
import "./footer.css"
import {Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <>
      <div className="footer bottom-0 stickry-bottom">
        <div className=" d-flex justify-content-center">
          <Row>
            <Col className="p-3 d-flex justify-content-center align-items-center text-">
              Created By <span className="mx-2">Yogesh</span>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Footer;
