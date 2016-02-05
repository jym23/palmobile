/**
 * Plugin: bannerCycle()
 * Intend to cycle the banners of the app
 * by Jym | 01-05-2016
 */

( function ( $ ) {

	$.fn.bannerCycle = function( options ){

		var $this = this;
		var $selector = this.selector;
		var defaults = {
			timeOut: 5000,
			lngth: $this.children().length
		};

		var settings = $.extend({}, defaults, options);

		//initialize selection
		var frst = $( $selector + ' div:first-child'); 
		if ( $( $selector ).find('.selected').length < 1 )
			frst.addClass('selected');
		
		var i = 1;
		setInterval( function() {

			if( i == settings.lngth){
				frst.addClass('selected'); 
				i = 1; //reset i to 1
			}

			var slctd = $( $selector ).find('.selected');
			slctd.fadeOut(100, function(){
				slctd.removeClass('selected');
			})
			.next()
			.fadeIn(100)
			.addClass('selected');

			i++;

		}, settings.timeOut );

	}

} ( jQuery ))