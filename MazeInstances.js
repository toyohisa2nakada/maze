function MazeInstances(){
	this.pushoutElement = new PushoutElement();
	this.collapsed = true;
	function toDatagridFormat(inst){
		var data = {};
		var i;
		for(i=0;i<inst.length;i++){
			data[attrToField(inst[i][0])] = toDispalyString(inst[i][1]);
		}
		return data;
	}
	this.addInstance = function(inst){
		if(window.MazeInstancesObj!==undefined){
			$('#mazeInstances').datagrid('appendRow',toDatagridFormat(inst));
		}
	}
	this.removeInstance = function(inst){
		if(window.MazeInstancesObj!==undefined){
			var data = toDatagridFormat(inst);
			var rows = $('#mazeInstances').datagrid('getRows');
			var i;
			for(i=0;i<rows.length;i++){
				var same = true;
				for(var p in rows[i]){
					if(data[p] === undefined || data[p] != rows[i][p]){
						same = false;
						break;
					}
				}
				if(same == true){
					var idx = $('#mazeInstances').datagrid('getRowIndex',rows[i]);
					$('#mazeInstances').datagrid('deleteRow',idx);
					break;
				}
			}
		}
	}
	this.clear = function(){
		var rows = $('#mazeInstances').datagrid('getRows');
		var i;
		for(i=rows.length-1;i>=0;i--){
			$('#mazeInstances').datagrid('deleteRow',i);
		}
	}
	this.visible = function(v){
		if(v == true){
			$('#mazeInstanceContainer').show(500);
			if(this.collapsed==true){
				$('.panel-tool-collapse').trigger("click");
			}
			this.pushoutElement.pushoutElement(PushoutElement.prototype.EXPANDED);
		}else{
			$('#mazeInstanceContainer').hide(500);
			this.pushoutElement.pushoutElement(PushoutElement.prototype.HIDDEN);
		}
	}
	this.inject = function(h){
		this.pushoutElement.setPushedoutElementName('#blocklyFrame',h+16);
		$('#mazeInstances').css({
			'width':'460px',
			'height':h,
			'margin-left':'10px',
		});
		$('#mazeInstances').datagrid({
			columns:[[
				{field:attrToField('canGo(90)') ,width:100,align:'left',
					sortable:true,title:MazeLearningMsg.Block_PathLeft,},
				{field:attrToField('canGo(-90)'),width:100,align:'left',
					sortable:true,title:MazeLearningMsg.Block_PathRight,},
				{field:attrToField('canGo(0)')  ,width:100,align:'left',
					sortable:true,title:MazeLearningMsg.Block_PathStraight,},
				{field:attrToField('CHANGED')   ,width:120,align:'left',
					sortable:true,title:MazeLearningMsg.Block_Done,},
			]],
			collapsible:true,
			collapsed:this.collapsed,
			onBeforeExpand:function(){
				if(window.MazeInstancesObj!==undefined){
					window.MazeInstancesObj.collapsed = false;
					window.MazeInstancesObj.pushoutElement.pushoutElement(PushoutElement.prototype.EXPANDED);
				}
			},
			onBeforeCollapse:function(){
				if(window.MazeInstancesObj!==undefined){
					window.MazeInstancesObj.collapsed = true;
					window.MazeInstancesObj.pushoutElement.pushoutElement(PushoutElement.prototype.COLLPSED);
				}
			},
			onSortColumn:function(sort,order){
				var rows = $('#mazeInstances').datagrid('getRows');
				rows.sort(function(a,b){
					return a[sort]==b[sort]?0:((a[sort]>b[sort]?1:-1)*(order=='asc'?1:-1));
				})
				for(var i=0;i<rows.length;i++){
					$('#mazeInstances').datagrid('refreshRow',i);
				}
			},
		});
		window.MazeInstancesObj = this;
	};
	function toDispalyString(dataStr){
		switch(dataStr){
		case 'true':
			return 'o';
		case 'false':
			return 'x';
		case 'go':
			return MazeLearningMsg.Block_NoTurn;
		case 'turnRight();':
			return MazeLearningMsg.Block_TurnRight;
		case 'turnLeft();':
			return MazeLearningMsg.Block_TurnLeft;
		case 'turnBack();':
			return MazeLearningMsg.Block_TurnBack;
		}
		return '';
	}
	function attrToField(attr){
		switch(attr){
		case 'canGo(90)':
			return 'canLeft';
		case 'canGo(-90)':
			return 'canRight';
		case 'canGo(0)':
			return 'canStraight';
		case 'CHANGED':
			return 'trueCase';
		}
		return attr;
	}
}
