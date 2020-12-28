import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.secondary.light,
  },
}));

const DashboardHeader = ({ currentCharger, setCurrentCharger }) => {
  const classes = useStyles();
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
