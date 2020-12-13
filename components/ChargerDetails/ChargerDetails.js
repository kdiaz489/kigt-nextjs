import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '12px',
  },
}));
const ChargerDetails = ({ currentCharger }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h5'>ID: {currentCharger['id']}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography>Health Status</Typography>
            {currentCharger['EVSE Status Code']}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography>Payment</Typography>
            {currentCharger['EVSE Payment State'] === true ? 'True' : 'False'}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography>App Screen</Typography>
            {currentCharger['EVSE App Screen']}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ChargerDetails;
