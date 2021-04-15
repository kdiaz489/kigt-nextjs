import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core';
import { useChargers } from '../../context/chargers';
import Grid from '@material-ui/core/Grid';
import AddChargerDialog from '../AddCharger/AddChargerDialog';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.secondary.light,
  },
}));

const DashboardHeader = (props) => {
  const classes = useStyles();
  const { currentCharger, setCurrentCharger } = useChargers();
  return (
    <>
      {!!currentCharger && (
        <Grid container item xs={12} md={6}>
          <Button
            classes={{ root: classes.button }}
            startIcon={<ArrowBackIcon />}
            onClick={() => setCurrentCharger(null)}>
            Back
          </Button>
        </Grid>
      )}
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography variant='h4' gutterBottom>
            Terminal Management
          </Typography>
        </Grid>
        <Grid container item justify='flex-end' xs={12} md={4}>
          <AddChargerDialog />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardHeader;
