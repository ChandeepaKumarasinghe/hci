import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div style={styles.emptyCart}>
          <p>Your cart is empty</p>
          <Link to="/products" style={styles.continueShopping}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div style={styles.cartItems}>
            {cart.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  style={styles.cartImage}
                />
                <div style={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div style={styles.quantityControl}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button
                  style={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div style={styles.summary}>
            <h2>Order Summary</h2>
            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Total</span>
              <span style={styles.total}>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" style={styles.checkoutButton}>
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#2c3e50'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '40px'
  },
  continueShopping: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#1a252f'
    }
  },
  cartItems: {
    flex: 1
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #eee',
    gap: '20px'
  },
  cartImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  itemDetails: {
    flex: 1
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px'
  },
  removeButton: {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  },
  summary: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginLeft: '40px',
    '@media (max-width: 768px)': {
      width: '100%',
      marginLeft: '0',
      marginTop: '30px'
    }
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 0'
  },
  total: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#2c3e50'
  },
  checkoutButton: {
    display: 'block',
    width: '100%',
    padding: '15px',
    backgroundColor: '#2c3e50',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '4px',
    marginTop: '20px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#1a252f'
    }
  }
};

export default Cart;