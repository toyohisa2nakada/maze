function SceneA1_05s() {
	SceneA1_BeginnerBase.apply(this,arguments);
	this.super = SceneA1_BeginnerBase.prototype;
	this.setDefinedStartGoals([1,3]);
}
SceneA1_05s.prototype = new SceneA1_BeginnerBase();
SceneA1_05s.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,30004,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,30003,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,30002,10000,30005,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,21001,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneA1_05s.prototype.getScore = function(){
	return "A";
}
SceneA1_05s.prototype.startScene = function(){
	this.super.startScene.call(SceneA1_05s.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA1_03.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",false);
	blocklyButtonVisibility("TraceOperation",true);
	blocklyButtonVisibility("StartInterpreter",false);
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",false);
	blocklyButtonVisibility("Extraction",false);
	pieMenuVisibility(true);

	var xml = Blockly.Xml.textToDom(
		'<xml>'+
			'<block type="straight" x="-60" y="80">'+
				'<next><block type="straight">'+
					'<next><block type="straight">'+
						'<next><block type="straight">'+
						'</block></next>'+
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
				offsetX:280,
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
