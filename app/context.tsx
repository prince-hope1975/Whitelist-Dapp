import React, { useContext, useState } from "react";

const AppContext = React.createContext(null);
export const AppProvider = ({ children }) => {
const [active, setActive] = useState(0);
const [theme, setTheme] = useState<"purple"|"dark"|"light">("dark");
const [ref, setRef] = useState(null);
  const [isModalOpen, setModal] = useState<Boolean>(false);

return (
  <AppContext.Provider
    value={{
      active,
      setActive,
      ref,
      setRef,
      theme,
      setTheme,
      isModalOpen,
      setModal,
    }}
  >
    {children}
  </AppContext.Provider>
); 
};
export const useGlobalContext = () => useContext(AppContext);
