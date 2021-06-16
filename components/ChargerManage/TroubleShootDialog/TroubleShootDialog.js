import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/auth';
import MyCard from '../../common/MyCard';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(() => ({
  card: {
    padding: '2rem',
    width: '40rem',
    height: 'auto',
    borderRadius: '16px',
  },
  submitButton: {
    color: 'white',
  },
}));

const TroubleShootDialog = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const initialValues = {
    fullName: user?.displayName ?? '',
    email: user?.email ?? '',
    subject: '',
    body: '',
    priority: 'normal',
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (values, formikHelpers) => {
    try {
      let res = await axios.post(`/zendesk`, {
        ...values,
        charger: id,
      });
    } catch (error) {
      console.log('Error submitting ticket to zendesk = ', error);
    }
  };

  const validationSchema = {
    fullName: string().required().min(1).max(100),
    email: string().email().required(),
    subject: string().required(),
    body: string().required(),
    priority: string().required(),
  };

  return (
    <>
      <IconButton
        color='secondary'
        aria-label='help button'
        component='span'
        onClick={handleOpen}>
        <HelpOutlineIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id='form-dialog-title'>Need Help?</DialogTitle>
        <DialogContent>
          <Formik
            validationSchema={object(validationSchema)}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ values, errors, touched, isSubmitting, isValidating }) => (
              <Form style={{ width: '100%', padding: '16px' }}>
                <Field
                  name='fullName'
                  style={{ marginBottom: '16px' }}
                  as={TextField}
                  label='Name'
                  fullWidth
                  error={touched.fullName && Boolean(errors.fullName)}
                />

                <Field
                  name='email'
                  style={{ marginBottom: '16px' }}
                  as={TextField}
                  label='E-mail'
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                />

                <InputLabel>Priority</InputLabel>
                <Field
                  name='priority'
                  style={{ marginBottom: '16px' }}
                  as={TextField}
                  select
                  fullWidth
                  error={touched.priority && Boolean(errors.priority)}>
                  <MenuItem value={'low'}>Low</MenuItem>
                  <MenuItem value={'normal'}>Normal</MenuItem>
                  <MenuItem value={'high'}>High</MenuItem>
                  <MenuItem value={'urgent'}>Urgent</MenuItem>
                </Field>

                <Field
                  name='subject'
                  style={{ marginBottom: '16px' }}
                  as={TextField}
                  label='Subject'
                  fullWidth
                  error={touched.subject && Boolean(errors.subject)}
                />

                <Field
                  name='body'
                  style={{ marginBottom: '16px' }}
                  mb={3}
                  as={TextField}
                  multiline
                  rows={5}
                  rowsMax={10}
                  label='Body'
                  fullWidth
                  error={touched.body && Boolean(errors.body)}
                />

                <Button
                  type='submit'
                  style={{ marginBottom: '16px' }}
                  variant='contained'
                  color='primary'
                  className={classes.submitButton}
                  disabled={isSubmitting || isValidating}>
                  Submit Ticket
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TroubleShootDialog;
