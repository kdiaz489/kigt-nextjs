import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TransAmount from './TransAmount';
import ThrottleAmount from './ThrottleAmount';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2rem',
    width: '100%',
    height: 'auto',
  },
  submitButton: {
    color: 'white',
  },
  editButton: {
    alignSelf: 'flex-end',
  },
}));

const ChargerSettings = ({ currentCharger }) => {
  const classes = useStyles();
  return (
    <Box display='flex' justifyContent='center'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            Settings for Terminal ID: {currentCharger.id}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TransAmount
            chargerId={currentCharger.id}
            transAmount={currentCharger['SERVER Set Transaction Amount']}
          />
        </Grid>
        <Grid item xs={12}>
          <ThrottleAmount
            chargerId={currentCharger.id}
            throttleAmount={currentCharger['SERVER Set Current Max']}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChargerSettings;
