function SceneA2_04() {
	SceneA2_ElementaryBase.apply(this,arguments);
	this.super = SceneA2_ElementaryBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneA2_04.prototype = new SceneA2_ElementaryBase();
SceneA2_04.prototype.maze = function(){
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
SceneA2_04.prototype.getScore = function(){
	return "A";
}
SceneA2_04.prototype.startScene = function(){
	this.super.startScene.call(SceneA2_04.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA2_04.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(this.isReplay());
	
	setBlocklyBlockCapacity(6);

	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
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
/*
SceneA2_04.prototype.beforeTest = function(){
	if(this.subgoal == true){
		this.nexting = true;
	}else{
		this.nexting = false;
	}
	this.subgoal = false;
	return this.super.beforeTest.call(this);
}
SceneA2_04.prototype.test = function(placedNumbers){
	if(this.nexting == true){
		this.nexting = false;
		return this.super.test.call(this,placedNumbers);
	}else{
		if(placedNumbers[0]==1 && placedNumbers[placedNumbers.length-1]==2){
			this.subgoal = true;
			setTimeout(function(){
				resetPlayerPosition(3);
				setTimeout(function(){
					$('#blocklyStartInterpreter').trigger('click');
				},500);
			},1000);
		}
	}
}
*/
