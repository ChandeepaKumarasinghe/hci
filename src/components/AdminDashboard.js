// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const products = [
//   { id: 1, name: 'Modern Sofa', price: 899, stock: 15 },
//   { id: 2, name: 'King Size Bed', price: 1200, stock: 8 },
//   { id: 3, name: 'Dining Table', price: 650, stock: 12 }
// ];

// const orders = [
//   { id: 1001, customer: 'John Doe', total: 899, status: 'Shipped' },
//   { id: 1002, customer: 'Jane Smith', total: 1850, status: 'Processing' }
// ];

// function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('products');

//   return React.createElement("div", { style: styles.container },
//     React.createElement("h1", null, "Admin Dashboard"),

//     React.createElement("div", { style: styles.tabs },
//       React.createElement("button", {
//         style: activeTab === 'products' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton,
//         onClick: () => setActiveTab('products')
//       }, "Products"),
//       React.createElement("button", {
//         style: activeTab === 'orders' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton,
//         onClick: () => setActiveTab('orders')
//       }, "Orders"),
//       React.createElement("button", {
//         style: activeTab === 'users' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton,
//         onClick: () => setActiveTab('users')
//       }, "Users")
//     ),

//     activeTab === 'products' && React.createElement("div", { style: styles.tabContent },
//       React.createElement("div", { style: styles.header },
//         React.createElement("h2", null, "Product Management"),
//         React.createElement(Link, { to: "/admin/products/new", style: styles.addButton }, "Add Product")
//       ),
//       React.createElement("table", { style: styles.table },
//         React.createElement("thead", null,
//           React.createElement("tr", null,
//             React.createElement("th", null, "ID"),
//             React.createElement("th", null, "Name"),
//             React.createElement("th", null, "Price"),
//             React.createElement("th", null, "Stock"),
//             React.createElement("th", null, "Actions")
//           )
//         ),
//         React.createElement("tbody", null,
//           products.map(product =>
//             React.createElement("tr", { key: product.id },
//               React.createElement("td", null, product.id),
//               React.createElement("td", null, product.name),
//               React.createElement("td", null, `$${product.price}`),
//               React.createElement("td", null, product.stock),
//               React.createElement("td", null,
//                 React.createElement(Link, { 
//                   to: `/admin/products/edit/${product.id}`,
//                   style: styles.actionButton 
//                 }, "Edit"),
//                 React.createElement("button", { 
//                   style: { ...styles.actionButton, ...styles.deleteButton },
//                   onClick: () => console.log(`Delete ${product.id}`)
//                 }, "Delete")
//               )
//             )
//           )
//         )
//       )
//     ),

//     activeTab === 'orders' && React.createElement("div", { style: styles.tabContent },
//       React.createElement("h2", null, "Order Management"),
//       React.createElement("table", { style: styles.table },
//         React.createElement("thead", null,
//           React.createElement("tr", null,
//             React.createElement("th", null, "Order ID"),
//             React.createElement("th", null, "Customer"),
//             React.createElement("th", null, "Total"),
//             React.createElement("th", null, "Status"),
//             React.createElement("th", null, "Actions")
//           )
//         ),
//         React.createElement("tbody", null,
//           orders.map(order =>
//             React.createElement("tr", { key: order.id },
//               React.createElement("td", null, order.id),
//               React.createElement("td", null, order.customer),
//               React.createElement("td", null, `$${order.total}`),
//               React.createElement("td", null, order.status),
//               React.createElement("td", null,
//                 React.createElement(Link, { 
//                   to: `/admin/orders/${order.id}`,
//                   style: styles.actionButton 
//                 }, "View")
//               )
//             )
//           )
//         )
//       )
//     ),

//     activeTab === 'users' && React.createElement("div", { style: styles.tabContent },
//       React.createElement("h2", null, "User Management"),
//       React.createElement("p", null, "User management content goes here")
//     )
//   );
// }

