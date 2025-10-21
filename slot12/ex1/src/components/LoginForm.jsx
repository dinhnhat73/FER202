import React, { useReducer } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

/*
  Simple login form using useReducer.
  This is a client-side demo — in real apps you call an API to verify credentials.
*/

const initialState = {
  email: "",
  password: "",
  loading: false,
  error: "",
  success: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SUBMIT":
      return { ...state, loading: true, error: "", success: false };
    case "SUCCESS":
      return { ...state, loading: false, success: true, error: "" };
    case "ERROR":
      return { ...state, loading: false, error: action.message, success: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, loading, error, success } = state;

  const validate = () => {
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    // simple email pattern
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return "Email is invalid";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      dispatch({ type: "ERROR", message: v });
      return;
    }
    dispatch({ type: "SUBMIT" });

    // Simulate API call
    setTimeout(() => {
      // For demo: accept email=test@demo.com password=123456
      if (email === "test@demo.com" && password === "123456") {
        dispatch({ type: "SUCCESS" });
      } else {
        dispatch({ type: "ERROR", message: "Sai email hoặc mật khẩu" });
      }
    }, 800);
  };

  return (
    <Card className="p-3 mb-3">
      <h4>Login Form (useReducer)</h4>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Đăng nhập thành công 🎉</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
            placeholder="nhập email"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}
            placeholder="mật khẩu"
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
          <Button variant="secondary" onClick={() => dispatch({ type: "RESET" })}>
            Reset
          </Button>
        </div>

        <div className="mt-2 text-muted">
          Demo login: <strong>test@demo.com</strong> / <strong>123456</strong>
        </div>
      </Form>
    </Card>
  );
}
