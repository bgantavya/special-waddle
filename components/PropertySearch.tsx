'use client';

import React, { useState } from 'react';

const types = ["agriculture", "industrial", "residential", "flats", "office"];

export default function PropertySearch({ onSearch }: { onSearch: (filters: any) => void }) {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [location, setLocation] = useState('');
    const [propertyType, setType] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({
            minPrice: minPrice ? parseInt(minPrice) : undefined,
            maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
            location,
            propertyType
        });
    };

    return (
        <form
            onSubmit={handleSearch}
            style={{
            padding: '24px',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            margin: '24px 0',
            background: '#fff',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            maxWidth: 600,
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            }}
        >
            <h2 style={{ marginBottom: 24, fontWeight: 700, fontSize: 24, color: '#22223b', textAlign: 'center', letterSpacing: 1 }}>
            🔎 Search Properties
            </h2>

            <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500, color: '#4a4e69', marginBottom: 6, display: 'block' }}>Location</label>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #c9c9c9',
                borderRadius: '8px',
                fontSize: 16,
                background: '#f8f9fa',
                transition: 'border 0.2s',
                }}
            />
            </div>

            <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500, color: '#4a4e69', marginBottom: 6, display: 'block' }}>Type</label>
            <select
                value={propertyType}
                onChange={(e) => setType(e.target.value)}
                style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #c9c9c9',
                borderRadius: '8px',
                fontSize: 16,
                background: '#f8f9fa',
                transition: 'border 0.2s',
                }}
            >
                <option value="">All Types</option>
                {types.map((t) => (
                <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
                ))}
            </select>
            </div>

            <div
            style={{
                marginBottom: 18,
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
            }}
            >
            <div style={{ flex: 1, minWidth: 140 }}>
                <label style={{ fontWeight: 500, color: '#4a4e69', marginBottom: 6, display: 'block' }}>Min Price</label>
                <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min ₹"
                style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #c9c9c9',
                    borderRadius: '8px',
                    fontSize: 16,
                    background: '#f8f9fa',
                    transition: 'border 0.2s',
                }}
                />
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
                <label style={{ fontWeight: 500, color: '#4a4e69', marginBottom: 6, display: 'block' }}>Max Price</label>
                <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max ₹"
                style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #c9c9c9',
                    borderRadius: '8px',
                    fontSize: 16,
                    background: '#f8f9fa',
                    transition: 'border 0.2s',
                }}
                />
            </div>
            </div>

            <button
            type="submit"
            style={{
                width: '100%',
                padding: '14px 0',
                background: 'linear-gradient(90deg, #0070f3 0%, #4361ee 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: 1,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(67,97,238,0.08)',
                transition: 'background 0.2s',
            }}
            >
            Search
            </button>

            {/* Responsive styles */}
            <style>{`
            @media (max-width: 600px) {
                form {
                padding: 12px !important;
                border-radius: 8px !important;
                }
                h2 {
                font-size: 20px !important;
                }
                div[style*="display: flex"] {
                flex-direction: column !important;
                gap: 8px !important;
                }
            }
            `}</style>
        </form>
    );
}
