
function SceneA1_BeginnerBase() {
	Scene.apply(this,arguments);
	this.super = Scene.prototype;
}
SceneA1_BeginnerBase.prototype = new Scene();
SceneA1_BeginnerBase.prototype.getDisableBlocks = function(){
	var disabledBlocks = [];
	if(this.isReplay()==false){
		disabledBlocks.push("if");
		disabledBlocks.push("while_playerPlacedNumber");
	}
	disabledBlocks.push('set_variable');
	disabledBlocks.push('change_variable');
	disabledBlocks.push('if_variable');
	disabledBlocks.push('while_variable');
	disabledBlocks.push('function_definition');
	disabledBlocks.push('function_call');
	return disabledBlocks;
}
SceneA1_BeginnerBase.prototype.getBackgroundImage = function(){
	return 'linear-gradient(/*white,*/white,#d0d0ff,#f0f0ff,white)';
}
SceneA1_BeginnerBase.prototype.startScene = function(){
	this.super.startScene.call(SceneA1_BeginnerBase.prototype);
}
