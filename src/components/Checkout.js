import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Order submitted:', { 
      ...formData, 
      paymentMethod, 
      cart, 
      total 
    });
    clearCart();
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div style={styles.container}>
        <div style={styles.success}>
          <h1>Order Complete!</h1>
          <p>Thank you for your purchase. A confirmation email has been sent.</p>
          <Link to="/products" style={styles.continueShopping}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Checkout</h1>
      
      <div style={styles.checkoutContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.sectionHeader}>Shipping Information</h2>
          <div style={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <h2 style={styles.sectionHeader}>Payment Method</h2>
          <div style={styles.paymentMethods}>
            {['credit', 'paypal', 'bank'].map(method => (
              <label key={method} style={styles.paymentMethod}>
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </label>
            ))}
          </div>

          {paymentMethod === 'credit' && (
            <div style={styles.creditCardForm}>
              <div style={styles.formGroup}>
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required={paymentMethod === 'credit'}
                />
              </div>
              <div style={styles.cardDetails}>
                <div style={styles.formGroup}>
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required={paymentMethod === 'credit'}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required={paymentMethod === 'credit'}
                  />
                </div>
              </div>
            </div>
          )}

          <button type="submit" style={styles.submitButton}>
            Place Order - ${total.toFixed(2)}
          </button>
        </form>

        <div style={styles.orderSummary}>
          <h2 style={styles.sectionHeader}>Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} style={styles.orderItem}>
              <img
                src={item.images[0]}
                alt={item.name}
                style={styles.orderImage}
              />
              <div style={styles.orderDetails}>
                <h3>{item.name}</h3>
                <p>${item.price} × {item.quantity}</p>
              </div>
            </div>
          ))}
          <div style={styles.orderTotal}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
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
  checkoutContainer: {
    display: 'flex',
    gap: '40px',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  sectionHeader: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#2c3e50'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '80px',
    resize: 'vertical'
  },
  paymentMethods: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px'
  },
  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  creditCardForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  cardDetails: {
    display: 'flex',
    gap: '15px'
  },
  submitButton: {
    padding: '15px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#1a252f'
    }
  },
  orderSummary: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    '@media (max-width: 768px)': {
      width: '100%'
    }
  },
  orderItem: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
    alignItems: 'center'
  },
  orderImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  orderDetails: {
    flex: 1
  },
  orderTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #ddd',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  success: {
    textAlign: 'center',
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto'
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
  }
};

export default Checkout;