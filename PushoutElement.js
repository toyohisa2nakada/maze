window.PushoutElement.changed = {};
window.PushoutElement.updateObjs = [];
function PushoutElement(){
	PushoutElement.prototype.HIDDEN = 0;
	PushoutElement.prototype.COLLPSED = 1;
	PushoutElement.prototype.EXPANDED = 2;

this.debug;
	this.dgHeaderHeight_expanded = -1;
	this.dgHeaderHeight_collapsed = 30;
	this.pushedoutElementOriginalHeight = -1;
	this.pushedoutElementName = null;
	this.setPushedoutElementName = function(name,expanded_header){
		this.pushedoutElementName = name;
		this.dgHeaderHeight_expanded = expanded_header;
		window.PushoutElement.updateObjs.push(this);
this.debug = window.PushoutElement.updateObjs.length;
	}
	this.update = function(){
		var curHeight = $(this.pushedoutElementName).height();
		var changed = window.PushoutElement.changed[this.pushedoutElementName];
		this.pushedoutElementOriginalHeight = curHeight-(changed===undefined?0:changed);
	}
	this.pushoutElement = function(cond){
		if(this.pushedoutElementName!=null){
			this.currentCond = cond;
			var l = [];
			l[0] = 0;
			l[1] = this.dgHeaderHeight_collapsed;
			l[2] = this.dgHeaderHeight_expanded;
			var nheight = this.pushedoutElementOriginalHeight-l[cond];
			window.PushoutElement.changed[this.pushedoutElementName] = -l[cond];
			var dif = nheight - $(this.pushedoutElementName).height();
			$(this.pushedoutElementName).animate({
				'height':nheight,
			},"normal",dif>0?"easeInQuint":"easeOutQuint");
		}
	}
}
