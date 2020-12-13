import React, { useEffect, useState } from 'react';
// import whyDidYouRender from '@welldone-software/why-did-you-render';

import Chart1 from '../components/Chart1';
import Chart2 from '../components/Chart2';
import NavWrapper from '../components/NavWrapper';
import DetailsTable from '../components/DetailsTable';
import StationSelect from '../components/StationSelect';

import { makeStyles, Grid } from '@material-ui/core';

import ToggleButton from '@material-ui/lab/ToggleButton';
import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ThrottleGraph from '../components/ThrottleGraph';

// import useDashboard from '../hooks/useDashboard';
import Skeleton from '@material-ui/lab/Skeleton';
import Router from 'next/router';
import nookies from 'nookies';
import { firebaseAdmin } from '../firebaseAdmin';
import axios from 'axios';
import ChargerTable from '../components/ChargerTable';
import useSWR from 'swr';
import ChargerPanel from '../components/ChargerPanel';

const drawerWidth = 240;
// whyDidYouRender(React, {
//   onlyLogs: true,
//   trackAllPureComponents: true,
//   titleColor: 'green',
//   diffNameColor: 'darkturquoise',
// });
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  buttonGroup: {
    padding: '0.5rem 0',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const Dashboard = (props) => {
  const classes = useStyles();
  const [currentCharger, setCurrentCharger] = useState(null);
  const { data } = useSWR(
    'http://localhost:5001/kigtinterface/us-central1/api/allChargers',
    {
      initialData: props.chargers,
    },
  );
  console.log(data);

  return (
    <>
      <NavWrapper>
        <Typography variant='h4' gutterBottom className={classes.normalFont}>
          Terminal Management
        </Typography>
        {currentCharger ? (
          <ChargerPanel
            setCurrentCharger={setCurrentCharger}
            currentCharger={currentCharger}
          />
        ) : (
          <ChargerTable
            setCurrentCharger={setCurrentCharger}
            data={props.chargers}
          />
        )}
      </NavWrapper>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    // console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid, email } = token;
    const chargers = await axios.get(
      'http://localhost:5001/kigtinterface/us-central1/api/allChargers',
    );

    return { props: { uid, email, chargers: chargers.data.data } };
  } catch (error) {
    console.log('ERROR = ', error);
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }
};
// Dashboard.whyDidYouRender = true;
export default Dashboard;
