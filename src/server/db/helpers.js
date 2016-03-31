function filterData(list, filterBy) {
  var filteredData = list.map(function(obj) {
    return obj[filterBy];
  });
  var distinctData = filteredData.filter(function(value, index, arr){
    return arr.indexOf(value) === index;
  });
  return distinctData;
}

function mapBooksToAuthors(records) {
  var mappedAuthors = records.reduce(function(mappedAuthors, currentRecord) {
    currentRecord = reassignAuthorIdToId(currentRecord);
    var authorId = currentRecord.id;
    var book = extractBookFromRecord(currentRecord);
    currentRecord = deleteBookFromRecord(currentRecord);
    if (!mappedAuthors.hasOwnProperty(authorId)){
      currentRecord.books = [book];
      mappedAuthors[authorId] = currentRecord;
    } else {
      mappedAuthors[authorId].books.push(book);
    }
    return mappedAuthors;
  }, {});
  var authors = [];
  for (var authorId in mappedAuthors) {
    authors.push(mappedAuthors[authorId]);
  }
  return authors;
}

function extractBookFromRecord(record) {
  return {
    id: record.book_id,
    title: record.title,
    description: record.description,
    cover_url: record.cover_url,
    genre: record.genre
  };
}

function deleteBookFromRecord(record){
  var properties = [
    'book_id', 'title', 'genre', 'description', 'cover_url'
  ];
  for (var i = 0; i < properties.length; i++){
    delete record[properties[i]];
  }
  return record;
}

function reassignAuthorIdToId(record){
  record.id = record.author_id;
  delete record.author_id;
  return record;
}


module.exports = {
  filterData: filterData,
  mapBooksToAuthors: mapBooksToAuthors
};