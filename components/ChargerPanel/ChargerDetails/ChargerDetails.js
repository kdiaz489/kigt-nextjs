import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import ErrorIcon from '@material-ui/icons/Error';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import PowerOffIcon from '@material-ui/icons/PowerOff';
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '12px',
    height: theme.spacing(25),
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  status: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  redStatus: {
    color: '#dc2a2a',
    fontSize: '55px',
  },
  yellowStatus: {
    color: '#E6CF01',
    fontSize: '55px',
  },
  greenStatus: {
    color: '#02b42a',
    fontSize: '55px',
  },
  blueStatus: {
    color: '#3498DB',
    fontSize: '55px',
  },
  purpleStatus: {
    color: '#9b59b6',
    fontSize: '55px',
  },
  greyStatus: {
    color: theme.palette.secondary.light,
    fontSize: '55px',
  },
}));

const ChargerDetails = ({ currentCharger }) => {
  const classes = useStyles();

  // enum for conditional rendering
  const CHARGER_STATES = {
    0: (
      <Box className={classes.status}>
        <div>
          <HelpIcon fontSize='large' className={classes.greyStatus} />
        </div>
        <Typography align='center' variant='h5'>
          Unknown State
        </Typography>
        <Typography align='center' variant='body2'>
          Code: Unknown
        </Typography>
      </Box>
    ),
    1: (
      <Box className={classes.status}>
        <div>
          <CheckCircleIcon fontSize='large' className={classes.greenStatus} />
        </div>
        <Typography align='center' variant='h5'>
          Not Connected
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 1
        </Typography>
      </Box>
    ),
    2: (
      <Box className={classes.status}>
        <div>
          <WarningIcon fontSize='large' className={classes.yellowStatus} />
        </div>
        <Typography align='center' variant='h5'>
          Ready to Charge
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 2
        </Typography>
      </Box>
    ),
    3: (
      <Box className={classes.status}>
        <div>
          <BatteryChargingFullIcon
            fontSize='large'
            className={classes.blueStatus}
          />
        </div>
        <Typography align='center' variant='h5'>
          Charging
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 3
        </Typography>
      </Box>
    ),
    4: (
      <Box className={classes.status}>
        <div>
          <ErrorIcon fontSize='large' className={classes.redStatus} />
        </div>
        <Typography align='center' variant='h5'>
          Vent Required
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 4
        </Typography>
      </Box>
    ),
    5: (
      <Box className={classes.status}>
        <div>
          <ErrorIcon fontSize='large' className={classes.redStatus} />
        </div>
        <Typography align='center' variant='h5'>
          Diode Check Failed
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 5
        </Typography>
      </Box>
    ),
    6: (
      <Box className={classes.status}>
        <div>
          <ErrorIcon fontSize='large' className={classes.redStatus} />
        </div>
        <Typography align='center' variant='h5'>
          GFCI Fault
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 6
        </Typography>
      </Box>
    ),
    7: (
      <Box className={classes.status}>
        <div>
          <ErrorIcon fontSize='large' className={classes.redStatus} />
        </div>
        <Typography align='center' variant='h5'>
          Bad Ground
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 7
        </Typography>
      </Box>
    ),
    8: (
      <Box className={classes.status}>
        <div>
          <ErrorIcon fontSize='large' className={classes.redStatus} />
        </div>
        <Typography align='center' variant='h5'>
          Stuck Relay
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 8
        </Typography>
      </Box>
    ),
    9: (
      <Box className={classes.status}>
        <div>
          <ErrorIcon fontSize='large' className={classes.redStatus} />
        </div>
        <Typography align='center' variant='h5'>
          Failed GFCI Self-Test
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 9
        </Typography>
      </Box>
    ),
    10: (
      <Box className={classes.status}>
        <div>
          <ErrorIcon fontSize='large' className={classes.redStatus} />
        </div>
        <Typography align='center' variant='h5'>
          Over Temperature
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 10
        </Typography>
      </Box>
    ),
    254: (
      <Box className={classes.status}>
        <div>
          <PowerOffIcon fontSize='large' className={classes.yellowStatus} />
        </div>
        <Typography align='center' variant='h5'>
          Sleeping
        </Typography>
        <Typography align='center' variant='body2'>
          Code: 254
        </Typography>
      </Box>
    ),
    255: (
      <Box className={classes.status}>
        <div>
          <CheckCircleIcon fontSize='large' className={classes.purpleStatus} />
        </div>
        <div>
          <Typography align='center' variant='h5'>
            Disabled
          </Typography>
          <Typography align='center' variant='body2'>
            Code: 255
          </Typography>
        </div>
      </Box>
    ),
  };

  return (
    <>
      <Typography variant='h5' gutterBottom>
        ID: {currentCharger['chargerId']}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography align='center' variant='body1' gutterBottom>
              Health Status
            </Typography>
            <Box display='flex' justifyContent='center'>
              {CHARGER_STATES[currentCharger.charger['EVSE Status Code']] ? (
                CHARGER_STATES[currentCharger.charger['EVSE Status Code']]
              ) : (
                <Box className={classes.status}>
                  <div>
                    <HelpIcon fontSize='large' className={classes.greyStatus} />
                  </div>
                  <Typography align='center' variant='h5'>
                    Unknown State
                  </Typography>
                  <Typography align='center' variant='body2'>
                    Code: Unknown
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography align='center' variant='body1' gutterBottom>
              Payment Status
            </Typography>
            <Typography align='center' variant='h5' gutterBottom>
              {currentCharger.charger['EVSE Payment State'] === true
                ? 'True'
                : 'False'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography align='center' variant='body1' gutterBottom>
              Kiosk Interaction Monitor
            </Typography>
            <Typography align='center' variant='h5' gutterBottom>
              {currentCharger.charger['EVSE App Screen']}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ChargerDetails;
