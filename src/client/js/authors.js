var authorList = lastNames.split(','); // from swig template

// fuzzy search for authors
$('#search-authors').on('keyup', function() {
  $('#pagination').hide();
  $('.author').hide();
  var term = $.trim($(this).val());
  if(!term) {
    $('.author').show();
    $('#pagination').show();
  } else {
    var applicableNameList = searchIn(term, authorList);
    if(applicableNameList.length) {
      applicableNameList.forEach(function(lastName) {
        $('.author').filter(function() {
          return $(this).data('author-last-name') === lastName;
        }).show();
      });
    } else {
      console.log('No results!');
    }
  }
});

// remove author from all authors view
$(document).on('click', '.remove-author', function() {
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

// remove author from single author view
$('#single-remove-author').on('click', function() {
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
