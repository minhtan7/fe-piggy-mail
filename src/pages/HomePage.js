import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import SideBar from "../components/SideBar";
import MailList from "../components/MailList";

const HomePage = () => {
  return (
    <Container>
      <Row>
        <SideBar />
        <MailList />
      </Row>
    </Container>
  );
};

export default HomePage;
