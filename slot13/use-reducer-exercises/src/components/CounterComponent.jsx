import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme, toggleTheme } = useTheme();

  const cardStyle = {
    width: "350px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    background: theme === "light" ? "#fff" : "#2a2a2a",
    color: theme === "light" ? "#212529" : "#f8f9fa",
    transition: "0.3s ease",
  };

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "0.2s ease",
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <h3 className="mb-3">🔢 Bộ Đếm Đa Năng</h3>
        <h4 style={{ marginBottom: "20px" }}>Giá trị: {state.count}</h4>

        <div>
          <Button
            onClick={toggleTheme}
            style={{
              ...buttonStyle,
              background: theme === "light" ? "#343a40" : "#f8f9fa",
              color: theme === "light" ? "#fff" : "#000",
            }}
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </Button>
        </div>

        <div className="mt-3">
          <Button
            variant="primary"
            style={buttonStyle}
            onClick={() => dispatch({ type: "increment" })}
          >
            ➕ Tăng
          </Button>
          <Button
            variant="warning"
            style={buttonStyle}
            onClick={() => dispatch({ type: "decrement" })}
          >
            ➖ Giảm
          </Button>
          <Button
            variant="danger"
            style={buttonStyle}
            onClick={() => dispatch({ type: "reset" })}
          >
            🔁 Reset
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
