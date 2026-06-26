
function SceneB1_07() {
	SceneB1_IntermediateBase.apply(this,arguments);
	this.super = SceneB1_IntermediateBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneB1_07.prototype = new SceneB1_IntermediateBase();
SceneB1_07.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,33002,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,50000,40000,10000,10000,10000,10000,10000,50000],
		[40000,40000,10000,40000,40000,40000,10000,40000,40000,40000],
		[40000,40000,10000,40000,40000,40000,10000,40000,40000,40000],
		[50000,10000,10000,10000,10000,10000,10000,10000,10000,40000],
		[40000,40000,10000,40000,40000,40000,40000,40000,10000,40000],
		[40000,40000,10000,40000,40000,40000,40000,40000,10000,40000],
		[20001,10000,10000,40000,40000,40000,40000,40000,50000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneB1_07.prototype.getScore = function(){
	var ex = operationCounter.get('blocklyExtraction');
	var is = operationCounter.get('blocklyShowInstances');
	var sb = operationCounter.get('blocklyShowSubsetRules');
	return ex!=0?'C':((is!=0||sb!=0)?'B':'A');
}
SceneB1_07.prototype.startScene = function(){
	this.super.startScene.call(SceneB1_07.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB1_07.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(this.isReplay());
	setBlocklyBlockCapacity(12);

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
}
