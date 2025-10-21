import React, { useReducer } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

/*
  Simple sign-up form (client-side validation only).
  In production: send to backend, check duplicates, hash password, etc.
*/

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
  success: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return { ...state, [action.field]: action.value };
    case "ERROR":
      return { ...state, error: action.message, success: false };
    case "SUCCESS":
      return { ...state, success: true, error: "" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, email, password, confirmPassword, error, success } = state;

  const validate = () => {
    if (!name.trim()) return "Name required";
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return "Email invalid";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      dispatch({ type: "ERROR", message: v });
      return;
    }
    // Simulate success
    dispatch({ type: "SUCCESS" });
  };

  return (
    <Card className="p-3 mb-3">
      <h4>Sign Up Form (useReducer)</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Đăng ký thành công ✅</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control value={name} onChange={(e) => dispatch({ type: "SET", field: "name", value: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => dispatch({ type: "SET", field: "email", value: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => dispatch({ type: "SET", field: "password", value: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" value={confirmPassword} onChange={(e) => dispatch({ type: "SET", field: "confirmPassword", value: e.target.value })} />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit">Đăng ký</Button>
          <Button variant="secondary" onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
        </div>
      </Form>
    </Card>
  );
}
