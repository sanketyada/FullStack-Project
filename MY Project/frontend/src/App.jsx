import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bus from "./pages/Bus";
import Truck from "./pages/Truck";
import Tickets from "./pages/Tickets";
import Wallet from "./pages/Wallet"; // new
import About from "./pages/About"; // new
import FooterNav from "./components/FooterNav";
import DigiPinBanner from "./components/DigiPinBanner"; // import banner component
import './index.css'
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sky-200 pb-20">
        {/* Show banner below main header/nav (add your header if applicable) */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/truck" element={<Truck />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/wallet" element={<Wallet />} /> {/* added */}
          <Route path="/about" element={<About />} /> {/* added */}
        </Routes>

        {/* Persistent footer nav at the bottom */}
        <FooterNav />
      </div>
      <DigiPinBanner />
    </Router>
  );
}

export default App 