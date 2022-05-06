import React, { useState, useEffect } from 'react';
import { NavbarContainer } from './Navbar.styles';

function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setIsDark(true);
      } else setIsDark(false);
    });

    return () => {
      window.removeEventListener('scroll', () => undefined);
    };
  }, []);

  return (
    <NavbarContainer dark={isDark}>
      <img src={'/img/cgc-logo-white.png'} alt="" />
      <div className="mt-1 rounded-md">
        <button
          className="w-full bg-indigo-500 border border-transparent
        rounded-md py-2 px-4 flex items-center justify-center text-base
        font-medium text-white hover:bg-indigo-600 focus:outline-none"
        >
          Connect Wallet
        </button>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;
