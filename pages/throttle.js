import React from 'react';
import { Grid, Button, Typography, makeStyles } from '@material-ui/core';
import NavWrapper from '../components/NavWrapper';
import ThrottleGraph from '../components/ThrottleGraph';
import ThrottleSelect from '../components/ThrottleSelect';

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'white',
  },
  normalFont: {
    fontWeight: '400',
  },
}));

const throttle = () => {
  const classes = useStyles();
  return (
    <NavWrapper>
      <Grid container spacing={3}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant='h4'
              gutterBottom
              className={classes.normalFont}
            >
              Throttle Charger
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <ThrottleSelect />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Throttle
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <ThrottleGraph />
        </Grid>
      </Grid>
    </NavWrapper>
  );
};

export default throttle;
