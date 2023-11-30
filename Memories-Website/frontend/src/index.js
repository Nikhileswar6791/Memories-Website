import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";

const Root = createRoot(document.getElementById("root"));
Root.render(<App />);
