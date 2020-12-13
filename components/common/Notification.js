import React, { useCallback, useEffect } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  removeSnackbar as removeSnackbarAction,
  createNotifySelectors,
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from '../../redux/notification/notificationSlice';

const useStyles = makeStyles({
  button: {
    color: 'white',
  },
});

const notificationsSelector = createNotifySelectors().selectAll;
let displayed = [];

const Notification = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notifications = useSelector(notificationsSelector);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter((item) => id !== item)];
  };

  useEffect(() => {
    notifications.forEach(
      ({ id, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(id);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(id)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key: id,
          ...options,
          action: (key) => (
            <Button
              className={classes.button}
              onClick={() => {
                dispatch(closeSnackbarAction(key));
              }}
            >
              dismiss
            </Button>
          ),
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            // remove this snackbar from redux store
            dispatch(removeSnackbarAction(myKey));
            removeDisplayed(myKey);
          },
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(id);
      },
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch, classes.button]);

  return null;
};

export const useNotification = () => {
  const dispatch = useDispatch();
  const showSnackbar = useCallback(
    (message, variant) => {
      const key = new Date().getTime() + Math.random();
      const snackbarOptions = {
        id: key,
        message: message.toString(),
        options: {
          key,
          variant: variant || 'warning',
        },
      };
      dispatch(enqueueSnackbarAction(snackbarOptions));
    },
    [dispatch],
  );
  return showSnackbar;
};

export default Notification;
