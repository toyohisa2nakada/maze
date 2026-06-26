function SceneA1_03() {
	SceneA1_BeginnerBase.apply(this,arguments);
	this.super = SceneA1_BeginnerBase.prototype;
	this.setDefinedStartGoals([1,5,2]);
}
SceneA1_03.prototype = new SceneA1_BeginnerBase();
SceneA1_03.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,33002,33003,33004,40000,40000,40000,40000],
		[40000,40000,40000,30005,21001,32006,40000,40000,40000,40000],
		[40000,40000,40000,31007,31008,31009,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneA1_03.prototype.getScore = function(){
	return "A";
}
SceneA1_03.prototype.startScene = function(){
	this.super.startScene.call(SceneA1_03.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA1_03.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",this.isReplay());
	blocklyButtonVisibility("TraceOperation",true);
	blocklyButtonVisibility("StartInterpreter",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(true);

	var xml = Blockly.Xml.textToDom(
		'<xml>'+
			'<block type="turn" x="-60" y="40">'+
				'<field name="selections">turnLeft();</field>'+
				'<next><block type="straight">'+
					'<next><block type="turn">'+
						'<field name="selections">turnRight();</field>'+
						'<next><block type="straight"></block></next>'+
					'</block></next>'+
				'</block></next>'+
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
			$('#blocklyFrame').instract({
				string:MazeLearningMsg.SceneA1_03.InstructionFirstProgram,
				closeButton:true,
				targetEventToClose:null,
				offsetX:250,
				offsetY:80,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#piemenu_container').instract({
				string:MazeLearningMsg.SceneA1_03.InstructionPieMenu,
				closeButton:true,
				offsetX:-10,
				offsetY:-140,
				closedHandler:function(){nextInst();},
			});
		},
/*
		function(){
			disableAll(true);
			$('#blocklyTraceOperation').instract({
				string:MazeLearningMsg.SceneA1_03.InstructionTraceOperation,
				closeButton:true,
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
			disableBlockly(true);
			return;
		}
		idx++;
		setTimeout(instructions[idx],500);
	}
	nextInst();
}
