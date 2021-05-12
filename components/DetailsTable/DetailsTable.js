import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const DetailsTable = ({ aggrData, filteredData, isLoading }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Set Current Value</TableCell>
            <TableCell align='right'>Measured Current Value</TableCell>
            <TableCell align='right'>Available Current Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.date}>
              <TableCell>{`${row['date']} ${row['time']}`}</TableCell>
              <TableCell component='th' scope='row'>
                {+row['EVSE Max Current']}
              </TableCell>
              <TableCell align='right'>{+row['EVSE Current'] / 1000}</TableCell>
              <TableCell align='right'>
                {row['SERVER Set Current Max']}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailsTable;
