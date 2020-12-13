import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
// import { createDashSelectors } from '../../redux/dash/dashSlice';

const StationSelect = ({ onChange, station, setStation, ...props }) => {
  const selectors = createDashSelectors();
  const { isLoading } = useSelector((state) => state.dash);

  const selector = (state) => {
    return {
      ids: selectors.selectIds(state),
      entities: selectors.selectEntities(state),
    };
  };
  const { ids } = useSelector(selector);

  const onStationChange = (e, newId) => {
    onChange(newId);
  };
  const options = ids
    ? [
        null,
        ...ids.slice().sort((a, b) => {
          return a.localeCompare(b, undefined, {
            numeric: true,
            sensitivity: 'base',
          });
        }),
      ]
    : [];

  return (
    <>
      {!isLoading && ids !== undefined && (
        <Autocomplete
          options={options || []}
          getOptionLabel={(option) => (option ? `${option}` : 'None')}
          id='station-select'
          value={(station && station.id) || null}
          onChange={onStationChange}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              InputLabelProps={{ ...params.InputLabelProps, shrink: true }}
              placeholder='Select Station'
              {...props}
            />
          )}
        ></Autocomplete>
      )}
    </>
  );
};

export default StationSelect;
