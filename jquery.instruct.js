;
(function($){
	var closedHandlers = [];
	$.fn.instract = function(options){
		var context = $(this).context;
		var opt = $.extend({
			string:'',				// display strings
			font_size:'large',		// font size of display strings
			offsetX:0,				// panel position x relatively to target element
			offsetY:0,				// panel position y relatively to target element
			offsetBottom:0,			// instead of offsetY when display strings is located in the bottom of target element.
			align:'left',			// panel position, left:target left and the panel left are equals.
			arrow:true,				// arrow appears under the panel when true
			beforeTag:'',			// html tag that is inserted before display strings
			afterTag:'',			// html tag that is inserted after display strings
			targetEventToClose:'click',	// event name if it is occurred the panel will be closed.
			closeButton:false,		// close button appears when true
			closedHandler:null,		// when the panel is closed, the handler will be called
			buttons:[],				// option buttons
			buttonHandlers:[],		// option buttons' handlers
		},options===undefined?{}:options);
		
		var id = 'helpString_'+uuid();
		var closeFunc = function(){
			var id = $(this).attr('helpString');
			$('#'+id).remove();
			$(this).off('click',arguments.callee);
			if(undefined!==closedHandlers[id]){
				closedHandlers[id]();
				delete closedHandlers[id];
//console.log("2 size = "+Object.keys(closedHandlers).length);
			}
		};
		if(opt.closedHandler!=null){
			closedHandlers[id] = opt.closedHandler;
		}
		var buttons = '';
		for(var i=0;i<opt.buttons.length;i++){
			buttons += '<button id="'+id+'_op_btn_'+i+'" style="margin-left:10px;">'+opt.buttons[i]+'</button>';
		}
		var help = $(
			'<div id="'+id+'" class="helpString" style="z-index:9999;position:absolute;">'+
				'<div style="background:lightblue;border:solid black;padding:8px;">'+
					opt.beforeTag+
					'<div style="font-size:'+opt.font_size+';float:left;">'+
						opt.string+
					'</div>'+
					opt.afterTag+
					'<div style="clear:both;">'+
					(opt.closeButton==true?
						'<button id="'+id+'_btn" style="margin-top:8px;font-size:x-large;">'+
							MazeLearningMsg.HelpString.CloseButton+
						'</button>':''
					)+
					buttons+
					'</div>'+
				'</div>'+
				(opt.arrow?'<img src="arrow_down.png" style="margin-left:20px;"/>':'')+
			'</div>');
		$(this).parent().append(help[0]);
//console.log("+++ "+($(this).offset().top-$('#'+id).height()+opt.offsetY));
		var downAni = ($(this).offset().top-$('#'+id).height()+opt.offsetY)>0;
		if(downAni == false){
			$('#'+id+' > img').remove();
			$('#'+id).prepend('<img src="arrow_up.png" style="margin-left:20px;"/>');
		}

		var xo = opt.align=='left'?0:(opt.align=='center'?$(help[0]).width()/2:$(help[0]).width());
		help.css({
			position:'absolute',
			left:($(this).offset().left+opt.offsetX-xo),
			top:downAni?-200:$(window).height()+200,
		});
		$(this).attr('helpString',id);
		if(opt.targetEventToClose!=null && opt.targetEventToClose.length!=0){
			$(this).on(opt.targetEventToClose,closeFunc);
		}
		if(opt.closeButton){
			$('#'+id+'_btn').attr('helpString',id);
			$('#'+id+'_btn').on('click',closeFunc);
		}
		for(var i=0;i<opt.buttons.length;i++){
			$('#'+id+'_op_btn_'+i).attr('helpString',id);
			$('#'+id+'_op_btn_'+i).on('click',closeFunc);
			$('#'+id+'_op_btn_'+i).on('click',opt.buttonHandlers[i]);
		}
		var y = downAni ?
			($(this).offset().top-$('#'+id).height()+opt.offsetY):
			($(this).offset().top+$(this).height()+opt.offsetBottom);
		help.animate({
			'top':y,
		},1500,"easeOutBack");
	};

	function uuid(){
		var S4 = function(){
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		}
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4() +S4());
	};
}(jQuery));
