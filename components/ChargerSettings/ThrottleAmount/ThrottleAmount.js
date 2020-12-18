import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ThrottleSelect from '../../ThrottleSelect';

const useStyles = makeStyles((theme) => ({
  disabledUnderline: {
    '&&&:before': {
      borderBottom: 'none',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const ThrottleAmount = ({ transAmount }) => {
  const classes = useStyles();
  return (
    <>
      <Box
        border={1}
        style={{ padding: '5px' }}
        borderColor='grey.400'
        borderRadius='borderRadius'
      >
        <Grid container spacing={2}>
          <Grid container item xs={4} alignItems='center' justify='center'>
            <Typography variant='body1'>Throttle</Typography>
          </Grid>
          <Grid container item xs={4} alignItems='center' justify='center'>
            <ThrottleSelect />
          </Grid>
          <Grid
            container
            item
            xs={4}
            className={classes.gridItemSize}
            alignItems='center'
            justify='center'
          >
            <Button color='primary' size='small'>
              Edit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ThrottleAmount;
