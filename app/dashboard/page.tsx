'use client';

import { useUser } from '@context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header, Footer } from '@components/Head';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, loading, setUser } = useUser();
    const router = useRouter();
    const [listedProperties, setListedProperties] = useState([]);
    const [boughtProperties, setBoughtProperties] = useState([]);
    const [loadingProperties, setLoadingProperties] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [loading, user, router]);

    useEffect(() => {
        const fetchProperties = async () => {
            if (user) {
                try {
                    const token = localStorage.getItem('token');
                    const res = await fetch(`/api/properties/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (res.status == 200) {
                        const data = await res.json();
                        setListedProperties(data.listedProperties || []);
                        setBoughtProperties(data.boughtProperties || []);
                    } else {
                        console.error('Failed to fetch properties');
                        setListedProperties([]);
                    }
                } catch (error) {
                    console.error('Error fetching properties', error);
                } finally {
                    setLoadingProperties(false);
                }
            }
        };

        fetchProperties();
    }, [user]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                localStorage.removeItem("token");
                setUser(null);
                router.push("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("An error occurred during logout", error);
        }
    };

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <>
            <Header />
            <section>
                <fieldset>
                    <legend>USER: 😊</legend>
                    <h3>Welcome, {user.name}!</h3>
                    <ul>
                        <li>Email: {user.email}</li>
                        <li>User ID: {user._id}</li>
                    </ul>
                    <button onClick={handleLogout}>Log out</button>
                    <br />
                    <Link href='/dashboard/list-property'>
                        <button style={{ marginTop: '10px' }}>Add Property</button>
                    </Link>
                </fieldset>

                <fieldset style={{ marginTop: '20px' }}>
                    <legend>Your Listed Properties 🏡</legend>
                    {loadingProperties ? (
                        <p>Loading your properties...</p>
                    ) : listedProperties.length > 0 ? (
                        <ul>
                            {listedProperties.map((property) => (
                                <li key={property._id}>
                                    <h4>{property.title}</h4>
                                    <p>{property.description}</p>
                                    <p>Price: ₹{property.price}</p>
                                    <p>Location: {property.location}</p>
                                    <p>Status: {property.status}</p>
                                    <p>Type: {property.propertyType}</p>
                                    {property.images?.length > 0 && (
                                        <img src={property.images[0]} alt={property.title} width="150" />
                                    )}
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have not listed any properties yet.</p>
                    )}
                </fieldset>

                <fieldset style={{ marginTop: '20px' }}>
                    <legend>Properties You Bought 🛒</legend>
                    {loadingProperties ? (
                        <p>Loading your bought properties...</p>
                    ) : boughtProperties.length > 0 ? (
                        <ul>
                            {boughtProperties.map((property) => (
                                <li key={property._id}>
                                    <h4>{property.title}</h4>
                                    <p>{property.description}</p>
                                    <p>Price: ₹{property.price}</p>
                                    <p>Location: {property.location}</p>
                                    {property.images?.length > 0 && (
                                        <img src={property.images[0]} alt={property.title} width="150" />
                                    )}
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have not bought any properties yet.</p>
                    )}
                </fieldset>
            </section>
            <Footer />
        </>
    );
}
