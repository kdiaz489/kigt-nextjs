import { createContext, useContext, useState } from 'react';
import useSWR from 'swr';
import { useAuth } from './auth';
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

export const useFetchedCharger = (chargerId) => {
  const { user } = useAuth();
  const { data, error, isValidating, mutate } = useSWR(
    user ? [`chargers/getCharger/${chargerId}`, `Bearer ${user.token} `] : null,
    { revalidateOnFocus: true }
  );

  const charger = data || [];
  const isPending = !data;

  return { charger, isPending };
};
