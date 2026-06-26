;
(function($){
	$.fn.elementAnimate = function(updateFunc,options){
		var attrClassName = "element_animation_";
		var attrIdName = attrClassName+uuid();
		var selectorClass = "svg["+attrClassName+"]";
		var selectorId = "svg["+attrIdName+"]";
		var context = $(this).context;

		var opt = $.extend({
			startDelay: 500,
			fadeOutDuration: 2000,
			fadeOutType: 'linear',
		},options===undefined?{}:options);

		$(selectorClass,context).remove();

		var target = this[0];

		var style_position_backup = target.style.position;
		target.style.position = 'absolute';

		var finallyFunc = function(sId,ctx){
			return function(){
				if($(sId,ctx)[0]){
					// redraw target element, because blockly's trash box is not show correctly.
					$(target,ctx).toggle();
					$(target,ctx).toggle();
					$(sId,ctx)[0].mousedown = null;
					$(sId,ctx).remove();
					target.style.position = style_position_backup;
				}
			}
		}
		var funallyFuncImpl = finallyFunc(selectorId,context);

		var clone = target.cloneNode(true);
		clone.setAttribute(attrIdName,"true");
		clone.setAttribute(attrClassName,"true");
		$(clone,context).mousedown(funallyFuncImpl);
		$(this).parent().append(clone);
		updateFunc();

		setTimeout(function(){
			$(selectorId,context).fadeOut(
				opt.fadeOutDuration,
				opt.fadeOutType,
				funallyFuncImpl
			);
		},opt.startDelay);
	};

	function uuid(){
		var S4 = function(){
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		}
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4() +S4());
	};
}(jQuery));
