import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/actions/auth.actions";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    name: "",
    confPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confPassword } = formData;
    if (password.length < 3) {
      setError({ ...error, password: "Password must be longer" });
      return;
    }
    if (password !== confPassword) {
      setError({ ...error, confPassword: "Password need to be matched" });
      return;
    }

    dispatch(authActions.register({ name, email, password }));
    setFormData({
      email: "",
      password: "",
      name: "",
      confPassword: "",
    });
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            placeholder="User name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
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
          {error.password && (
            <small className="form-text text-danger">{error.password}</small>
          )}
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confPassword"
            value={formData.confPassword}
            onChange={handleChange}
          />
          {error.confPassword && (
            <small className="form-text text-danger">
              {error.confPassword}
            </small>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p>
        Already have an account? <Link to="/login">Sign in!</Link>
      </p>
    </>
  );
};

export default Register;
