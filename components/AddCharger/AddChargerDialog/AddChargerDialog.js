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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Formik, Form, Field } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { mutate } from 'swr';
import { useNotification } from '../../../context/notification';
import { object, string } from 'yup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: '5em',
    color: 'white',
  },
  input: {
    display: 'none',
  },
}));

const AddChargerDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  let [multiCharger, setMultiCharger] = useState(false);
  const theme = useTheme();
  const { enqueueSnackbar, closeSnackbar } = useNotification();

  const initialValues = {
    kioskId: '',
    chargerName: '',
    merchantName: '',
    model: '',
    modelSn: '',
    chargerSn: '',
  };

  const { token: clientToken } = parseCookies();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMultiCharger = (e) => {
    setMultiCharger((prev) => !prev);
  };

  const handleSubmit = async (values, formikHelpers) => {
    try {
      let res = await axios.post('/chargers', values, {
        headers: { authorization: `Bearer ${clientToken}` },
      });
      mutate(
        ['/chargers', `Bearer ${clientToken} `],

        false
      );
      enqueueSnackbar('Successfully added charger.', {
        variant: 'success',
      });
      if (multiCharger) {
        formikHelpers.resetForm();
      } else {
        setOpen(false);
      }
    } catch (error) {
      enqueueSnackbar('Error adding charger. Please try again.', {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        variant='contained'
        onClick={handleClickOpen}
        color='secondary'
        className={classes.button}>
        Add Charger
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add charger</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={object({
            kioskId: string().required(),
            chargerName: string().required(),
            merchantName: string().required(),
            model: string().required().oneOf(['IM30']),
            modelSn: string().required(),
            chargerSn: string().required(),
          })}
          onSubmit={handleSubmit}>
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
                    name='kioskId'
                    margin='dense'
                    id='kioskId'
                    label='Kiosk ID'
                    fullWidth
                    helperText={
                      touched.kioskId && Boolean(errors.kioskId) && 'Required'
                    }
                    error={touched.kioskId && Boolean(errors.kioskId)}
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
                      'Required'
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
                      'Required'
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
                      touched.model && Boolean(errors.model) && 'Required'
                    }
                    error={touched.model && Boolean(errors.model)}>
                    <MenuItem value={'IM30'}>IM30</MenuItem>
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Field
                    as={TextField}
                    name='modelSn'
                    margin='dense'
                    id='modelSn'
                    label='Model SN'
                    fullWidth
                    helperText={
                      touched.modelSn && Boolean(errors.modelSn) && 'Required'
                    }
                    error={touched.modelSn && Boolean(errors.modelSn)}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    as={TextField}
                    name='chargerSn'
                    margin='dense'
                    id='chargerSn'
                    label='Charger SN'
                    fullWidth
                    helperText={
                      touched.chargerSn &&
                      Boolean(errors.chargerSn) &&
                      'Required'
                    }
                    error={touched.chargerSn && Boolean(errors.chargerSn)}
                  />
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <FormControlLabel
                  style={{ position: 'absolute', left: '5%' }}
                  control={
                    <Checkbox
                      checked={multiCharger}
                      onChange={handleMultiCharger}
                      inputProps={{
                        'aria-label': 'add multiple chargers checkbox',
                      }}
                    />
                  }
                  label='Add Multiple Chargers'
                />
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
