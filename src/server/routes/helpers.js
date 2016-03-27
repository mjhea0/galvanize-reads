function createChunks(list) {
  // default variables
  var elementlist = [];
  var totalElementsPerPage = 10;
  // split list into groups
  while (list.length > 0) {
    elementlist.push(list.splice(0, totalElementsPerPage));
  }
  return elementlist;
}

module.exports = {
  createChunks: createChunks
};