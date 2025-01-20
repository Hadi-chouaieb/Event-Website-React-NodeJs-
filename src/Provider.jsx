import React, { useState, useEffect } from 'react';
import Auth from './components/Auth/Auth';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import Loader from './components/Loding/loader';

function Provider({ Compo }) {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("__stripedSelPower");
                if (token) {
                    const decoded = jwtDecode(token);
                    setData(decoded);
                } else {
                    setData(null); 
                }
            } catch (error) {
                setData(null); 
            } finally {
                setLoading(false); 
            }
        };

        fetchData(); 
    }, []); 

    if (loading) {
        return <Loader />; 
    }

    if (data != null  ) {
        return <> {Compo}</>
    }
   
}

export default Provider;
