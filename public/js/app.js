$(document).ready(function(){
  $('a').click(function(){
    $.post('drive/',{direction: $(this).data('direction')});
  });
  $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        $('a[data-direction=left]').click();
        break;
        case 38: // up
        $('a[data-direction=up]').click();
        break;
        case 39: // right
        $('a[data-direction=right]').click();
        break;
        case 40: // down
        $('a[data-direction=down]').click();
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
  $(document).on('click', '#algorithm .close', function(){
    $(this).closest('li').remove();
  });
  $('#send-alg-button').click(function(){
    var items = [];
    $("ul#algorithm").children().each(function() {
      items.push($(this).data('direction'));
    });
    var jsonData = JSON.stringify( items );
    $.ajax ({
      url: "drive/",
      type: "POST",
      data: jsonData,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function(){}
    });
  });
  $('#clear-alg-button').click(function(){
    $("ul#algorithm").empty();
  });
  Sortable.create(document.getElementById('directions'), {
    sort: false,
    group:   {
      name: 'advanced',
      pull: 'clone',
      put: false
    },
    animation: 150
  });
  Sortable.create(document.getElementById('algorithm'), {
    sort: true,
    group:   {
      name: 'advanced',
      pull: false,
      put: true
    },
    animation: 150
  });

});