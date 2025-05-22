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
            <main
                style={{
                    padding: '24px',
                    minHeight: '80vh',
                    background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
                    fontFamily: 'Inter, Arial, sans-serif',
                }}
            >
                <h1
                    style={{
                        fontSize: '2.2rem',
                        fontWeight: 700,
                        marginBottom: '18px',
                        color: '#1e293b',
                        textAlign: 'center',
                        letterSpacing: '0.5px',
                        animation: 'fadeInDown 0.8s',
                    }}
                >
                    Welcome To Braj Bazaar
                </h1>
                <h1
                    style={{
                        fontSize: '2.2rem',
                        fontWeight: 700,
                        marginBottom: '18px',
                        color: '#1e293b',
                        textAlign: 'center',
                        letterSpacing: '0.5px',
                        animation: 'fadeInDown 0.8s',
                    }}
                >
                     Buy and Sell Properties 🏠
                </h1>

                <div
                    style={{
                        maxWidth: 700,
                        margin: '0 auto 32px auto',
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                        padding: '24px 18px',
                        animation: 'fadeIn 1s',
                    }}
                >
                    <PropertySearch onSearch={handleSearch} />
                </div>

                {loading && (
                    <div style={{ textAlign: 'center', margin: '32px 0' }}>
                        <div className="spinner" />
                        <p style={{ color: '#475569', marginTop: 12 }}>Loading properties...</p>
                    </div>
                )}

                {!loading && properties.length > 0 && (
                    <section style={{ marginTop: '24px', animation: 'fadeInUp 0.8s' }}>
                        <h3
                            style={{
                                fontSize: '1.3rem',
                                fontWeight: 600,
                                color: '#334155',
                                marginBottom: '18px',
                                textAlign: 'center',
                            }}
                        >
                            Found {properties.length} Properties
                        </h3>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                                gap: '24px',
                                alignItems: 'stretch',
                            }}
                        >
                            {properties.map((prop, idx) => (
                                <div
                                    key={prop._id}
                                    style={{
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '14px',
                                        padding: '18px 14px',
                                        background: '#fff',
                                        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        animation: `fadeInCard 0.6s ${idx * 0.08}s both`,
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.03)';
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLDivElement).style.transform = '';
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 8px rgba(0,0,0,0.04)';
                                    }}
                                >
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                                        {prop.title}
                                    </h4>
                                    <p style={{ color: '#64748b', margin: '2px 0' }}>
                                        <b>Location:</b> {prop.location}
                                    </p>
                                    <p style={{ color: '#64748b', margin: '2px 0' }}>
                                        <b>Type:</b> {prop.propertyType}
                                    </p>
                                    <p style={{ color: '#64748b', margin: '2px 0' }}>
                                        <b>Price:</b> <span style={{ color: '#2563eb', fontWeight: 500 }}>₹{prop.price}</span>
                                    </p>
                                    <p style={{ color: '#64748b', margin: '2px 0 12px 0' }}>
                                        <b>Status:</b> {prop.status}
                                    </p>
                                    <button
                                        onClick={() => handleBuy(prop._id)}
                                        style={{
                                            padding: '10px 0',
                                            background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s, transform 0.1s',
                                            marginTop: 'auto',
                                        }}
                                        onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
                                        onMouseUp={e => (e.currentTarget.style.transform = '')}
                                    >
                                        Buy
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {!loading && properties.length === 0 && filters && (
                    <p
                        style={{
                            color: '#ef4444',
                            textAlign: 'center',
                            marginTop: 32,
                            fontWeight: 500,
                            animation: 'fadeIn 0.7s',
                        }}
                    >
                        No properties found for your search criteria.
                    </p>
                )}

                {message && (
                    <div
                        style={{
                            margin: '28px auto 0 auto',
                            maxWidth: 400,
                            background: '#f1f5f9',
                            borderRadius: 8,
                            padding: '14px 18px',
                            color: '#059669',
                            fontWeight: 600,
                            textAlign: 'center',
                            animation: 'fadeIn 0.7s',
                        }}
                    >
                        {message}
                    </div>
                )}
            </main>
            <Footer />

            {/* Animations and spinner styles */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(16px);}
                    to { opacity: 1; transform: none;}
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-24px);}
                    to { opacity: 1; transform: none;}
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(24px);}
                    to { opacity: 1; transform: none;}
                }
                @keyframes fadeInCard {
                    from { opacity: 0; transform: scale(0.96);}
                    to { opacity: 1; transform: scale(1);}
                }
                .spinner {
                    width: 36px;
                    height: 36px;
                    border: 4px solid #c7d2fe;
                    border-top: 4px solid #6366f1;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    margin: 0 auto;
                }
                @keyframes spin {
                    to { transform: rotate(360deg);}
                }
                @media (max-width: 600px) {
                    main {
                        padding: 10px !important;
                    }
                    h1 {
                        font-size: 1.3rem !important;
                    }
                    section > div {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </>
    );
}
