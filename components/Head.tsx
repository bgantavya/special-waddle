"use client"
import Link from 'next/link'
import React from 'react'
import { useUser } from '@context/UserContext'

export function Header() {
    const { user, loading } = useUser()
    if(loading) return null
    return(
        <header>
            <fieldset>
                <nav role='navigation'>
                    <ul>
                        <li><Link href='/'>Home</Link></li>
                        <li><Link href='/about'>About</Link></li>
                        {
                            user 
                            ? <li><Link href='/dashboard'>dashboard</Link></li> 
                            : <li><Link href='/signup'>Join</Link></li>
                        }
                        
                    </ul>
                </nav>
            </fieldset>
        </header>
    )
}

export function Footer() {
    return(
        <footer>
            <fieldset>
                <nav>
                    <ul>
                        <li><Link href='/about'>About</Link></li>
                        <li><Link href='/about'>Terms & Condition</Link></li>
                        <li>&copy; 2025 deal-er</li>
                    </ul>
                </nav>
            </fieldset>
        </footer>
    )
} 