import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const { product } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Payment processing logic
    setPaymentComplete(true);
  };

  return React.createElement("div", { style: styles.container },
    !paymentComplete 
      ? React.createElement(React.Fragment, null,
          React.createElement("h1", null, "Payment"),
          React.createElement("div", { style: styles.summary },
            React.createElement("h3", null, "Order Summary"),
            React.createElement("p", null, product.name),
            React.createElement("p", null, `Quantity: ${product.quantity}`),
            React.createElement("p", { style: styles.total }, 
              `Total: $${(product.price * product.quantity).toFixed(2)}`
            )
          ),
          
          React.createElement("form", { onSubmit: handleSubmit, style: styles.form },
            React.createElement("div", { style: styles.formGroup },
              React.createElement("label", null, "Payment Method"),
              React.createElement("select", {
                value: paymentMethod,
                onChange: (e) => setPaymentMethod(e.target.value),
                style: styles.input
              },
                React.createElement("option", { value: "credit" }, "Credit Card"),
                React.createElement("option", { value: "debit" }, "Debit Card"),
                React.createElement("option", { value: "paypal" }, "PayPal")
              )
            ),
            
            paymentMethod !== 'paypal' && React.createElement(React.Fragment, null,
              React.createElement("div", { style: styles.formGroup },
                React.createElement("label", null, "Card Number"),
                React.createElement("input", {
                  type: "text",
                  placeholder: "1234 5678 9012 3456",
                  required: true,
                  style: styles.input
                })
              ),
              
              React.createElement("div", { style: styles.formRow },
                React.createElement("div", { style: styles.formGroup },
                  React.createElement("label", null, "Expiry Date"),
                  React.createElement("input", {
                    type: "text",
                    placeholder: "MM/YY",
                    required: true,
                    style: styles.input
                  })
                ),
                
                React.createElement("div", { style: styles.formGroup },
                  React.createElement("label", null, "CVV"),
                  React.createElement("input", {
                    type: "text",
                    placeholder: "123",
                    required: true,
                    style: styles.input
                  })
                )
              )
            ),
            
            React.createElement("button", { 
              type: "submit",
              style: styles.submitButton 
            }, "Complete Payment")
          )
        )
      : React.createElement("div", { style: styles.success },
          React.createElement("h2", null, "Payment Successful!"),
          React.createElement("p", null, "Thank you for your purchase."),
          React.createElement(Link, { to: "/", style: styles.returnLink }, "Back to Home")
        )
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  summary: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px'
  },
  total: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formRow: {
    display: 'flex',
    gap: '20px'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '8px'
  },
  submitButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  success: {
    textAlign: 'center',
    padding: '40px'
  },
  returnLink: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '12px 24px',
    backgroundColor: '#2c3e50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px'
  }
};

export default Payment;