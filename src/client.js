import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

hydrateRoot(document.querySelector('#root'), 
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
)