import { ResponsiveLine } from '@nivo/line';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyCard from '../../../common/MyCard';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  graph: {
    height: theme.spacing(50),
    fontSize: '14px',
  },
}));

const CurrentGraph = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/chargers/getCurrent/${id}`);

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
    <MyCard title='Current' type='graph' align='center'>
      <div className={classes.graph}>
        {data.data.length ? (
          <>
            <ResponsiveLine
              data={data.data}
              margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false,
              }}
              yFormat=' >-.2f'
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Time',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Current',
                legendOffset: -40,
                legendPosition: 'middle',
              }}
              colors={{ scheme: 'set2' }}
              pointSize={10}
              pointColor={{ from: 'color', modifiers: [] }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              enableCrosshair={false}
              legends={[]}
            />
          </>
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

export default CurrentGraph;
