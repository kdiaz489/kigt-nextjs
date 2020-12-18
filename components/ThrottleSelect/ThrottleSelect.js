import { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ThrottleSelect = () => {
  const classes = useStyles();
  const [throttleVal, setThrottleVal] = useState('');
  const handleChange = (e) => {
    setThrottleVal(e.target.value);
  };
  return (
    <>
      <FormControl
        variant='outlined'
        size='small'
        className={classes.formControl}
      >
        <InputLabel id='throttle-select'>Throttle Val</InputLabel>
        <Select
          labelId='throttle-select'
          id='throttle-select-outlined'
          value={throttleVal}
          onChange={handleChange}
          label='Throttle Value'
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default ThrottleSelect;
