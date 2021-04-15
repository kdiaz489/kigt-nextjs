// import Skeleton from '@material-ui/lab/Skeleton';
// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles({
//   root: {
//     width: 300,
//   },
// });
// const ChargerTableSkeleton = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <Skeleton />
//       <Skeleton />
//       <Skeleton />
//     </div>
//   );
// };

// export default ChargerTableSkeleton;

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
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  row: {
    width: '150px',
    backgroundColor: 'red',
  },
});

const ChargerTableSkeleton = (props) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='chargers table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>SN</TableCell>
            <TableCell align='right'>Kiosk ID</TableCell>
            <TableCell align='right'>Model</TableCell>
            <TableCell align='right'>Merchant</TableCell>
            <TableCell align='right'>Created Time</TableCell>
            <TableCell align='right'>Status & Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={7}>
              <Skeleton height={50} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7}>
              <Skeleton height={50} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7}>
              <Skeleton height={50} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7}>
              <Skeleton height={50} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChargerTableSkeleton;
