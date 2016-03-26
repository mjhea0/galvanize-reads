function filterGenres(bookList) {
  var allGenres = bookList.map(function(obj) {
    return obj.genre;
  });
  var distinctGenres = allGenres.filter(function(value, index, arr){
    return arr.indexOf(value) === index;
  });
  return distinctGenres;
}


module.exports = {
  filterGenres: filterGenres
};