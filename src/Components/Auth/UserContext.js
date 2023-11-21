// UserContext.js
import react, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        loggedIn: false,
        firstName: "",
        userId:null,
        email:null,
    });
    const logout = () => {
        setUser({
            loggedIn: false,
            firstName:"",
            userId:null,
            email:null
        });
    };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
    return useContext(UserContext);
};

