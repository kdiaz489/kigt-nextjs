import { ResponsivePie } from '@nivo/pie';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';
import MyCard from '../../../common/MyCard';
import { useChargers } from '../../../../context/chargers';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  graph: {
    height: theme.spacing(50),
    fontSize: '14px',
  },
}));
const PaymentGraph = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { currentCharger, setCurrentCharger } = useChargers();
  const { data, error } = useSWR(`/chargers/getPaymentState/${id}`);

  if (error) {
    return (
      <MyCard title='Current' type='graph' align='center'>
        <div className={classes.graph}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography variant='h6'>No data available.</Typography>
          </div>
        </div>
      </MyCard>
    );
  }

  if (!data) {
    return (
      <MyCard title='Current' type='graph' align='center'>
        <div className={classes.graph}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CircularProgress color='primary' size={70} />
          </div>
        </div>
      </MyCard>
    );
  }
  return (
    <MyCard title='Payment Status' align='center'>
      <div className={classes.graph}>
        {data.data.length ? (
          <ResponsivePie
            data={data.data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'set2' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor='#333333'
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor='#333333'
            legends={[]}
          />
        ) : (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography variant='h6'>No data available.</Typography>
          </div>
        )}
      </div>
    </MyCard>
  );
};

export default PaymentGraph;
