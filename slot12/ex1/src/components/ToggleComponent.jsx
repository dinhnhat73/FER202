import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";

const initialState = { on: false };

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return { on: !state.on };
    case "ON":
      return { on: true };
    case "OFF":
      return { on: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function ToggleComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Card className="p-3 mb-3">
      <h4>Toggle (Bật / Tắt) — useReducer</h4>
      <p>Trạng thái: <strong>{state.on ? "ON" : "OFF"}</strong></p>
      <div>
        <Button className="me-2" onClick={() => dispatch({ type: "TOGGLE" })}>
          Toggle
        </Button>
        <Button className="me-2" onClick={() => dispatch({ type: "ON" })}>ON</Button>
        <Button className="me-2" onClick={() => dispatch({ type: "OFF" })}>OFF</Button>
        <Button variant="danger" onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
      </div>
    </Card>
  );
}
