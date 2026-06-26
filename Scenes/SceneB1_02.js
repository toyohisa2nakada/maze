
function SceneB1_02() {
	SceneB1_IntermediateBase.apply(this,arguments);
	this.super = SceneB1_IntermediateBase.prototype;
	this.setDefinedStartGoal(1,10);
}
SceneB1_02.prototype = new SceneB1_IntermediateBase();
SceneB1_02.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,33011,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,33010,40000,40000],
		[40000,40000,33003,40000,40000,40000,40000,10000,40000,40000],
		[40000,40000,10000,40000,33006,40000,40000,10000,40000,40000],
		[40000,40000,30002,10000,30005,10000,10000,30009,40000,40000],
		[40000,40000,10000,40000,31004,40000,40000,10000,40000,40000],
		[40000,40000,10000,40000,40000,40000,40000,10000,40000,40000],
		[40000,40000,10000,40000,40000,40000,40000,31008,40000,40000],
		[40000,40000,10000,40000,40000,40000,40000,31007,40000,40000],
		[40000,40000,21001,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneB1_02.prototype.getScore = function(){
	return "A";
}
SceneB1_02.prototype.startScene = function(){
	this.super.startScene.call(SceneB1_02.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB1_02.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",this.isReplay());
	blocklyButtonVisibility("TraceOperation",true);
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(true);
	disableBlockly(!this.isReplay());

	var xml = Blockly.Xml.textToDom(
		'<xml><block type="while_playerPlacedNumber" x="10" y="40"><field name="selections">!=2</field><statement name="trueCase"><block type="straight"></block></statement><next><block type="turn"><field name="selections">turnRight();</field><next><block type="while_playerPlacedNumber"><field name="selections">!=9</field><statement name="trueCase"><block type="straight"></block></statement><next><block type="turn"><field name="selections">turnLeft();</field><next><block type="straight"><next><block type="while_playerPlacedNumber"><field name="selections">==1||getPlacedNumber()==0</field><statement name="trueCase"><block type="straight"></block></statement></block></next></block></next></block></next></block></next></block></next></block></xml>'
	);
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,xml);
	$('#blocklyTraceOperation').trigger('click');

	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
		function(){
			disableAll(true);
			$('#piemenu_container').instract({
				string:MazeLearningMsg.SceneB1_02.InstructionPieMenu,
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
