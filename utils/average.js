export const getDataAverage = (data) => {
  let tmp = {};

  data.forEach(function (item) {
    // if property for current date already exists  we update existing otherwise start new one
    var obj = (tmp[item.date] = tmp[item.date] || {
      count: 0,
      'SERVER Set Current Max': 0,
      'EVSE Max Current': 0,
      time: item['time'],
    });

    // increment count and total of all the ratings
    obj.count++;
    obj['SERVER Set Current Max'] += item['SERVER Set Current Max'];
    obj['EVSE Max Current'] += item['EVSE Max Current'];
  });
  console.log(tmp);
  var res = Object.entries(tmp).map((entry) => {
    let obj = {};
    obj['date'] = entry[0];
    obj['SERVER Set Current Max'] =
      entry[1]['SERVER Set Current Max'] / entry[1].count;
    obj['EVSE Max Current'] = entry[1]['EVSE Max Current'] / entry[1].count;
    return obj;
  });
  console.log(res);
  return res;
};
