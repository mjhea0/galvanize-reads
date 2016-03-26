// filter books by genre
$(document).on('click', '#genre', function(){
  var genre = $.trim($(this).text());
  $('.book').filter(function(){
    return $(this).data('book-genre') === genre;
  }).show();
  $('.book').filter(function(){
    return $(this).data('book-genre') !== genre;
  }).hide();
  $('.remove-filter').show();
});

// remove filter
$('.remove-filter').on('click', function(){
  $(this).hide();
  $('.book').filter(function(){
    return $(this).data('book-genre');
  }).show();
});


// remove book from all books view
$(document).on('click', '.remove-book', function(){
  var bookID = $(this).attr('data-book-id');
  bootbox.confirm('Are you sure?', function(result) {
    if(result) {
      $.ajax({
        url: '/books/'+bookID,
        type: 'DELETE'
      })
      .done(function() {
        location.reload();
      })
      .fail(function(err) {
        console.log(err);
      });
    }
  });
});

// remove book from single book view
$('#single-remove-book').on('click', function(){
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

// remove author from all authors view
$(document).on('click', '.remove-author', function(){
  var authorID = $(this).attr('data-author-id');
  bootbox.confirm('Are you sure?', function(result) {
    if(result) {
      $.ajax({
        url: '/authors/'+authorID,
        type: 'DELETE'
      })
      .done(function() {
        location.reload();
      })
      .fail(function(err) {
        console.log(err);
      });
    }
  });
});

// remove author from single author view
$('#single-remove-author').on('click', function(){
  var authorID = $(this).attr('data-author-id');
  bootbox.confirm('Are you sure?', function(result) {
    if(result) {
      $.ajax({
        url: '/authors/'+authorID,
        type: 'DELETE'
      })
      .done(function() {
        window.location.replace('/authors');
      })
      .fail(function(err) {
        console.log(err);
      });
    }
  });
});
