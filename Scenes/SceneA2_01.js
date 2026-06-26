function SceneA2_01() {
	SceneA2_ElementaryBase.apply(this,arguments);
	this.super = SceneA2_ElementaryBase.prototype;
	this.setDefinedStartGoal(1,5);
}
SceneA2_01.prototype = new SceneA2_ElementaryBase();
SceneA2_01.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,33004,40000,40000,40000,40000],
		[40000,40000,40000,40000,30005,10000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,10000,32003,40000,40000,40000],
		[40000,40000,30006,10000,10000,10000,40000,40000,40000,40000],
		[40000,40000,40000,31007,40000,10000,32002,40000,40000,40000],
		[40000,40000,40000,40000,40000,21001,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneA2_01.prototype.getScore = function(){
	return "A";
}
SceneA2_01.prototype.startScene = function(){
	this.super.startScene.call(SceneA2_01.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA2_01.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",this.isReplay());
	blocklyButtonVisibility("TraceOperation",true);
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(true);

	var xml = Blockly.Xml.textToDom(
		'<xml>'+
			'<block type="straight" x="-60" y="40">'+
				'<next><block type="straight">'+
					'<next><block type="if">'+
						'<field name="selections">canGo(-90)</field>'+
						'<statement name="trueCase"><block type="turn"><field name="selections">turnRight();</field></block></statement>'+
						'<next><block type="straight">'+
							'<next><block type="straight">'+
								'<next><block type="if">'+
									'<field name="selections">canGo(90)</field>'+
									'<statement name="trueCase"><block type="turn"><field name="selections">turnLeft();</field></block></statement>'+
									'<next><block type="straight"></block></next>'+
								'</block></next>'+
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
