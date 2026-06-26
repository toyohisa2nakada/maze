(function($){
	var PieRotate = function(){
		var angle = 0;
		function rotate(){
			$("#piemenu_rotation").css({
				'-webkit-transform'	:'rotate('+angle+'deg)',
				'-moz-transform'	:'rotate('+angle+'deg)',
				'-ms-transform'		:'rotate('+angle+'deg)',
				'-o-transform'		:'rotate('+angle+'deg)',
				'transform'			:'rotate('+angle+'deg)',
				'-webkit-transition':'.2s ease',
				'-moz-transition'	:'.2s ease',
				'-ms-transition'	:'.2s ease',
				'-o-transition'		:'.2s ease',
				'transition'		:'.2s ease',
			});
			setTimeout(function(){
				$("#piemenu_rotation").css({
					'-webkit-transition':'.0s ease',
					'-moz-transition'	:'.0s ease',
					'-ms-transition'	:'.0s ease',
					'-o-transition'		:'.0s ease',
					'transition'		:'.0s ease',
				});
			},0);
/*
			$("#piemenu_container").css({
				'-webkit-transform'	:'rotate('+angle+'deg)',
				'-moz-transform'	:'rotate('+angle+'deg)',
				'-ms-transform'		:'rotate('+angle+'deg)',
				'-o-transform'		:'rotate('+angle+'deg)',
				'transform'			:'rotate('+angle+'deg)',
				'-webkit-transition':'.2s ease',
				'-moz-transition'	:'.2s ease',
				'-ms-transition'	:'.2s ease',
				'-o-transition'		:'.2s ease',
				'transition'		:'.2s ease',
			});
			setTimeout(function(){
				$("#piemenu_container").css({
					'-webkit-transition':'.0s ease',
					'-moz-transition'	:'.0s ease',
					'-ms-transition'	:'.0s ease',
					'-o-transition'		:'.0s ease',
					'transition'		:'.0s ease',
				});
			},0);
*/
		}
		this.right = function(){
			angle += 90;
			rotate();
		};
		this.left = function(){
			angle -= 90;
			rotate();
		};
		this.get = function(){
			return angle;
		}
		this.set = function(a){
			angle = a;
			rotate();
		}
	};
	var pieRotate = new PieRotate();

	$.fn.pieGetAngle = function(){
		return pieRotate.get();
	};
	$.fn.pieSetAngle = function(a){
		return pieRotate.set(a);
	}
	$.fn.pieTurnRight = function(){
		pieRotate.right();
	}
	$.fn.pieTurnLeft = function(){
		pieRotate.left();
	}

	$.fn.pieMenu = function(options){
		var angle,
			delay_time,
			ele_angle=[],
			x_pos=[],
			y_pos=[];

		var rotation_container = $("#piemenu_rotation");
		var settings = $.extend({
			'starting_angel'   : '0',
			'angel_difference' : '90',
			'radius':'200',
			'menu_element' : rotation_container.children('.menu_option').children(),
			'menu_button' : rotation_container.children('.menu_button'),
		},options);
		$("#piemenu_container").draggable({
			handle:'.menu_button',
			containment:'parent',
			scroll:false,
		});
/*
		var settings = $.extend({
			'starting_angel'   : '0',
			'angel_difference' : '90',
			'radius':'200',
			'menu_element' : this.children('.menu_option').children(),
			'menu_button' : this.children('.menu_button'),
		},options);
		$("#piemenu_container").draggable({
			handle:'.menu_button',
			containment:'parent',
			scroll:false,
		});
*/

		angle = parseInt(settings.angel_difference)/(settings.menu_element.length-1);
		delay_time = 1/(settings.menu_element.length-1);

		function setPosition(val){
			$(settings.menu_element).each(function(i,ele){
				$(ele).css({
					'position' : 'absolute',
					'left' : (val==0)?0:y_pos[i],
					'top' : (val==0)?0:-x_pos[i],
				});
			});
		}
		$(settings.menu_button).unbind('click',clickHandler);	//remove event if exist

		var clickHandler = function(){
			if($(this).parent().hasClass('active')){
				setPosition(0);
				$(this).parent().removeClass('active');
				$(this).parent().addClass('inactive');
			}else{
				setPosition(1);
				$(this).parent().addClass('active');
				$(this).parent().removeClass('inactive');
			}
			$(this).toggleClass("btn-rotate");
		};
//		$(settings.menu_button).bind('click',clickHandler);

		settings.menu_element.each(function(i,ele){
			ele_angle[i] = (parseInt(settings.starting_angel) + angle*(i))*Math.PI/180;
			x_pos[i] = (settings.radius * Math.sin(ele_angle[i]))+$(ele).height()/2;
			y_pos[i] = (settings.radius * Math.cos(ele_angle[i]))-$(ele).width()/2;
		});
		setPosition(1);
		$(this).parent().addClass('active');
		$(this).parent().removeClass('inactive');
		return this;
	};
})(jQuery);
