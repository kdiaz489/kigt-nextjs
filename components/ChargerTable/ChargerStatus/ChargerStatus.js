import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  redStatus: {
    backgroundColor: '#dc2a2a',
    color: 'white',
  },
  yellowStatus: {
    backgroundColor: '#E6CF01',
    color: 'white',
  },
  greenStatus: {
    backgroundColor: '#02b42a',
    color: 'white',
  },
  blueStatus: {
    backgroundColor: '#3498DB',
    color: 'white',
  },
  purpleStatus: {
    backgroundColor: '#9b59b6',
    color: 'white',
  },
  greyStatus: {
    backgroundColor: theme.palette.secondary.light,
    color: 'white',
  },
}));

const ChargerStatus = ({ currentCharger }) => {
  const classes = useStyles();

  const CHARGER_STATES = {
    0: <Chip label='Unknown' className={classes.greyStatus} />,
    1: <Chip label='Not Connected' className={classes.greenStatus} />,
    2: <Chip label='Ready to Charge' className={classes.yellowStatus} />,
    3: <Chip label='Charging' className={classes.blueStatus} />,
    4: <Chip label='Vent Required' className={classes.redStatus} />,
    5: <Chip label='Diode Check Failed' className={classes.redStatus} />,
    6: <Chip label='GFCI Fault' className={classes.redStatus} />,
    7: <Chip label='Bad Ground' className={classes.redStatus} />,
    8: <Chip label='Stuck Relay' className={classes.redStatus} />,
    9: <Chip label='Failed GFCI Self-Test' className={classes.redStatus} />,
    10: <Chip label='Over Temperature' className={classes.redStatus} />,
    254: <Chip label='Sleeping' className={classes.yellowStatus} />,
    255: <Chip label='Standby' className={classes.purpleStatus} />,
  };
  return (
    <>
      {CHARGER_STATES[currentCharger['EVSE Status Code']] ?? CHARGER_STATES[0]}
    </>
  );
};

export default ChargerStatus;
