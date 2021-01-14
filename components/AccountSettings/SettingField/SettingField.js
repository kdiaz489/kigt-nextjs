import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ThrottleSelect from '../../ThrottleSelect';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { object, number, string, email } from 'yup';
import { MenuItem } from '@material-ui/core';
import { useNotification } from '../../../context/notification';
import { parseCookies } from 'nookies';

const useStyles = makeStyles((theme) => ({
  disabledUnderline: {
    '&&&:before': {
      borderBottom: 'none',
    },
  },
  textField: {
    textAlign: 'center',
  },
}));

const SettingField = ({ name, initialValues, title, validationSchema }) => {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const { token: clientToken } = parseCookies();
  const { enqueueSnackbar, closeSnackbar } = useNotification();

  const toggleEdit = (e) => {
    e.preventDefault();
    setEdit((prevEditThrottle) => !prevEditThrottle);
  };
  const initialVals = initialValues;
  return (
    <>
      <Formik
        initialValues={initialVals}
        validationSchema={object(validationSchema)}
        onSubmit={async (values, formikHelpers) => {
          try {
            let res = await axios.put(`/auth/updateAccount`, values, {
              headers: { authorization: `Bearer ${clientToken}` },
            });
            setEdit((prevVal) => !prevVal);
            enqueueSnackbar('Account successfully updated.', {
              variant: 'success',
            });
          } catch (error) {
            console.log(error);
            enqueueSnackbar(
              'Error trying to update your account. Please try again.',
              {
                variant: 'error',
              },
            );
          }
        }}
      >
        {({ values, errors, touched, isSubmitting, isValidating }) => (
          <Form>
            <Box
              border={1}
              style={{ padding: '5px' }}
              borderColor='grey.400'
              borderRadius='borderRadius'
            >
              <Grid container spacing={2}>
                <Grid
                  container
                  item
                  xs={4}
                  alignItems='center'
                  justify='center'
                >
                  <Typography variant='body1'>{title}</Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  alignItems='center'
                  justify='center'
                >
                  <Field
                    name={name}
                    as={TextField}
                    fullWidth
                    disabled={!edit}
                    InputProps={{
                      classes: {
                        disabled: classes.disabledUnderline,
                        input: classes.textField,
                      },
                    }}
                    helperText={
                      touched[name] && Boolean(errors[name]) && errors[name]
                    }
                    error={touched[name] && Boolean(errors[name])}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  className={classes.gridItemSize}
                  alignItems='center'
                  justify='center'
                >
                  {edit ? (
                    <>
                      <Grid item xs={6}>
                        <Button
                          type='submit'
                          color='primary'
                          size='small'
                          disabled={isSubmitting}
                        >
                          Update
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          color='secondary'
                          size='small'
                          onClick={toggleEdit}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <Button color='primary' size='small' onClick={toggleEdit}>
                      Edit
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SettingField;
