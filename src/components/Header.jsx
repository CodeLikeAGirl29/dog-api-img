import React from "react";
import logo from "../assets/logo.svg"; 

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Site Logo" className="site-logo" />
    </header>
  );
};

export default Header;
