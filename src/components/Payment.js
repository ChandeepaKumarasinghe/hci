import React, { useState } from 'react';

const Payment = () => {
    const [saveCard, setSaveCard] = useState(false);
    const [cardType, setCardType] = useState('credit');

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 p-6 text-white">
                    <h1 className="text-2xl font-bold">Checkout</h1>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    {/* Card Type Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Card Type</h2>
                        <div className="flex space-x-6 mb-6">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="credit"
                                    name="cardType"
                                    checked={cardType === 'credit'}
                                    onChange={() => setCardType('credit')}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label htmlFor="credit" className="ml-2 block text-sm text-gray-700">
                                    Credit Card
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="debit"
                                    name="cardType"
                                    checked={cardType === 'debit'}
                                    onChange={() => setCardType('debit')}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label htmlFor="debit" className="ml-2 block text-sm text-gray-700">
                                    Debit Card
                                </label>
                            </div>
                        </div>

                        {/* Card Details Section */}
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Card Detail</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Name On Card</label>
                                <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">
                                    Harvey Olson
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Card Number</label>
                                <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">
                                    3787-3449-3626-0712
                                </div>
                                <span className="text-xs text-gray-500 mt-1">VISA</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Expires On</label>
                                    <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">
                                        04 / 24
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">CVV Code</label>
                                    <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">
                                        •••
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Card Option */}
                        <div className="mt-6 flex items-center">
                            <input
                                id="save-card"
                                name="save-card"
                                type="checkbox"
                                checked={saveCard}
                                onChange={() => setSaveCard(!saveCard)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="save-card" className="ml-2 block text-sm text-gray-700">
                                Security save this card for a faster checkout next time
                            </label>
                        </div>

                        {/* Pay Button */}
                        <div className="mt-8">
                            <button
                                type="button"
                                className="w-full bg-blue-600 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Pay $195.30
                            </button>
                        </div>
                    </div>

                    {/* Shipping Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Shipping To</h2>
                        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                            <p className="font-medium">Harvey Olson</p>
                            <p className="text-gray-600">4564 Loyman Avenue</p>
                            <p className="text-gray-600">Fayetteville North Carolina, 25314</p>
                            <p className="text-gray-600 mt-2">Mobile: <span className="font-medium">910-818-4705</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;