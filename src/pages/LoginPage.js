import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/actions/auth.actions";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (password.length < 3) {
      setErrors({ ...errors, password: "Password must be longer than 3" });
      return;
    }
    dispatch(authActions.loginRequest({ email, password }));
    setFormData({ email: "", password: "" });
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <p>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
