import React, { useEffect, useState } from 'react';
import NavWrapper from '../components/NavWrapper';
import { makeStyles, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import nookies from 'nookies';
import { firebaseAdmin } from '../firebaseAdmin';
import axios from 'axios';
import ChargerTable from '../components/ChargerTable';
import useSWR from 'swr';
import ChargerPanel from '../components/ChargerPanel';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from '../context/auth';
const drawerWidth = 240;
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
  button: {
    color: theme.palette.secondary.light,
  },
}));
const Dashboard = ({ chargers }) => {
  const classes = useStyles();
  const [currentCharger, setCurrentCharger] = useState(null);
  const { user } = useAuth();
  console.log('Inside client');
  const { data } = useSWR('/chargers', {
    initialData: chargers || [],
  });

  return (
    <>
      <NavWrapper user={user}>
        {!!currentCharger && (
          <Button
            classes={{ root: classes.button }}
            startIcon={<ArrowBackIcon />}
            onClick={() => setCurrentCharger(null)}
          >
            Back
          </Button>
        )}
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
            data={data.data}
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
    console.log('Inside server props');
    const chargers = await axios.get('/chargers');
    return { props: { uid, email, chargers: chargers.data } };
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

export default Dashboard;
