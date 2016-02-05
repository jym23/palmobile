( function( $ ){

	$('#climate-controller').climateController();

	//banner cycles
	$('#main-carousel div').bannerCycle();
	$('#social-carousel div').bannerCycle();
	$('#my_hotel-carousel div').bannerCycle();
	$('#guest-services-carousel div').bannerCycle();
	$('#fno-carousel div').bannerCycle();
	$('#explore-carousel div').bannerCycle();
	$('#transportation-carousel div').bannerCycle();

	//tells if document is ready after browser load
	$(document).on('pageinit', function(e){ 
		//console.log(e.target.id);

		var curr_page = e.target.id;
		//$('#' + curr_page + ' .parallax div').cycle({fit:0});

		//initiate native anchor
		$('a.native-anchor').on('click', function(ev) {
	        var target = $( $(this).attr('href') ).get(0).offsetTop;
	        $.mobile.silentScroll(target);
	        return false;
	    });

	    var dte = new Date();
	    var setDefDate = dte.getDay() + '-' + dte.getMonth() +'-'+ dte.getFullYear();
	    //$('#room-cleaning-date, #tray-pickup-date, #tr-date').datepicker({ dateFormat: 'dd-mm-yy' }).val(setDefDate);

	    //room cleaning confirm
	    var confirm_title = '', confirm_parent = '';
	    $('.app-confirm-btn').on('click', function(){
	    	var confirm = '#' + $(this).data('confirmbox');
	    	confirm_title = $(this).data('title');
	    	$( confirm ).fadeIn(200);
	    });
	    $('.confirm-no').on('click', function(){
	    	var parent = '#' + $(this).data('parent');
	    	$( parent ).fadeOut(200);
	    });
	    $('.confirm-yes').on('click', function(){
	    	var parent = '.' + $(this).data('parent');
	    	var next = '.' + $(this).data('next');
	    	$(next + ' .title').html(confirm_title);
	    	$( parent ).fadeOut(200,function(){
	    		$(next).fadeIn(200);
	    	})
	    });
	    $('.confirm-ok').on('click', function(){
	    	var parent = '#' + $(this).data('parent');
	    	$( parent ).fadeOut(200);
	    	$( parent + ' .confirm-one' ).css({"display":"block"});
	    	$( parent + ' .confirm-two' ).fadeOut(200);
	    });

		//tells if all objects, ajax is finished loading
		$(window).load( function(){
			//console.log('window all set.');
		});

	});
	
	//message show
    $(document).on('click', '.clk-msg', function(e){
    	e.preventDefault();
    	$('#messages .list .list-right div').html('<div class="msg-wrpr">'+$(this).data('content')+'</div>');
    	$('#messages .list .list-right div .msg-wrpr').prepend('<p align="right" style="margin:0 0 10px;"><input type="button" data-id="'+$(this).data('id')+'" class="clk-msg-del" value="Delete"></p>');
    });
    //message delete
    $(document).on('click', '.clk-msg-del', function(e){
    	e.preventDefault();
    	console.log($(this).data('id'));
    	var conf = confirm("Are you sure?");
    	if(conf == true){
	    	$(this).parent().parent('.msg-wrpr').hide(200, function(){
	    		$.ajax({
	    			url: Menus_Content.sUrl + 'del_message.php?id=',
					dataType: 'json',
					crossDomain : true,
					success: function(data){
						if( data.status == 200){ 

						}
					}
	    		});
	    		$(this).remove();
    		});
	    }
    });

	//tells before page is showed
	$(document).on('pagebeforeshow', function(e,ui){
		//console.log(ui);

		var curr_page = e.target.id;
		var previous_page = ui.prevPage.attr('id');

		if( typeof previous_page !== "undefined" ){
			//$('#' + previous_page + ' .parallax div').cycle('pause');
		}

		if( $('#'+curr_page+' .parallax div').length > 0 ){
			//$('#'+curr_page+' .parallax div').cycle();
		}
	});

	//enable swipe event to show right panel buttons
	$( document ).on( "pagecreate", "#main", function() {
		$( document ).on( "swipeleft swiperight", "#main", function( e ) {
			// We check if there is no open panel on the page because otherwise
			// a swipe to close the left panel would also open the right panel (and v.v.).
			// We do this by checking the data that the framework stores on the page element (panel: open).
			if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
				if ( e.type === "swipeleft" ) {
					$( "#menu-panel" ).panel( "open" );
				} else if ( e.type === "swiperight" ) {
					$( "#left-panel" ).panel( "open" );
				}
			}
		});
	});

	//tells when the page is displayed
	$(document).on("pageshow", function(e, ui){
		//console.log(ui);

		if( e.target.id != "main" )
			$(e.target).find('#sliding-menu a').hide();
		else
			$('#sliding-menu a').show();

	});

	//tells if document is being resize
	$(window).on('throttledresize', function(e){
		//console.log(e);
		resizeCarouselMenu();
	});
	
	//console.log('triggers load.');

	var resizeCarouselMenu = function(){
		if( $('.ui-page-active').find('.carousel-menu').length ){
			var liWidth = $(window).width() / 3;
			$('.ui-page-active').find('.carousel-menu').css({"left":-liWidth});
			$('.ui-page-active').find('.carousel-menu li').css({"width":liWidth});
		}
	}

	var hasWhiteSpace = function (s) {
	  	return /^\s+$/g.test(s);
	}
	
})(jQuery);