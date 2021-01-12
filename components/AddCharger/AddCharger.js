import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AddChargerDialog from './AddChargerDialog';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.grey[300],
    padding: '3.4rem',
  },
  title: {
    color: theme.palette.grey[500],
  },
  icon: {
    fontSize: '55px',
    color: theme.palette.grey[500],
  },
}));
const AddCharger = (props) => {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={1} className={classes.paper}>
        <Box display='flex' justifyContent='center'>
          <InfoOutlinedIcon fontSize='large' className={classes.icon} />
        </Box>

        <Typography align='center' className={classes.title} variant='h6'>
          No chargers available
        </Typography>
        <Box display='flex' justifyContent='center'>
          <AddChargerDialog />
        </Box>
      </Paper>
    </>
  );
};

export default AddCharger;
