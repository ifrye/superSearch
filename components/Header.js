import Link from 'next/link';
import jsCookie from "js-cookie";

const linkStyle = {
  marginRight: 10,
  marginLeft: 10,
  color: "black",
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    
    <Link href="/search">
      <a style={linkStyle}>Search</a>
    </Link>

    {jsCookie.get("username") ?
    <Link href="/logout">
      <a style={linkStyle}>Logout</a>
    </Link>
    :
    <Link href="/login">
      <a style={linkStyle}>Login</a>
    </Link>}
    {jsCookie.get("username")}

    <Link href="/register">
      <a style={linkStyle}>Register</a>
    </Link>
  
  </div>
);

export default Header;