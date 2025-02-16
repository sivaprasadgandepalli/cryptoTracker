import { useEffect, useState } from 'react';
import { useCurrency } from "../context/cryptoContext";

export const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { currency } = useCurrency();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
            }
        };

        const fetchData = async () => {
            try {
                const response = await fetch(url,options);
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [currency]);

    return { data, error, loading };
};
