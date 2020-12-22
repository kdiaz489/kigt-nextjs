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

const ThrottleSelect = (props) => {
  const classes = useStyles();
  const [throttleVal, setThrottleVal] = useState('');
  const handleChange = (e) => {
    setThrottleVal(e.target.value);
  };
  return (
    <>
      <FormControl size='small' className={classes.formControl}>
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
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={24}>28</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default ThrottleSelect;
