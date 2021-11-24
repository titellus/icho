import { StrictMode } from "react";
import * as ReactDOM from "react-dom";

import App from "./app/app";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authenticate, Browse, Home } from "@catalogue/utils/shared";

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="search" element={<Browse />} />
        <Route path="authenticate" element={<Authenticate />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
