import React, { createContext, useContext } from "react";

const UserTokenContext = createContext(null);

const useTokenContext = () => useContext(UserTokenContext);

function UserTokenProvider({ children }) {
  const [token, setToken] = React.useState("");

  return (
    <UserTokenContext.Provider value={[token, setToken]}>
      {children}
    </UserTokenContext.Provider>
  );
}

export { useTokenContext, UserTokenProvider };
