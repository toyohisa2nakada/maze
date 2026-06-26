
function SceneB1_IntermediateBase() {
	Scene.apply(this,arguments);
	this.super = Scene.prototype;
}
SceneB1_IntermediateBase.prototype = new Scene();
SceneB1_IntermediateBase.prototype.getDisableBlocks = function(){
	var disabledBlocks = [];
	disabledBlocks.push('set_variable');
	disabledBlocks.push('change_variable');
	disabledBlocks.push('if_variable');
	disabledBlocks.push('while_variable');
	disabledBlocks.push('function_definition');
	disabledBlocks.push('function_call');
	return disabledBlocks;
}
SceneB1_IntermediateBase.prototype.getBackgroundImage = function(){
	return 'linear-gradient(/*white,*/white,#d0ffff,#f0ffff,white)';
}
SceneB1_IntermediateBase.prototype.startScene = function(){
	this.super.startScene.call(SceneB1_IntermediateBase.prototype);
}
