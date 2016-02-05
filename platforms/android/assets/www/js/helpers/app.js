var AppMainJs = [];

( function(){

	AppMainJs = {

		init: function(){
			
			this.jqm_defaults();
			this.enable_parallax();
			this.inRoomControls();

			//right panel buttons
			this.app_brightness();
			this.messages();

			$( "#menu-panel" ).trigger( "updatelayout" );

			$('.dimmer-wrapper').on('change', function(e){
				$('#dimmer-value').html(e.target.value + '%');
			});

		},
		jqm_defaults: function(){
			//setup configurations
			$.mobile.History = '';
			$.mobile.defaultPageTransition = 'none';
		},
		app_brightness: function(){
			$('.brightness-wrapper').on('change', function(e){
				e.preventDefault();
				//console.log( $('#brightness').val());
			});
		},
		messages: function(){
			if( $('#messages .ui-content').find('.list').length > 0 )
				$('#messages .ui-content').find('.list').remove();

			$.ajax({
				url: Menus_Content.sUrl + 'get_message.php',
				dataType: 'json',
				crossDomain : true,
				success: function(data){
					if( data.status == 200){ 
						console.log(data);
						$('#messages .ui-content').append('<div class="list"><div class="list-left"></div><div class="list-right"><div></div></div></div>');
						var left = '', right = '';
						$.each(data.messages, function(k,v){
							var d = new Date('2014-07-11 18:00:30');
							var cal_date = d.getFullYear() +'-'+ d.getMonth() + '-' + d.getDate();
							var cal_time = d.getHours() +':'+ d.getMinutes() + ':' + d.getSeconds();
							left += '<div class="ui-grid-a clk-msg" data-content="'+v.content+'" data-id="'+v.id+'">'
								+ '<div class="ui-block-a">'+v.msg_from+'</div><div class="ui-block-b">'+cal_date+'</div>'
								+ '<div class="ui-block-a">'+v.subject+'</div><div class="ui-block-b">'+cal_time+'</div>'
								+ '</div>';
						});

						$('#messages .ui-content .list .list-left').append(left);

					}else{
						var err = '<div style="margin-top:110px;min-height:400px;">'
								+ '<h2 align="center" style="color:#fff;font-weight:normal;">No Message to show.</h2>'
								+ '</div>';
						$('#messages .ui-content').append(err);
					}
				}
			});
		},
		enable_parallax: function(){
			$(document).on('scroll',function(e){

				e.preventDefault();
				var top = $(this).scrollTop();
				/*var base = 100 + top;
				var val = base + "% auto";

				if( $(document).width() <= 630 )
					val = "auto " + base + "%";

				$(".parallax div .slide, .banner")
					.css({
						"-webkit-background-size":val,
						"background-size":val,
						"-moz-background-size":val
					});*/

				var a = 1, b = top / 20, c = a + b;

                if( top < 1 )
                    top = 1;

                $(".parallax .slide, .banner").css({
                    "-webkit-transform":"scale(" + c + ")",
                    "-moz-transform":"scale(" + c + ")",
                    "-o-transform":"scale(" + c + ")",
                    "transform":"scale(" + c + ")"
                });

			});
		},
		inRoomControls: function(){
			$(document).on('click','.irc-ctrl', function(e){
		    	e.preventDefault();
		    	$(this).parent().parent().parent('ul').find('.active').removeClass('active');
		    	$(this).parent().parent('li').addClass('active');
		    	var showDiv = 'div-'+e.target.id;
		    	$( '#'+showDiv ).removeClass('hide').fadeIn(200);
		    	$.each($('.irc-wrpr .irc-wrapper'), function(k, v){
		    		if ( showDiv != v.id ){
		    			$('#'+v.id).addClass('hide');
		    		}
		    	});
		    });

			$(document).on('click', '.irc-ctrl-img', function(e){
				e.preventDefault();
				var curr = $(this).attr('src'), on = $(this).data('on'), off = $(this).data('off');
				if( curr == off )
					$(this).attr('src',$(this).data('on')).data('is-on','adfasfd');
				else
					$(this).attr('src',$(this).data('off'));
			});

			//curtains ctrl
			$(document).on('click','.curtains-ctrl', function(e){
		    	e.preventDefault();
		    	$(this).parent().parent().parent('ul').find('.active').removeClass('active');
		    	$(this).parent().parent('li').addClass('active');

		    	var showDiv = 'img-'+e.target.id;
		    	$( '#'+showDiv ).removeClass('hide').fadeIn(200);
		    	$.each($('.curtains-images img'), function(k, v){
		    		if ( showDiv != v.id ){
		    			$('#'+v.id).addClass('hide');
		    		}
		    	});

		    });
		    $(document).on('click','.curtains-ctrl2', function(e){
		    	e.preventDefault();
		    	$(this).parent().parent().parent('ul').find('.active').removeClass('active');
		    	$(this).parent().parent('li').addClass('active');
		    });
		}
	}

	$(document).on('ready', function(){
		//App.init();
	});

}(jQuery));
