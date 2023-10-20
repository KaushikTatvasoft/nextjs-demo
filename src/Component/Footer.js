"use client"; // This is a client component 👈🏽"
import React from "react";
import { Col, Row } from "reactstrap";

const Footer = () => {
  return <footer className="footer site-footer">
    <div className="footer-wrap">
      <Row className="align-items-center justify-content-xl-between">
        <Col>
          <div className="copyright text-center text-muted">
            © {new Date().getFullYear()}{" "}
            <a className="font-weight-bold ml-1" href="/admin/dashboard">
              All rights reserved
            </a>
          </div>
        </Col>
      </Row>
    </div>
  </footer >
};

export default Footer
