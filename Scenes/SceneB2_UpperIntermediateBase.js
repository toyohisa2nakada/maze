
function SceneB2_UpperIntermediateBase() {
	Scene.apply(this,arguments);
	this.super = Scene.prototype;
}
SceneB2_UpperIntermediateBase.prototype = new Scene();
SceneB2_UpperIntermediateBase.prototype.getDisableBlocks = function(){
	var disabledBlocks = [];
	disabledBlocks.push('function_definition');
	disabledBlocks.push('function_call');
	return disabledBlocks;
}
SceneB2_UpperIntermediateBase.prototype.getBackgroundImage = function(){
	return 'linear-gradient(/*white,*/white,#ffd080,#ffd0a0,white)';
}
SceneB2_UpperIntermediateBase.prototype.startScene = function(){
	this.super.startScene.call(SceneB2_UpperIntermediateBase.prototype);
}
