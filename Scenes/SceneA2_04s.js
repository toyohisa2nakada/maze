function SceneA2_04s() {
	SceneA2_ElementaryBase.apply(this,arguments);
	this.super = SceneA2_ElementaryBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneA2_04s.prototype = new SceneA2_ElementaryBase();
SceneA2_04s.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,31002,10000,40000,10000,32102,40000,40000,40000],
		[40000,40000,40000,10000,40000,10000,40000,40000,40000,40000],
		[40000,40000,40000,21001,40000,21101,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneA2_04s.prototype.getScore = function(){
	return "A";
}
SceneA2_04s.prototype.startScene = function(){
	this.super.startScene.call(SceneA2_04s.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA2_04.QuestionSentence);
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
			$('#drawing_container').instract({
				string:MazeLearningMsg.SceneA2_02.InstructionTwoGoals,
				closeButton:true,
				targetEventToClose:null,
				offsetX:getPlayerPos(false).x-20,
				offsetY:getPlayerPos(false).y,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#blocklyBlockCapacity').instract({
				string:MazeLearningMsg.SceneA2_04.InstructionMaxBlocks,
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

