function SceneA1_01() {
	SceneA1_BeginnerBase.apply(this,arguments);
	this.super = SceneA1_BeginnerBase.prototype;
	this.setDefinedStartGoal(1,3);
}
SceneA1_01.prototype = new SceneA1_BeginnerBase();
SceneA1_01.prototype.maze = function(){
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,10000,31003,40000,40000,40000],
		[40000,40000,40000,40000,31002,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,10000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,21001,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
SceneA1_01.prototype.getScore = function(){
	return "A";
}
SceneA1_01.prototype.startScene = function(){
	this.super.startScene.call(SceneA1_01.prototype);
	this.setQuestionSentence(MazeLearningMsg.SceneA1_01.QuestionSentence);
	blocklyButtonVisibility("StartInterpreter",true);
	blocklyButtonVisibility("TraceOperation",this.isReplay());
	blocklyButtonVisibility("ShowSubsetRules",false);
	blocklyButtonVisibility("ShowInstances",this.isReplay());
	blocklyButtonVisibility("Extraction",this.isReplay());
	pieMenuVisibility(this.isReplay());
	
	var xml = Blockly.Xml.textToDom(
			'<xml>'+
				'<block type="straight" x="-60" y="40">'+
					'<next>'+
						'<block type="straight"></block>'+
					'</next>'+
				'</block>'+
			'</xml>');
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,xml);
	
	if(this.isReplay()==true || availableInstruction==false){
		return;
	}
	var instructions = [
		function(){
			disableAll(true);
			$('#drawing_container').instract({
				string:MazeLearningMsg.SceneA1_01.InstructionPlayer,
				closeButton:true,
				targetEventToClose:null,
				offsetX:getPlayerPos(false).x-20,
				offsetY:getPlayerPos(false).y,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#drawing_container').instract({
				string:MazeLearningMsg.SceneA1_01.InstructionGoal,
				closeButton:true,
				targetEventToClose:null,
				offsetX:getPlacedNumberPos(3,false).x-20,
				offsetY:getPlacedNumberPos(3,false).y,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#blocklyFrame').instract({
				string:MazeLearningMsg.SceneA1_01.InstructionFirstProgram,
				closeButton:true,
				targetEventToClose:null,
				offsetX:250,
				offsetY:80,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			disableAll(true);
			$('#blocklyStartInterpreter').css('pointer-events','auto');
			$('#blocklyStartInterpreter').instract({
				string:MazeLearningMsg.SceneA1_01.InstructionToPressStart,
				closedHandler:function(){nextInst();},
			});
		},
		function(){
			function f(){
				if(getPlacedNumber()!=2){
					setTimeout(arguments.callee,100);
				}else{
					disableAll(true);
					$('#drawingReset').css('pointer-events','auto');
					$('#drawingReset').instract({
						string:MazeLearningMsg.SceneA1_01.InstructionToPressReset,
						closedHandler:function(){nextInst();},
					});
				}
			}
			setTimeout(f,1000);
		},
		function(){
			disableAll(true);
			$('#blocklyFrame').instract({
				string:MazeLearningMsg.SceneA1_01.InstructionBlocks,
				closeButton:true,
				targetEventToClose:null,
				offsetX:50,
				offsetY:15,
				offsetBottom:$('#blocklyFrame').height()*-0.7,
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
