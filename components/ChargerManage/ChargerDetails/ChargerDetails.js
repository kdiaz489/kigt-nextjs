import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
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
import CurrentGraph from './CurrentGraph';
import TemperatureGraph from './TemperatureGraph';
import PaymentGraph from './PaymentGraph';
import Divider from '@material-ui/core/Divider';
import { useRouter } from 'next/router';
import { useFetchedCharger } from '../../../context/chargers';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TroubleShootDialog from '../TroubleShootDialog';
import TroubleShootForm from '@/components/TroubleShootForm/TroubleShootForm';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    width: 'auto',
    borderRadius: '16px',
  },

  cardContent: {
    minHeight: theme.spacing(15),
    display: 'flex',
    alignItems: 'center',
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

const ChargerDetails = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { charger } = useFetchedCharger(id);
  const currentCharger = charger.charger ? charger.charger : charger;

  // enum for conditional rendering
  const CHARGER_STATES = {
    0: (
      <Box className={classes.status}>
        <HelpIcon fontSize='large' className={classes.greyStatus} />
        <Typography align='center' variant='h5'>
          Unknown Stateee
        </Typography>
        <Typography align='center' variant='body2'>
          Code: Unknown
        </Typography>
      </Box>
    ),
    1: (
      <Box className={classes.status}>
        <CheckCircleIcon fontSize='large' className={classes.greenStatus} />
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
        <WarningIcon fontSize='large' className={classes.yellowStatus} />
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
        <BatteryChargingFullIcon
          fontSize='large'
          className={classes.blueStatus}
        />
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
        <ErrorIcon fontSize='large' className={classes.redStatus} />
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
        <ErrorIcon fontSize='large' className={classes.redStatus} />
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
        <ErrorIcon fontSize='large' className={classes.redStatus} />
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
        <ErrorIcon fontSize='large' className={classes.redStatus} />
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
        <ErrorIcon fontSize='large' className={classes.redStatus} />
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
        <ErrorIcon fontSize='large' className={classes.redStatus} />
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
        <ErrorIcon fontSize='large' className={classes.redStatus} />
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
        <PowerOffIcon fontSize='large' className={classes.yellowStatus} />
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
        <CheckCircleIcon fontSize='large' className={classes.purpleStatus} />
        <div>
          <Typography align='center' variant='h5'>
            Standby
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
      <Grid container spacing={3}>
        <Grid container item>
          <Grid item xs={6}>
            <Typography variant='h5' gutterBottom component='span'>
              ID: {id}
            </Typography>
          </Grid>
          <Grid container item xs={6} justify='flex-end'>
            <TroubleShootDialog />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.card} variant='outlined'>
            <CardHeader title='Health Status' align='center' variant='body1' />
            <Divider />
            <CardContent>
              <div className={classes.cardContent}>
                {currentCharger['EVSE Status Code'] ? (
                  CHARGER_STATES[currentCharger['EVSE Status Code']]
                ) : (
                  <Box className={classes.status}>
                    <HelpIcon fontSize='large' className={classes.greyStatus} />
                    <Typography align='center' variant='h5'>
                      Unknown State
                    </Typography>
                    <Typography align='center' variant='body2'>
                      Code: Unknown
                    </Typography>
                  </Box>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.card} variant='outlined'>
            <CardHeader title='Payment Status' align='center' variant='body1' />
            <Divider />
            <CardContent>
              <div className={classes.cardContent}>
                <Typography align='center' variant='h5' gutterBottom>
                  {currentCharger['EVSE Payment State'] === true
                    ? 'True'
                    : 'False'}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.card} variant='outlined'>
            <CardHeader title='Kiosk Monitor' align='center' variant='body1' />
            <Divider />
            <CardContent>
              <div className={classes.cardContent}>
                <Typography align='center' variant='h5' gutterBottom>
                  {currentCharger['EVSE App Screen']
                    ? currentCharger['EVSE App Screen']
                    : 'No data available.'}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        {/* Start of Current Graph */}
        <Grid item xs={12} md={6}>
          <CurrentGraph />
        </Grid>
        {/* Start of Temperature Graph */}
        <Grid item xs={12} md={6}>
          <TemperatureGraph />
        </Grid>
        {/* Start of Payment Status Graph */}
        <Grid item xs={12}>
          <PaymentGraph />
        </Grid>
        {/* Start of Payment Status Graph */}
        <Grid item xs={12}>
          <TroubleShootForm />
        </Grid>
      </Grid>
    </>
  );
};

export default ChargerDetails;
