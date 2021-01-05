import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form, Field } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { mutate } from 'swr';
import { useNotification } from '../../context/notification';
import { object, string } from 'yup';

const AddChargerDialog = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { enqueueSnackbar, closeSnackbar } = useNotification();

  const initialValues = {
    chargerId: '',
    chargerName: '',
    merchantName: '',
    model: '',
    kioskId: '',
    serialNumber: '',
  };

  const { token: clientToken } = parseCookies();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        style={{ color: theme.palette.grey[500] }}
      >
        Add Charger
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add charger</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={object({
            chargerId: string().required(),
            chargerName: string().required(),
            merchantName: string().required(),
            model: string().required().oneOf(['IM30']),
            kioskId: string().required(),
            serialNumber: string().required(),
          })}
          onSubmit={async (values, formikHelpers) => {
            try {
              let res = await axios.post('/chargers', values, {
                headers: { authorization: `Bearer ${clientToken}` },
              });
              // mutate(
              //   ['/chargers', `Bearer ${clientToken} `],

              //   async (data) => {
              //     return {
              //       chargers: [
              //         {
              //           'EVSE App Screen': 'SwipeCardIM30',
              //           'EVSE Max Current': '28',
              //           'EVSE Payment State': false,
              //           'EVSE Status Code': '255',
              //           'EVSE Throttled?': true,
              //           'SERVER Set Transaction Amount': 500,
              //           'SERVER Pause EVSE?': false,
              //           'SERVER Reset EVSE?': false,
              //           'SERVER Set Current Max': 26,
              //           'SERVER Update EVSE?': false,
              //           id: values.chargerId,
              //         },
              //         ...data.chargers,
              //       ],
              //     };
              //   },
              //   false,
              // );
              enqueueSnackbar('Successfully added charger.', {
                variant: 'success',
              });
            } catch (error) {
              enqueueSnackbar('Error adding charger. Please try again.', {
                variant: 'error',
              });
            }
          }}
        >
          {({ values, errors, touched, isSubmitting, isValidating }) => (
            <Form>
              <DialogContent>
                <DialogContentText>
                  Please enter the information associated with your charger.
                </DialogContentText>
                <FormGroup>
                  <Field
                    as={TextField}
                    autoFocus
                    name='chargerId'
                    margin='dense'
                    id='chargerId'
                    label='Charger ID'
                    fullWidth
                    helperText={
                      touched.chargerId &&
                      Boolean(errors.chargerId) &&
                      'Charger Id is required'
                    }
                    error={touched.chargerId && Boolean(errors.chargerId)}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    as={TextField}
                    name='chargerName'
                    margin='dense'
                    id='chargerName'
                    label='Charger Name'
                    fullWidth
                    helperText={
                      touched.chargerName &&
                      Boolean(errors.chargerName) &&
                      'Charger Name is required'
                    }
                    error={touched.chargerName && Boolean(errors.chargerName)}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    as={TextField}
                    name='merchantName'
                    margin='dense'
                    id='merchantName'
                    label='Merchant Name'
                    fullWidth
                    helperText={
                      touched.merchantName &&
                      Boolean(errors.merchantName) &&
                      'Merchant name is required'
                    }
                    error={touched.merchantName && Boolean(errors.merchantName)}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    as={TextField}
                    name='model'
                    margin='dense'
                    id='model'
                    label='Model'
                    fullWidth
                    select
                    helperText={
                      touched.model &&
                      Boolean(errors.model) &&
                      'Model is required'
                    }
                    error={touched.model && Boolean(errors.model)}
                  >
                    <MenuItem value={'IM30'}>IM30</MenuItem>
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Field
                    as={TextField}
                    name='kioskId'
                    margin='dense'
                    id='kioskId'
                    label='Kiosk Id'
                    fullWidth
                    helperText={
                      touched.kioskId &&
                      Boolean(errors.kioskId) &&
                      'Kiosk Id is required'
                    }
                    error={touched.kioskId && Boolean(errors.kioskId)}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    as={TextField}
                    name='serialNumber'
                    margin='dense'
                    id='serialNumber'
                    label='Serial Number'
                    fullWidth
                    helperText={
                      touched.serialNumber &&
                      Boolean(errors.serialNumber) &&
                      'Serial number is required'
                    }
                    error={touched.serialNumber && Boolean(errors.serialNumber)}
                  />
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color='secondary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary' disabled={isSubmitting}>
                  Add
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default AddChargerDialog;
