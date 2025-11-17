import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowRight, faEnvelope, faPhone)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
