import moment from 'moment';
export const filter = (data, low, high, timeType) => {
  let currEl = {};
  let currIndex = 0;
  let returnedEl = null;
  let filteredData = data.filter((val, index, arr) => {
    if (index === 0) {
      currEl = val;
      return val;
    }
    let slicedArr = arr.slice(currIndex + 1);
    returnedEl = slicedArr.find((item) => {
      let nextTime = moment(+item.timestamp);
      let currTime = moment(+currEl.timestamp);
      let timeDiff = nextTime.diff(currTime, timeType, true);
      // console.log(`currTime = ${currTime.format('HH:mm:ss')}`);
      // console.log(`next = ${nextTime.format('HH:mm:ss')}`);
      // console.log(`timeDiff = ${timeDiff} ${timeType}`);
      // console.log(``);
      timeDiff >= low && timeDiff < high && (currIndex = index);
      return timeDiff >= low && timeDiff < high;
    });
    return returnedEl;
  });
  console.log('filtered Data');
  console.log(filteredData);
  return filteredData;
};
