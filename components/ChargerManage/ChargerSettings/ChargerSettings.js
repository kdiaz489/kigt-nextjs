import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TransAmount from './TransAmount';
import ThrottleAmount from './ThrottleAmount';
import { useChargers } from '../../../context/chargers';
import MyCard from '../../common/MyCard';

const ChargerSettings = (props) => {
  const { currentCharger } = useChargers();
  const { kioskId } = currentCharger;
  return (
    <MyCard title={`Settings`} type='text' align='center'>
      <Grid container spacing={3}>
        <Typography variant='h5' gutterBottom></Typography>

        <Grid item xs={12}>
          <TransAmount />
        </Grid>
        <Grid item xs={12}>
          <ThrottleAmount />
        </Grid>
      </Grid>
    </MyCard>
  );
};

export default ChargerSettings;
