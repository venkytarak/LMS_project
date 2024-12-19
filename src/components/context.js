import React, { createContext, useContext, useState } from 'react';

// Create UserContext
const UserContext = createContext();

// Provide the UserContext to the entire app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing user context
export const useUser = () => useContext(UserContext);
