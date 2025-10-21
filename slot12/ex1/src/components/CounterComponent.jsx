import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "increment_by":
      return { count: state.count + action.payload };
    case "decrement_by":
      return { count: state.count - action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const buttonStyle = { margin: "5px" };

  return (
    <Card className="p-3 mb-3">
      <h4>Bộ Đếm Đa Năng (useReducer)</h4>
      <p style={{ fontSize: 22, fontWeight: "bold" }}>{state.count}</p>

      <div>
        <Button style={buttonStyle} onClick={() => dispatch({ type: "decrement" })}>
          Giảm (-1)
        </Button>
        <Button style={buttonStyle} onClick={() => dispatch({ type: "increment" })}>
          Tăng (+1)
        </Button>
        <Button style={buttonStyle} onClick={() => dispatch({ type: "decrement_by", payload: 5 })}>
          Giảm 5
        </Button>
        <Button style={buttonStyle} onClick={() => dispatch({ type: "increment_by", payload: 5 })}>
          Tăng 5
        </Button>
        <Button variant="danger" style={buttonStyle} onClick={() => dispatch({ type: "reset" })}>
          Reset
        </Button>
      </div>
    </Card>
  );
}
