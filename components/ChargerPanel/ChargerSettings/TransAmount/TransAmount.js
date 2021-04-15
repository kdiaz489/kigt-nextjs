import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { object, number } from 'yup';
import NumberFormat from 'react-number-format';
import { useNotification } from '../../../../context/notification';
import { useChargers } from '../../../../context/chargers';

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
  const classes = useStyles();
  const [editTrans, setEditTrans] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useNotification();
  const { currentCharger } = useChargers();
  const transAmount = currentCharger.charger['SERVER Set Transaction Amount'];
  const { kioskId } = currentCharger;
  const toggleEdit = (e) => {
    e.preventDefault();
    setEditTrans((prevEditTrans) => !prevEditTrans);
  };

  const initialValues = {
    'SERVER Set Transaction Amount': transAmount / 100,
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          'SERVER Set Transaction Amount': number(
            'Must be a valid value',
          ).required('Required'),
        })}
        onSubmit={async (values, formikHelpers) => {
          try {
            let copy = { ...values };
            copy['SERVER Set Transaction Amount'] *= 100;

            let res = await axios.put(`/chargers/${kioskId}`, copy);
            setEditTrans((prevVal) => !prevVal);
            enqueueSnackbar('Successfully updated transaction amount.', {
              variant: 'success',
            });
          } catch (error) {
            enqueueSnackbar(
              'Error updating transaction amount. Please try again.',
              {
                variant: 'error',
              },
            );
          }
        }}
      >
        {({ values, errors, touched, isSubmitting, isValidating }) => (
          <Form>
            <Box
              border={1}
              style={{ padding: '5px' }}
              borderColor='grey.400'
              borderRadius='borderRadius'
            >
              <Grid container spacing={2}>
                <Grid
                  container
                  item
                  xs={4}
                  alignItems='center'
                  justify='center'
                >
                  <Typography variant='body1' align='center'>
                    Transaction Amount
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  alignItems='center'
                  justify='center'
                >
                  <Field
                    as={TextFieldCustom}
                    name='SERVER Set Transaction Amount'
                    margin='dense'
                    size='small'
                    className={classes.textField}
                    disabled={!editTrans}
                    helperText={
                      touched['SERVER Set Transaction Amount'] &&
                      Boolean(errors['SERVER Set Transaction Amount']) &&
                      errors['SERVER Set Transaction Amount']
                    }
                    error={
                      touched['SERVER Set Transaction Amount'] &&
                      Boolean(errors['SERVER Set Transaction Amount'])
                    }
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  className={classes.gridItemSize}
                  alignItems='center'
                  justify='center'
                >
                  {editTrans ? (
                    <>
                      <Grid item xs={6}>
                        <Button
                          type='submit'
                          color='primary'
                          size='small'
                          disabled={isSubmitting}
                        >
                          Update
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          color='secondary'
                          size='small'
                          onClick={toggleEdit}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <Button
                      disabled={
                        Object.keys(currentCharger.charger).length === 0
                      }
                      color='primary'
                      size='small'
                      onClick={toggleEdit}
                    >
                      Edit
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TransAmount;
