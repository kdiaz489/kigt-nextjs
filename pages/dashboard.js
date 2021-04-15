import NavWrapper from '../components/NavWrapper';
import { parseCookies } from 'nookies';
import ChargerTable from '../components/ChargerTable';
import useSWR from 'swr';
import ChargerPanel from '../components/ChargerPanel';
import AddCharger from '../components/AddCharger';
import ChargerTableSkeleton from '../components/ChargerTableSkeleton';
import DashboardHeader from '../components/DashboardHeader';
import AddChargerDialog from '../components/AddCharger/AddChargerDialog';
import Grid from '@material-ui/core/Grid';
import { useChargers } from '../context/chargers';

const Dashboard = () => {
  let { token: authToken } = parseCookies();
  const { data } = useSWR(['/chargers', `Bearer ${authToken} `]);

  const { currentCharger } = useChargers();

  console.log(data);
  if (!data) {
    return (
      <>
        <ChargerTableSkeleton />
      </>
    );
  }
  if (data.chargers.length) {
    return (
      <>
        <Grid container spacing={3}>
          <Grid xs={8} item>
            <DashboardHeader />
          </Grid>
          <Grid justify='flex-end' xs={4} container item>
            <AddChargerDialog />
          </Grid>
        </Grid>

        {currentCharger ? (
          <ChargerPanel />
        ) : (
          <>
            <ChargerTable data={data.chargers} />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <DashboardHeader />
      <AddCharger />
    </>
  );
};
const DashboardPage = () => (
  <NavWrapper>
    <Dashboard />
  </NavWrapper>
);
export default DashboardPage;
