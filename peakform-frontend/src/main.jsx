import React from "react";
import { createRoot } from "react-dom/client";
import RegistrationForm from "./components/RegistrationForm";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RegistrationForm />
  </React.StrictMode>
);