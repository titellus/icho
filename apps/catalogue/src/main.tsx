import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import './i18n';

import App from './app/app';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './routes/home';
import { Browse } from './routes/browse';
import { Metadata } from './routes/metadata';
import { Authenticate } from './routes/authenticate';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={process.env.NX_BASE_URL} element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Browse />} />
          <Route path="metadata/:id" element={<Metadata />} />
          <Route path="authenticate" element={<Authenticate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
