import Link from 'next/link';

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

    <Link href="/login">
      <a style={linkStyle}>Login</a>
    </Link>
  
  </div>
);

export default Header;