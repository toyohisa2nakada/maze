
function SceneC1_AdvancedBase() {
	Scene.apply(this,arguments);
	this.super = Scene.prototype;
}
SceneC1_AdvancedBase.prototype = new Scene();
SceneC1_AdvancedBase.prototype.getBackgroundImage = function(){
	return 'linear-gradient(/*white,*/white,#aaaaaa,#cccccc,white)';
}
SceneC1_AdvancedBase.prototype.startScene = function(){
	this.super.startScene.call(SceneC1_AdvancedBase.prototype);
}
