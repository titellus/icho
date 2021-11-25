import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './routes/home';
import { Browse } from './routes/browse';
import { Authenticate } from './routes/authenticate';

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
