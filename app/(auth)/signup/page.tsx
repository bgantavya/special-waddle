"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function Page() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        console.log(formData)

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.status !== 201) {
                const { message } = await res.json();
                throw new Error(message || 'Signup failed');
            }

            router.push('/login'); // router.push('/dashboard')
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <fieldset>
            <legend>Sign-Up</legend>
            <form onSubmit={handleSubmit}> 

                {error ? <span>{error}</span> : <span>Enter details</span>}
                <br />
                <input type='text' name='name' id='name' placeholder='Enter your full name'
                required onChange={handleChange} />
                <input type='email' name='email' id='email' placeholder='Enter your email' 
                required onChange={handleChange} />
                <input type='Password' name='password' id='password' 
                placeholder='Enter password for your deal-er account' required onChange={handleChange} />
                <button type='submit' disabled={loading}>{loading ? "loading..." : "Submit"}</button>
            </form>
            <span>Already have a account?<Link href='/login'> log-in</Link></span>
        </fieldset>
    )
}