import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ChargerTable = ({ data, setCurrentCharger }) => {
  const classes = useStyles();

  // enum for conditional rendering
  // const CHARGER_STATES = {
  //   0: (
  //     <Box className={classes.status}>
  //       <div>
  //         <HelpIcon fontSize='large' className={classes.greyStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Unknown State
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: Unknown
  //       </Typography>
  //     </Box>
  //   ),
  //   1: (
  //     <Box className={classes.status}>
  //       <div>
  //         <CheckCircleIcon fontSize='large' className={classes.greenStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Not Connected
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 1
  //       </Typography>
  //     </Box>
  //   ),
  //   2: (
  //     <Box className={classes.status}>
  //       <div>
  //         <WarningIcon fontSize='large' className={classes.yellowStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Ready to Charge
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 2
  //       </Typography>
  //     </Box>
  //   ),
  //   3: (
  //     <Box className={classes.status}>
  //       <div>
  //         <BatteryChargingFullIcon
  //           fontSize='large'
  //           className={classes.blueStatus}
  //         />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Charging
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 3
  //       </Typography>
  //     </Box>
  //   ),
  //   4: (
  //     <Box className={classes.status}>
  //       <div>
  //         <ErrorIcon fontSize='large' className={classes.redStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Vent Required
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 4
  //       </Typography>
  //     </Box>
  //   ),
  //   5: (
  //     <Box className={classes.status}>
  //       <div>
  //         <ErrorIcon fontSize='large' className={classes.redStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Diode Check Failed
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 5
  //       </Typography>
  //     </Box>
  //   ),
  //   6: (
  //     <Box className={classes.status}>
  //       <div>
  //         <ErrorIcon fontSize='large' className={classes.redStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         GFCI Fault
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 6
  //       </Typography>
  //     </Box>
  //   ),
  //   7: (
  //     <Paper className={classes.status}>
  //       <div>
  //         <ErrorIcon fontSize='large' className={classes.redStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Bad Ground
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 7
  //       </Typography>
  //     </Paper>
  //   ),
  //   8: (
  //     <Box className={classes.status}>
  //       <div>
  //         <ErrorIcon fontSize='large' className={classes.redStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Stuck Relay
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 8
  //       </Typography>
  //     </Box>
  //   ),
  //   9: (
  //     <Box className={classes.status}>
  //       <div>
  //         <ErrorIcon fontSize='large' className={classes.redStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Failed GFCI Self-Test
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 9
  //       </Typography>
  //     </Box>
  //   ),
  //   10: (
  //     <Box className={classes.status}>
  //       <div>
  //         <ErrorIcon fontSize='large' className={classes.redStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Over Temperature
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 10
  //       </Typography>
  //     </Box>
  //   ),
  //   254: (
  //     <Box className={classes.status}>
  //       <div>
  //         <PowerOffIcon fontSize='large' className={classes.yellowStatus} />
  //       </div>
  //       <Typography align='center' variant='h5'>
  //         Sleeping
  //       </Typography>
  //       <Typography align='center' variant='body2'>
  //         Code: 254
  //       </Typography>
  //     </Box>
  //   ),
  //   255: (
  //     <Box className={classes.status}>
  //       <div>
  //         <CheckCircleIcon fontSize='large' className={classes.purpleStatus} />
  //       </div>
  //       <div>
  //         <Typography align='center' variant='h5'>
  //           Disabled
  //         </Typography>
  //         <Typography align='center' variant='body2'>
  //           Code: 255
  //         </Typography>
  //       </div>
  //     </Box>
  //   ),
  // };

  const handleRowClick = (e, rowData) => {
    setCurrentCharger(rowData);
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
