import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { Formik, Field, Form } from 'formik';
const SettingToggle = ({
  name,
  initialValues,
  title,
  handleChange,
  checked,
  disableEdit,
}) => {
  return (
    <>
      <Formik>
        {({}) => (
          <Form>
            <Box border={1} p={1.5} borderColor='grey.400' borderRadius={9}>
              <Grid container>
                <Grid
                  container
                  item
                  xs={4}
                  alignItems='center'
                  justify='center'>
                  <Typography variant='body1'>{title}</Typography>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid
                  container
                  item
                  xs={4}
                  alignItems='center'
                  justify='center'>
                  <Field
                    as={Switch}
                    color='primary'
                    name={name}
                    onChange={handleChange}
                    checked={checked}
                  />
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
      {/* <Box border={1} p={1.5} borderColor='grey.400' borderRadius={9}>
        <Grid container>
          <Grid container item xs={4} alignItems='center' justify='center'>
            <Typography variant='body1'>Toggle</Typography>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid container item xs={4} alignItems='center' justify='center'>
            <Switch
              checked={state.checkedB}
              color='primary'
              onChange={handleChange}
              name='checkedA'
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
};

export default SettingToggle;
