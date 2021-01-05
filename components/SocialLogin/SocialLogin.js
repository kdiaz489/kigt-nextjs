import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { firebaseClient, googleProvider } from '../../firebaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';
import { useNotification } from '../../context/notification';

const useStyles = makeStyles((theme) => ({
  googleLogin: {
    backgroundColor: '#e14928',
    color: 'white',
    textTransform: 'none',
  },
  microsoftLogin: {
    backgroundColor: '#3b589a',
    color: 'white',
    textTransform: 'none',
  },
  paper: {
    margin: theme.spacing(4, 4, 2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SocialLogin = () => {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useNotification();

  const googleLogin = async () => {
    try {
      let googleRes = await firebaseClient
        .auth()
        .signInWithPopup(googleProvider);
      let { user } = googleRes;
      let firebaseRes = await firebaseClient
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          displayName: user.displayName,
          email: user.email,
          address: '',
          chargers: [],
          uid: user.uid,
        });

      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Error logging in with your Google account.', {
        variant: 'error',
      });
    }
  };
  // const { loginGoogleSubmit, loginMicrosoftSubmit } = useLogin();
  return (
    <Box textAlign='center' mt={3}>
      <Typography variant='body1'>Or Sign In With</Typography>
      <Box mt={3}>
        <Grid container justify='center' spacing={4}>
          <Grid item xs>
            <Button className={classes.googleLogin} onClick={googleLogin}>
              <FontAwesomeIcon icon={faGoogle} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.microsoftLogin}
              onClick={() => console.log('login')}
            >
              <FontAwesomeIcon icon={faMicrosoft} />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SocialLogin;
