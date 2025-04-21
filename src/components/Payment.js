import React, { useState } from 'react';

const Payment = () => {
    const [saveCard, setSaveCard] = useState(false);
    const [cardType, setCardType] = useState('credit');

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F7FAFC', padding: '32px 16px' }}>
            <div style={{ maxWidth: '448px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ backgroundColor: '#2563EB', padding: '24px', color: '#FFFFFF' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Checkout</h1>
                </div>

                {/* Main Content */}
                <div style={{ padding: '24px' }}>
                    {/* Card Type Section */}
                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>Card Type</h2>
                        <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    id="credit"
                                    name="cardType"
                                    checked={cardType === 'credit'}
                                    onChange={() => setCardType('credit')}
                                    style={{ height: '16px', width: '16px', border: '1px solid #D1D5DB', marginRight: '8px' }}
                                />
                                <label htmlFor="credit" style={{ fontSize: '14px', color: '#374151' }}>
                                    Credit Card
                                </label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    id="debit"
                                    name="cardType"
                                    checked={cardType === 'debit'}
                                    onChange={() => setCardType('debit')}
                                    style={{ height: '16px', width: '16px', border: '1px solid #D1D5DB', marginRight: '8px' }}
                                />
                                <label htmlFor="debit" style={{ fontSize: '14px', color: '#374151' }}>
                                    Debit Card
                                </label>
                            </div>
                        </div>

                        {/* Card Details Section */}
                        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>Card Detail</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>Name On Card</label>
                                <div style={{ marginTop: '4px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px', backgroundColor: '#F9FAFB' }}>
                                    Harvey Olson
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>Card Number</label>
                                <div style={{ marginTop: '4px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px', backgroundColor: '#F9FAFB' }}>
                                    3787-3449-3626-0712
                                </div>
                                <span style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>VISA</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>Expires On</label>
                                    <div style={{ marginTop: '4px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px', backgroundColor: '#F9FAFB' }}>
                                        04 / 24
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '4px' }}>CVV Code</label>
                                    <div style={{ marginTop: '4px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px', backgroundColor: '#F9FAFB' }}>
                                        •••
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Card Option */}
                        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center' }}>
                            <input
                                id="save-card"
                                name="save-card"
                                type="checkbox"
                                checked={saveCard}
                                onChange={() => setSaveCard(!saveCard)}
                                style={{ height: '16px', width: '16px', border: '1px solid #D1D5DB', borderRadius: '4px', marginRight: '8px' }}
                            />
                            <label htmlFor="save-card" style={{ fontSize: '14px', color: '#374151' }}>
                                Security save this card for a faster checkout next time
                            </label>
                        </div>

                        {/* Pay Button */}
                        <div style={{ marginTop: '32px' }}>
                            <button
                                type="button"
                                style={{
                                    width: '100%',
                                    backgroundColor: '#2563EB',
                                    padding: '12px 16px',
                                    border: '1px solid transparent',
                                    borderRadius: '6px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    color: '#FFFFFF',
                                    cursor: 'pointer'
                                }}
                            >
                                Pay $195.30
                            </button>
                        </div>
                    </div>

                    {/* Shipping Section */}
                    <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '24px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>Shipping To</h2>
                        <div style={{ padding: '16px', border: '1px solid #E5E7EB', borderRadius: '6px', backgroundColor: '#F9FAFB' }}>
                            <p style={{ fontWeight: '500' }}>Harvey Olson</p>
                            <p style={{ color: '#4B5563' }}>4564 Loyman Avenue</p>
                            <p style={{ color: '#4B5563' }}>Fayetteville North Carolina, 25314</p>
                            <p style={{ color: '#4B5563', marginTop: '8px' }}>Mobile: <span style={{ fontWeight: '500' }}>910-818-4705</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;