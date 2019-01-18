$(window).scroll(function() {
    if ($(this).scrollTop() > 100 ) {
        $('.scrolltop:hidden').fadeIn();
    } else {
        $('.scrolltop').fadeOut();
    }

});

function upToScroll (){
$('.scrolltop').click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, 800);
  return false;
});
};