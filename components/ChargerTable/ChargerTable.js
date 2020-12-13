import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ChargerTable = ({ data, setCurrentCharger }) => {
  const classes = useStyles();
  const router = useRouter();

  const handleRowClick = (e, rowData) => {
    setCurrentCharger(rowData);
    // router.push(`/terminal-details/${rowData.id}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='chargers table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Serial No.</TableCell>
            <TableCell align='right'>Firebase ID</TableCell>
            <TableCell align='right'>Model</TableCell>
            <TableCell align='right'>Merchant</TableCell>
            <TableCell align='right'>Created Time</TableCell>
            <TableCell align='right'>Status & Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={Math.random()}
              hover
              onClick={(e) => handleRowClick(e, row)}
            >
              <TableCell component='th' scope='row'>
                {row['EVSE Max Current']}
              </TableCell>
              <TableCell align='right'>{row['EVSE Max Current']}</TableCell>
              <TableCell align='right'>{row['id']}</TableCell>
              <TableCell align='right'>{row['EVSE Max Current']}</TableCell>
              <TableCell align='right'>{row['EVSE Max Current']}</TableCell>
              <TableCell align='right'>{row['EVSE Max Current']}</TableCell>
              <TableCell align='right'>{row['EVSE Max Current']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChargerTable;
