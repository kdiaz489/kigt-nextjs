import { createContext, useContext, useState } from 'react';

const NavStateContext = createContext({ open: false });
const NavSetContext = createContext();

export const NavProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prevOpenState) => !prevOpenState);
  };
  return (
    <NavStateContext.Provider value={open}>
      <NavSetContext.Provider value={toggleOpen}>
        {children}
      </NavSetContext.Provider>
    </NavStateContext.Provider>
  );
};

export const useNav = () => {
  return [useContext(NavStateContext), useContext(NavSetContext)];
};
