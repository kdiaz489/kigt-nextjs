import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SettingField from './SettingField';
import { string, email } from 'yup';
import { useAuth } from '../../context/auth';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2rem',
    width: '40rem',
    height: 'auto',
  },
  submitButton: {
    color: 'white',
  },
  editButton: {
    alignSelf: 'flex-end',
  },
}));

const AccountSettings = () => {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <Box display='flex' justifyContent='center'>
      <Paper className={classes.paper}>
        <Typography variant='h5' gutterBottom>
          General Account Settings
        </Typography>
        <Box mb={2}>
          <SettingField
            name={'displayName'}
            title={'Name'}
            validationSchema={{
              displayName: string().required('Required'),
            }}
            initialValues={{ displayName: user?.displayName ?? 'None' }}
          />
        </Box>
        <Box mb={2}>
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
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountSettings;
