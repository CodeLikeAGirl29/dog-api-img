import logo from "../assets/logo.svg"; 

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Site Logo" className="site-logo center-block" />
    </header>
  );
};

export default Header;
