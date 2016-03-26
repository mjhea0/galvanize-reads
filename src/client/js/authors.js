var authors = "{{ authors }}"; // from swig template
var authorList = authors.split(','); // from swig template
console.log(authorList);

// fuzzy search for authors
$('#search-authors').on('keyup', function() {
  $('.book').hide();
  var term = $.trim($(this).val());
  var applicableGenreList = searchIn(term, genreList);
  applicableGenreList.forEach(function(genre){
    $('.book').filter(function() {
      return $(this).data('book-genre') === genre;
    }).show();
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
