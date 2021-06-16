import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Formik, Field, Form } from 'formik';
import { object } from 'yup';
import { useEffect } from 'react';

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

const SettingField = ({
  children,
  name,
  initialValues,
  title,
  validationSchema,
  onSubmit,
  disableEdit,
  renderAs,
  isSelect,
}) => {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit((prevEditThrottle) => !prevEditThrottle);
  };

  const initialVals = initialValues;

  const submitForm = async (values, formikHelpers) => {
    await onSubmit(values, formikHelpers);
    toggleEdit();
  };

  return (
    <>
      <Formik
        initialValues={initialVals}
        validationSchema={object(validationSchema)}
        enableReinitialize={true}
        onSubmit={submitForm}>
        {({ values, errors, touched, isSubmitting, isValidating }) => (
          <Form>
            <Box border={1} p={1.5} borderColor='grey.400' borderRadius={9}>
              <Grid container spacing={2}>
                <Grid
                  container
                  item
                  xs={4}
                  alignItems='center'
                  justify='center'>
                  <Typography variant='body1' align='center'>
                    {title}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  alignItems='center'
                  justify='center'>
                  <Field
                    as={renderAs ? renderAs : TextField}
                    name={name}
                    select={isSelect}
                    margin='dense'
                    size='small'
                    fullWidth
                    disabled={!edit}
                    helperText={Boolean(errors[name]) && errors[name]}
                    error={Boolean(errors[name])}>
                    {children}
                  </Field>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  className={classes.gridItemSize}
                  alignItems='center'
                  justify='center'>
                  {edit ? (
                    <>
                      <Grid item xs={6}>
                        <Button
                          type='submit'
                          color='primary'
                          size='small'
                          disabled={isSubmitting}>
                          Update
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          color='secondary'
                          size='small'
                          onClick={toggleEdit}>
                          Cancel
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <Button
                      disabled={disableEdit || isSubmitting}
                      color='primary'
                      size='small'
                      onClick={toggleEdit}>
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

export default SettingField;
