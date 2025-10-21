import { Container } from "react-bootstrap";

import CounterComponent from "./components/CounterComponent";
import ToggleComponent from "./components/ToggleComponent";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import QuestionBank from "./components/QuestionBank";

function App() {
  return (
    <Container className="py-4">
      <h2>useReducer Exercises</h2>

      <CounterComponent />
      <ToggleComponent />
      <LoginForm />
      <SignUpForm />
      <QuestionBank />
    </Container>
  );
}

export default App;
