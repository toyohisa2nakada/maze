function SceneA1_04() {
	SceneA1_BeginnerBase.apply(this,arguments);
	this.super = SceneA1_BeginnerBase.prototype;
	this.setDefinedStartGoals([1,9]);
}
SceneA1_04.prototype = new SceneA1_BeginnerBase();
SceneA1_04.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,10000,33002,10000,33003,10000,40000,40000,40000],
		[40000,40000,30004,10000,10000,10000,32005,40000,40000,40000],
		[40000,40000,10000,10000,21001,10000,10000,40000,40000,40000],
		[40000,40000,30006,10000,10000,10000,32007,40000,40000,40000],
		[40000,40000,10000,31008,10000,31009,10000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneA1_04.prototype.getScore = function(){
	return "A";
}
SceneA1_04.prototype.startScene = function(){
	this.super.startScene.call(SceneA1_04.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA1_04.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",this.isReplay());
	blocklyButtonVisibility("TraceOperation",true);
	blocklyButtonVisibility("StartInterpreter",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(true);

	var xml = Blockly.Xml.textToDom('<xml><block type="turn" x="-60" y="40"><field name="selections">turnRight();</field><next><block type="turn"><field name="selections">turnRight();</field><next><block type="straight"><next><block type="straight"><next><block type="turn"><field name="selections">turnLeft();</field><next><block type="straight"></block></next></block></next></block></next></block></next></block></next></block></xml>');
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,xml);
	$('#blocklyTraceOperation').trigger('click');

	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
		function(){
			disableAll(true);
			$('#piemenu_container').instract({
				string:MazeLearningMsg.SceneA1_04.InstructionPieMenu,
				closeButton:true,
				offsetX:-10,
				offsetY:-140,
				closedHandler:function(){nextInst();},
			});
		},
	];
	disableAll(true);
	var idx = -1;
	function nextInst(){
		if(idx == instructions.length-1){
			disableAll(false);
			disableBlockly(true);
			return;
		}
		idx++;
		setTimeout(instructions[idx],500);
	}
	nextInst();
}
