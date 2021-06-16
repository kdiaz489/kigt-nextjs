import Grid from '@material-ui/core/Grid';
import TransAmount from './TransAmount';
import ThrottleAmount from './ThrottleAmount';
import MyCard from '../../common/MyCard';
import TroubleShootForm from '@/components/TroubleShootForm/TroubleShootForm';
import CurrentToggle from './CurrentToggle';
import TemperatureToggle from './TemperatureToggle';

const ChargerSettings = (props) => {
  const currentInitial = {};
  const tempInitial = {};
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MyCard title={`Terminal Settings`} type='text' align='center'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TransAmount />
            </Grid>
            <Grid item xs={12}>
              <ThrottleAmount />
            </Grid>
          </Grid>
        </MyCard>
      </Grid>

      <Grid item xs={12}>
        <MyCard title={`Data Logging`} type='text' align='center'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CurrentToggle />
            </Grid>
            <Grid item xs={12}>
              <TemperatureToggle />
            </Grid>
          </Grid>
        </MyCard>
      </Grid>

      <Grid item xs={12}>
        <TroubleShootForm />
      </Grid>
    </Grid>
  );
};

export default ChargerSettings;
