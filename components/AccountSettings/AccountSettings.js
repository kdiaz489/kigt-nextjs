import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SettingField from './SettingField';
import { string, email } from 'yup';
import { useAuth } from '../../context/auth';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2rem',
    width: '40rem',
    height: 'auto',
  },
}));

const AccountSettings = () => {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <Box display='flex' justifyContent='center'>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Typography variant='h5' gutterBottom>
            General Account Settings
          </Typography>
          <Grid item xs={12}>
            <SettingField
              name={'displayName'}
              title={'Name'}
              validationSchema={{
                displayName: string().required('Required'),
              }}
              initialValues={{ displayName: user?.displayName ?? 'None' }}
            />
          </Grid>
          <Grid item xs={12}>
            <SettingField
              name={'email'}
              title={'Email'}
              validationSchema={{
                email: string()
                  .email('Valid email required')
                  .required('Required'),
              }}
              initialValues={{ email: user?.email ?? 'None' }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AccountSettings;
