import React from 'react';
import MobileContextProvider from 'contexts/Mobile';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

function App() {
  return (
    <MobileContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </MobileContextProvider>
  );
}

export default App;
