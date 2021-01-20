import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TransAmount from './TransAmount';
import ThrottleAmount from './ThrottleAmount';
import { useChargers } from '../../../context/chargers';

const ChargerSettings = (props) => {
  const { currentCharger } = useChargers();
  const { kioskId } = currentCharger;
  return (
    <Box display='flex' justifyContent='center'>
      <Grid container spacing={3}>
        <Typography variant='h5' gutterBottom>
          Settings for Terminal ID: {kioskId}
        </Typography>

        <Grid item xs={12}>
          <TransAmount />
        </Grid>
        <Grid item xs={12}>
          <ThrottleAmount />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChargerSettings;
