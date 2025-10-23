import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

const initialState = { isOn: false };

function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      return { isOn: !state.isOn };
    case "turnOn":
      return { isOn: true };
    case "turnOff":
      return { isOn: false };
    default:
      return state;
  }
}

export default function LightSwitch() {
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

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <h3>💡 Công Tắc Đèn</h3>
        <h4 className="mt-3">
          Trạng thái:{" "}
          <span style={{ color: state.isOn ? "limegreen" : "red" }}>
            {state.isOn ? "Bật" : "Tắt"}
          </span>
        </h4>

        <div className="mt-3">
          <Button
            onClick={toggleTheme}
            style={{
              margin: "5px",
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
            onClick={() => dispatch({ type: "toggle" })}
            style={{ margin: "5px" }}
          >
            🔄 Chuyển Đổi
          </Button>
          <Button
            variant="success"
            onClick={() => dispatch({ type: "turnOn" })}
            style={{ margin: "5px" }}
          >
            ✅ Bật Đèn
          </Button>
          <Button
            variant="danger"
            onClick={() => dispatch({ type: "turnOff" })}
            style={{ margin: "5px" }}
          >
            ⛔ Tắt Đèn
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
