import { createContext, useContext } from 'react';
import { useSnackbar } from 'notistack';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <NotificationContext.Provider value={{ enqueueSnackbar, closeSnackbar }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
