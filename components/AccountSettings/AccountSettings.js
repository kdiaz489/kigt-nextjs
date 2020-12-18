import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2rem',
    width: '40rem',
    height: 'auto',
  },
  submitButton: {
    color: 'white',
  },
  editButton: {
    alignSelf: 'flex-end',
  },
}));

const AccountSettings = () => {
  const classes = useStyles();
  return (
    <Box display='flex' justifyContent='center'>
      <Paper className={classes.paper}>
        <Typography variant='h5'>General Account Settings</Typography>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
              margin='dense'
              disabled
              label='Name'
              defaultValue='Test User'
              fullWidth
            />
          </Grid>
          <Grid container item xs={12} sm={6} justify='flex-end'>
            <Button color='primary' className={classes.editButton}>
              Edit
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin='dense'
              disabled
              label='E-mail'
              defaultValue='test@gamil.com'
              fullWidth
            />
          </Grid>
          <Grid container item xs={12} sm={6} justify='flex-end'>
            <Button color='primary' className={classes.editButton}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AccountSettings;
