var genreList = genres.split(','); // from swig template

// fuzzy search for books
$('#search-books').on('keyup', function() {
  $('#pagination').hide();
  // remove any filters (if applicable)
  $('#remove-filter').hide();
  $('.book').filter(function() {
    return $(this).data('book-genre');
  }).show();
  $('.book').hide();
  var term = $.trim($(this).val());
  if(!term) {
    $('.book').show();
    $('#pagination').show();
  } else {
    var applicableGenreList = searchIn(term, genreList);
    if(applicableGenreList.length) {
      applicableGenreList.forEach(function(genre) {
        $('.book').filter(function() {
          return $(this).data('book-genre') === genre;
        }).show();
      });
    } else {
      console.log('No results!');
    }
  }
});

// filter books by genre
$(document).on('click', '#genre', function() {
  $('#pagination').hide();
  var genre = $.trim($(this).text());
  $('.book').filter(function() {
    return $(this).data('book-genre') === genre;
  }).show();
  $('.book').filter(function() {
    return $(this).data('book-genre') !== genre;
  }).hide();
  $('.remove-filter').show();
});

// remove filter
$('#remove-filter').on('click', function() {
  $('#pagination').show();
  $(this).hide();
  $('.book').filter(function() {
    return $(this).data('book-genre');
  }).show();
});


// remove book from all books view
$(document).on('click', '.remove-book', function() {
  var bookID = $(this).attr('data-book-id');
  bootbox.confirm('Are you sure?', function(result) {
    if(result) {
      $.ajax({
        url: '/books/'+bookID,
        type: 'DELETE'
      })
      .done(function() {
        window.location.replace('/books');
      })
      .fail(function(err) {
        console.log(err);
      });
    }
  });
});

// remove book from single book view
$('#single-remove-book').on('click', function() {
  var bookID = $(this).attr('data-book-id');
  bootbox.confirm('Are you sure?', function(result) {
    if(result) {
      $.ajax({
        url: '/books/'+bookID,
        type: 'DELETE'
      })
      .done(function() {
        window.location.replace('/books');
      })
      .fail(function(err) {
        console.log(err);
      });
    }
  });
});