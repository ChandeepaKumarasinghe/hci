import React, { useState } from 'react';

const CheckoutPage = () => {
    const [saveCard, setSaveCard] = useState(false);
    const [selectedItems, setSelectedItems] = useState({
        'Chicken Cheens Jambo': false,
        'Smoked Buzur Chicken': false,
        'Boasted Chicken': false,
    });

    const toggleItem = (item) => {
        setSelectedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {/* Card Information Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Card Type</h2>
                <div className="flex space-x-4 mb-6">
                    <div className="flex items-center">
                        <input type="radio" id="credit" name="cardType" defaultChecked className="mr-2" />
                        <label htmlFor="credit">Credit Card</label>
                    </div>
                    <div className="flex items-center">
                        <input type="radio" id="debit" name="cardType" className="mr-2" />
                        <label htmlFor="debit">Debit Card</label>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mb-2">Card Detail</h2>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Name On Card</label>
                    <div className="border-b border-gray-300 pb-1">Harvey Olson</div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Card Number</label>
                    <div className="border-b border-gray-300 pb-1">3787-3449-3626-0712</div>
                    <span className="text-sm text-gray-500">VISA</span>
                </div>

                <div className="flex space-x-4 mb-6">
                    <div className="w-1/2">
                        <label className="block text-gray-600 mb-1">Visit On</label>
                        <div className="border-b border-gray-300 pb-1">04 / 24</div>
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-600 mb-1">CVV Code</label>
                        <div className="border-b border-gray-300 pb-1">•••</div>
                    </div>
                </div>

                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="saveCard"
                        checked={saveCard}
                        onChange={() => setSaveCard(!saveCard)}
                        className="mr-2"
                    />
                    <label htmlFor="saveCard">Security save this card for a faster checkout next time</label>
                </div>

                <div className="text-right mb-8">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium">
                        Pay $195.30
                    </button>
                </div>
            </div>

            {/* Shipping Information Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Shipping To</h2>
                <div className="border-b border-gray-200 pb-4 mb-4">
                    <p>Harvey Olson</p>
                    <p>4564 Loyman Avenue, Fayetteville North</p>
                    <p>Carolina, Pincode - 25314</p>
                    <p>Mobile: <span className="font-semibold">910-818-4705</span></p>
                </div>
            </div>

            {/* Lunch Box Section */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Lunch Box</h2>
                <p className="text-gray-600 mb-4">Fayetteville North, USA</p>

                <div className="space-y-4 mb-6">
                    {Object.keys(selectedItems).map((item) => (
                        <div key={item} className="flex justify-between items-center">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={item}
                                    checked={selectedItems[item]}
                                    onChange={() => toggleItem(item)}
                                    className="mr-2"
                                />
                                <label htmlFor={item}>{item}</label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id={`${item}-lunchbox`} className="mr-2" />
                                <label htmlFor={`${item}-lunchbox`}>Lunchbox</label>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                        <span>Item Total</span>
                        <span className="font-semibold">$55</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Taxes and Charges</span>
                        <span className="font-semibold">$75</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span className="font-semibold">$60</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="font-semibold">$90</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold">$15.30</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Coupon</span>
                        <span className="font-semibold">$10</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <button className="text-blue-600">Apply Coupon</button>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                        <span>BILL TOTAL</span>
                        <span>$195.3</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;