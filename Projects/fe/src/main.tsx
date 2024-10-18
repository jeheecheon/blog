import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "@/../App";

import "@/_assets/css/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
