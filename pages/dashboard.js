import NavWrapper from '../components/NavWrapper';
import ChargerTable from '../components/ChargerTable';
import useSWR from 'swr';
import AddCharger from '../components/AddCharger';
import ChargerTableSkeleton from '../components/ChargerTableSkeleton';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/auth';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ['/dashboard/chargers', `Bearer ${user.token} `] : null
  );

  console.log('Data');
  console.log(data);
  // If data is undefined
  if (!data) {
    return <ChargerTableSkeleton />;
  }

  // If data is truthy (not 0, null, undefined, etc)
  if (data.chargers.length) {
    return (
      <>
        <DashboardHeader />
        <ChargerTable data={data.chargers} />
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
