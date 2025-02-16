import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('USD');

    const symbol = useMemo(() => {
        return currency === 'USD' ? '$' : '₹';
    }, [currency]);

    const changeCurrency = (newCurrency) => {
        setCurrency(newCurrency);
    };

    
    useEffect(() => {
        console.log(`Currency: ${currency}, Symbol: ${symbol}`);
    }, [currency, symbol]);

    const contextValue = useMemo(() => ({
        currency,
        changeCurrency,
        symbol,
    }), [currency, symbol]);

    return (
        <CurrencyContext.Provider value={contextValue}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};