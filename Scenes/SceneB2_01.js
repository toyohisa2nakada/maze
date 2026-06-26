
function SceneB2_01() {
	SceneB2_UpperIntermediateBase.apply(this,arguments);
	this.super = SceneB2_UpperIntermediateBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneB2_01.prototype = new SceneB2_UpperIntermediateBase();
SceneB2_01.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,33002,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,10000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,10000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,10000,40000],
		[50000,10000,10000,10000,10000,10000,10000,10000,10000,40000],
		[40000,40000,40000,10000,40000,40000,40000,40000,10000,40000],
		[40000,40000,40000,10000,40000,40000,40000,40000,10000,40000],
		[40000,40000,40000,10000,40000,40000,40000,40000,50000,40000],
		[40000,40000,40000,10000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,21001,40000,40000,40000,40000,40000,40000],
	];
};
SceneB2_01.prototype.getDisableBlocks = function(){
	var disabledBlocks = [];
	if(this.isReplay()==false){
		disabledBlocks.push("while_variable");
	}
	disabledBlocks.push('function_definition');
	disabledBlocks.push('function_call');
	return disabledBlocks;
}
SceneB2_01.prototype.getScore = function(){
	return "A";
}
SceneB2_01.prototype.startScene = function(){
	this.super.startScene.call(SceneB2_01.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB2_01.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(this.isReplay());

	setBlocklyBlockCapacity(8);

	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
		function(){
			disableAll(true);
			$('#body').instract({
				string:MazeLearningMsg.SceneB2_01.InstructionMaze,
				align:'center',
				arrow:false,
				offsetX:$('body').width()/2,
				offsetY:$('body').height()/2,
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
