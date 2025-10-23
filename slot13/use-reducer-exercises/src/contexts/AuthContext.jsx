import React, { createContext, useContext, useReducer } from "react";

const mockAccounts = [
  { id: 1, username: "admin", email: "admin@example.com", password: "123456", role: "admin", status: "active" },
  { id: 2, username: "user1", email: "user1@example.com", password: "123456", role: "user", status: "active" },
  { id: 3, username: "user2", email: "user2@example.com", password: "123456", role: "user", status: "locked" }
];

export const AuthContext = createContext();

const initialState = { user: null, error: "" };

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.payload, error: "" };
    case "LOGIN_FAIL":
      return { user: null, error: action.payload };
    case "LOGOUT":
      return { user: null, error: "" };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (username, password) => {
    const account = mockAccounts.find(
      (a) => a.username === username && a.password === password
    );
    if (!account) {
      dispatch({ type: "LOGIN_FAIL", payload: "Invalid username or password" });
    } else if (account.role !== "admin") {
      dispatch({ type: "LOGIN_FAIL", payload: "Only admin can login" });
    } else if (account.status !== "active") {
      dispatch({ type: "LOGIN_FAIL", payload: "Account is locked" });
    } else {
      dispatch({ type: "LOGIN_SUCCESS", payload: account });
    }
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
