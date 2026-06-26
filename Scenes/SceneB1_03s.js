
function SceneB1_03s() {
	SceneB1_IntermediateBase.apply(this,arguments);
	this.super = SceneB1_IntermediateBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneB1_03s.prototype = new SceneB1_IntermediateBase();
SceneB1_03s.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,10000,50000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,10000,10000,10000,10000,10000,10000,10000,10000,40000],
		[40000,10000,40000,40000,10000,40000,40000,40000,10000,40000],
		[40000,50000,40000,40000,10000,40000,40000,40000,30002,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,21001,40000,40000,40000,40000,40000],
	];
};
SceneB1_03s.prototype.getScore = function(){
	var ex = operationCounter.get('blocklyExtraction');
	var is = operationCounter.get('blocklyShowInstances');
	var sb = operationCounter.get('blocklyShowSubsetRules');
	return ex!=0?'C':((is!=0||sb!=0)?'B':'A');
}
SceneB1_03s.prototype.startScene = function(){
	this.super.startScene.call(SceneB1_03s.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB1_07.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(this.isReplay());
	setBlocklyBlockCapacity(4);

	var hints = [
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

	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
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
		function(){
			disableAll(true);
			$('#blocklyFrame').instract({
				string:MazeLearningMsg.SceneA1_02.InstructionBlocks,
				closeButton:true,
				targetEventToClose:null,
				offsetX:50,
				offsetY:15,
				offsetBottom:$('#blocklyFrame').height()*-0.7,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#blocklyBlockCapacity').instract({
				string:MazeLearningMsg.SceneA1_01.InstructionBlockLimit,
				closeButton:true,
				targetEventToClose:null,
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
