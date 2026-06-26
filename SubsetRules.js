function SubsetRules() {
	this.pushoutElement = new PushoutElement();
	this.handler = null;
	this.addedPanel = false;
	this.panelDefault = '<div style="float:left;border:solid 1px;margin-right:5px;"></div>';

	this.setHandler = function(h){
		this.handler = h;
	}
	this.clear = function(){
		$('#subsetRulesContainer').empty();
	}
	this.visible = function(v){
		if(v == true){
			if(this.addedPanel == false && this.handler != null){
				this.handler();
				this.addedPanel = true;
			}
			$('#subsetRulesContainer').show(500);
			this.pushoutElement.pushoutElement(PushoutElement.prototype.EXPANDED);
		}else{
			$('#subsetRulesContainer').hide(500);
			this.pushoutElement.pushoutElement(PushoutElement.prototype.HIDDEN);
		}
	}
	this.init = function(h){
		this.pushoutElement.setPushedoutElementName('#blocklyFrame',h);
		$('#subsetRulesContainer').css({
			'width':'460px',
			'height':h,
			'margin-left':'10px',
		});
		window.SubsetRules = this;
	}
	this.snap = function(){
		var p = $(this.panelDefault)[0];
		this.addImage(jp.ac.nuis.nakada.MazeViewer.getInstance().toPng(),p);
		this.addSvg($('#blocklyFrame')[0].contentWindow.getBlockSVG(),p);
		$('#subsetRulesContainer').append(p);
	}
	this.addImage = function(src,dst){
		var l_height = $('#subsetRulesContainer').height()-10;
		var img = $('<img style="float:left;max-height:'+l_height+'px;"></img>').attr({
			'src':src,
		})[0];
		if(dst === undefined){
			var p = $(this.panelDefault)[0];
			$(p).append(img);
			$('#subsetRulesContainer').append(p);
		}else{
			$(dst).append(img);
		}
	}
	this.addSvg = function(svg,dst){
		var w = $(svg).attr('width');
		var h = $(svg).attr('height');
		var l_height = $('#subsetRulesContainer').height()-10;
		var ratio = l_height/h;
		$(svg).css({'height':l_height,'width':(w*ratio),'margin-left':'4px'});
		
		if(dst === undefined){
			var p = $(this.panelDefault)[0];
			$(p).append(svg);
			$('#subsetRulesContainer').append(p);
		}else{
			$(dst).append(svg);
		}
	}
}
