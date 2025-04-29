'use client';

import React, { useState } from 'react';
import { Header, Footer } from '@components/Head';
import PropertySearch from '@components/PropertySearch';
import { useUser } from '@context/UserContext'; // Import the useUser hook

export default function Page() {
    const [filters, setFilters] = useState(null);
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const { user, loading: userLoading } = useUser(); // Get user from context

    const handleSearch = async (searchFilters: any) => {
        setFilters(searchFilters);
        setLoading(true);

        try {
            const res = await fetch('/api/properties/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchFilters),
            });

            const data = await res.json();
            setProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuy = async (propertyId: string) => {
        if (!user?._id) {
            alert('Please log in to mark your interest.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/properties/interested', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ propertyId, userId: user._id }), // Use user._id from context
            });

            const data = await res.json();

            if (data.success) {
                setMessage('Your interest has been marked!');
            } else {
                setMessage('You have already shown interest in this property.');
            }
        } catch (error) {
            console.error('Error marking interest:', error);
        } finally {
            setLoading(false);
        }
    };

    if (userLoading) {
        return <p>Loading user data...</p>;
    }

    return (
        <>
            <Header />
            <main style={{ padding: '20px' }}>
                <h1>Welcome To Braj | Buy and Sell Properties 🏠</h1>
                
                <PropertySearch onSearch={handleSearch} />

                {loading && <p>Loading properties...</p>}

                {!loading && properties.length > 0 && (
                    <section style={{ marginTop: '20px' }}>
                        <h3>Found {properties.length} Properties</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                            {properties.map((prop) => (
                                <div key={prop._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
                                    <h4>{prop.title}</h4>
                                    <p>Location: {prop.location}</p>
                                    <p>Type: {prop.propertyType}</p>
                                    <p>Price: ₹{prop.price}</p>
                                    <p>Status: {prop.status}</p>
                                    <button onClick={() => handleBuy(prop._id)} style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
                                        Buy
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {!loading && properties.length === 0 && filters && (
                    <p>No properties found for your search criteria.</p>
                )}

                {message && <p>{message}</p>}
            </main>
            <Footer />
        </>
    );
}
