import React, { useState } from 'react';

const RegisterPage = () => {
    const [activeTab, setActiveTab] = useState('user');
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [adminData, setAdminData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminKey: ''
    });

    const handleUserSubmit = (e) => {
        e.preventDefault();
        console.log('User registration:', userData);
        // Add user registration logic here
    };

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        console.log('Admin registration:', adminData);
        // Add admin registration logic here
    };

    const handleUserChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleAdminChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                width: '100%',
                maxWidth: '450px'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '25px',
                    color: '#333',
                    fontSize: '28px',
                    fontWeight: '600'
                }}>Create Account</h2>

                <div style={{
                    display: 'flex',
                    marginBottom: '25px',
                    borderBottom: '1px solid #eee'
                }}>
                    <button
                        onClick={() => setActiveTab('user')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: activeTab === 'user' ? '#764ba2' : '#f5f5f5',
                            color: activeTab === 'user' ? 'white' : '#555',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            borderRadius: '5px 5px 0 0',
                            transition: 'all 0.3s'
                        }}
                    >
                        User
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: activeTab === 'admin' ? '#764ba2' : '#f5f5f5',
                            color: activeTab === 'admin' ? 'white' : '#555',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            borderRadius: '5px 5px 0 0',
                            transition: 'all 0.3s'
                        }}
                    >
                        Admin
                    </button>
                </div>

                {activeTab === 'user' ? (
                    <form onSubmit={handleUserSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleUserChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    transition: 'border 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleUserChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    transition: 'border 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleUserChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    transition: 'border 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Create a password"
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={userData.confirmPassword}
                                onChange={handleUserChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    transition: 'border 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Confirm your password"
                            />
                        </div>

                        <button type="submit" style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#764ba2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            marginBottom: '20px'
                        }} onMouseOver={(e) => e.target.style.backgroundColor = '#5d3a8a'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#764ba2'}>
                            Register as User
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleAdminSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>Admin Name</label>
                            <input
                                type="text"
                                name="name"
                                value={adminData.name}
                                onChange={handleAdminChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    transition: 'border 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Enter admin name"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={adminData.email}
                                onChange={handleAdminChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    transition: 'border 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Enter admin email"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={adminData.password}
                                onChange={handleAdminChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    transition: 'border 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Create admin password"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={adminData.confirmPassword}
                                onChange={handleAdminChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    transition: 'border 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Confirm admin password"
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>Admin Key</label>
                            <input
                                type="password"
                                name="adminKey"
                                value={adminData.adminKey}
                                onChange={handleAdminChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    transition: 'border 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Enter admin secret key"
                            />
                        </div>

                        <button type="submit" style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#764ba2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            marginBottom: '20px'
                        }} onMouseOver={(e) => e.target.style.backgroundColor = '#5d3a8a'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#764ba2'}>
                            Register as Admin
                        </button>
                    </form>
                )}

                <div style={{ textAlign: 'center' }}>
                    <span style={{ color: '#777', fontSize: '14px' }}>Already have an account? </span>
                    <a href="/login" style={{
                        color: '#764ba2',
                        fontSize: '14px',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'color 0.3s'
                    }}>Sign in</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;