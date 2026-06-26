function SceneA2_02() {
	SceneA2_ElementaryBase.apply(this,arguments);
	this.super = SceneA2_ElementaryBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneA2_02.prototype = new SceneA2_ElementaryBase();
SceneA2_02.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,33002,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,10000,40000,10000,33102,40000,40000,40000],
		[40000,40000,40000,10000,40000,10000,40000,40000,40000,40000],
		[40000,40000,40000,21001,40000,21101,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneA2_02.prototype.getScore = function(){
	return "A";
}
SceneA2_02.prototype.startScene = function(){
	this.super.startScene.call(SceneA2_02.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA2_02.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(this.isReplay());
	
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
			$('#blocklyStartInterpreter').instract({
				string:MazeLearningMsg.SceneA2_02.InstructionStart,
				closeButton:true,
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
