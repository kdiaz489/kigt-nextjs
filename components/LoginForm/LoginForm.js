import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import { firebaseClient } from '../../firebaseClient';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  textFieldBorderColor: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light,
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: theme.palette.primary.light,
    },
  },
  image: {
    backgroundImage: `url('img/Home_Garage.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#d3d3d3',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.light,
  },
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
  googleLogin: {
    background: '#ffffff',
    '&:hover': {
      background: '#bfbfbf',
      color: 'white',
    },
    marginBottom: '10px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  microsoftLogin: {
    background: '#ffffff',
    '&:hover': {
      background: '#bfbfbf',
      color: 'white',
    },
    marginBottom: '10px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  lowerCaseButton: {
    textTransform: 'none',
  },
}));

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = (props) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Typography component='h1' variant='h5'>
        Sign in to Your Account
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          email: string().email().required(),
          password: string().required(),
        })}
        onSubmit={async (values, formikHelpers) => {
          /* must return promise */
          try {
            await firebaseClient
              .auth()
              .signInWithEmailAndPassword(values.email, values.password);
            router.push('/dashboard');
          } catch (error) {
            console.log('Error', error);
          }
        }}
      >
        {({ values, errors, touched, isSubmitting, isValidating }) => (
          <Form className={classes.form}>
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
                    'Email is required'
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
                  label='Password'
                  variant='outlined'
                  margin='dense'
                  fullWidth
                  type='password'
                  helperText={
                    touched.password &&
                    Boolean(errors.password) &&
                    'Password is required'
                  }
                  error={touched.password && Boolean(errors.password)}
                />
              </FormGroup>
            </Box>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submit}
              disabled={isSubmitting || isValidating}
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>

      <Grid container>
        <Grid item xs>
          <Button className={classes.lowerCaseButton}>
            <Link href='/resetpassword'>
              <a className={classes.link}>Forgot Password?</a>
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Button className={classes.lowerCaseButton}>
            <Link href='/register'>
              <a className={classes.link}>
                <Typography color='inherit'>Register</Typography>
              </a>
            </Link>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
