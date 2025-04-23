import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Home from './Home';
import Products from './Products';
import ProductView from './ProductView';
import Login from './Login';
import Payment from './Payment';
import AdminDashboard from './AdminDashboard';
import RoomDesigner from './RoomDesigner';
import Cart from './Cart';
import Checkout from './Checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={appStyles.container}>
          <Navigation />
          <main style={appStyles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/designer" element={<RoomDesigner />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

const Navigation = () => (
  <nav style={navStyles.container}>
    <div style={navStyles.logo}>
      <Link to="/" style={navStyles.logoLink}>Room</Link>
    </div>
    <div style={navStyles.links}>
      <Link to="/" style={navStyles.link}>Home</Link>
      <Link to="/products" style={navStyles.link}>Products</Link>
      <Link to="/designer" style={navStyles.link}>Room Designer</Link>
      <Link to="/cart" style={navStyles.link}>Cart</Link>
      <Link to="/login" style={navStyles.link}>Account</Link>
    </div>
  </nav>
);

const Footer = () => (
  <footer style={footerStyles.container}>
    <div style={footerStyles.section}>
      <h3>Furni3D</h3>
      <p>Your premium 3D furniture experience</p>
    </div>
    <div style={footerStyles.section}>
      <h3>Quick Links</h3>
      <Link to="/" style={footerStyles.link}>Home</Link>
      <Link to="/products" style={footerStyles.link}>Products</Link>
      <Link to="/designer" style={footerStyles.link}>Room Designer</Link>
      <Link to="/cart" style={footerStyles.link}>Cart</Link>
    </div>
    <div style={footerStyles.section}>
      <h3>Contact</h3>
      <p>support@furni3d.com</p>
      <p>+1 (555) 123-4567</p>
    </div>
  </footer>
);

// Styles
const appStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  main: {
    flex: 1,
    padding: '20px 5%'
  }
};

const navStyles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 5%',
    backgroundColor: '#2c3e50',
    color: 'white'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  logoLink: {
    color: 'white',
    textDecoration: 'none'
  },
  links: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s',
    ':hover': {
      color: '#3498db'
    }
  },
  ctaLink: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  }
};

const footerStyles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '40px 5%',
    backgroundColor: '#34495e',
    color: 'white',
    flexWrap: 'wrap'
  },
  section: {
    minWidth: '200px',
    margin: '10px 20px'
  },
  link: {
    display: 'block',
    color: '#bdc3c7',
    textDecoration: 'none',
    margin: '8px 0',
    ':hover': {
      color: 'white'
    }
  }
};

export default App;