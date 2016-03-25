// add scripts

$(document).on('click', '#remove-book', function(){
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

$(document).on('click', '#remove-author', function(){
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
