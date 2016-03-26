function filterData(list, filterBy) {
  var filteredData = list.map(function(obj) {
    return obj[filterBy];
  });
  var distinctData = filteredData.filter(function(value, index, arr){
    return arr.indexOf(value) === index;
  });
  return distinctData;
}


module.exports = {
  filterData: filterData
};