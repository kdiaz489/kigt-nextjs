import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RegisterForm from '../components/RegisterForm';
import { useRouter } from 'next/router';

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
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
}));

const Register = (props) => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const classes = useStyles();
  const router = useRouter();

  return (
    <div>
      <Grid container component='main' className={classes.root}>
        <Grid item xs={12} sm={8} md={5} component={Paper} square>
          <div className={classes.paper}>
            <RegisterForm />
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
    </div>
  );
};

export default Register;
