import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SettingField from '@/components/common/SettingField';
import { string, email } from 'yup';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import MyCard from '@/components/common/MyCard';
import { useAuth } from '../../context/auth';
import { useNotification } from 'context/notification';
import ApiKeyField from '@/components/common/ApiKeyField';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2rem',
    width: '40rem',
    height: 'auto',
  },
  disabledUnderline: {
    '&&&:before': {
      borderBottom: 'none',
    },
  },
  textField: {
    textAlign: 'center',
  },
}));

const TextFieldCustom = (props) => {
  const classes = useStyles();
  return (
    <TextField
      InputProps={{
        classes: {
          disabled: classes.disabledUnderline,
          input: classes.textField,
        },
      }}
      {...props}
    />
  );
};

const AccountSettings = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useNotification();
  const disableEditEmail = user ? false : true;
  const disableEditName = user ? false : true;

  const onSubmit = async (values, formikHelpers) => {
    try {
      let res = await axios.put(`/auth/updateAccount`, values, {
        headers: { authorization: `Bearer ${user.token}` },
      });

      enqueueSnackbar('Account successfully updated.', {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        'Error trying to update your account. Please try again.',
        {
          variant: 'error',
        }
      );
    }
  };

  const genApiKey = async () => {
    try {
      let res = await axios.put(
        `/auth/genApiKey`,
        {},
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );

      enqueueSnackbar('API Key successfully generated.', {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        'Error trying to update your account. Please try again.',
        {
          variant: 'error',
        }
      );
    }
  };
  return (
    <>
      <MyCard title='Account Settings' align='center'>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <SettingField
              name={'displayName'}
              title={'Name'}
              validationSchema={{
                displayName: string().required('Required'),
              }}
              initialValues={{ displayName: user?.displayName ?? 'None' }}
              onSubmit={onSubmit}
              disableEdit={disableEditName}
              renderAs={TextFieldCustom}
            />
          </Grid>
          <Grid item xs={12}>
            <SettingField
              title='Email'
              initialValues={{ email: user?.email ?? 'None' }}
              name='email'
              validationSchema={{
                email: string()
                  .email('Valid email required')
                  .required('Required'),
              }}
              onSubmit={onSubmit}
              disableEdit={disableEditEmail}
              renderAs={TextFieldCustom}
            />
          </Grid>
        </Grid>
      </MyCard>

      <MyCard title='API Keys' align='center' style={{ marginTop: '20px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ApiKeyField
              title='API Key'
              name='genApiKey'
              onSubmit={genApiKey}
              disableEdit={disableEditEmail}
              renderAs={TextFieldCustom}
            />
          </Grid>
        </Grid>
      </MyCard>
    </>
  );
};

export default AccountSettings;
