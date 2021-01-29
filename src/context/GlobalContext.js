import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext(null);

const useGlobalContext = () => useContext(AppContext);
const INITIAL_STATE = {
  staffs: null,
};

function GlobalContextProvider({ children }) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_STAFFS":
        return { ...state, staffs: action.payload };

      default:
        return INITIAL_STATE;
    }
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export { GlobalContextProvider, useGlobalContext };
