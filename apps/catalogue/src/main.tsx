import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import './i18n';

import App from './app/app';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './routes/home';
import { Admin } from './routes/admin';
import { Browse } from './routes/browse';
import { BrowseGraph } from './routes/browseGraph';
import { Metadata } from './routes/metadata';
import { Authenticate } from './routes/authenticate';
import { MetadataGraph } from "./routes/metadataGraph";

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={process.env.NX_BASE_URL} element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="search" element={<Browse />} />
          <Route path="searchGraph" element={<BrowseGraph />} />
          <Route path="metadata/:id" element={<Metadata />} />
          <Route path="metadata/graph/:id" element={<MetadataGraph />} />
          <Route path="authenticate" element={<Authenticate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
