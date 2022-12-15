import React from 'react';
import MobileContextProvider from 'contexts/Mobile';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import PostContextProvider from 'contexts/Posts';

function App() {
  return (
    <MobileContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
      </PostContextProvider>
    </MobileContextProvider>
  );
}

export default App;
