import Link from 'next/link';
import {
  TextField,
  FormGroup,
  Box,
  makeStyles,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
// import { useDispatch } from 'react-redux';

import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
// import { unwrapResult } from '@reduxjs/toolkit';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginBottom: '10px',
    color: 'white',
    backgroundColor: theme.palette.primary.light,
    textTransform: 'none',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.light,
  },
  lowerCaseButton: {
    textTransform: 'none',
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  return (
    <>
      <Typography variant='h5'>Register</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          name: string().required(),
          email: string().email().required(),
          password: string().required().min(6),
        })}
        onSubmit={(values, formikHelpers) => {
          // dispatch(register(values))
          //   .then(unwrapResult)
          //   .then((res) => {
          //     console.log('SUCCESS', res);
          //     formikHelpers.setSubmitting(false);
          //   })
          //   .catch((err) => {
          //     console.log('ERROR', err);
          //     formikHelpers.setSubmitting(false);
          //   });
          console.log(values);
        }}
      >
        {({ values, touched, errors, isSubmitting, isValidating }) => (
          <Form className={classes.form}>
            <Box mb={2}>
              <FormGroup>
                <Field
                  name='name'
                  as={TextField}
                  label='Name'
                  variant='outlined'
                  margin='dense'
                  fullWidth
                  helperText={
                    touched.name && Boolean(errors.name) && 'Name is required'
                  }
                  error={touched.name && Boolean(errors.name)}
                />
              </FormGroup>
            </Box>
            <Box mb={2}>
              <FormGroup>
                <Field
                  name='email'
                  as={TextField}
                  label='Email'
                  variant='outlined'
                  margin='dense'
                  fullWidth
                  helperText={
                    touched.email &&
                    Boolean(errors.email) &&
                    'E-mail is required'
                  }
                  error={touched.email && Boolean(errors.email)}
                />
              </FormGroup>
            </Box>
            <Box mb={2}>
              <FormGroup>
                <Field
                  name='password'
                  as={TextField}
                  type='password'
                  label='Password'
                  variant='outlined'
                  margin='dense'
                  fullWidth
                  helperText={
                    touched.password &&
                    Boolean(errors.password) &&
                    'Password is required. Minimum length is 6 characters.'
                  }
                  error={touched.password && Boolean(errors.password)}
                />
              </FormGroup>
            </Box>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              disabled={isSubmitting || isValidating}
              className={classes.submit}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Grid container>
        <Grid item>
          <Button
            color='primary'
            variant='text'
            className={classes.lowerCaseButton}
          >
            <Link href='/'>
              <a className={classes.link}>Already have an account? Login</a>
            </Link>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterForm;
