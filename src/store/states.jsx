import { createContext, useState, useMemo } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {

  const [user, setUser] = useState(null);
  const [carRows, setCarRows] = useState([]);

  const contextValue = useMemo(() => {
    return {
      user,
      setUser,
      carRows,
      setCarRows
      
    };
  }, [user,carRows]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}


