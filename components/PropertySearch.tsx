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
        <form onSubmit={handleSearch} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0' }}>
            <h2>🔎 Search Properties</h2>

            <div style={{ marginBottom: '10px' }}>
                <label>Location:</label><br/>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Type:</label><br/>
                <select
                    value={propertyType}
                    onChange={(e) => setType(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                >
                    <option value="">All Types</option>
                    {types.map((t) => (
                        <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label>Min Price:</label><br/>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min ₹"
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label>Max Price:</label><br/>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max ₹"
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
            </div>

            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
                Search
            </button>
        </form>
    );
}
