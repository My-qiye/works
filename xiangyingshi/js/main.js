$(function(){

	var $height = $('.banner-img img').eq(0).height();
			console.log($height)
			
	$('.banner').eq(0).css({height:$height -50});

	$(window).resize(function(){

		// if($(window).resize() < 1200){

			var $height = $('.banner-img img').eq(0).height();
			console.log($height)

			$('.banner').eq(0).css({height:$height -57});
		// }
	})
	

	
	

})