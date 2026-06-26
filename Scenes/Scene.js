/*
 * level design
 * 
 * A1 Beginner: only use straight, turn left, turn right blocks.
 * A2 Elementary: if statement is used in addition to A1.
 * B1 Intermediate: while statement is used in addition to A2.
 * B2 Upper Intermediate: variable, array is used in addition to B1.
 * C1 Advanced: class,function design.
 * C2 Upper advanced: multi-thread, and so on.
 * 
 * over B2 level is not supported at Jan. 2015.
 */

function Scene() {
	this.definedStartGoal = [];
	this.replay = false;
}
Scene.prototype.maze = function(){
	// when x,y is a position, the wall represents world[y][x]==-1.
	// format of a number:
	// [type][angle][stage][number]
	// type: 0: not use because of 8 digit
	//       1: normal road
	//       2: start
	//       3: goal
	//       4: wall
	//       5: hole
	// angle: the players angle which it starts from
	//       player's angle = angle*90, axis is mathematical.
	//       the range is 0-3
	// stage: sub-goals in the scene. the range is 0-9
	// number: placed number. the range is 0-99.
	//         if placed number is 1, the player will start from there.
	return [
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
		[40000,40000,40000,40000,40000,40000,40000,40000,40000,40000],
	];
};
Scene.prototype.getScore = function(){
	return "A";
}
Scene.prototype.getBackgroundImage = function(){
	return "";
}
Scene.prototype.setDefinedStartGoal = function(st,gl){
	this.definedStartGoal[0] = st;
	this.definedStartGoal[1] = gl;
}
Scene.prototype.setDefinedStartGoals = function(sequence){
	this.definedStartGoal = sequence.concat();
}
Scene.prototype.isReplay = function(){
	return this.replay;
}
Scene.prototype.startScene = function(){
	$('body').css('background-image',this.getBackgroundImage());
	disableBlocklyDefault = undefined;
	disableAll(false);
	setBlocklyBlockCapacity(Infinity);
	mazeClickEnabled(false);
	return true;
}
Scene.prototype.setQuestionSentence = function(str){
	$('#question_sentence').html(str);
}
Scene.prototype.getDisableBlocks = function(){
	return [];
}
Scene.prototype.isLimitBlockConnection = function(){
	return false;
}
Scene.prototype.getFuncBlockType = function(){
	return 0;
}
Scene.prototype.getWhileBlockNumberAsc = function(){
	return false;
}
Scene.prototype.setHint = function(options){
	var opt = $.extend({
		operation:'',
		count:-1,
		hint_operation:'',
		hint_instraction_string:'',
		hint_offsetX:0,
		hint_offsetY:0,
		hint_pieMenu:false,
		hint_delay:3000,
	},options===undefined?{}:options);
	
	if(opt.operation.length==0 || opt.count<0){
		return false;
	}

	operationCounter.addHandler(opt.operation,opt.count,function(){
		setTimeout(function(){
			blocklyButtonVisibility(opt.hint_operation.match('blockly(.*)')[1],true);
			if(opt.hint_pieMenu==true){
				pieMenuVisibility(true);
			}
			$('#'+opt.hint_operation).instract({
				string:opt.hint_instraction_string,
				offsetX:opt.hint_offsetX,
				offsetY:opt.hint_offsetY,
				closeButton:true,
			});
		},opt.hint_delay);
	});
}
Scene.prototype.beforeTest = function(){
	// when true returned, the test will be performed.
	return true;
}
Scene.prototype.test = function(placedNumbers){
	// when test is passed, the method must return true.
	if(this.definedStartGoal.length==2 && placedNumbers.length>=2){
		return this.definedStartGoal[0]==placedNumbers[0] &&
			this.definedStartGoal[1]==placedNumbers[placedNumbers.length-1];
	}else if(this.definedStartGoal.length>2 && this.definedStartGoal.length==placedNumbers.length){
		var same = true;
		for(var i=0;i<this.definedStartGoal.length;i++){
			if(this.definedStartGoal[i]!=placedNumbers[i]){
				same = false;
				break;
			}
		}
		return same;
	}
	return false;
}
