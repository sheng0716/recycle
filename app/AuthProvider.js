import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState([]);

    const login = (newUserId) => {
        setUserId(newUserId);
    };

    return (
        <AuthContext.Provider value={{ userId, login }}>
            {children}
        </AuthContext.Provider>
    );
};
