function searchIn(query, list) {
  return list.filter(function(el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });
}