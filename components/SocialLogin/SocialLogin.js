import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import useLogin from '../../hooks/useLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
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
  // const { loginGoogleSubmit, loginMicrosoftSubmit } = useLogin();
  return (
    <Box textAlign='center' mt={3}>
      <Typography variant='body1'>Or Sign In With</Typography>
      <Box mt={3}>
        <Grid container justify='center' spacing={4}>
          <Grid item xs>
            <Button
              className={classes.googleLogin}
              onClick={() => console.log('login')}
            >
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
