import { Formik, Field, Form } from 'formik';
import {
  TextField,
  FormGroup,
  Button,
  Paper,
  Typography,
  Box,
  makeStyles,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { object, string } from 'yup';

const initialValues = {
  fullName: '',
  email: '',
  subject: '',
  body: '',
  priority: 'normal',
};

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2rem',
    width: '40rem',
    height: 'auto',
  },
  submitButton: {
    color: 'white',
  },
}));

const TroubleShootForm = () => {
  const classes = useStyles();
  return (
    <Box display='flex' justifyContent='center'>
      <Paper className={classes.paper}>
        <Typography variant='h5'>Submit a Tech Support Ticket</Typography>
        <Typography></Typography>
        <Formik
          validationSchema={object({
            fullName: string().required().min(2).max(100),
            email: string().email().required(),
            subject: string().required(),
            body: string().required(),
            priority: string().required(),
          })}
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                alert('Submitted ticket to Zendesk :)');
                resolve();
              }, 3000);
            });
          }}
        >
          {({ values, errors, touched, isSubmitting, isValidating }) => (
            <Form>
              <Box mb={2}>
                <FormGroup>
                  <Field
                    name='fullName'
                    as={TextField}
                    label='Full Name'
                    error={touched.fullName && Boolean(errors.fullName)}
                  />
                </FormGroup>
              </Box>
              <Box mb={2}>
                <FormGroup>
                  <Field
                    name='email'
                    as={TextField}
                    label='E-mail'
                    error={touched.email && Boolean(errors.email)}
                  />
                </FormGroup>
              </Box>
              <Box mb={2}>
                <FormGroup>
                  <InputLabel>Priority</InputLabel>
                  <Field
                    name='priority'
                    as={TextField}
                    select
                    error={touched.priority && Boolean(errors.priority)}
                  >
                    <MenuItem value={'low'}>Low</MenuItem>
                    <MenuItem value={'normal'}>Normal</MenuItem>
                    <MenuItem value={'high'}>High</MenuItem>
                    <MenuItem value={'urgent'}>Urgent</MenuItem>
                  </Field>
                </FormGroup>
              </Box>
              <Box mb={2}>
                <FormGroup>
                  <Field
                    name='subject'
                    as={TextField}
                    label='Subject'
                    error={touched.subject && Boolean(errors.subject)}
                  />
                </FormGroup>
              </Box>
              <Box mb={2}>
                <FormGroup>
                  <Field
                    name='body'
                    as={TextField}
                    multiline
                    rows={5}
                    rowsMax={10}
                    label='Body'
                    error={touched.body && Boolean(errors.body)}
                  />
                </FormGroup>
              </Box>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
                disabled={isSubmitting || isValidating}
              >
                Submit Ticket
              </Button>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default TroubleShootForm;
