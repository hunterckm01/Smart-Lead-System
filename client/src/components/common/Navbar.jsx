import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [currNav, setNav] = useState('Home');
  return (
    <nav className="flex justify-center py-4 shadow-lg">
      <section className="flex justify-center gap-10">
        <Link to="/">
          <div
            className={`text-xl font-medium ${
              currNav == "Home" ? "text-red-700" : "text-black"
            }`}
            onClick={() => setNav("Home")}
          >
            Home
          </div>
        </Link>
        <Link to="/to-check">
          <div
            className={`text-xl font-medium ${
              currNav == "To Check" ? "text-red-700" : "text-black"
            }`}
            onClick={() => setNav("To Check")}
          >
            To Check
          </div>
        </Link>
        <Link to="/verified">
          <div
            className={`text-xl font-medium ${
              currNav == "Verified" ? "text-red-700" : "text-black"
            }`}
            onClick={() => setNav("Verified")}
          >
            Verified
          </div>
        </Link>
      </section>
    </nav>
  );
}

export default Navbar
