import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useNotification } from '../../context/notification';

const initialValues = {
  displayName: '',
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
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useNotification();

  return (
    <>
      <Typography variant='h5'>Register</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          displayName: string().required(),
          email: string().email().required(),
          password: string().required().min(6),
        })}
        onSubmit={async (values, formikHelpers) => {
          try {
            console.log('Inside on Submit');
            let res = await axios.post('/auth/register', values);
            router.push('/dashboard');
          } catch (error) {
            enqueueSnackbar(
              'Error registering your account. Please try again.',
              {
                variant: 'error',
              },
            );
          }
        }}
      >
        {({ values, touched, errors, isSubmitting, isValidating }) => (
          <Form className={classes.form}>
            <Box mb={2}>
              <FormGroup>
                <Field
                  name='displayName'
                  as={TextField}
                  label='Name'
                  variant='outlined'
                  margin='dense'
                  fullWidth
                  helperText={
                    touched.displayName &&
                    Boolean(errors.displayName) &&
                    'Name is required'
                  }
                  error={touched.displayName && Boolean(errors.displayName)}
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
