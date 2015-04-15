function a(initx, inity) {
    left = $('#__content').offset().left;
    width = $('#__content').width();
    $('#_side_bar').css('left', (left + width + initx) + 'px');
    $('#_side_bar').css('bottom', inity + 'px');
}
function detect() {
    height = $(window).height();
    position = $(document).scrollTop();
    if (position > height) {
        $('#_go_top').fadeIn('slow');
    } else {
        $('#_go_top').fadeOut('slow');
    }
}
$(document).ready(function(e) {
    a(-40, 100);
    detect();
    $('#_go_top').click(function() {
        $(document).scrollTop(0);
    })
});
$(window).resize(function() {
    a(-40, 100);
});

$(window).scroll(function(e) {
    detect();
})
