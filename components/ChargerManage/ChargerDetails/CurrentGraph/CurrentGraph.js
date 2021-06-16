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
  },
}));

const CurrentGraph = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/chargers/getCurrent/${id}`);

  console.log(data);

  if (error) {
    // return (
    //   <MyCard title='Current' type='graph' align='center'>
    //     <div className={classes.graph}>
    //       <div
    //         style={{
    //           height: '100%',
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //         }}>
    //         <Typography variant='h6'>No data available.</Typography>
    //       </div>
    //     </div>
    //   </MyCard>
    // );
    return null;
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
        {data.data.length > 0 ? (
          <>
            <ResponsiveLine
              data={data.data}
              margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'point',
                min: '0',
                max: '28',
                stacked: true,
              }}
              yFormat=' >-.2f'
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'hrs/time',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'amps',
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
              legends={[]}
              theme={{
                axis: {
                  legend: {
                    text: {
                      fontSize: 14,
                      fontWeight: 600,
                    },
                  },
                },
              }}
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
