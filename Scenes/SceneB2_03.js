
function SceneB2_03() {
	SceneB2_UpperIntermediateBase.apply(this,arguments);
	this.super = SceneB2_UpperIntermediateBase.prototype;
	this.setDefinedStartGoal(1,4);
}
SceneB2_03.prototype = new SceneB2_UpperIntermediateBase();
SceneB2_03.prototype.maze = function(){
	return [
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,31004,10000,40000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,31104,10000],
		[10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,10000,31103,10000,10000,10000,10000],
		[10000,10000,31003,10000,10000,40000,10000,10000,10000,10000,10000,10000],
		[31002,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,40000,31102,10000,10000,10000,10000,10000],
		[21001,10000,10000,10000,10000,40000,21101,10000,10000,10000,10000,10000],
	/*
	      [  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0],
		  [  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0],
		  [  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0],
		  [  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0],
		  [  0,  0,  0,104,  0, -1,  0,  0,  0,  0,  0,  0],
		  [  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,108,  0],
		  [  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0],
		  [  0,  0,  0,  0,  0, -1,  0,107,  0,  0,  0,  0],
		  [  0,  0,103,  0,  0, -1,  0,  0,  0,  0,  0,  0],
		  [102,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0],
		  [  0,  0,  0,  0,  0, -1,106,  0,  0,  0,  0,  0],
		  [101,  0,  0,  0,  0, -1,105,  0,  0,  0,  0,  0],
*/
	];
};
SceneB2_03.prototype.getDisableBlocks = function(){
	var disabledBlocks = [];
	disabledBlocks.push('function_definition');
	disabledBlocks.push('function_call');
	return disabledBlocks;
}
SceneB2_03.prototype.getScore = function(){
	return "A";
}
SceneB2_03.prototype.startScene = function(){
	this.super.startScene.call(SceneB2_03.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB2_03.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",this.isReplay());
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(true);

//	setBlocklyBlockCapacity(10);

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
