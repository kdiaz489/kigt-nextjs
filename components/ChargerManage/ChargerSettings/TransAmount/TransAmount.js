import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { number } from 'yup';
import NumberFormat from 'react-number-format';
import { useRouter } from 'next/router';
import { useNotification } from '../../../../context/notification';
import { useFetchedCharger } from '../../../../context/chargers';
import SettingField from '../../../common/SettingField';

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

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, InputProps, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalScale={2}
      fixedDecimalScale={true}
      thousandSeparator={true}
      prefix={'$'}
    />
  );
};
const TextFieldCustom = (props) => {
  const classes = useStyles();
  return (
    <TextField
      InputProps={{
        classes: {
          disabled: classes.disabledUnderline,
          input: classes.textField,
        },
        inputComponent: NumberFormatCustom,
      }}
      {...props}
    />
  );
};

const TransAmount = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { charger } = useFetchedCharger(id);
  const { enqueueSnackbar } = useNotification();
  const currentCharger = charger.charger ? charger.charger : charger;
  const transAmount = currentCharger['SERVER Set Transaction Amount'];
  // const disableEdit = Object.keys(currentCharger).length === 0;
  const disableEdit = charger.charger ? false : true;

  let initialValues = {
    'SERVER Set Transaction Amount': transAmount ? transAmount / 100 : 0,
  };

  const onSubmit = async (values, formikHelpers) => {
    try {
      let copy = { ...values };
      copy['SERVER Set Transaction Amount'] *= 100;

      let res = await axios.put(`/chargers/updateCharger/${id}`, copy);
      enqueueSnackbar('Successfully updated transaction amount.', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Error updating transaction amount. Please try again.', {
        variant: 'error',
      });
    }
  };

  const validationSchema = {
    'SERVER Set Transaction Amount': number('Must be a valid value').required(
      'Required'
    ),
  };

  return (
    <>
      {
        <SettingField
          title='Transaction Amount'
          initialValues={initialValues}
          name='SERVER Set Transaction Amount'
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          disableEdit={disableEdit}
          renderAs={TextFieldCustom}
        />
      }
    </>
  );
};

export default TransAmount;
