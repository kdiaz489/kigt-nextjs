import NavWrapper from '../components/NavWrapper';
import { parseCookies } from 'nookies';
import ChargerTable from '../components/ChargerTable';
import useSWR from 'swr';
import ChargerManage from '../components/ChargerManage';
import AddCharger from '../components/AddCharger';
import ChargerTableSkeleton from '../components/ChargerTableSkeleton';
import DashboardHeader from '../components/DashboardHeader';
import { useChargers } from '../context/chargers';

const Dashboard = () => {
  let { token: authToken } = parseCookies();
  const { data } = useSWR(['/chargers', `Bearer ${authToken} `]);

  const { currentCharger } = useChargers();

  // If data is undefined
  if (!data) {
    return <ChargerTableSkeleton />;
  }

  // If data is truthy (not 0, null, undefined, etc)
  if (data.chargers.length) {
    return (
      <>
        <DashboardHeader />

        {currentCharger ? (
          <ChargerManage />
        ) : (
          <ChargerTable data={data.chargers} />
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
