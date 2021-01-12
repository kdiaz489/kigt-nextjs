import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core';
import { useChargers } from '../../context/chargers';

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
        <Button
          classes={{ root: classes.button }}
          startIcon={<ArrowBackIcon />}
          onClick={() => setCurrentCharger(null)}
        >
          Back
        </Button>
      )}
      <Typography variant='h4' gutterBottom>
        Terminal Management
      </Typography>
    </>
  );
};

export default DashboardHeader;
