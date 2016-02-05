( function($){
	$.fn.menu_cycle = function(obj){

		var left;
		var selector = this.selector;
		var module = $(selector).data('parent'); 
		var selectorParent = $(this).parent();
		var baseWidth = $(window).width();
		var eachWidth = baseWidth / 3;
		var liCnt = $(selector + ' li').length;

		if( liCnt <= 3 ){

			var LastChild = $(selector + ' li:last').clone();
			$(selector + ' li:first').before(LastChild);

			//get 2nd to the last item
			var scnd = $(selector + ' li:last')[0].previousElementSibling.id;
			var scndLastChild = $(selector + ' li#'+scnd).clone();
			$(selector + ' li:first').before(scndLastChild);

		}else{
			$(selector + ' li:first').before($(selector + ' li:last'));
			$(selector + ' li:first').before($(selector + ' li:last'));
		}

		var fullWidth = $(selector + ' li').length * eachWidth;
		$(selector + ' li:nth-child(3)').addClass('selected');

		//set style on ul/menu
		this.css({
			'min-width':'100%',
			'width':fullWidth,
			'height':50,
			'overflow':'hidden',
			'position':'fixed',
			'top': 79,
			'left': -eachWidth,
			'z-index':2,
			'list-style-type':'none',
			'margin':'0',
			'padding':'0',
			'text-align':'center',
			'color':'#fff',
			'background-color':'rgba(0,0,0,0.5)'
		});

		//set style on li
		this.children().css({
			'float':'left',
			'min-width':50,
			'width':eachWidth,
			'margin':'0',
			'padding':'0',
			'font-weight':'bold',
			'font-size':'14px',
			'height':50,
			'display':'table',
			'overflow':'hidden'
		});

		//set style on li span
		this.children().children().css({
			'display':'block','padding':'5px','display':'table-cell','vertical-align':'middle'
		});
		
		//set css left to negative
		var a = 0 - eachWidth;

		//draggable events
		$(this).draggable({
			axis:'x',
			drag: function(evt, ui){
				//removing selected on movement
				$(selector).find('.selected').removeClass('selected');

				var left = ui.position.left;
				var origLeftVal = ui.originalPosition.left;
				var list = $(selectorParent).find('.channels div[class^="ui-block-"]');
				if( origLeftVal > left ){
					//console.log('from right to left');
				}else{
					//console.log('from left to right');
				}
			},
			stop: function(e, ui){
				//console.log(ui);
				var left = ui.position.left;
				var origLeftVal = ui.originalPosition.left;
				var list = $(selectorParent).find('.channels div[class^="ui-block-"]');
				
				if( origLeftVal > left ){
					//from right to left
					var ab = Math.abs(eachWidth) * 2;
					$(selector).animate({
						left:-ab
					}, function(){
						$(selector + ' li:last').after($(selector + ' li:first'));
						$(selector).css({left:-eachWidth});
						$(selector + ' li:nth-child(3)').addClass('selected');

						var cat_id = $(selector).find('li.selected').attr('id');
						var cat_name = $(selector).find('li.selected').data('name');
						var all = false;
						if(cat_name.toLowerCase() == "all"){
							all = true;
						}
						//Menus_Content.filter_contents(module,cat_id,all);
						obj.contents(module,cat_id,all);
					});
				}else{
					//from left to right
					$(selector).animate({
						left:0
					}, function(){
						$(selector + ' li:first').before($(selector + ' li:last'));
						$(selector).css({left:a});
						$(selector + ' li:nth-child(3)').addClass('selected');

						var cat_id = $(selector).find('li.selected').attr('id');
						var cat_name = $(selector).find('li.selected').data('name');
						var all = false;
						if(cat_name.toLowerCase() == "all"){
							all = true;
						}
						//Menus_Content.contents(module,cat_id,all);
						obj.contents(module,cat_id,all);
					});
				}
			}
		});
	}

	//img_cycle
	$.fn.img_cycle = function(){

		var baseWdth = $(window).width();
		var fullWidth = $(this).find('.gallery-img').length * baseWdth;
		var limit = fullWidth - baseWdth;

		//set styles
		this.css({
			'width':fullWidth,
			'margin':'0',
			'padding':'0',
			'position':'relative',
			'list-style-type':'none',
			'overflow': 'hidden'
		});
		this.children().css({
			'width':baseWdth,
			'float':'left',
			'text-align':'center'
		});

		$(this).draggable({
			axis:'x',
			stop: function(e, ui){
				//console.log(ui);
				var left = ui.position.left;
				var origLeftVal = ui.originalPosition.left;
				if( left > 0 ){
					$(this).animate({
						left:0
					})
				}else if( Math.abs(left) > limit){
					$(this).animate({
						left:-limit
					})
				}
			}
		});
	}

})(jQuery);


