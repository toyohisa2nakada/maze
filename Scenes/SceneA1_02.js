function SceneA1_02() {
	SceneA1_BeginnerBase.apply(this,arguments);
	this.super = SceneA1_BeginnerBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneA1_02.prototype = new SceneA1_BeginnerBase();
SceneA1_02.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,31002,40000,10000,40000,40000,40000,40000],
		[40000,40000,40000,10000,10000,10000,10000,40000,40000,40000],
		[40000,40000,40000,40000,40000,10000,40000,40000,40000,40000],
		[40000,40000,40000,10000,10000,10000,40000,40000,40000,40000],
		[40000,40000,40000,40000,21001,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneA1_02.prototype.getScore = function(){
	return "A";
}
SceneA1_02.prototype.startScene = function(){
	this.super.startScene.call(SceneA1_02.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA1_02.QuestionSentence);
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
