
function SceneB1_01s() {
	SceneB1_IntermediateBase.apply(this,arguments);
	this.super = SceneB1_IntermediateBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneB1_01s.prototype = new SceneB1_IntermediateBase();
SceneB1_01s.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,33002,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,21001,40000,40000,40000,40000,40000],
	];
};
SceneB1_01s.prototype.getScore = function(){
	return "A";
}
SceneB1_01s.prototype.startScene = function(){
	this.super.startScene.call(SceneB1_01s.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB1_01.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(this.isReplay());

	setBlocklyBlockCapacity(2);

	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
		function(){
			disableAll(true);
			$('#blocklyFrame').instract({
				string:MazeLearningMsg.SceneB1_01.InstructionBlockWhile,
				closeButton:true,
				targetEventToClose:null,
				offsetX:20,
				offsetY:250,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#blocklyBlockCapacity').instract({
				string:MazeLearningMsg.SceneB1_01.InstructionMaxBlocks,
				closeButton:true,
				targetEventToClose:null,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#sliderContainer').instract({
				string:MazeLearningMsg.SceneB1_01.InstructionInterpreterSpeed,
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
