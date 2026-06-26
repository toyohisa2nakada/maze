
function SceneA2_ElementaryBase() {
	Scene.apply(this,arguments);
	this.super = Scene.prototype;
}
SceneA2_ElementaryBase.prototype = new Scene();
SceneA2_ElementaryBase.prototype.getDisableBlocks = function(){
	var disabledBlocks = [];
	if(this.isReplay()==false){
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
SceneA2_ElementaryBase.prototype.getBackgroundImage = function(){
	return 'linear-gradient(/*white,*/white,#ffff80,#ffffd0,white)';
}
SceneA2_ElementaryBase.prototype.startScene = function(){
	this.super.startScene.call(SceneA2_ElementaryBase.prototype);
}
