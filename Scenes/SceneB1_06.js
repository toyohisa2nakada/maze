
function SceneB1_06() {
	SceneB1_IntermediateBase.apply(this,arguments);
	this.super = SceneB1_IntermediateBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneB1_06.prototype = new SceneB1_IntermediateBase();
SceneB1_06.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,33002,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,10000,40000,40000,40000],
		[50000,10000,10000,10000,10000,10000,10000,10000,50000,40000],
		[40000,10000,40000,40000,40000,40000,10000,40000,40000,40000],
		[40000,10000,40000,40000,40000,40000,50000,40000,40000,40000],
		[40000,10000,10000,10000,10000,40000,40000,40000,40000,40000],
		[40000,10000,40000,40000,10000,10000,10000,10000,50000,40000],
		[40000,50000,40000,40000,10000,40000,10000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,50000,40000,40000,40000],
		[40000,40000,40000,40000,21001,40000,40000,40000,40000,40000],
	];
};
SceneB1_06.prototype.isLimitBlockConnection = function(){
	return true;
}
SceneB1_06.prototype.getScore = function(){
	var ex = operationCounter.get('blocklyExtraction');
	var is = operationCounter.get('blocklyShowInstances');
	var sb = operationCounter.get('blocklyShowSubsetRules');
	return ex!=0?'C':((is!=0||sb!=0)?'B':'A');
}
SceneB1_06.prototype.startScene = function(){
	this.super.startScene.call(SceneB1_06.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB1_06.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",this.isReplay());
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(this.isReplay());
	setBlocklyBlockCapacity(9);

	var hints = [
		{
			operation:'blocklyStartInterpreter',
			count:20,
			hint_operation:'blocklyShowSubsetRules',
			hint_instraction_string:MazeLearningMsg.SceneB1_06.Hint_SubsetRules,
		},
		{
			operation:'blocklyStartInterpreter',
			count:30,
			hint_operation:'blocklyShowInstances',
			hint_instraction_string:MazeLearningMsg.SceneB1_06.Hint_Instances,
			hint_pieMenu:true,
		},
		{
			operation:'blocklyStartInterpreter',
			count:40,
			hint_operation:'blocklyExtraction',
			hint_instraction_string:MazeLearningMsg.SceneB1_06.Hint_Extraction,
			hint_pieMenu:true,
		},
	];
	for(var i=0;i<hints.length;i++){
		this.setHint(hints[i]);
	}
	
	subsetRules.setHandler(function(){
		var funcs = [];
		var p = 0;
		var i = 0;
		funcs[p] = [];
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){turnLeft();};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){turnRight();};
		funcs[p][i++] = function(){go(true);};

		p++;
		i = 0;
		funcs[p] = [];
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){turnRight();};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){turnLeft();};
		funcs[p][i++] = function(){go(true);};
		funcs[p][i++] = function(){go(true);};

		function resetPlayer(){
			resetPlayerPosition();
			jp.ac.nuis.nakada.MazeViewer.getInstance().clearBackups();
			backupData.clear();
			removeAllBlocklyTabs(true);
		}
		resetPlayer();
		
		function loop(){
			if(i == 0){
				jp.ac.nuis.nakada.MazeViewer.getInstance().clearPlayerExamples();
				jp.ac.nuis.nakada.MazeViewer.getInstance().clearPlayerFootmarks();
				jp.ac.nuis.nakada.MazeViewer.getInstance().startRecordingPng();
			}
			funcs[p][i]();
			i++;
			if(i == funcs[p].length){
				p++;
				if(p == funcs.length){
					window.SubsetRules.snap();
					$('#subsetRulesContainer').instract({
						string:MazeLearningMsg.SceneB1_06.Hint_SubsetRulesCreated,
						closeButton:true,
						targetEventToClose:null,
						offsetX:50,
						offsetY:0,
						closedHandler:function(){setTimeout(resetPlayer,1000);},
					});
				}else{
					window.SubsetRules.snap();
					i = 0;
					$('#drawing_container').instract({
						string:MazeLearningMsg.SceneB1_06.Hint_SubsetRulesNext,
						closeButton:true,
						targetEventToClose:null,
						offsetX:getPlayerPos(false).x-20,
						offsetY:getPlayerPos(false).y,
						closedHandler:function(){setTimeout(loop,1000);},
					});
				}
			}else{
				setTimeout(loop,1000);
			}
		}
		p = 0;
		i = 0;
		setTimeout(loop,1000);
	});

	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
		function(){
			disableAll(true);
			$('#blocklyFrame').instract({
				string:MazeLearningMsg.SceneB1_06.InstructionLimitedConnection,
				closeButton:true,
				targetEventToClose:null,
				offsetX:20,
				offsetY:20,
				offsetBottom:$('#blocklyFrame').height()*-0.3,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#drawing_container').instract({
				string:MazeLearningMsg.SceneB1_06.InstructionHole,
				closeButton:true,
				targetEventToClose:null,
				offsetX:getPlacedTypePos(5,false).x-20,
				offsetY:getPlacedTypePos(5,false).y,
				closedHandler:function(){nextInst();},
			});
		},
	];
	disableAll(true);
	var idx = -1;
	function nextInst(){
		if(idx == instructions.length-1){
			disableAll(false);
			return;
		}
		idx++;
		setTimeout(instructions[idx],500);
	}
	nextInst();
}
