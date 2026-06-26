
function SceneB1_04() {
	SceneB1_IntermediateBase.apply(this,arguments);
	this.super = SceneB1_IntermediateBase.prototype;
	this.setDefinedStartGoals([1,2,3,4]);
}
SceneB1_04.prototype = new SceneB1_IntermediateBase();
SceneB1_04.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,33004,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,31003,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,31002,21001,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneB1_04.prototype.startScene = function(){
	this.super.startScene.call(SceneB1_04.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB1_04.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(this.isReplay());
	disableBlocklyDefault = true;
	disableBlockly(true);
	mazeClickEnabled(true,12);
	

	var xml = Blockly.Xml.textToDom(
		'<xml>'+
			'<block type="while_playerPlacedNumber" x="10" y="40">'+
				'<field name="selections">!=4</field><statement name="trueCase">'+
					'<block type="if"><field name="selections">canGo(-90)</field><statement name="trueCase">'+
						'<block type="if"><field name="selections">canGo(90)</field><statement name="trueCase">'+
							'<block type="turn"><field name="selections">turnLeft();</field></block></statement>'+
							'<statement name="falseCase"><block type="turn"><field name="selections">turnRight();</field></block></statement>'+
						'</block></statement>'+
						'<next><block type="straight"></block></next>'+
					'</block>'+
				'</statement>'+
			'</block>'+
		'</xml>'
	);

	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,xml);

	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
		function(){
			disableAll(true);
			$('#drawing_container').instract({
				string:MazeLearningMsg.SceneB1_04.InstructionClickMaze,
				offsetX:getPlacedNumberPos(4,false).x+10,
				offsetY:getPlacedNumberPos(4,false).y,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#mazePunchCapacity').instract({
				string:MazeLearningMsg.SceneB1_04.InstructionMaxClicks,
				closeButton:true,
				targetEventToClose:null,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#blocklyStartInterpreter').instract({
				string:MazeLearningMsg.SceneB1_04.InstructionStart,
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
			disableBlockly(true);
			return;
		}
		idx++;
		setTimeout(instructions[idx],500);
	}
	nextInst();
}
