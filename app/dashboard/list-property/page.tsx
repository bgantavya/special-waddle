'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ListPropertyPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        images: '',
        propertyType: '', // ADD type field
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log(form)
        const res = await fetch('/api/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...form,
                images: form.images.split(',').map(url => url.trim()), // turn images into array
            }),
        });

        if (res.ok) {
            router.push('/dashboard');
        } else {
            alert('Failed to list property.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>List a New Property</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="images"
                    placeholder="Image URLs (comma separated)"
                    value={form.images}
                    onChange={handleChange}
                    required
                />
                {/* NEW: Type dropdown */}
                <select
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Type</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="industrial">Industrial</option>
                    <option value="residential">Residential</option>
                    <option value="flats">Flats</option>
                    <option value="office">Office</option>
                </select>
                
                <button type="submit" style={{ marginTop: '10px' }}>List Property</button>
            </form>
        </div>
    );
}
