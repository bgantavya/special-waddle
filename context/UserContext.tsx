"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
    _id: string;
    email: string;
    name: string;
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void; // Add this function to update user
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    setUser: () => { }, // Default function
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        fetch("/api/client", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?._id) {
                    setUser(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
