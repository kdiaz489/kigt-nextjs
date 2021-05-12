import Grid from '@material-ui/core/Grid';
import TransAmount from './TransAmount';
import ThrottleAmount from './ThrottleAmount';
import MyCard from '../../common/MyCard';

const ChargerSettings = (props) => {
  return (
    <MyCard title={`Settings`} type='text' align='center'>
      <Grid container spacing={3}>
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
