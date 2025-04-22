import React from 'react';
//import './adminpanel.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="profile">
                <img src="https://via.placeholder.com/50" alt="Profile" />
                <h3>Randy Butler</h3>
                <p>elon@spacex.com</p>
                <span className="affiliate">Affiliate <span className="star">★ Rising star</span></span>
            </div>
            <div className="referral">
                <p>Referral link</p>
                <input type="text" value="https://..." readOnly />
            </div>
            <nav>
                <ul>
                    <li>Activity</li>
                    <li>Statistics</li>
                    <li className="active">Payments</li>
                    <li>Leaderboard</li>
                    <li>Marketing</li>
                    <li>Settings</li>
                    <li>Log out</li>
                </ul>
            </nav>
        </div>
    );
};

const PaymentOverview = () => {
    return (
        <div className="payment-overview">
            <h2>Payments</h2>
            <div className="payment-cards">
                <div className="card">
                    <p>Unpaid balance</p>
                    <h3>$0.00</h3>
                    <p>SKRILL</p>
                </div>
                <div className="card">
                    <p>Paid balance</p>
                    <h3>$540.00</h3>
                    <p>PAYEER.COM</p>
                </div>
            </div>
            <button className="withdraw-btn">Request balance withdraw</button>
        </div>
    );
};

const PaymentMethods = () => {
    return (
        <div className="payment-methods">
            <h3>Your payment methods</h3>
            <div className="method">
                <input type="radio" name="payment" defaultChecked />
                <label>Skrill</label>
                <p>Skirl email: elon@spacex.com</p>
            </div>
            <div className="method">
                <input type="radio" name="payment" />
                <label>PayPal</label>
                <p>PayPal email: elon@spacex.com</p>
            </div>
            <div className="method">
                <input type="radio" name="payment" />
                <label>Bitcoin</label>
                <p>BTC address: 1F3DPOWQB...</p>
                <p className="note">* Note: It still is primary payment method</p>
            </div>
            <button className="save-btn">Save changes</button>
        </div>
    );
};

const PaymentHistory = () => {
    const history = [
        { id: '#55233', date: '15/04/2020', time: '17:00hrs', amount: '$100.00 USD', status: 'Unpaid' },
        { id: '#55233', date: '15/04/2020', time: '17:30hrs', amount: '$100.00 USD', status: 'Unpaid' },
        { id: '#55233', date: '15/04/2020', time: '17:30hrs', amount: '$100.00 USD', status: 'Paid' },
    ];

    return (
        <div className="payment-history">
            <h3>Your payment history</h3>
            <table>
                <thead>
                    <tr>
                        <th>Referral</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.id}</td>
                            <td>{entry.date}</td>
                            <td>{entry.time}</td>
                            <td>{entry.amount}</td>
                            <td className={entry.status.toLowerCase()}>{entry.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <header>
                    <p>Balance: $0.00</p>
                    <div className="user-info">
                        <span>English ▼</span>
                        <span>Randy Butler ▼</span>
                    </div>
                </header>
                <div className="content">
                    <PaymentOverview />
                    <PaymentMethods />
                    <PaymentHistory />
                </div>
            </div>
        </div>
    );
};

export default App;