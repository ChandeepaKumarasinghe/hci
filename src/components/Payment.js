import React, { useState } from 'react';

const Payment = () => {
    const [saveCard, setSaveCard] = useState(false);
    const [cardType, setCardType] = useState('credit');
    const [isHovered, setIsHovered] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        nameOnCard: 'Harvey Olson',
        cardNumber: '3787 3449 3626 0712',
        expiryDate: '04 / 24',
        cvv: '123',
        cardBrand: 'VISA'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Format card number with spaces every 4 digits
        if (name === 'cardNumber') {
            const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            // Detect card brand based on first digit
            let brand = 'OTHER';
            if (/^4/.test(value)) brand = 'VISA';
            if (/^5[1-5]/.test(value)) brand = 'MASTERCARD';
            if (/^3[47]/.test(value)) brand = 'AMEX';

            setFormData(prev => ({
                ...prev,
                [name]: formattedValue,
                cardBrand: brand
            }));
            return;
        }

        // Format expiry date with slash
        if (name === 'expiryDate') {
            const formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1 / $2')
                .substring(0, 7);
            setFormData(prev => ({
                ...prev,
                [name]: formattedValue
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically process the payment
        alert(`Payment processing for ${formData.nameOnCard}`);
    };

    return (
        <div style={{
            color: 'black',
            minHeight: '100vh',
            backgroundColor: '#f0f4f8',
            padding: '32px 16px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            <div style={{
                maxWidth: '480px',
                margin: '0 auto',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                transform: isHovered ? 'translateY(-5px)' : 'none'
            }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>

                {/* Header with gradient */}
                <div style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                    padding: '28px 24px',
                    color: '#FFFFFF',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-50px',
                        right: '-50px',
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        bottom: '-80px',
                        right: '30px',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)'
                    }}></div>
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        letterSpacing: '-0.5px',
                        margin: '0',
                        position: 'relative',
                        zIndex: 1
                    }}>Checkout</h1>
                    <p style={{
                        fontSize: '14px',
                        opacity: 0.9,
                        marginTop: '4px',
                        position: 'relative',
                        zIndex: 1
                    }}>Complete your purchase</p>
                </div>

                {/* Main Content */}
                <div style={{ padding: '28px' }}>
                    <form onSubmit={handleSubmit}>
                        {/* Card Type Section */}
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '16px',
                                color: '#1F2937',
                                letterSpacing: '-0.25px'
                            }}>
                                Card Type
                            </h2>
                            <div style={{
                                display: 'flex',
                                gap: '16px',
                                marginBottom: '24px',
                                backgroundColor: '#F9FAFB',
                                padding: '8px',
                                borderRadius: '8px'
                            }}>
                                <button
                                    type="button"
                                    onClick={() => setCardType('credit')}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        backgroundColor: cardType === 'credit' ? '#2563EB' : 'transparent',
                                        color: cardType === 'credit' ? 'white' : '#4B5563',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: cardType === 'credit' ? '0 2px 4px rgba(37, 99, 235, 0.3)' : 'none'
                                    }}
                                >
                                    Credit Card
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCardType('debit')}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        backgroundColor: cardType === 'debit' ? '#2563EB' : 'transparent',
                                        color: cardType === 'debit' ? 'white' : '#4B5563',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: cardType === 'debit' ? '0 2px 4px rgba(37, 99, 235, 0.3)' : 'none'
                                    }}
                                >
                                    Debit Card
                                </button>
                            </div>

                            {/* Card Details Section */}
                            <h2 style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '16px',
                                color: '#1F2937',
                                letterSpacing: '-0.25px'
                            }}>
                                Card Details
                            </h2>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                backgroundColor: '#F9FAFB',
                                padding: '20px',
                                borderRadius: '12px',
                                border: '1px solid #E5E7EB'
                            }}>
                                {/* Card Preview */}
                                <div style={{
                                    backgroundColor: '#1E40AF',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    color: 'white',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    position: 'relative',
                                    height: '56px',
                                    marginBottom: '8px'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}>{formData.cardBrand}</div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '16px',
                                        left: '16px',
                                        fontSize: '18px',
                                        letterSpacing: '1px',
                                        fontFamily: "'Courier New', monospace"
                                    }}>
                                        {formData.cardNumber.replace(/\d(?=\d{4})/g, '•')}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="nameOnCard" style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        color: '#6B7280',
                                        marginBottom: '6px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>Name on Card</label>
                                    <input
                                        type="text"
                                        id="nameOnCard"
                                        name="nameOnCard"
                                        value={formData.nameOnCard}
                                        onChange={handleInputChange}
                                        style={{
                                            color: 'black',
                                            width: '100%',
                                            marginTop: '4px',
                                            padding: '12px',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '8px',
                                            backgroundColor: '#FFFFFF',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="cardNumber" style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        color: '#6B7280',
                                        marginBottom: '6px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>Card Number</label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        maxLength="19"
                                        placeholder="1234 5678 9012 3456"
                                        style={{
                                            color: 'black',
                                            width: '100%',
                                            marginTop: '4px',
                                            padding: '12px',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '8px',
                                            backgroundColor: '#FFFFFF',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            letterSpacing: '1px',
                                            fontFamily: "'Courier New', monospace",
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label htmlFor="expiryDate" style={{
                                            display: 'block',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: '#6B7280',
                                            marginBottom: '6px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>Expires On</label>
                                        <input
                                            type="text"
                                            id="expiryDate"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            maxLength="7"
                                            placeholder="MM / YY"
                                            style={{
                                                color: 'black',
                                                width: '100%',
                                                marginTop: '4px',
                                                padding: '12px',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: '8px',
                                                backgroundColor: '#FFFFFF',
                                                fontSize: '15px',
                                                fontWeight: '500',
                                                outline: 'none',
                                                transition: 'border-color 0.2s ease'
                                            }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cvv" style={{
                                            display: 'block',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: '#6B7280',
                                            marginBottom: '6px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>CVV Code</label>
                                        <input
                                            type="password"
                                            id="cvv"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            maxLength="4"
                                            style={{
                                                width: '100%',
                                                marginTop: '4px',
                                                padding: '12px',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: '8px',
                                                backgroundColor: '#FFFFFF',
                                                fontSize: '15px',
                                                fontWeight: '500',
                                                letterSpacing: '1px',
                                                fontFamily: "'Courier New', monospace",
                                                outline: 'none',
                                                transition: 'border-color 0.2s ease'
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Save Card Option */}
                            <div style={{
                                marginTop: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: saveCard ? '#EFF6FF' : 'transparent',
                                transition: 'background-color 0.2s ease'
                            }}>
                                <input
                                    id="save-card"
                                    name="save-card"
                                    type="checkbox"
                                    checked={saveCard}
                                    onChange={() => setSaveCard(!saveCard)}
                                    style={{
                                        height: '18px',
                                        width: '18px',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        marginRight: '12px',
                                        cursor: 'pointer',
                                        accentColor: '#2563EB'
                                    }}
                                />
                                <label htmlFor="save-card" style={{
                                    fontSize: '14px',
                                    color: '#374151',
                                    cursor: 'pointer'
                                }}>
                                    Securely save this card for faster checkout next time
                                </label>
                            </div>

                            {/* Pay Button */}
                            <div style={{ marginTop: '32px' }}>
                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                                        padding: '16px',
                                        border: 'none',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#FFFFFF',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.boxShadow = '0 6px 8px rgba(37, 99, 235, 0.3)';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.boxShadow = '0 4px 6px rgba(37, 99, 235, 0.2)';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <span style={{ position: 'relative', zIndex: 1 }}>Pay $195.30</span>
                                    <div style={{
                                        position: 'absolute',
                                        top: '-50%',
                                        left: '-50%',
                                        width: '200%',
                                        height: '200%',
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                                        transform: 'translateY(100%)',
                                        transition: 'transform 0.3s ease'
                                    }}></div>
                                </button>
                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    color: '#6B7280',
                                    marginTop: '12px'
                                }}>
                                    By continuing, you agree to our <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>Terms</a> and <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>Privacy Policy</a>.
                                </p>
                            </div>
                        </div>

                        {/* Shipping Section */}
                        <div style={{
                            borderTop: '1px solid #E5E7EB',
                            paddingTop: '24px',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-12px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '60px',
                                height: '4px',
                                backgroundColor: '#E5E7EB',
                                borderRadius: '2px'
                            }}></div>
                            <h2 style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '16px',
                                color: '#1F2937',
                                letterSpacing: '-0.25px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <svg style={{ marginRight: '8px' }} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#6B7280" />
                                </svg>
                                Shipping To
                            </h2>
                            <div style={{
                                padding: '20px',
                                border: '1px solid #E5E7EB',
                                borderRadius: '12px',
                                backgroundColor: '#F9FAFB',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    color: '#2563EB',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}>
                                    Change
                                </div>
                                <p style={{
                                    fontWeight: '600',
                                    marginBottom: '8px'
                                }}>Harvey Olson</p>
                                <p style={{
                                    color: '#4B5563',
                                    fontSize: '14px',
                                    lineHeight: '1.5'
                                }}>4564 Loyman Avenue<br />
                                    Fayetteville, North Carolina 25314<br />
                                    United States</p>
                                <p style={{
                                    color: '#4B5563',
                                    marginTop: '12px',
                                    fontSize: '14px'
                                }}>
                                    <span style={{ fontWeight: '600' }}>Phone:</span> 910-818-4705
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;