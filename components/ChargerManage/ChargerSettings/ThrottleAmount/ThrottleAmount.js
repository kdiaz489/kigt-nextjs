import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { number } from 'yup';
import { MenuItem } from '@material-ui/core';
import { useNotification } from '../../../../context/notification';
import { useFetchedCharger } from '../../../../context/chargers';
import SettingField from '../../../common/SettingField';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
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

const ThrottleAmount = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { charger } = useFetchedCharger(id);
  const { enqueueSnackbar } = useNotification();
  const currentCharger = charger.charger ? charger.charger : charger;
  const throttleAmount = currentCharger['SERVER Set Current Max']
    ? currentCharger['SERVER Set Current Max']
    : 0;
  // const disableEdit = Object.keys(currentCharger).length === 0;
  const disableEdit = charger.charger ? false : true;

  const initialValues = {
    'SERVER Set Current Max': throttleAmount,
  };
  console.log(initialValues);

  const validationSchema = {
    'SERVER Set Current Max': number('Must be a valid value')
      .oneOf([6, 12, 18, 24, 28])
      .required('Required'),
  };
  const onSubmit = async (values, formikHelpers) => {
    try {
      let res = await axios.put(`/chargers/updateCharger/${id}`, values);
      enqueueSnackbar('Successfully throttled charger.', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Error trying to throttle charger. Please try again.', {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <SettingField
        title='Throttle'
        initialValues={initialValues}
        name='SERVER Set Current Max'
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        disableEdit={disableEdit}
        isSelect={true}
        renderAs={TextFieldCustom}>
        <MenuItem value={0}>None</MenuItem>
        <MenuItem value={6}>6A</MenuItem>
        <MenuItem value={12}>12A</MenuItem>
        <MenuItem value={18}>18A</MenuItem>
        <MenuItem value={24}>24A</MenuItem>
        <MenuItem value={28}>28A</MenuItem>
      </SettingField>
    </>
  );
};

export default ThrottleAmount;
