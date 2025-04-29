"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@context/UserContext'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter();
    const { setUser } = useUser()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.status !== 200) {
                const { message } = await res.json();
                throw new Error(message || "Login failed");
            }

            const data = await res.json();
            const { token, user } = data;

            // Store the token in localStorage
            localStorage.setItem("token", token);

            // Update the user context with the logged-in user's data
            setUser(user);

            // Redirect to the dashboard
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
return (
    <fieldset>
        <legend>Log-In</legend>
        <form onSubmit={handleSubmit}>
            {error ? <span>{error}</span> : <span>user details</span>}
            <br />
            <input type='email' name='email' id='email' placeholder='Enter your email'
                required onChange={handleChange} />
            <input type='Password' name='password' id='password'
                placeholder='Enter password for your deal-er account' onChange={handleChange} required />
            <button disabled={loading} type='submit'>{loading ? "loading..." : "Submit"}</button>
        </form>
        <span>don't have a account?<Link href='/signup'> sign-up</Link></span>
    </fieldset>
)
}