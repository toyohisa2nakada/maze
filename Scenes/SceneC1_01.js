
function SceneC1_01() {
	SceneC1_AdvancedBase.apply(this,arguments);
	this.super = SceneC1_AdvancedBase.prototype;
	this.setDefinedStartGoal(1,5);
}
SceneC1_01.prototype = new SceneC1_AdvancedBase();
SceneC1_01.prototype.maze = function(){
	return [
		[10000,10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,31105,10000],
		[10000,10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,31005,10000,40000,10000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,10000,40000,10000,10000,10000,31104,10000,10000,10000],
		[10000,10000,10000,31004,10000,10000,40000,10000,10000,10000,10000,10000,10000,10000],
		[10000,31003,10000,10000,10000,10000,40000,10000,10000,31103,10000,10000,10000,10000],
		[10000,10000,10000,10000,10000,10000,40000,31102,10000,10000,10000,10000,10000,10000],
		[31002,10000,10000,10000,10000,10000,40000,10000,10000,10000,10000,10000,10000,10000],
		[21001,10000,10000,10000,10000,10000,40000,21101,10000,10000,10000,10000,10000,10000],
	];
};
SceneC1_01.prototype.getScore = function(){
	return "A";
}
SceneC1_01.prototype.startScene = function(){
	this.super.startScene.call(SceneC1_01.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneC1_01.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",this.isReplay());
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(true);

	setBlocklyBlockCapacity(14);

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
