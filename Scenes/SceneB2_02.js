
function SceneB2_02() {
	SceneB2_UpperIntermediateBase.apply(this,arguments);
	this.super = SceneB2_UpperIntermediateBase.prototype;
	this.setDefinedStartGoal(1,3);
}
SceneB2_02.prototype = new SceneB2_UpperIntermediateBase();
SceneB2_02.prototype.maze = function(){
	return [
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,10000,10000,33103,10000],
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000],
		[10000,10000,10000,33003,10000,40000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000],
		[31002,10000,10000,10000,10000,40000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,31102,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000],
		[21001,10000,10000,10000,10000,40000,21101,10000,10000,10000],
	];
};
SceneB2_02.prototype.getDisableBlocks = function(){
	var disabledBlocks = [];
	disabledBlocks.push('function_definition');
	disabledBlocks.push('function_call');
	return disabledBlocks;
}
SceneB2_02.prototype.getScore = function(){
	return "A";
}
SceneB2_02.prototype.startScene = function(){
	this.super.startScene.call(SceneB2_02.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB2_02.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",this.isReplay());
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(this.isReplay());

//	setBlocklyBlockCapacity(8);

	if(this.isReplay()==true){
		return;
	}
	var instructions = [
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
