/** 
 * Menus_Content - Object
 * load the contents of the modules
 * by Jym | 12-14-2015
 */

var Menus_Content = [];

( function(){

	Menus_Content = {

		sUrl: 'http://119.73.222.42:8080/palmobiledata/json/',

		init: function(){
			this.digital_tv();
			this.promotions();
			this.wineDine();
		},

		banner: function(parent_id,img){

			var selector = '#' + parent_id + ' .ui-content';

			switch(parent_id){
				case 'digital_tv':
					$( selector ).find('.banner').css({"background-image":"url('images/menus/digital_tv.jpg')"});
					break;
				case 'promotions':
					var src = 'http://119.73.222.42:8080/palmobiledata/images/landscape/promotion/' + img;
					$(selector + ' .banner').css({"background-image":"url("+src+")"});
					break;
				case 'winedine':
					var src = 'http://119.73.222.42:8080/palmobiledata/images/landscape/wine_dine/' + img;
					$(selector + ' .banner').css({"background-image":"url("+src+")"});
					break;
			}
		},
		digital_tv: function(){

			var ch_dir = 'http://119.73.222.42:8080/palmobiledata/buttons/tv_channels/';

			//load menus
			$.ajax({
				url: Menus_Content.sUrl + 'get_tv_category.php',
				dataType: 'json',
				crossDomain : true,
				success: function(data){
					if( data.status == 200){
						var ctr = 1;
						$.each(data.categories, function(k,v){
							$('#digital_tv .ui-content ul.carousel-menu').append('<li data-name="'+v.group_description+'" id="'+ v.id +'"><span>' + v.group_description + '</span>');
							ctr+=1;
						});
						$('#digital_tv .ui-content ul.carousel-menu').menu_cycle(Menus_Content);
						Menus_Content.banner('digital_tv','');
					}
				}
			}).done(function(){
				//load contents
				$.ajax({
					url: Menus_Content.sUrl + 'get_tv_channels.php',
					dataType: 'json',
					crossDomain : true,
					success: function(data){
						if( data.status == 200 ){
							var ctr = 0; 
							$.each(data.channels, function(k,v){
								var block = 'ui-block-a';
								if(ctr > 0){
									block = 'ui-block-b'; ctr = 0;
								}else{
									ctr+=1;
								}
								$('#digital_tv .ui-content .channels').append('<div class="'+block +'" data-catid="'+v.cat_id+'"><img src="'+ch_dir+v.img+'">');						
							});
						}
					}
				});
			});
		},
		promotions: function(){
			$.ajax({
				url: Menus_Content.sUrl + 'get_promotion.php',
				dataType: 'json',
				crossDomain : true,
				success: function(data){
					
					//console.log(data);

					if( data.status == 200 ){
						
						var ctr = 1;
						var img, desc, currId;
						$.each(data.promotion, function(k,v){
							if( ctr == 1 ){
								img = v.img;
								desc = v.desc;
								currId = v.id;
							}
							$('#promotions .ui-content ul').append('<li data-name="'+v.group_description+'" id="'+ v.id +'"><span>' + v.group_description + '</span>');
							ctr+=1;
						});

						$('#promotions .ui-content ul.carousel-menu').menu_cycle(Menus_Content);
						$('#promotions .ui-content .channels').html('<div id="' + currId + '">'+desc);

						Menus_Content.banner('promotions',img);
					}
				}
			});
		},
		wineDine: function(){

			$.ajax({
				url: Menus_Content.sUrl + 'get_winedine.php',
				dataType: 'json',
				crossDomain : true,
				success: function(data){
					if( data.status == 200 ){

						var ctr = 1;
						var img, desc, currId;

						$.each(data.wineanddine, function(k,v){
							if( ctr == 1 ){
								img = v.img; desc = v.desc; currId = v.id;
							}
							$('#winedine .ui-content .carousel-menu').append('<li data-name="'+v.group_description+'" id="'+ v.id +'"><span>' + v.group_description + '</span>');
							ctr+=1;
						});
						$('#winedine .ui-content .carousel-menu').menu_cycle(Menus_Content);
						$('#winedine .ui-content .channels').html('<div id="'+currId+'">'+desc);
						Menus_Content.banner('winedine',img);
					}
				}
			});

		},
		contents: function(module, id, all){
			
			$.mobile.loading('show',{ theme: 'b', text: "Loading Channels...", textVisible: true });
			
			switch(module){
				case 'digital_tv':
					var ch_dir = 'http://119.73.222.42:8080/palmobiledata/buttons/tv_channels/';
					$('#digital_tv .ui-content').find('.channels').html('');
					$.ajax({
						url: Menus_Content.sUrl + 'get_tv_channels.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200 ){
								var ctr = 0; 
								$.each(data.channels, function(k,v){
									if( v.cat_id == id ){
										var block = 'ui-block-a';
										if(ctr > 0){
											block = 'ui-block-b'; ctr = 0;
										}else{
											ctr+=1;
										}
										$('#digital_tv .ui-content .channels').append('<div class="'+block +'" data-catid="'+v.cat_id+'"><img src="'+ch_dir+v.img+'">');
									}else if(all == true){
										var block = 'ui-block-a';
										if(ctr > 0){
											block = 'ui-block-b'; ctr = 0;
										}else{
											ctr+=1;
										}
										$('#digital_tv .ui-content .channels').append('<div class="'+block +'" data-catid="'+v.cat_id+'"><img src="'+ch_dir+v.img+'">');
									}				
								});
							}
							$.mobile.loading('hide');
						}
					});
					break;

				case 'promotions':
					$('#promotions .ui-content').find('.channels').html('');
					$.ajax({
						url: Menus_Content.sUrl + 'get_promotion.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200 ){
								$.each(data.promotion, function(k,v){
									if( v.id == id ){
										Menus_Content.banner('promotions',v.img);
										$('#promotions .ui-content .channels').append('<div id="'+v.id+'">'+v.desc);
									}
								});
							}
							$.mobile.loading('hide');
						}
					});
					break;
				case 'winedine':
					if($('#winedine .ui-content .channels').length > 0){
						$('#winedine .ui-content .channels').remove();
					}
					$.ajax({
						url: Menus_Content.sUrl + 'get_winedine.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200 ){
								$('#winedine .ui-content').append('<div class="channels ui-grid-a" style="">');
								$.each(data.wineanddine, function(k,v){
									if( v.id == id ){
										Menus_Content.banner('winedine',v.img);
										$('#winedine .ui-content .channels').append('<div id="'+v.id+'">'+v.desc);
									}
								});
							}
							$.mobile.loading('hide');
						}
					});
					break;
			}
		}
	}

	$(document).on('ready', function(){
		//Menus_Content.init();
	});

}(jQuery));