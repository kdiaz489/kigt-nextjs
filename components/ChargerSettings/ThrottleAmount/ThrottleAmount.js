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
import { object, number } from 'yup';
import { MenuItem } from '@material-ui/core';
import { useNotification } from '../../../context/notification';

const useStyles = makeStyles((theme) => ({
  disabledUnderline: {
    '&&&:before': {
      borderBottom: 'none',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  textField: {
    textAlign: 'center',
  },
}));

const ThrottleAmount = ({ throttleAmount, chargerId }) => {
  const classes = useStyles();
  const [editThrottle, setEditThrottle] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useNotification();

  const toggleEdit = (e) => {
    e.preventDefault();
    setEditThrottle((prevEditThrottle) => !prevEditThrottle);
  };
  const initialValues = {
    'SERVER Set Current Max': throttleAmount,
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          'SERVER Set Current Max': number('Must be a valid value').required(
            'Required',
          ),
        })}
        onSubmit={async (values, formikHelpers) => {
          try {
            let res = await axios.put(`/chargers/${chargerId}`, values);
            setEditThrottle((prevVal) => !prevVal);
            enqueueSnackbar('Successfully throttled charger.', {
              variant: 'success',
            });
          } catch (error) {
            enqueueSnackbar(
              'Error trying to throttle charger. Please try again.',
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
                  <Typography variant='body1'>Throttle</Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  alignItems='center'
                  justify='center'
                >
                  <Field
                    name='SERVER Set Current Max'
                    defaultValue={throttleAmount}
                    as={TextField}
                    select
                    fullWidth
                    disabled={!editThrottle}
                    InputProps={{
                      classes: {
                        disabled: classes.disabledUnderline,
                        input: classes.textField,
                      },
                    }}
                    helperText={
                      touched['SERVER Set Current Max'] &&
                      Boolean(errors['SERVER Set Current Max']) &&
                      errors['SERVER Set Current Max']
                    }
                    error={
                      touched['SERVER Set Current Max'] &&
                      Boolean(errors['SERVER Set Current Max'])
                    }
                  >
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={28}>28</MenuItem>
                  </Field>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  className={classes.gridItemSize}
                  alignItems='center'
                  justify='center'
                >
                  {editThrottle ? (
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

export default ThrottleAmount;
