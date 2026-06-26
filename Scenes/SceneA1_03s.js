function SceneA1_03s() {
	SceneA1_BeginnerBase.apply(this,arguments);
	this.super = SceneA1_BeginnerBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneA1_03s.prototype = new SceneA1_BeginnerBase();
SceneA1_03s.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,10000,10000,10000,10000,31002,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,21001,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneA1_03s.prototype.getScore = function(){
	return "A";
}
SceneA1_03s.prototype.startScene = function(){
	this.super.startScene.call(SceneA1_03s.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA1_02.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",false);
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",false);
	blocklyButtonVisibility("Extraction",false);
	pieMenuVisibility(false);

	setBlocklyBlockCapacity(6);
	
	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
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
			$('#blocklyFrame').instract({
				string:MazeLearningMsg.SceneA1_01.InstructionBlockSetting,
				closeButton:true,
				targetEventToClose:null,
				offsetX:50,
				//offsetY:15,
				offsetBottom:$('#blocklyFrame').height()*-0.85,
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
