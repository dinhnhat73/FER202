import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import CounterComponent from "./components/CounterComponent";
import LightSwitch from "./components/LightSwitch";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
            transition: "all 0.3s ease",
          }}
        >
          <CounterComponent />
          <LightSwitch />
          <LoginForm />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
