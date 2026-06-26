
function SceneB1_01d() {
	SceneB1_IntermediateBase.apply(this,arguments);
	this.super = SceneB1_IntermediateBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneB1_01d.prototype = new SceneB1_IntermediateBase();
SceneB1_01d.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,10000,10000,10000,40000,40000,40000,40000,40000],
		[40000,40000,10000,40000,10000,40000,10000,10000,10000,10000],
		[40000,40000,10000,40000,10000,40000,10000,40000,40000,40000],
		[40000,40000,10000,40000,10000,40000,10000,40000,40000,40000],
		[40000,40000,10000,40000,10000,40000,10000,40000,40000,40000],
		[10000,10000,10000,10000,10000,10000,10000,10000,10000,40000],
		[40000,10000,40000,40000,10000,40000,40000,10000,40000,40000],
		[40000,33002,40000,40000,10000,40000,40000,10000,40000,40000],
		[40000,10000,40000,40000,21001,40000,40000,40000,40000,40000],
	];
};
SceneB1_01d.prototype.showLog = false;
SceneB1_01d.prototype.getScore = function(){
console.log("score");
	return "A";
}
SceneB1_01d.prototype.startScene = function(){
	this.super.startScene.call(SceneB1_01d.prototype);
	this.setQuestionSentence("ゴールを目指そう!!");
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",false);//this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",false);//this.isReplay());
	blocklyButtonVisibility("Extraction",false);//this.isReplay());
	pieMenuVisibility(false);//this.isReplay());

	setBlocklyBlockCapacity(10);

	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
/*
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
				string:MazeLearningMsg.SceneB1_01d.InstructionMaxBlocks,
				closeButton:true,
				targetEventToClose:null,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#sliderContainer').instract({
				string:MazeLearningMsg.SceneB1_01d.InstructionInterpreterSpeed,
				closeButton:true,
				targetEventToClose:null,
				closedHandler:function(){nextInst();},
			});
		},
*/
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
