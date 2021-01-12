import { createContext, useContext, useState } from 'react';

const ChargersContext = createContext();

export const ChargersProvider = ({ children }) => {
  const [currentCharger, setCurrentCharger] = useState(null);
  return (
    <ChargersContext.Provider value={{ currentCharger, setCurrentCharger }}>
      {children}
    </ChargersContext.Provider>
  );
};

export const useChargers = () => {
  return useContext(ChargersContext);
};
