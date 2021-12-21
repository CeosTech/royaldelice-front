import React, { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";
export const NavBarContext = createContext();


const initialState = {  
  activeButton: 'home',
};
  

const NavBarContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NavBarContext.Provider value={{ state, dispatch }}>
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBarStateValue = () => useContext(NavBarContext);

export default NavBarContextProvider;