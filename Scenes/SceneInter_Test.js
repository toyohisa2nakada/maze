
function SceneInter_Test() {
	SceneB1_IntermediateBase.apply(this,arguments);
	this.super = SceneB1_IntermediateBase.prototype;
	this.setDefinedStartGoal(1,5);
}
SceneInter_Test.prototype = new SceneB1_IntermediateBase();
SceneInter_Test.prototype.maze = function(){
	return [
	        /*
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,10000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,10000,40000,40000,33003,40000,40000,40000,40000,40000],
		[40000,10000,40000,40000,10000,40000,33004,40000,40000,40000],
		[40000,10000,40000,40000,10000,40000,10000,40000,40000,40000],
		[40000,10000,10000,10000,10000,10000,10000,40000,40000,40000],
		[40000,10000,40000,40000,10000,40000,10000,40000,40000,40000],
		[40000,10000,40000,40000,10000,40000,31006,40000,40000,40000],
		[40000,10000,40000,40000,21001,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		*/
		[40000,40000,40000,40000,40000,40000,33002,40000,40000,40000],
		[40000,10000,10000,10000,10000,10000,10000,10000,50000,40000],
		[10000,10000,40000,40000,40000,40000,10000,40000,40000,40000],
		[40000,10000,10000,10000,10000,40000,10000,40000,40000,40000],
		[40000,10000,40000,40000,10000,40000,10000,40000,40000,40000],
		[40000,10000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,10000,40000,40000,10000,10000,10000,10000,50000,40000],
		[40000,10000,40000,40000,10000,40000,10000,40000,40000,40000],
		[40000,10000,40000,40000,10000,40000,50000,40000,40000,40000],
		[40000,10000,40000,40000,21001,40000,40000,40000,40000,40000],
	];
};
SceneInter_Test.prototype.getScore = function(){
	return "A";
}
SceneInter_Test.prototype.startScene = function(){
	this.super.startScene.call(SceneInter_Test.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneB1_03.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",true);
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",true);
	blocklyButtonVisibility("Extraction",true);
	pieMenuVisibility(true);
	disableBlockly(false);

	var xml = Blockly.Xml.textToDom(
		'<xml>'+
			'<block type="while_playerPlacedNumber" x="-40" y="40"><field name="selections">==1||getPlacedNumber()==0</field>'+
				'<statement name="trueCase">'+
					'<block type="if"><field name="selections">canGo(90)</field>'+
						'<statement name="trueCase"><block type="turn"><field name="selections">turnLeft();</field></block></statement>'+
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
}
