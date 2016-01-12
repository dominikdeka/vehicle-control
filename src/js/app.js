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
});