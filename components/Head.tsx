"use client"
import Link from 'next/link'
import React from 'react'
import { useUser } from '@context/UserContext'

export function Header() {
    const { user, loading } = useUser()
    if (loading) return null
    return (
        <header className="header">
            <nav className="nav" role="navigation">
                <ul className="nav-list">
                    <li><Link href='/' className="nav-link">Home</Link></li>
                    <li><Link href='/about' className="nav-link">About</Link></li>
                    {user
                        ? <li><Link href='/dashboard' className="nav-link">Dashboard</Link></li>
                        : <li><Link href='/signup' className="nav-link nav-cta">Join</Link></li>
                    }
                </ul>
            </nav>
            <style jsx>{`
                .header {
                    background: linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%);
                    padding: 1rem 0;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                }
                .nav {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                .nav-list {
                    display: flex;
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
                .nav-link {
                    color: #fff;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 1.1rem;
                    transition: color 0.2s;
                }
                .nav-link:hover {
                    color: #222;
                }
                .nav-cta {
                    background: #fff;
                    color: #4f8cff;
                    padding: 0.4em 1em;
                    border-radius: 999px;
                    font-weight: 600;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
                    transition: background 0.2s, color 0.2s;
                }
                .nav-cta:hover {
                    background: #4f8cff;
                    color: #fff;
                }
                @media (max-width: 600px) {
                    .nav-list {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: flex-start;
                    }
                }
            `}</style>
        </header>
    )
}

export function Footer() {
    return (
        <footer className="footer">
            <nav>
                <ul className="footer-list">
                    <li><Link href='/about' className="footer-link">About</Link></li>
                    <li><Link href='/about' className="footer-link">Terms & Condition</Link></li>
                    <li className="footer-copy">&copy; 2025 deal-er</li>
                </ul>
            </nav>
            <style jsx>{`
                .footer {
                    background: #222;
                    color: #fff;
                    padding: 1.5rem 0;
                    margin-top: 2rem;
                }
                .footer-list {
                    display: flex;
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .footer-link {
                    color: #b3e6ff;
                    text-decoration: none;
                    font-size: 1rem;
                    transition: color 0.2s;
                }
                .footer-link:hover {
                    color: #6ee7b7;
                }
                .footer-copy {
                    color: #aaa;
                    font-size: 0.95rem;
                }
                @media (max-width: 600px) {
                    .footer-list {
                        flex-direction: column;
                        gap: 0.7rem;
                    }
                }
            `}</style>
        </footer>
    )
}