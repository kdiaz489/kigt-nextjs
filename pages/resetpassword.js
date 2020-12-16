import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import useLogin from '../hooks/useLogin';
import { useRouter } from 'next/router';
import PasswordResetForm from '../components/PasswordResetForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4, 2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    backgroundImage: `url('img/Charger_Close.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

const Copyright = () => {
  const classes = useStyles();
  return (
    <Typography variant='body2' color='secondary' align='center'>
      {'Copyright © '}
      KIGT {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const PasswordReset = (props) => {
  const classes = useStyles();
  const router = useRouter();
  // const { isAuthenticated } = useLogin();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push('/dashboard');
  //   }
  // }, [isAuthenticated]);

  return (
    <div>
      <Grid container component='main' className={classes.root}>
        <Grid item xs={12} sm={8} md={5} component={Paper} square>
          <div className={classes.paper}>
            <PasswordResetForm />
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
    </div>
  );
};

export default PasswordReset;
