import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '30px',
    margin: '20px 0',
    setOverflow: 'auto',
  },
}));

const Chart1 = ({ data, xaxis }) => {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  const dataSet = {
    labels: data.map((val) => {
      let value = val[xaxis];
      let time = new Date(value._seconds * 1000).toLocaleDateString('en-US');
      return time;
    }),
    datasets: [
      {
        label: 'Allocated',
        data: data.map((val) => val.allocated),
        fill: false,
        borderColor: '#4bc0c0',
        backgroundColor: '#4bc0c0',
      },
      {
        label: 'Available',
        data: data.map((val) => val.available),
        fill: false,
        borderColor: '#4bc04b',
        backgroundColor: '#4bc04b',
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Energy State of All Chargers Associated',
      fontSize: 20,
      fontStyle: 'normal',
    },
    legend: {
      display: true,
      position: 'right',
    },
  };
  const { dash } = useSelector((state) => {
    return {
      dash: state.dash,
    };
  });

  const { isLoading } = dash;

  const classes = useStyles();
  return (
    <>
      {!isLoading ? (
        <Paper classes={{ root: classes.root }} elevation={2}>
          <Line data={dataSet} options={options} />
        </Paper>
      ) : (
        <Paper classes={{ root: classes.root }} elevation={2}>
          <Skeleton animation='wave' width={'100%'} />
          <Skeleton animation='wave' width={'100%'} />
          <Skeleton animation='wave' width={'100%'} />
        </Paper>
      )}
    </>
  );
};

export default Chart1;
