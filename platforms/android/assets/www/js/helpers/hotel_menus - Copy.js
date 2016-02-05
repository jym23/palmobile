
var HotelMenus = [];

( function($){

	HotelMenus = {
		name: 'HotelMenus',
		init: function(){

			this.daily_activities();
			this.accommodation();
			this.facilities();
			this.spa();
			this.souvenirs();
			this.gallery();
			this.hotel_map();
			this.inroomdining();

			//guest services
			this.az_directory();
			this.e_laundry()
			this.request_amenities();
	
			//explore menus
			this.arts_and_culture();
			this.attractions();
			this.golf();
			this.nature_wildlife();
			this.nightlife();
			this.shopping();

			this.room_directory();

			this.enable_cart();
			
		},
		banner: function(module,img,id){

			var selector = module + ' .ui-content', 
				src = 'http://119.73.222.42:8080/palmobiledata/images/landscape/',
				banner,
				banner_exist = false;

			if( $(selector).find('div.banner').length > 0 )
				banner_exist = true;

			switch(module){
				case '#daily_activities':
					$.ajax({
						url: Menus_Content.sUrl + 'get_activities_cat.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){

								$.each(data.categories, function(k,v){
									if(v.id == id){
										src += 'activities/' + v.img;
										banner = '<div class="banner" style="background-image:url('+src+');"></div>';
									}
								});
								if( banner_exist == true )
									$(selector + ' .banner').css({"background-image":"url("+src+")"});
								else
									$(selector).append(banner);

								return true;
							}
						}
					});
					break;
				case '#spa':
					$.ajax({
						url: Menus_Content.sUrl + 'get_spa_cat.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){
								
								$.each(data.categories, function(k,v){
									if(v.id == id){
										src += 'spa_cat/' + v.img;
										//banner = '<div class="banner" style="background-image:url('+src+');"></div>';
									}
								});

								$(selector).css({"background-image":"url("+src+")"});

								return true;
							}
						}
					});
					break;
				case '#souvenirs':

					$.ajax({
						url: Menus_Content.sUrl + 'get_souvenirs_cat.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){
								
								$.each(data.categories, function(k,v){
									if(v.id == id){
										src += 'souvenirs_cat/' + v.img;
										//banner = '<div class="banner" style="background-image:url('+src+');"></div>';
									}
								});

								$(selector).css({"background-image":"url("+src+")"});

								return true;
							}
						}
					});
					break;
				case '#in-room-dining':
					src = 'http://119.73.222.42:8080/palmobiledata/images/new/landscape/';
					$.ajax({
						url: Menus_Content.sUrl + 'get_inroomdining_cat.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){
								
								$.each(data.categories, function(k,v){
									if(v.id == id){
										src += v.img;
										//banner = '<div class="banner" style="background-image:url('+src+');"></div>';
									}
								});

								$(selector).css({"background-image":"url("+src+")"});

								return true;
							}
						}
					});
					break;
				case '#accommodation':
					src += 'accommodation/' + img;
					banner = '<div class="banner" style="background-image:url('+src+');"></div>';
					if( banner_exist == true )
						$(selector + ' .banner').css({"background-image":"url("+src+")"});
					else
						$(selector).append(banner);
					break;
				case '#room-directory':
					src += 'roomdirectory/' + img;
					banner = '<div class="banner" style="background-image:url('+src+');"></div>';
					if( banner_exist == true )
						$(selector + ' .banner').css({"background-image":"url("+src+")"});
					else
						$(selector).append(banner);
					break;
				case '#arts-and-culture':
				case '#attractions':
				case '#golf':
				case '#nature-wildlife':
				case '#nightlife':
				case '#shopping':
					src += 'explore/' + img;
					banner = '<div class="banner" style="background-image:url('+src+');"></div>';
					if( banner_exist == true )
						$(selector + ' .banner').css({"background-image":"url("+src+")"});
					else
						$(selector).append(banner);
					break;
				case '#facilities':
					src += 'facilities/' + img;
					banner = '<div class="banner" style="background-image:url('+src+');"></div>';
					if( banner_exist == true )
						$(selector + ' .banner').css({"background-image":"url("+src+")"});
					else
						$(selector).append(banner);
					break;
				case '#hotel-gallery':
					src = 'http://119.73.222.42:8080/palmobiledata/images/gallery/acc1.jpg';
					banner = '<div class="hotel-gallery-mask"></div><div class="banner" style="background-image:url('+src+');"></div>';
					if( banner_exist == true )
						$(selector + ' .hotel-gallery-content .banner').css({"background-image":"url("+src+")"});
					else
						$(selector).append(banner);
					break;
				case '#az-directory':
					src += 'azdirectory/beach_villa.jpg';
					banner = '<div class="banner" style="background-image:url('+src+');"></div>';
					if( banner_exist == true )
						$(selector + ' .banner').css({"background-image":"url("+src+")"});
					else
						$(selector).append(banner);
					break;
				case '#e-laundry':
					src += 'elaundry/';
					$.ajax({
						url: Menus_Content.sUrl + 'get_elaundry_cat.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){
								
								$.each(data.categories, function(k,v){
									if(v.id == id){
										src += v.img;
										//banner = '<div class="banner" style="background-image:url('+src+');"></div>';
									}
								});

								$(selector).css({"background-image":"url("+src+")"});

								return true;
							}
						}
					});
					break;
				case '#request-amenities':
					src += 'room_cleaning/';
					$.ajax({
						url: Menus_Content.sUrl + 'get_roomcleaning_cat.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){
								
								$.each(data.categories, function(k,v){
									if(v.id == id){
										src += v.img;
										//banner = '<div class="banner" style="background-image:url('+src+');"></div>';
									}
								});

								$(selector).css({"background-image":"url("+src+")"});

								return true;
							}
						}
					});
					break;
				default:
					break;
			}
			
		},
		menuCarousel: function(module,menuParam,contentParam){
			var selector = module + ' .ui-content', bannerImg, currentCatId;
			switch(module){
				case '#daily_activities':
				case '#spa':
				case '#souvenirs':
				case '#hotel-gallery':
				case '#in-room-dining':
				case '#guest-services':
				case '#az-directory':
				case '#e-laundry':
				case '#request-amenities':
					$.ajax({
						url: Menus_Content.sUrl + menuParam,
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){
								var ctr = 1;
								$(selector).append('<ul data-parent="'+module.replace('#','')+'" class="carousel-menu">');
								$.each(data.categories, function(k,v){
									if( ctr == 1 ){
										currentCatId = v.id;
										bannerImg = v.img;
									}

									$(selector + ' ul.carousel-menu').append('<li data-name="'+v.group_description+'" id="'+ v.id +'"><span>' + v.group_description + '</span>');
									ctr+=1;
								});
								$(selector + ' ul.carousel-menu').menu_cycle(HotelMenus);
								HotelMenus.banner(module,false,currentCatId);
							}
						}
					}).done(function(){
						//console.log(bannerImg);
						HotelMenus.contents(module,currentCatId,false,bannerImg);
					});
					break;
				case '#accommodation':
					$.ajax({
						url: Menus_Content.sUrl + menuParam,
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){
								var ctr = 1;
								$(selector).append('<ul data-parent="'+module.replace('#','')+'" class="carousel-menu">');
								$.each(data.accomodation, function(k,v){
									if( ctr == 1 ){
										currentCatId = v.id;
										bannerImg = v.img;
									}

									$(selector + ' ul.carousel-menu').append('<li data-name="'+v.group_description+'" id="'+ v.id +'"><span>' + v.group_description + '</span>');
									ctr+=1;
								});
								$(selector + ' ul.carousel-menu').menu_cycle(HotelMenus);
								//HotelMenus.banner(module,bannerImg);
							}
						}
					}).done(function(){
						//console.log(bannerImg);
						HotelMenus.contents(module,currentCatId,false);
					});
					break;
				case '#room-directory':
					$.ajax({
						url: Menus_Content.sUrl + menuParam,
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){
								var ctr = 1;
								$(selector).append('<ul data-parent="'+module.replace('#','')+'" class="carousel-menu">');
								$.each(data.roomdirectory, function(k,v){
									//console.log(v);
									if( ctr == 1 ){
										currentCatId = v.id;
										bannerImg = v.img;
									}

									$(selector + ' ul.carousel-menu').append('<li data-name="'+v.group_description+'" id="'+ v.id +'"><span>' + v.group_description + '</span>');
									ctr+=1;

								});
								$(selector + ' ul.carousel-menu').menu_cycle(HotelMenus);
								//HotelMenus.banner(module,bannerImg);
							}
						}
					}).done(function(){
						//console.log(bannerImg);
						HotelMenus.contents(module,currentCatId,false);
					});
					break;
				case '#arts-and-culture':
				case '#attractions':
				case '#golf':
				case '#nature-wildlife':
				case '#nightlife':
				case '#shopping':
					$.ajax({
						url: Menus_Content.sUrl + menuParam,
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){
								var ctr = 1;
								$(selector).append('<ul data-parent="'+module.replace('#','')+'" class="carousel-menu">');
								$.each(data.explore, function(k,v){
									//console.log(v);
									if( ctr == 1 ){
										currentCatId = v.id;
										bannerImg = v.img;
									}

									$(selector + ' ul.carousel-menu').append('<li data-name="'+v.group_description+'" id="'+ v.id +'"><span>' + v.group_description + '</span>');
									ctr+=1;

								});
								$(selector + ' ul.carousel-menu').menu_cycle(HotelMenus);
								//HotelMenus.banner(module,bannerImg);
							}
						}
					}).done(function(){
						//console.log(bannerImg);
						HotelMenus.contents(module,currentCatId,false);
					});
					break;
				case '#facilities':
					$.ajax({
						url: Menus_Content.sUrl + menuParam,
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){
								var ctr = 1;
								$(selector).append('<ul data-parent="'+module.replace('#','')+'" class="carousel-menu">');
								$.each(data.facilities, function(k,v){
									if( ctr == 1 ){
										currentCatId = v.id;
										bannerImg = v.img;
									}

									$(selector + ' ul.carousel-menu').append('<li data-name="'+v.group_description+'" id="'+ v.id +'"><span>' + v.group_description + '</span>');
									ctr+=1;
								});
								$(selector + ' ul.carousel-menu').menu_cycle(HotelMenus);
							}
						}
					}).done(function(){
						//console.log(bannerImg);
						HotelMenus.contents(module,currentCatId,false);
					});
					break;
			}
		},
		contents: function(module,id,all){ 

			if( module.indexOf('#') < 0 )
				module = '#' + module;

			var selector = module + ' .ui-content', ch_dir;

			switch(module){
				case '#daily_activities':
					
					HotelMenus.banner(module,false,id);

					$.mobile.loading('show',{ theme: 'b', text: "Loading Activities...", textVisible: true });
					ch_dir = '';
					if( $(selector).find('div.table-wrapper').length > 0 ){
						$(selector).find('div.table-wrapper').remove();
					}
					$.ajax({
						url: Menus_Content.sUrl + 'get_activities.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 
								$(selector).append('<div class="table-wrapper"><table class="table" id="'+module.replace('#','')+'">');
								$.each(data.items, function(k,v){
									if( id == v.group_id ){
										var html = '<tr>';//623 56 228
											html += '<td nowrap>'+v.time+'</td>';
											html += '<td>'+v.name+'</td>';
											html += '<td>'+v.price+'</td>';
											html += '<td>'+v.venue+'</td>';
											html += '</tr>';
										$(selector + ' .table-wrapper table').append(html);
									}
								});
							}
							$.mobile.loading('hide');
						}
					});
					break;

				case '#accommodation':
					$.mobile.loading('show',{ theme: 'b', text: "Loading Accommodation...", textVisible: true });
					if( $(selector).find('div.table-wrapper').length > 0 ){
						$(selector).find('div.table-wrapper').remove();
					}
					$.ajax({
						url: Menus_Content.sUrl + 'get_accomodation.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 
								var div_id = module.replace('#','')+'-'+id;
								$(selector).append('<div class="table-wrapper"><div id="'+div_id+'">');
								$.each(data.accomodation, function(k,v){
									if( id == v.id ){
										HotelMenus.banner(module,v.img);
										var html = v.desc;
										$(selector + ' .table-wrapper div#'+div_id).append(html);
									}
								});
							}
							$.mobile.loading('hide');
						}
					});
					break;
				case '#facilities':
					$.mobile.loading('show',{ theme: 'b', text: "Loading Facilities...", textVisible: true });
					if( $(selector).find('div.table-wrapper').length > 0 ){
						$(selector).find('div.table-wrapper').remove();
					}
					$.ajax({
						url: Menus_Content.sUrl + 'get_facilities.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 
								var div_id = module.replace('#','')+'-'+id;
								$(selector).append('<div class="table-wrapper"><div id="'+div_id+'">');
								$.each(data.facilities, function(k,v){
									if( id == v.id ){
										HotelMenus.banner(module,v.img);
										var html = v.desc;
										$(selector + ' .table-wrapper div#'+div_id).append(html);
									}
								});
							}
							$.mobile.loading('hide');
						}
					});
					break;
				case '#spa':
					
					$.mobile.loading('show',{ theme: 'b', text: "Loading Spa...", textVisible: true });

					HotelMenus.banner(module,false,id);

					var src = 'http://119.73.222.42:8080/palmobiledata/images/landscape/spa_cat/';

					if( $(selector).find('div.table-wrapper').length > 0 ){
						$(selector).find('div.table-wrapper').remove();
					}
					$.ajax({
						url: Menus_Content.sUrl + 'get_spa.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 
								$(selector + ' .cart').before('<div class="table-wrapper ui-grid-c">');
								var ctr = 1, page_cnt = 1, block = 'ui-block-a', dialogs ='';
								$.each(data.items, function(k,v){
									
									var page_id = 'spa-dialog-'+v.group_id+'-'+page_cnt;

									if( id == v.group_id ){
										
										//console.log(v);

										if(ctr == 2){
											block = 'ui-block-b';
										}
										if(ctr == 3){
											block = 'ui-block-c';
										}
										if(ctr == 4){
											block = 'ui-block-d';
											ctr = 0;
										}

										var html = '<div class="'+block+'" style="text-align:center;"><div class="spa-wrapper" style="position:relative;"><img src="'+src+v.img+'">';
										html += '<p class="overlay-title">'+v.name+'</p></div>';
										html += '<a href="#'+page_id+'" data-rel="dialog" class="add-to-cart" data-price="'+v.price+'"><img src="images/btns/btn_add_to_carts.png"></a>';
										$(selector + ' .table-wrapper.ui-grid-c').append(html);

										ctr+=1;
									}

									//create dialogs
									dialogs += '<div data-role="page" id="'+page_id+'" data-theme="a">'
												+	'<div><a role="button" href="javascript:void(0)" data-page_id="'+page_id+'" id="close-dialog" class="ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-left" data-transition="pop" data-direction="reverse">Close</a></div>'
												+ 	'<div class="spa-dialog-img"><img src="' + src+v.img + '"></div>'
												+ 	'<h2 align="center">'+v.name+'</h2>'
												+ 	'<p align="center">Quantity</p>'
												+ 	'<div align="center" class="qty">'
												+ 		'<span><a href="javascript:void(0);" data-page_id="'+page_id+'" data-price="'+v.price+'" class="minus-qty"><img src="images/btn_minus.png"></a></span>' 
												+ 		'<span id="'+page_id+'_qty" class="qty_handler">1</span>'
												+ 		'<span><a href="javascript:void(0);" data-page_id="'+page_id+'" data-price="'+v.price+'" class="add-qty"><img src="images/btn_plus.png"></a></span>'
												+ 	'</div>'
												+ 	'<div align="center" class="price">Price <b style="margin-left:8px;">$' + v.price + '.00</b></div>'
												+ 	'<div align="center" class="cart">'
												+		'<a href="javascript:void(0);" class="dialog-add-to-cart" data-price="'+v.price+'" data-page_id="'+page_id+'" data-parent="'+module+'" data-name="'+v.name+'">'
												+			'<img src="images/cart/btn_cart.png">'
												+		'</a>'
												+	'</div>'
												+ 	'<div align="center" class="desc">'
												+		'<p>' + v.desc + '</p>'
												+	'</div>'
												+ '</div>';
												
									//console.log(v);
									page_cnt+=1;
									//} //endif;
								});
								$(selector).parent().after(dialogs);
							}
							$.mobile.loading('hide');
						}
					});
					break;

				case '#souvenirs':
				
					$.mobile.loading('show',{ theme: 'b', text: "Loading Souvenirs...", textVisible: true });

					HotelMenus.banner(module,false,id);

					var src = 'http://119.73.222.42:8080/palmobiledata/images/cart_items/';

					if( $(selector).find('div.table-wrapper').length > 0 ){
						$(selector).find('div.table-wrapper').remove();
					}
					$.ajax({
						url: Menus_Content.sUrl + 'get_souvenirs.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 
								$(selector + ' .cart').before('<div class="table-wrapper ui-grid-c">');
								var ctr = 1, page_cnt = 1, block = 'ui-block-a', dialogs ='';
								$.each(data.items, function(k,v){
									
									var page_id = 'souvenirs-dialog-'+v.group_id+'-'+page_cnt;

									if( id == v.group_id ){
										
										//console.log(v);

										if(ctr == 2){
											block = 'ui-block-b';
										}
										if(ctr == 3){
											block = 'ui-block-c';
										}
										if(ctr == 4){
											block = 'ui-block-d';
											ctr = 0;
										}

										var html = '<a href="#'+page_id+'" data-rel="dialog" class="add-to-cart" data-price="'+v.price+'"><div class="'+block+'" style="text-align:center;"><div class="spa-wrapper" style="position:relative;"><img src="'+src+v.img+'">';
										html += '<p class="overlay-title">'+v.name+'</p></div>';
										html += '<img src="images/btns/btn_add_to_carts.png"></a>';
										$(selector + ' .table-wrapper.ui-grid-c').append(html);

										ctr+=1;
									}

									//create dialogs
									dialogs += '<div data-role="page" id="'+page_id+'" data-theme="a">'
												+	'<div><a role="button" href="javascript:void(0)" data-page_id="'+page_id+'" id="close-dialog" class="ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-left" data-transition="pop" data-direction="reverse">Close</a></div>'
												+ 	'<div class="spa-dialog-img"><img src="' + src+v.img + '"></div>'
												+ 	'<h2 align="center">'+v.name+'</h2>'
												+ 	'<p align="center">Quantity</p>'
												+ 	'<div align="center" class="qty">'
												+ 		'<span><a href="javascript:void(0);" data-page_id="'+page_id+'" data-price="'+v.price+'" class="minus-qty"><img src="images/btn_minus.png"></a></span>' 
												+ 		'<span id="'+page_id+'_qty" class="qty_handler">1</span>'
												+ 		'<span><a href="javascript:void(0);" data-page_id="'+page_id+'" data-price="'+v.price+'" class="add-qty"><img src="images/btn_plus.png"></a></span>'
												+ 	'</div>'
												+ 	'<div align="center" class="price">Price <b style="margin-left:8px;">$' + v.price + '.00</b></div>'
												+ 	'<div align="center" class="cart">'
												+		'<a href="javascript:void(0);" class="dialog-add-to-cart" data-price="'+v.price+'" data-page_id="'+page_id+'" data-parent="'+module+'" data-name="'+v.name+'">'
												+			'<img src="images/cart/btn_cart.png">'
												+		'</a>'
												+	'</div>'
												+ 	'<div align="center" class="desc">'
												+		'<p>' + v.desc + '</p>'
												+	'</div>'
												+ '</div>';
												
									//console.log(v);
									page_cnt+=1;
									//} //endif;
								});

								$(selector).parent().after(dialogs);
							}
							$.mobile.loading('hide');
						}
					});
					break;
				case '#hotel-gallery':

					$.mobile.loading('show',{ theme: 'b', text: "Loading Gallery...", textVisible: true });

					HotelMenus.banner(module,false,id);

					var src = 'http://119.73.222.42:8080/palmobiledata/images/gallery/';

					if( $(selector).find('div.imgcycle-wrapper').length > 0 ){
						$(selector).find('div.imgcycle-wrapper').remove();
					}

					$.ajax({
						url: Menus_Content.sUrl + 'get_gallery.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							$(selector).append('<div class="imgcycle-wrapper"><ul class="img_cycle">');
							var html = '', ctr = 1;
							if( data.status == 200){ 
								//console.log(id);
								if( id != 1 ){
									$.each(data.items, function(k,v){
										if( id == v.group_id ){
											html += '<li class="gallery-img"><a href="javascript:void(0);" data-parent="hotel-gallery" data-src="'+src+v.picture+'" class="gallery-img-btn"><img src="'+src+v.picture+'"></a></li>';
											ctr += 1;
										}
									});
								}else if(id == 1){
									//select all
									$.each(data.items, function(k,v){
										html += '<li class="gallery-img"><a href="javascript:void(0);" data-parent="hotel-gallery" data-src="'+src+v.picture+'" class="gallery-img-btn"><img src="'+src+v.picture+'"></a></li>';
										ctr += 1;
									});
								}
							}console.log(html);
							$(selector + ' .imgcycle-wrapper ul.img_cycle').append(html);
							$(selector + ' .imgcycle-wrapper ul.img_cycle').img_cycle();
							$.mobile.loading('hide');
						}
					});
					break;

				case '#in-room-dining':
				
					$.mobile.loading('show',{ theme: 'b', text: "Loading Souvenirs...", textVisible: true });

					HotelMenus.banner(module,false,id);

					var src = 'http://119.73.222.42:8080/palmobiledata/images/cart_items/';

					if( $(selector).find('div.table-wrapper').length > 0 ){
						$(selector).find('div.table-wrapper').remove();
					}
					$.ajax({
						url: Menus_Content.sUrl + 'get_inroomdining.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 
								$(selector + ' .cart').before('<div class="table-wrapper ui-grid-c">');
								var ctr = 1, page_cnt = 1, block = 'ui-block-a', dialogs ='';
								$.each(data.items, function(k,v){
									
									var page_id = 'in-room-dining-dialog-'+v.group_id+'-'+page_cnt;

									if( id == v.group_id ){
										
										//console.log(v);

										if(ctr == 2){
											block = 'ui-block-b';
										}
										if(ctr == 3){
											block = 'ui-block-c';
										}
										if(ctr == 4){
											block = 'ui-block-d';
											ctr = 0;
										}

										var html = '<a href="#'+page_id+'" data-rel="dialog" class="add-to-cart" data-price="'+v.price+'"><div class="'+block+'" style="text-align:center;"><div class="spa-wrapper" style="position:relative;"><img src="'+src+v.img+'">';
										html += '<p class="overlay-title">'+v.name+'</p></div>';
										html += '<img src="images/btns/btn_add_to_carts.png"></a>';
										$(selector + ' .table-wrapper.ui-grid-c').append(html);

										ctr+=1;
									}

									//create dialogs
									dialogs += '<div data-role="page" id="'+page_id+'" data-theme="a">'
												+	'<div><a role="button" href="javascript:void(0)" data-page_id="'+page_id+'" id="close-dialog" class="ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-left" data-transition="pop" data-direction="reverse">Close</a></div>'
												+ 	'<div class="spa-dialog-img"><img src="' + src+v.img + '"></div>'
												+ 	'<h2 align="center">'+v.name+'</h2>'
												+ 	'<p align="center">Quantity</p>'
												+ 	'<div align="center" class="qty">'
												+ 		'<span><a href="javascript:void(0);" data-page_id="'+page_id+'" data-price="'+v.price+'" class="minus-qty"><img src="images/btn_minus.png"></a></span>' 
												+ 		'<span id="'+page_id+'_qty" class="qty_handler">1</span>'
												+ 		'<span><a href="javascript:void(0);" data-page_id="'+page_id+'" data-price="'+v.price+'" class="add-qty"><img src="images/btn_plus.png"></a></span>'
												+ 	'</div>'
												+ 	'<div align="center" class="price">Price <b style="margin-left:8px;">$' + v.price + '.00</b></div>'
												+ 	'<div align="center" class="cart">'
												+		'<a href="javascript:void(0);" class="dialog-add-to-cart" data-price="'+v.price+'" data-page_id="'+page_id+'" data-parent="'+module+'" data-name="'+v.name+'">'
												+			'<img src="images/cart/btn_cart.png">'
												+		'</a>'
												+	'</div>'
												+ 	'<div align="center" class="desc">'
												+		'<p>' + v.desc + '</p>'
												+	'</div>'
												+ '</div>';
												
									//console.log(v);
									page_cnt+=1;
									//} //endif;
								});

								$(selector).parent().after(dialogs);
							}
							$.mobile.loading('hide');
						}
					});
					break;

				case '#az-directory':

					$.mobile.loading('show',{ theme: 'b', text: "Loading Directories...", textVisible: true });

					if( $(selector).find('div.table-wrapper').length > 0 ){
						$(selector).find('div.table-wrapper').remove();
					}

					$.ajax({
						url: Menus_Content.sUrl + 'get_azdirectory.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 
								var div_id = module.replace('#','')+'-'+id, html = '', t = '';
								$(selector).append('<div class="table-wrapper"><div id="'+div_id+'">');
								$.each(data.items, function(k,v){
									if( id == v.group_id ){ 
										//console.log(v);
										if( t != v.name.charAt(0) ){
											html += '<div>'
													+ '<h2 style="color:#0087FF;" class="'+v.name.charAt(0)+'">'+v.name.charAt(0)+'</h2>'
													+ '<h4 style="border-top: 1px solid #ddd;">'+v.name+'</h4>'
													+ '<p>'+v.desc+'</p>'
													+ '</div>';
										}else{
											html += '<div>'
													//+ '<h2 style="color:#0087FF;" class="'+v.name.charAt(0)+'">'+v.name.charAt(0)+'</h2>'
													+ '<h4 style="border-top: 1px solid #ddd;">'+v.name+'</h4>'
													+ '<p>'+v.desc+'</p>'
													+ '</div>';
										}

										t = v.name.charAt(0);

 									}
								});

								$(selector + ' .table-wrapper div').append(html);

							}
							$.mobile.loading('hide');
						}
					});
					break;

				case '#e-laundry':
					
					$.mobile.loading('show',{ theme: 'b', text: "Loading Laundries...", textVisible: true });

					HotelMenus.banner(module,false,id);

					var src = 'http://119.73.222.42:8080/palmobiledata/images/cart_items/';

					if( $(selector).find('div.table-wrapper').length > 0 ){
						$(selector).find('div.table-wrapper').remove();
					}
					$.ajax({
						url: Menus_Content.sUrl + 'get_elaundry.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 

								$(selector + ' .cart').before('<div class="table-wrapper ui-grid-c">');
								var ctr = 1, page_cnt = 1, block = 'ui-block-a', dialogs ='';

								$.each(data.laundries, function(k,v){
									
									var page_id = 'e-laundry-'+v.group_id+'-'+page_cnt;
									
									var	price = v.dry_price;
									if (price === undefined || price === null) {
									    price = '0.00';
									}

									if( id == v.group_id ){
										if(ctr == 2){
											block = 'ui-block-b';
										}
										if(ctr == 3){
											block = 'ui-block-c';
										}
										if(ctr == 4){
											block = 'ui-block-d';
											ctr = 0;
										}

										var html = '<div class="'+block+'" style="text-align:center;"><div class="spa-wrapper" style="position:relative;"><img src="'+src+v.img+'">';
										html += '<p class="overlay-title">'+v.name+'</p></div>';
										html += '<a href="#'+page_id+'" data-rel="dialog" class="add-to-cart" data-price="'+price+'"><img src="images/btns/btn_add_to_carts.png"></a>';
										$(selector + ' .table-wrapper.ui-grid-c').append(html);

										ctr+=1;
									}

									//create dialogs
									dialogs += '<div data-role="page" id="'+page_id+'" data-theme="a">'
												+	'<div><a role="button" href="javascript:void(0)" data-page_id="'+page_id+'" id="close-dialog" class="ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-left" data-transition="pop" data-direction="reverse">Close</a></div>'
												+ 	'<div class="spa-dialog-img"><img src="' + src+v.img + '"></div>'
												+ 	'<h2 align="center">'+v.name+'</h2>'
												+ 	'<p align="center">Quantity</p>'
												+ 	'<div align="center" class="qty">'
												+ 		'<span><a href="javascript:void(0);" data-page_id="'+page_id+'" data-price="'+price+'" class="minus-qty"><img src="images/btn_minus.png"></a></span>' 
												+ 		'<span id="'+page_id+'_qty" class="qty_handler">1</span>'
												+ 		'<span><a href="javascript:void(0);" data-page_id="'+page_id+'" data-price="'+price+'" class="add-qty"><img src="images/btn_plus.png"></a></span>'
												+ 	'</div>'
												+ 	'<div align="center" class="price">Price <b style="margin-left:8px;">$' + price + '</b></div>'
												+ 	'<div align="center" class="cart">'
												+		'<a href="javascript:void(0);" class="dialog-add-to-cart" data-price="'+price+'" data-page_id="'+page_id+'" data-parent="'+module+'" data-name="'+v.name+'">'
												+			'<img src="images/cart/btn_cart.png">'
												+		'</a>'
												+	'</div>'
												+ 	'<div align="center" class="desc">'
												+		'<p>' + v.desc + '</p>'
												+	'</div>'
												+ '</div>';
												
									//console.log(v);
									page_cnt+=1;
									//} //endif;
								});
								$(selector).parent().after(dialogs);
							}
							$.mobile.loading('hide');
						}
					});
					break;

				case '#request-amenities':
					
					$.mobile.loading('show',{ theme: 'b', text: "Loading Amenities...", textVisible: true });

					HotelMenus.banner(module,false,id);

					var src = 'http://119.73.222.42:8080/palmobiledata/images/cart_items/';

					if( $(selector).find('div.table-wrapper').length > 0 ){
						$(selector).find('div.table-wrapper').remove();
					}
					$.ajax({
						url: Menus_Content.sUrl + 'get_roomcleaning.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 

								$(selector + ' .cart').before('<div class="table-wrapper ui-grid-c">');
								var ctr = 1, page_cnt = 1, block = 'ui-block-a', dialogs ='';

								$.each(data.items, function(k,v){
									
									var page_id = 'request-amenities-'+v.group_id+'-'+page_cnt;
									
									var	price = v.price;
									if (price === undefined || price === null) {
									    price = '0.00';
									}

									if( id == v.group_id ){
										if(ctr == 2){
											block = 'ui-block-b';
										}
										if(ctr == 3){
											block = 'ui-block-c';
										}
										if(ctr == 4){
											block = 'ui-block-d';
											ctr = 0;
										}

										var html = '<div class="'+block+'" style="text-align:center;"><div class="spa-wrapper" style="position:relative;"><img src="'+src+v.img+'">';
										html += '<p class="overlay-title">'+v.name+'</p></div>';
										html += '<a href="#'+page_id+'" data-rel="dialog" class="add-to-cart" data-price="'+price+'"><img src="images/btns/btn_add_to_carts.png"></a>';
										$(selector + ' .table-wrapper.ui-grid-c').append(html);

										ctr+=1;
									}

									//create dialogs
									dialogs += '<div data-role="page" id="'+page_id+'" data-theme="a">'
												+	'<div><a role="button" href="javascript:void(0)" data-page_id="'+page_id+'" id="close-dialog" class="ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-left" data-transition="pop" data-direction="reverse">Close</a></div>'
												+ 	'<div class="spa-dialog-img"><img src="' + src+v.img + '"></div>'
												+ 	'<h2 align="center">'+v.name+'</h2>'
												+ 	'<p align="center">Quantity</p>'
												+ 	'<div align="center" class="qty">'
												+ 		'<span><a href="javascript:void(0);" data-page_id="'+page_id+'" data-price="'+price+'" class="minus-qty"><img src="images/btn_minus.png"></a></span>' 
												+ 		'<span id="'+page_id+'_qty" class="qty_handler">1</span>'
												+ 		'<span><a href="javascript:void(0);" data-page_id="'+page_id+'" data-price="'+price+'" class="add-qty"><img src="images/btn_plus.png"></a></span>'
												+ 	'</div>'
												+ 	'<div align="center" class="price">Price <b style="margin-left:8px;">$' + price + '</b></div>'
												+ 	'<div align="center" class="cart">'
												+		'<a href="javascript:void(0);" class="dialog-add-to-cart" data-price="'+price+'" data-page_id="'+page_id+'" data-parent="'+module+'" data-name="'+v.name+'">'
												+			'<img src="images/cart/btn_cart.png">'
												+		'</a>'
												+	'</div>'
												+ 	'<div align="center" class="desc">'
												+		'<p>' + v.desc + '</p>'
												+	'</div>'
												+ '</div>';
												
									page_cnt+=1;

								});

								$(selector).parent().after(dialogs);
							}
							$.mobile.loading('hide');
						}
					});
					break;
				case '#room-directory':
					$.mobile.loading('show',{ theme: 'b', text: "Loading Room Directories...", textVisible: true });
					if( $(selector).find('div.table-wrapper').length > 0 ){
						$(selector).find('div.table-wrapper').remove();
					}
					$.ajax({
						url: Menus_Content.sUrl + 'get_roomdirectory.php',
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 
								var div_id = module.replace('#','')+'-'+id;
								$(selector).append('<div class="table-wrapper"><div id="'+div_id+'">');
								$.each(data.roomdirectory, function(k,v){ 
									//console.log(v);
									if( id == v.id ){
										HotelMenus.banner(module,v.img);
										var html = v.desc;
										$(selector + ' .table-wrapper div#'+div_id).append(html);
									}
								});
							}
							$.mobile.loading('hide');
						}
					});
					break;
				case '#arts-and-culture':
				case '#attractions':
				case '#golf':
				case '#nature-wildlife':
				case '#nightlife':
				case '#shopping':
					$.mobile.loading('show',{ theme: 'b', text: "Loading Explore...", textVisible: true });

					//def to artsculture
					var file = 'get_artsculture.php';
					if(module == "#attractions")
						file = 'get_attractions.php';
					if(module == "#golf")
						file = 'get_golf.php';
					if(module == "#nature-wildlife")
						file = 'get_nature.php';
					if(module == "#nightlife")
						file = 'get_nightlife.php';
					if(module == "#shopping")
						file = 'get_shopping.php';

					if( $(selector).find('div.table-wrapper').length > 0 )
						$(selector).find('div.table-wrapper').remove();
					
					if( $(selector).find('p.btn-navigate').length > 0 )
						$(selector).find('p.btn-navigate').remove();

					$.ajax({
						url: Menus_Content.sUrl + file,
						dataType: 'json',
						crossDomain : true,
						success: function(data){
							if( data.status == 200){ 
								var div_id = module.replace('#','')+'-'+id, navigate = '';
								$(selector).append('<div class="table-wrapper"><div id="'+div_id+'">');
								$.each(data.explore, function(k,v){ 
									//console.log(v);
									if( id == v.id ){
										HotelMenus.banner(module,v.img);
										navigate = '<p class="btn-navigate" align="center"><a href="'+v.direction+'"><img src="images/btn_map.png"></a></p>';
										var html = v.desc;
										$(selector + ' .table-wrapper div#'+div_id).append(html);
									}
								});
								$(selector + ' .table-wrapper').after(navigate);
							}
							$.mobile.loading('hide');
						}
					});
					break;
			}			

		},
		daily_activities: function(){
			HotelMenus.menuCarousel('#daily_activities','get_activities_cat.php');
		},
		accommodation: function(){
			HotelMenus.menuCarousel('#accommodation','get_accomodation.php');
		},
		facilities: function(){
			HotelMenus.menuCarousel('#facilities','get_facilities.php');
		},
		spa: function(){
			HotelMenus.menuCarousel('#spa','get_spa_cat.php');
		},
		souvenirs: function(){
			HotelMenus.menuCarousel('#souvenirs','get_souvenirs_cat.php');
		},
		gallery: function(){
			HotelMenus.menuCarousel('#hotel-gallery','get_gallery_cat.php');
		},
		hotel_map: function(){
			$('#hotel-map .ui-content').append('<div id="map"><img src="http://119.73.222.42:8080/palmobiledata/images/landscape/hotel_map_portrait.jpg"></div>');
		},
		inroomdining: function(){
			HotelMenus.menuCarousel('#in-room-dining','get_inroomdining_cat.php');
		},
		az_directory: function(){
			HotelMenus.menuCarousel('#az-directory','get_azdir_cat.php');
		},
		e_laundry: function(){
			HotelMenus.menuCarousel('#e-laundry','get_elaundry_cat.php');
		},
		request_amenities: function(){
			HotelMenus.menuCarousel('#request-amenities','get_roomcleaning_cat.php');
		},
		room_directory: function(){
			HotelMenus.menuCarousel('#room-directory','get_roomdirectory.php');
		},
		arts_and_culture: function(){
			HotelMenus.menuCarousel('#arts-and-culture','get_artsculture.php');
		},
		attractions: function(){
			HotelMenus.menuCarousel('#attractions','get_attractions.php');
		},
		golf: function(){
			HotelMenus.menuCarousel('#golf','get_golf.php');
		},
		nature_wildlife: function(){
			HotelMenus.menuCarousel('#nature-wildlife','get_nature.php');
		},
		nightlife: function(){
			HotelMenus.menuCarousel('#nightlife','get_nightlife.php');
		},
		shopping: function(){
			HotelMenus.menuCarousel('#shopping','get_shopping.php');
		},
		enable_cart: function(){

			//close dialog
			$(document).on('click','#close-dialog',function(e){
				e.preventDefault();
				$('#'+$(this).data('page_id')).dialog( "close" );
			});

			//add to cart
			$(document).on('click','.ui-page-active .dialog-add-to-cart',function(e){
				e.preventDefault();

				//var cart_lstr = '#cart-queued-items';
				var cart_lstr = $(this).data('parent')+'-queued-items';
				var amt = parseFloat( $('#' + $(this).data('page_id') + '_qty' ).html() ) * parseFloat($(this).data('price'));
				var cart_itm = '<div id="itm">'
								+ '<span><a href="javascript:void(0);" class="del-cart-itm"><img src="images/cart/btn_close.png"></a></span>'
								+ '<span class="itm-name" style="padding-right:5px;">'+ $(this).data('name')+'</span>'
								+ '<span class="itm-qty" style="padding-right:5px;">('+ $('#' + $(this).data('page_id') + '_qty' ).html() + 'x) =</span>'
								+ '<span class="itm-price">$'+ amt +'.00</span>'
								+ '</div>';

				$(cart_lstr + ' .empty-cart').hide();

				$(cart_lstr).append(cart_itm);
				$('#' + $(this).data('page_id')).dialog( "close" );
			});

			//remove itm
			$(document).on('click','.del-cart-itm',function(e){
				e.preventDefault();

				$(this).parent().parent('#itm').remove();
				if($('#cart-queued-items').find('#itm').length < 1){
					$('#cart-queued-items').find('.empty-cart').show();
				}
			});

			//enable add/minus item qty
			$(document).on('click','.ui-page-active .add-qty, .ui-page-active .minus-qty',function(e){
				e.preventDefault();

				var pid_selector = '#' + $(this).data('page_id');
				var qty = 1, price = $(this).data('price');

				if( $(this).hasClass('add-qty') ){
					qty = parseFloat($(pid_selector + '_qty').html()) + 1;
				}else if( $(this).hasClass('minus-qty') ){
					qty = parseFloat($(pid_selector + '_qty').html()) - 1;
					if( qty < 1 ){
						qty = 1;
					}
				}

				var amt = qty * price;

				$( pid_selector + ' .price b').html('$'+amt+'.00');
				$( pid_selector + ' .qty_handler').html(qty);
			});

			//enable click on img cycle
			$(document).on('click','.gallery-img .gallery-img-btn', function(e){
				e.preventDefault();
				var parent = '#'+$(this).data('parent');
				var src = $(this).data('src'); console.log($(parent).find('.banner').length);
				$(parent).find('.banner').css({
					'background-image':'url('+src+')'
				});
			});
		}
	}

	$(document).on('ready', function(){
		HotelMenus.init();	
	});

})(jQuery);