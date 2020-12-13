import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Paper } from '@material-ui/core';

let data = [
  {
    id: 'Throttle Value',
    color: 'hsl(209, 70%, 50%)',
    data: [
      {
        x: '11/18/20 1:00pm',
        y: 107,
      },
      {
        x: '11/18/20 1:05pm',
        y: 47,
      },
      {
        x: '11/18/20 1:10pm',
        y: 277,
      },
      {
        x: '11/18/20 1:11pm',
        y: 150,
      },
      {
        x: '11/18/20 1:13pm',
        y: 158,
      },
      {
        x: '11/18/20 1:20pm',
        y: 147,
      },
      {
        x: '11/18/20 1:30pm',
        y: 223,
      },
      {
        x: '11/18/20 1:33pm',
        y: 141,
      },
      {
        x: '11/18/20 1:35pm',
        y: 248,
      },
      {
        x: '11/18/20 1:37pm',
        y: 212,
      },
      {
        x: '11/18/20 1:40pm',
        y: 85,
      },
      {
        x: '11/18/20 1:50pm',
        y: 98,
      },
    ],
  },
  {
    id: 'Max Current',
    color: 'hsl(256, 70%, 50%)',
    data: [
      {
        x: '11/18/20 1:00pm',
        y: 37,
      },
      {
        x: '11/18/20 1:05pm',
        y: 46,
      },
      {
        x: '11/18/20 1:10pm',
        y: 74,
      },
      {
        x: '11/18/20 1:11pm',
        y: 147,
      },
      {
        x: '11/18/20 1:13pm',
        y: 283,
      },
      {
        x: '11/18/20 1:20pm',
        y: 223,
      },
      {
        x: '11/18/20 1:30pm',
        y: 174,
      },
      {
        x: '11/18/20 1:33pm',
        y: 108,
      },
      {
        x: '11/18/20 1:35pm',
        y: 221,
      },
      {
        x: '11/18/20 1:37pm',
        y: 206,
      },
      {
        x: '11/18/20 1:40pm',
        y: 130,
      },
      {
        x: '11/18/20 1:50pm',
        y: 287,
      },
    ],
  },
];
const styles = {
  height: 500,
  fontSize: '14px',
};
const ThrottleGraph = () => {
  return (
    <Paper elevation={3}>
      <div style={styles}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
            legend: 'time',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'value',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Paper>
  );
};

export default ThrottleGraph;
