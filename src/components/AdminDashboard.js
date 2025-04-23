import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Modern Sofa', price: 899, stock: 15 },
  { id: 2, name: 'King Size Bed', price: 1200, stock: 8 },
  { id: 3, name: 'Dining Table', price: 650, stock: 12 }
];

const orders = [
  { id: 1001, customer: 'John Doe', total: 899, status: 'Shipped' },
  { id: 1002, customer: 'Jane Smith', total: 1850, status: 'Processing' }
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');

  return React.createElement("div", { style: styles.container },
    React.createElement("h1", null, "Admin Dashboard"),
    
    React.createElement("div", { style: styles.tabs },
      React.createElement("button", {
        style: activeTab === 'products' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton,
        onClick: () => setActiveTab('products')
      }, "Products"),
      React.createElement("button", {
        style: activeTab === 'orders' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton,
        onClick: () => setActiveTab('orders')
      }, "Orders"),
      React.createElement("button", {
        style: activeTab === 'users' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton,
        onClick: () => setActiveTab('users')
      }, "Users")
    ),
    
    activeTab === 'products' && React.createElement("div", { style: styles.tabContent },
      React.createElement("div", { style: styles.header },
        React.createElement("h2", null, "Product Management"),
        React.createElement(Link, { to: "/admin/products/new", style: styles.addButton }, "Add Product")
      ),
      React.createElement("table", { style: styles.table },
        React.createElement("thead", null,
          React.createElement("tr", null,
            React.createElement("th", null, "ID"),
            React.createElement("th", null, "Name"),
            React.createElement("th", null, "Price"),
            React.createElement("th", null, "Stock"),
            React.createElement("th", null, "Actions")
          )
        ),
        React.createElement("tbody", null,
          products.map(product =>
            React.createElement("tr", { key: product.id },
              React.createElement("td", null, product.id),
              React.createElement("td", null, product.name),
              React.createElement("td", null, `$${product.price}`),
              React.createElement("td", null, product.stock),
              React.createElement("td", null,
                React.createElement(Link, { 
                  to: `/admin/products/edit/${product.id}`,
                  style: styles.actionButton 
                }, "Edit"),
                React.createElement("button", { 
                  style: { ...styles.actionButton, ...styles.deleteButton },
                  onClick: () => console.log(`Delete ${product.id}`)
                }, "Delete")
              )
            )
          )
        )
      )
    ),
    
    activeTab === 'orders' && React.createElement("div", { style: styles.tabContent },
      React.createElement("h2", null, "Order Management"),
      React.createElement("table", { style: styles.table },
        React.createElement("thead", null,
          React.createElement("tr", null,
            React.createElement("th", null, "Order ID"),
            React.createElement("th", null, "Customer"),
            React.createElement("th", null, "Total"),
            React.createElement("th", null, "Status"),
            React.createElement("th", null, "Actions")
          )
        ),
        React.createElement("tbody", null,
          orders.map(order =>
            React.createElement("tr", { key: order.id },
              React.createElement("td", null, order.id),
              React.createElement("td", null, order.customer),
              React.createElement("td", null, `$${order.total}`),
              React.createElement("td", null, order.status),
              React.createElement("td", null,
                React.createElement(Link, { 
                  to: `/admin/orders/${order.id}`,
                  style: styles.actionButton 
                }, "View")
              )
            )
          )
        )
      )
    ),
    
    activeTab === 'users' && React.createElement("div", { style: styles.tabContent },
      React.createElement("h2", null, "User Management"),
      React.createElement("p", null, "User management content goes here")
    )
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #ddd',
    marginBottom: '20px'
  },
  tabButton: {
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px'
  },
  activeTab: {
    borderBottom: '2px solid #2c3e50',
    fontWeight: 'bold'
  },
  tabContent: {
    padding: '20px 0'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#2c3e50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  actionButton: {
    padding: '5px 10px',
    marginRight: '5px',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  },
  deleteButton: {
    backgroundColor: '#e74c3c'
  }
};

export default AdminDashboard;