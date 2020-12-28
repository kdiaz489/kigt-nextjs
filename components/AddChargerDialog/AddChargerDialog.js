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

const AddChargerDialog = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

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
            } catch (error) {
              console.log('ERROR ADDING CHARGER');
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
