import { useState } from 'react';
import NavWrapper from '../components/NavWrapper';
import { parseCookies } from 'nookies';
import ChargerTable from '../components/ChargerTable';
import useSWR from 'swr';
import ChargerPanel from '../components/ChargerPanel';
import AddCharger from '../components/AddCharger';
import ChargerTableSkeleton from '../components/ChargerTableSkeleton';
import DashboardHeader from '../components/DashboardHeader';
import AddChargerDialog from '../components/AddChargerDialog';
import Grid from '@material-ui/core/Grid';
const Dashboard = () => {
  const [currentCharger, setCurrentCharger] = useState(null);
  let { token: authToken } = parseCookies();
  const { data } = useSWR(['/chargers', `Bearer ${authToken} `]);

  if (!data) {
    return <ChargerTableSkeleton />;
  }
  if (data.chargers.length) {
    return (
      <>
        <Grid container spacing={3}>
          <Grid xs={8} item>
            <DashboardHeader
              setCurrentCharger={setCurrentCharger}
              currentCharger={currentCharger}
            />
          </Grid>
          <Grid justify='flex-end' xs={4} container item>
            <AddChargerDialog />
          </Grid>
        </Grid>

        {currentCharger ? (
          <ChargerPanel
            setCurrentCharger={setCurrentCharger}
            currentCharger={currentCharger}
          />
        ) : (
          <>
            <ChargerTable
              setCurrentCharger={setCurrentCharger}
              data={data.chargers}
            />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <DashboardHeader
        setCurrentCharger={setCurrentCharger}
        currentCharger={currentCharger}
      />

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
