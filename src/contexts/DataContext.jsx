import { createContext, useState } from "react";

export const DataContext = createContext({ isAuthorized: false });

const DataProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <DataContext.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
