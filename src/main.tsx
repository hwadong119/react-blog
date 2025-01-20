import "./index.css";

import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import firebase from "./firebaseApp.ts";
import { AuthContextProvider } from "./context/AuthContext.tsx";

console.log(firebase);

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>
);
