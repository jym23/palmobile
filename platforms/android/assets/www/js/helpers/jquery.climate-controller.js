( function ( $ ) {
	
	$.fn.climateController = function ( options ){

		var defaults = {
			min: 19,
			max: 29,
			cls: 'rotate-',
			selector: this.selector,
			$this: this
		}

		var settings = $.extend({}, defaults, options);

		settings.$this.on('click', '#btn-ctrls img', function(e){
			
			var currValue = $( settings.selector ).find('#cli-ctrl-value').val();
			var prevCls = settings.cls + currValue;

			if( $(this).data('img') == "plus" ){
				if( parseInt(currValue) < settings.max )
					currValue= parseInt(currValue) + 1;
				else
					currValue = settings.max;
			}else{
				if( parseInt(currValue) > settings.min )
					currValue = parseInt(currValue) - 1;
				else
					currValue = settings.min;
			}

			//construct new class
			var setNewClass = settings.cls + currValue;

			//remove prev class if exist to rotate pointer
			if( $(settings.selector + ' #climate-handler').hasClass(prevCls) )
				$(settings.selector + ' #climate-handler').removeClass(prevCls);

			//add class to rotate the pointer
			$(settings.selector + ' #climate-handler').addClass(setNewClass);

			//set new value
			$( settings.selector ).find('#climate-value').html(currValue + '&deg;C');
			$( settings.selector ).find('#cli-ctrl-value').val(currValue);
			
		});

	}

}(jQuery));