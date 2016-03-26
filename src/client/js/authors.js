var authorList = lastNames.split(','); // from swig template

// fuzzy search for authors
$('#search-authors').on('keyup', function() {
  $('.author').hide();
  var term = $.trim($(this).val());
  var applicableNameList = searchIn(term, authorList);
  applicableNameList.forEach(function(lastName){
    $('.author').filter(function() {
      return $(this).data('author-last-name') === lastName;
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
