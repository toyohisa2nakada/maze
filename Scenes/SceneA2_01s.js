function SceneA2_01s() {
	SceneA2_ElementaryBase.apply(this,arguments);
	this.super = SceneA2_ElementaryBase.prototype;
	this.setDefinedStartGoal(1,2);
}
SceneA2_01s.prototype = new SceneA2_ElementaryBase();
SceneA2_01s.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,30003,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,30002,10000,10000,10000,30004,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,21001,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneA2_01s.prototype.getScore = function(){
	return "A";
}
SceneA2_01s.prototype.startScene = function(){
	this.super.startScene.call(SceneA2_01s.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA2_01.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",false);
	blocklyButtonVisibility("TraceOperation",true);
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",false);
	blocklyButtonVisibility("Extraction",false);
	pieMenuVisibility(true);

	var xml = Blockly.Xml.textToDom(
		'<xml>'+
			'<block type="straight" x="-60" y="40">'+
				'<next><block type="straight">'+
					'<next><block type="if">'+
						'<field name="selections">canGo(90)</field>'+
						'<statement name="trueCase"><block type="turn"><field name="selections">turnLeft();</field></block></statement>'+
						'<next><block type="straight">'+
							'<next><block type="straight">'+
							'</block></next>'+
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
				string:MazeLearningMsg.SceneA2_01.InstructionBlockIf,
				closeButton:true,
				targetEventToClose:null,
				offsetX:20,
				offsetY:120,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#piemenu_container').instract({
				string:MazeLearningMsg.SceneA2_01.InstructionTraceOperation,
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
