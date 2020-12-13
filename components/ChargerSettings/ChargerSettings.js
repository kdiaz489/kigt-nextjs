import {
  Box,
  Paper,
  Typography,
  makeStyles,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2rem',
    width: '100%',
    height: 'auto',
  },
  submitButton: {
    color: 'white',
  },
  editButton: {
    alignSelf: 'flex-end',
  },
}));

const ChargerSettings = ({ currentCharger }) => {
  const classes = useStyles();
  return (
    <Box display='flex' justifyContent='center'>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h5'>
            Settings for Terminal ID: {currentCharger.id}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin='dense'
            disabled
            label='Transaction Amount'
            defaultValue={currentCharger['SERVER Set Transaction Amount']}
            fullWidth
          />
        </Grid>
        <Grid container item xs={12} sm={6} justify='flex-end'>
          <Button color='primary' className={classes.editButton}>
            Edit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChargerSettings;