// const styles = {
//   container: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '20px'
//   },
//   tabs: {
//     display: 'flex',
//     borderBottom: '1px solid #ddd',
//     marginBottom: '20px'
//   },
//   tabButton: {
//     padding: '12px 20px',
//     backgroundColor: 'transparent',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '16px'
//   },
//   activeTab: {
//     borderBottom: '2px solid #2c3e50',
//     fontWeight: 'bold'
//   },
//   tabContent: {
//     padding: '20px 0'
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '20px'
//   },
//   addButton: {
//     padding: '10px 15px',
//     backgroundColor: '#2c3e50',
//     color: 'white',
//     textDecoration: 'none',
//     borderRadius: '4px'
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse'
//   },
//   actionButton: {
//     padding: '5px 10px',
//     marginRight: '5px',
//     backgroundColor: '#3498db',
//     color: 'white',
//     textDecoration: 'none',
//     border: 'none',
//     borderRadius: '3px',
//     cursor: 'pointer'
//   },
//   deleteButton: {
//     backgroundColor: '#e74c3c'
//   }
// };

// export default AdminDashboard;


import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('furniture');
  const [furnitureItems, setFurnitureItems] = useState([
    { id: 1, name: 'Modern Sofa', category: 'Living Room', price: 599, stock: 15 },
    { id: 2, name: 'Dining Table', category: 'Dining', price: 899, stock: 8 },
    { id: 3, name: 'King Bed', category: 'Bedroom', price: 1299, stock: 5 }
  ]);
  const [newFurniture, setNewFurniture] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  });
  const [payments, setPayments] = useState([
    { id: 1, orderId: 'ORD-1001', customer: 'John Doe', amount: 599, date: '2023-05-15', status: 'Completed' },
    { id: 2, orderId: 'ORD-1002', customer: 'Jane Smith', amount: 1299, date: '2023-05-16', status: 'Processing' },
    { id: 3, orderId: 'ORD-1003', customer: 'Robert Johnson', amount: 899, date: '2023-05-17', status: 'Completed' }
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', joinDate: '2023-02-20' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin', joinDate: '2023-03-10' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // Furniture Management
  const handleAddFurniture = (e) => {
    e.preventDefault();
    const newItem = {
      id: furnitureItems.length + 1,
      ...newFurniture,
      price: parseFloat(newFurniture.price),
      stock: parseInt(newFurniture.stock)
    };
    setFurnitureItems([...furnitureItems, newItem]);
    setNewFurniture({ name: '', category: '', price: '', stock: '' });
  };

  const handleDeleteFurniture = (id) => {
    setFurnitureItems(furnitureItems.filter(item => item.id !== id));
  };

  // User Management
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handlePromoteUser = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, role: 'Admin' } : user
    ));
  };

  // Filter data based on search term
  const filteredPayments = payments.filter(payment =>
    payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f7fa'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px 0',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          padding: '0 20px 20px',
          borderBottom: '1px solid #34495e'
        }}>
          <h2 style={{
            margin: '0',
            fontSize: '20px',
            fontWeight: '600'
          }}>Furniture Admin</h2>
          <p style={{
            margin: '5px 0 0',
            fontSize: '14px',
            color: '#bdc3c7'
          }}>Administrator Panel</p>
        </div>

        <nav style={{ marginTop: '20px' }}>
          <button
            onClick={() => setActiveTab('furniture')}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '12px 20px',
              backgroundColor: activeTab === 'furniture' ? '#3498db' : 'transparent',
              color: 'white',
              border: 'none',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Furniture Management
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '12px 20px',
              backgroundColor: activeTab === 'payments' ? '#3498db' : 'transparent',
              color: 'white',
              border: 'none',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Payment Details
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '12px 20px',
              backgroundColor: activeTab === 'users' ? '#3498db' : 'transparent',
              color: 'white',
              border: 'none',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            User Management
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h1 style={{
            margin: '0 0 20px',
            fontSize: '24px',
            color: '#2c3e50'
          }}>
            {activeTab === 'furniture' && 'Furniture Management'}
            {activeTab === 'payments' && 'Payment Details'}
            {activeTab === 'users' && 'User Management'}
          </h1>

          {/* Search Bar */}
          {(activeTab === 'payments' || activeTab === 'users') && (
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px 15px',
                  width: '300px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
          )}

          {/* Furniture Management */}
          {activeTab === 'furniture' && (
            <div>
              <h2 style={{
                fontSize: '18px',
                margin: '20px 0 15px',
                color: '#34495e'
              }}>Add New Furniture Item</h2>

              <form onSubmit={handleAddFurniture} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                marginBottom: '30px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#7f8c8d'
                  }}>Item Name</label>
                  <input
                    type="text"
                    value={newFurniture.name}
                    onChange={(e) => setNewFurniture({ ...newFurniture, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#7f8c8d'
                  }}>Category</label>
                  <select
                    value={newFurniture.category}
                    onChange={(e) => setNewFurniture({ ...newFurniture, category: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  >
                    <option value="">Select Category</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Dining">Dining</option>
                    <option value="Office">Office</option>
                    <option value="Outdoor">Outdoor</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#7f8c8d'
                  }}>Price ($)</label>
                  <input
                    type="number"
                    value={newFurniture.price}
                    onChange={(e) => setNewFurniture({ ...newFurniture, price: e.target.value })}
                    required
                    min="0"
                    step="0.01"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#7f8c8d'
                  }}>Stock Quantity</label>
                  <input
                    type="number"
                    value={newFurniture.stock}
                    onChange={(e) => setNewFurniture({ ...newFurniture, stock: e.target.value })}
                    required
                    min="0"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <button type="submit" style={{
                    padding: '10px 20px',
                    backgroundColor: '#2ecc71',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    transition: 'background-color 0.3s'
                  }}>
                    Add Furniture Item
                  </button>
                </div>
              </form>

              <h2 style={{
                fontSize: '18px',
                margin: '20px 0 15px',
                color: '#34495e'
              }}>Current Inventory</h2>

              <div style={{
                overflowX: 'auto'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'black'
                }}>
                  <thead>
                    <tr style={{
                      backgroundColor: '#f8f9fa',
                      borderBottom: '1px solid #ddd'
                    }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>ID</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Category</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Price</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Stock</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {furnitureItems.map(item => (
                      <tr key={item.id} style={{
                        borderBottom: '1px solid #eee',
                        '&:hover': {
                          backgroundColor: '#f9f9f9'
                        }
                      }}>
                        <td style={{ padding: '12px 15px' }}>{item.id}</td>
                        <td style={{ padding: '12px 15px' }}>{item.name}</td>
                        <td style={{ padding: '12px 15px' }}>{item.category}</td>
                        <td style={{ padding: '12px 15px' }}>${item.price.toFixed(2)}</td>
                        <td style={{ padding: '12px 15px' }}>{item.stock}</td>
                        <td style={{ padding: '12px 15px' }}>
                          <button
                            onClick={() => handleDeleteFurniture(item.id)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#e74c3c',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              marginRight: '5px'
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment Details */}
          {activeTab === 'payments' && (
            <div style={{
              overflowX: 'auto'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: 'black'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid #ddd'
                  }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Order ID</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Customer</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Amount</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map(payment => (
                    <tr key={payment.id} style={{
                      borderBottom: '1px solid #eee'
                    }}>
                      <td style={{ padding: '12px 15px' }}>{payment.orderId}</td>
                      <td style={{ padding: '12px 15px' }}>{payment.customer}</td>
                      <td style={{ padding: '12px 15px' }}>${payment.amount.toFixed(2)}</td>
                      <td style={{ padding: '12px 15px' }}>{payment.date}</td>
                      <td style={{ padding: '12px 15px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: payment.status === 'Completed' ? '#2ecc71' : '#f39c12',
                          color: 'white',
                          fontSize: '13px'
                        }}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* User Management */}
          {activeTab === 'users' && (
            <div style={{
              overflowX: 'auto'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: 'black'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid #ddd'
                  }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Role</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Join Date</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} style={{
                      borderBottom: '1px solid #eee'
                    }}>
                      <td style={{ padding: '12px 15px' }}>{user.id}</td>
                      <td style={{ padding: '12px 15px' }}>{user.name}</td>
                      <td style={{ padding: '12px 15px' }}>{user.email}</td>
                      <td style={{ padding: '12px 15px' }}>{user.role}</td>
                      <td style={{ padding: '12px 15px' }}>{user.joinDate}</td>
                      <td style={{ padding: '12px 15px' }}>
                        {user.role === 'Customer' && (
                          <button
                            onClick={() => handlePromoteUser(user.id)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#3498db',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              marginRight: '5px'
                            }}
                          >
                            Make Admin
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '13px'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;