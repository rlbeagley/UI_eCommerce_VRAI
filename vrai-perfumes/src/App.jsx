import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/shop';
import Checkout from './pages/checkout';
import About from './pages/about';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App
