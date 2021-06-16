import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Formik, Field, Form } from 'formik';
import { object } from 'yup';
import { firebaseClient } from 'firebaseClient';
import { useAuth } from '../../context/auth';

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

const ApiKeyField = ({ children, name, title, onSubmit, initialValues }) => {
  const classes = useStyles();

  return (
    <>
      <Box border={1} p={1.5} borderColor='grey.400' borderRadius={9}>
        <Grid container spacing={2}>
          <Grid container item xs={4} alignItems='center' justify='center'>
            <Typography variant='body1' align='center'>
              {title}
            </Typography>
          </Grid>
          <Grid container item xs={4} alignItems='center' justify='center'>
            {initialValues.apiKey}
          </Grid>
          <Grid
            container
            item
            xs={4}
            className={classes.gridItemSize}
            alignItems='center'
            justify='center'>
            <Button color='primary' size='small' onClick={onSubmit}>
              Issue API Key
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ApiKeyField;
