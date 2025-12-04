import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider forcedTheme="dark">
                <App />
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
