import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', { email, password, rememberMe });
        // Add your authentication logic here
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            fontFamily: 'Arial, sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                width: '100%',
                maxWidth: '400px',
                transform: 'translateY(-20px)',
                transition: 'transform 0.3s ease'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: '#333',
                    fontSize: '28px',
                    fontWeight: '600'
                }}>Welcome Back</h2>

                <form onSubmit={handleSubmit}>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#555',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            placeholder="Enter your password"
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '25px'
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#555',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{
                                    marginRight: '8px',
                                    accentColor: '#764ba2'
                                }}
                            />
                            Remember me
                        </label>

                        <a href="#forgot-password" style={{
                            color: '#764ba2',
                            fontSize: '14px',
                            textDecoration: 'none',
                            transition: 'color 0.3s'
                        }}>Forgot password?</a>
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
                        Sign In
                    </button>

                    <div style={{ textAlign: 'center' }}>
                        <span style={{ color: '#777', fontSize: '14px' }}>Don't have an account? </span>
                        <a href="/register" style={{
                            color: '#764ba2',
                            fontSize: '14px',
                            textDecoration: 'none',
                            fontWeight: '500',
                            transition: 'color 0.3s'
                        }}>Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;