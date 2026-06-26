function SceneB1_02s() {
	SceneB1_IntermediateBase.apply(this,arguments);
	this.super = SceneB1_IntermediateBase.prototype;
	this.setDefinedStartGoal(1,4);
}
SceneB1_02s.prototype = new SceneB1_IntermediateBase();
SceneB1_02s.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,30003,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[30002,10000,10000,10000,10000,10000,10000,10000,10000,30004],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,21001,40000,40000,40000,40000,40000],
	];
};
SceneB1_02s.prototype.getScore = function(){
	return "A";
}
SceneB1_02s.prototype.startScene = function(){
	this.super.startScene.call(SceneB1_02s.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB1_02.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",this.isReplay());
	blocklyButtonVisibility("TraceOperation",true);
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(true);
	disableBlockly(!this.isReplay());

	var xml = Blockly.Xml.textToDom(
		'<xml>'+
			'<block type="while_playerPlacedNumber" x="-40" y="40"><field name="selections">==1||getPlacedNumber()==0</field>'+
				'<statement name="trueCase">'+
					'<block type="if"><field name="selections">canGo(-90)</field>'+
						'<statement name="trueCase"><block type="turn"><field name="selections">turnRight();</field></block></statement>'+
						'<next><block type="straight"></block></next>'+
					'</block>'+
				'</statement>'+
			'</block>'+
		'</xml>'
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
