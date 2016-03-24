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
