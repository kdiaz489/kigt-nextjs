import React from 'react';
import { Line } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px',
    margin: '20px 0',
    width: 'auto',
    setOverflow: 'auto',
  },
}));

const Chart2 = ({ data, xaxis, stationSelected }) => {
  const dataSet = {
    labels: data.map((val) => val[xaxis]),
    datasets: [
      {
        label: 'EVSE Current',
        data: data.map((val) => val['EVSE Max Current']),
        fill: false,
        borderColor: '#4bc0c0',
        backgroundColor: '#4bc0c0',
      },
      {
        label: 'SERVER Set Current Max',
        data: data.map((val) => val['SERVER Set Current Max']),
        fill: false,
        borderColor: '#4bc04b',
        backgroundColor: '#4bc04b',
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: `Station: ${stationSelected}`,
      fontSize: 20,
      fontStyle: 'normal',
    },
    legend: {
      display: true,
      position: 'right',
    },
  };

  const classes = useStyles();
  return (
    <Paper classes={{ root: classes.root }} elevation={2}>
      <Line data={dataSet} options={options} />
    </Paper>
  );
};

export default Chart2;
