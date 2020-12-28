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
      isNumericString={true}
      thousandSeparator={true}
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

const TransAmount = ({ transAmount, chargerId }) => {
  const classes = useStyles();
  const [editTrans, setEditTrans] = useState(false);

  const toggleEdit = (e) => {
    e.preventDefault();
    setEditTrans((prevEditTrans) => !prevEditTrans);
  };

  const initialValues = {
    'SERVER Set Transaction Amount': transAmount,
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          'SERVER Set Transaction Amount': number().required(),
        })}
        onSubmit={async (values, formikHelpers) => {
          console.log('ON SUBMIT');
          try {
            let res = await axios.put(`/chargers/${chargerId}`, values);
            setEditTrans((prevVal) => !prevVal);
          } catch (error) {
            console.log('Error trying to update transaction amount');
            console.log(error);
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
                    <Button color='primary' size='small' onClick={toggleEdit}>
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
