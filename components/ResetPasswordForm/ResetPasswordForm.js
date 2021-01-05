import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import { firebaseClient } from '../../firebaseClient';
import { useNotification } from '../../context/notification';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

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
  password: '',
  passwordConfirmation: '',
};
const ResetPasswordForm = ({ code }) => {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useNotification();

  return (
    <>
      <Typography variant='h5'>Reset Your Password</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          password: string().required(),
          passwordConfirmation: string()
            .required()
            .test('passwords-match', 'Passwords must match.', function (value) {
              return this.parent.password === value;
            }),
        })}
        onSubmit={async (values, formikHelpers) => {
          try {
            let res = await firebaseClient
              .auth()
              .confirmPasswordReset(code, values.password);
            router.push('/');
          } catch (error) {
            console.log(error);
            enqueueSnackbar(
              'Error resetting your password. Please try again.',
              {
                variant: 'error',
              },
            );
          }
        }}
      >
        {({ values, isSubmitting, isValidating, errors, touched }) => (
          <Form className={classes.form}>
            <Box mb={2}>
              <FormGroup>
                <Field
                  name='password'
                  variant='outlined'
                  label='Password'
                  type='password'
                  as={TextField}
                  margin='dense'
                  fullWidth
                  helperText={
                    touched.password && Boolean(errors.password) && 'Required'
                  }
                  error={touched.password && Boolean(errors.password)}
                />
              </FormGroup>
            </Box>
            <Box mb={2}>
              <FormGroup>
                <Field
                  name='passwordConfirmation'
                  variant='outlined'
                  label='Confirm New Password'
                  type='password'
                  as={TextField}
                  margin='dense'
                  fullWidth
                  helperText={
                    touched.passwordConfirmation &&
                    Boolean(errors.passwordConfirmation) &&
                    'Passwords must match'
                  }
                  error={
                    touched.passwordConfirmation &&
                    Boolean(errors.passwordConfirmation)
                  }
                />
              </FormGroup>
            </Box>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
              className={classes.submit}
              disabled={isSubmitting || isValidating}
            >
              Reset
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
              <a className={classes.link}>Login</a>
            </Link>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPasswordForm;
