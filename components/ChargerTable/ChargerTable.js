import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ChargerStatus from './ChargerStatus';
import { useChargers } from '../../context/chargers';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ChargerTable = ({ data }) => {
  const classes = useStyles();
  const router = useRouter();
  const { currentCharger, setCurrentCharger } = useChargers();

  const handleRowClick = (e, rowData) => {
    // setCurrentCharger(rowData);
    router.push(`/dashboard/t/${rowData['kioskId']}`);
  };
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
          {data.map((row) => (
            <TableRow
              key={Math.random()}
              hover
              onClick={(e) => handleRowClick(e, row)}>
              <TableCell component='th' scope='row'>
                {row['chargerName'] ?? 'N/A'}
              </TableCell>
              <TableCell align='right'>{row['chargerSn'] ?? 'N/A'}</TableCell>
              <TableCell align='right'>{row['kioskId'] ?? 'N/A'}</TableCell>
              <TableCell align='right'>{row['model'] ?? 'N/A'}</TableCell>
              <TableCell align='right'>
                {row['merchantName'] ?? 'N/A'}
              </TableCell>
              <TableCell align='right'>
                {row.createdAt
                  ? format(row.createdAt?._seconds * 1000, 'MM/dd/yy hh:mm:ss')
                  : 'N/A'}
              </TableCell>
              <TableCell align='right'>
                {<ChargerStatus currentCharger={row['charger']} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChargerTable;
