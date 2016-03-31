function filterData(list, filterBy) {
  var filteredData = list.map(function(obj) {
    return obj[filterBy];
  });
  var distinctData = filteredData.filter(function(value, index, arr) {
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
    if (!mappedAuthors.hasOwnProperty(authorId)) {
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

function deleteBookFromRecord(record) {
  var properties = [
    'book_id', 'title', 'genre', 'description', 'cover_url'
  ];
  for (var i = 0; i < properties.length; i++) {
    delete record[properties[i]];
  }
  return record;
}

function reassignAuthorIdToId(record) {
  record.id = record.author_id;
  delete record.author_id;
  return record;
}

function mapAuthorsToBooks(records) {
  var mappedBooks = records.reduce(function(mappedBooks, currentRecord) {
    currentRecord = reassignBookIdToId(currentRecord);
    var bookId = currentRecord.id;
    var author = extractAuthorFromRecord(currentRecord);
    currentRecord = deleteAuthorFromRecord(currentRecord);
    if (!mappedBooks.hasOwnProperty(bookId)) {
      currentRecord.authors = [author];
      mappedBooks[bookId] = currentRecord;
    } else {
      mappedBooks[bookId].authors.push(author);
    }
    return mappedBooks;
  }, {});
  var books = [];
  for (var bookId in mappedBooks) {
    books.push(mappedBooks[bookId]);
  }
  return books;
}

function extractAuthorFromRecord(record) {
  return {
    id: record.author_id,
    first_name: record.first_name,
    last_name: record.last_name,
    biography: record.biography,
    portrait_url: record.portrait_url
  };
}

function deleteAuthorFromRecord(record) {
  var properties = [
    'author_id', 'first_name', 'last_name', 'biography', 'portrait_url'
  ];
  for (var i = 0, length = properties.length; i < length; i++) {
    delete record[properties[i]];
  }
  return record;
}

function reassignBookIdToId(record) {
  record.id = record.book_id;
  delete record.book_id;
  return record;
}



module.exports = {
  filterData: filterData,
  mapBooksToAuthors: mapBooksToAuthors,
  mapAuthorsToBooks: mapAuthorsToBooks
};