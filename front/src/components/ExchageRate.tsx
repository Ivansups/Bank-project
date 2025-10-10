"use client"

import { useEffect, useState } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';



export default function ExchageRate() {
    const [usdRate, setUsdRate] = useState(0);
    const [eurRate, setEurRate] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch('/api/exchangeRate/usd')
        .then(res => res.json())
        .then(data => setUsdRate(data.rates.RUB))
        .catch(err => setError(true))
        .finally(() => setLoading(false));
        fetch('/api/exchangeRate/euro')
        .then(res => res.json())
        .then(data => setEurRate(data.rates.RUB))
        .catch(err => setError(true))
        .finally(() => setLoading(false));
    }, []);

    
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error loading exchange rate</div>;
    }

    return (
        <div className='mt-4 border-2 border-gray-200 rounded-lg p-4 text-center bg-gradient-to-br from-green-500 to-blue-500'>
            <h1>Exchage Rate</h1>
            <div>USD Exchange Rate: {usdRate}</div>
            <div>EUR Exchange Rate: {eurRate}</div>
        </div>
    )
}