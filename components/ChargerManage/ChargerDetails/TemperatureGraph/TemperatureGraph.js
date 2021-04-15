import { ResponsiveLine } from '@nivo/line';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useChargers } from '../../../../context/chargers';
import useSWR from 'swr';
import MyCard from '../../../common/MyCard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  graph: {
    height: theme.spacing(50),
    fontSize: '14px',
  },
}));
const TemperatureGraph = () => {
  const classes = useStyles();
  const { currentCharger, setCurrentCharger } = useChargers();
  const { data } = useSWR(`/chargers/getTemperature/${currentCharger.kioskId}`);

  return (
    <MyCard title='Temperature' align='center'>
      <div className={classes.graph}>
        {data ? (
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
              legend: 'Temperature',
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
        ) : (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CircularProgress color='primary' size={70} />
          </div>
        )}
      </div>
    </MyCard>
  );
};

export default TemperatureGraph;
