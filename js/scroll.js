$(window).scroll(function() {
    if ($(this).scrollTop() > 100 ) {
        $('.scrolltop:hidden').fadeIn();
    } else {
        $('.scrolltop').fadeOut();
    }
    $('.scrolltop').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
});
// $(function(){$(".scroll").click(function(){$("html,body").animate({scrollTop:$(".thetop").offset().top},"1000");return false})})
