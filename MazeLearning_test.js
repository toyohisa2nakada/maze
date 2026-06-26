function BackupData(){
	var rulesBackup = [];
	var rulesIndexBackup = [];
	var tracedPlacedNumbersBackup = [];
	var tabsBackup = [];
	this.backup = function(){
		rulesBackup[rulesBackup.length] = rules.concat();
		rulesIndexBackup.push(rulesIndex);
		tracedPlacedNumbersBackup[tracedPlacedNumbersBackup.length] = tracedPlacedNumbers.concat();
		tabsBackup.push(backupAllTabs());
		backupData.updateButton();
	}
	this.restore = function(){
		if(rulesBackup.length>0){
			rules = rulesBackup[rulesBackup.length-1];
			rulesIndex = rulesIndexBackup[rulesIndexBackup.length-1];
			tracedPlacedNumbers = tracedPlacedNumbersBackup[tracedPlacedNumbersBackup.length-1];
			replaceBlocklyWorkspace(rules[rulesIndex]);
			restoreAllTabs(tabsBackup[tabsBackup.length-1]);
			selectBlocklyTab(rulesIndex);
			backupData.clearLast();
			backupData.updateButton();
		}
	}
	this.clearLast = function(){
		rulesBackup.splice(rulesBackup.length-1);
		rulesIndexBackup.splice(rulesIndexBackup.length-1);
		tracedPlacedNumbersBackup.splice(tracedPlacedNumbersBackup.length-1);
		tabsBackup.splice(tabsBackup.length-1);
		backupData.updateButton();
	}
	this.clear = function(){
		rulesBackup = [];
		rulesIndexBackup = [];
		tracedPlacedNumbers = [];
		backupData.updateButton();
	}
	this.updateButton = function(){
		$("#drawingBack").attr("disabled",rulesBackup.length==0);
	}
};
function OperationCounter(){
	this.counters;
	this.handlers;
	this.add = function(opeName){
		if(this.counters[opeName] === undefined){
			this.counters[opeName] = 1;
		}else{
			this.counters[opeName]++;
		}
		if(undefined!==this.handlers[opeName]){
			for(var i=0;i<this.handlers[opeName].length;i++){
				if(this.handlers[opeName][i].count == this.counters[opeName]){
					this.handlers[opeName][i].handler();
				}
			}
		}
	}
	this.minus = function(opeName){
		if(this.counters[opeName] !== undefined){
			this.counters[opeName]--;
		}
	}
	this.get = function(opeName){
		return this.counters[opeName]===undefined?0:this.counters[opeName];
	}
	this.clear = function(){
		this.counters = {};
		this.handlers = {};
	}
	this.addHandler = function(opeName,count,handler){
		if(this.handlers[opeName]===undefined){
			this.handlers[opeName] = [];
		}
		this.handlers[opeName].push({
			'count':count,
			'handler':handler,
		});
	}
	this.toString = function(){
		var ret = '';
		for(var opeName in this.counters){
			if(ret.length!=0){
				ret += ',';
			}
			ret += opeName+","+this.counters[opeName];
		}
		return ret;
	}
	this.clear();
}

/*
var sceneNames = [
	// test interactive
//	'Inter_Test',

    'A1_01',	//1
	'A1_02',	//2
	'A1_03',	//3
	'A1_04',	//4
	'A2_01',	//5
	'A2_02',	//6
	'A2_03',	//7
	'A2_04',	//8
	'B1_01',	//9
	'B1_02',	//10
	'B1_03',	//11
	'B1_04',	//12
	'B1_05',	//13
	'B1_06',	//14
	'B1_07',	//15
	'B2_01',	//16

	//'B2_02',
	//'B2_03',
	//'C1_01',
	//'C1_02',
	//'C1_03',
];
*/
console.log("--------------------------test---------------------------");

var scenes = {};
for(var i=0;i<sceneNames.length;i++){
	scenes[sceneNames[i]] = eval("new Scene"+sceneNames[i]+"()");
}
var backupData = new BackupData();
var operationCounter = new OperationCounter();
var rules = [Blockly.utils.xml.textToDom("<xml></xml>")];
//var rules = [Blockly.Xml.textToDom("<xml></xml>")];
var rulesIndex = 0;
var tracedPlacedNumbers = [];
var mazeInstances = new MazeInstances();
var subsetRules = new SubsetRules();
var availableAllScene = false;
var availableInstruction = true;
var disableBlocklyDefault = undefined;

function resetTracedPlacedNumbers(){
	tracedPlacedNumbers = [];
	addTracedPlacedNumbers();
}
function addTracedPlacedNumbers(){
	var n = getPlacedNumber();
	if(n!=0 && -1 == $.inArray(n,tracedPlacedNumbers)){
		tracedPlacedNumbers.push(n);
	}
	return tracedPlacedNumbers;
}
function pieMenuVisibility(visible){
	eval("$('#piemenu_container')."+(visible?"show":"hide")+"();");
}
function getCurrentSceneName(){
	var name = jp.ac.nuis.nakada.MazeViewer.getInstance().getCurrentScene();
	return (name.length==0 || -1==$.inArray(name,sceneNames))?sceneNames[0]:name;
}
function setCurrentSceneName(name){
	jp.ac.nuis.nakada.MazeViewer.getInstance().setCurrentScene(name);
}
function getScenes(){
	return scenes;
}
function getCurrentScene(){
	return scenes[getCurrentSceneName()];
}
function getNextSceneName(curSceneName){
	var i = $.inArray(curSceneName,sceneNames);
	return (i!=-1 && i<sceneNames.length-1)?sceneNames[i+1]:null;
}
function turnLeft(){
	$('#piemenu_container').pieTurnLeft();
	jp.ac.nuis.nakada.MazeViewer.getInstance().playerTurns(90);
}
function turnRight(){
	$('#piemenu_container').pieTurnRight();
	jp.ac.nuis.nakada.MazeViewer.getInstance().playerTurns(-90);
}
function turnBack(){
	turnLeft();
	turnLeft();
}
function getPlacedTypePos(type,absolute){
	return {
		'x':jp.ac.nuis.nakada.MazeViewer.getInstance().getPlacedTypePosX(type)+
			(absolute?$('#drawing_container').offset().left:0),
		'y':jp.ac.nuis.nakada.MazeViewer.getInstance().getPlacedTypePosY(type)+
			(absolute?$('#drawing_container').offset().top:0),
	};
}
function getPlacedNumberPos(number,absolute){
	return {
		'x':jp.ac.nuis.nakada.MazeViewer.getInstance().getPlacedNumberPosX(number)+
			(absolute?$('#drawing_container').offset().left:0),
		'y':jp.ac.nuis.nakada.MazeViewer.getInstance().getPlacedNumberPosY(number)+
			(absolute?$('#drawing_container').offset().top:0),
	};
}
function getPlayerPos(absolute){
	return {
		'x':jp.ac.nuis.nakada.MazeViewer.getInstance().getPlayerPosX()+
			(absolute?$('#drawing_container').offset().left:0),
		'y':jp.ac.nuis.nakada.MazeViewer.getInstance().getPlayerPosY()+
			(absolute?$('#drawing_container').offset().top:0),
	};
}
function go(addExample){
	var createRule;
	if(addExample===undefined){
		addExample = $("#blocklyExtraction").hasClass("doing") || $("#blocklyShowInstances").hasClass("doing");
		createRule = $("#blocklyExtraction").hasClass("doing");
	}else{
		createRule = addExample;
	}
	if(addExample==true){
		jp.ac.nuis.nakada.MazeViewer.getInstance().setPlayerRuleCriterion(
			(new XMLSerializer()).serializeToString(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)));
	}
	rules[rulesIndex] = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	backupData.backup();
	var moved = jp.ac.nuis.nakada.MazeViewer.getInstance().playerGoes(addExample);
	if(moved==true){
		addTracedPlacedNumbers();
		if(createRule==true && jp.ac.nuis.nakada.MazeViewer.getInstance().isPlayerRuleChanged()){
			var n_rules = jp.ac.nuis.nakada.MazeViewer.getInstance().getPlayerRules();
			removeAllBlocklyTabs();
			if(n_rules.length==0){
				rulesIndex = getSelectedIndexBlocklyTab();
			}else{
				addBlocklyTabs(n_rules);
				rulesIndex = rules.length;
				var i;
				for(i=0;i<n_rules.length;i++){
					rules.push(Blockly.Xml.textToDom(n_rules[i]));
				}
				selectBlocklyTab(rulesIndex);
			}
			replaceBlocklyWorkspace(rules[rulesIndex]);
		}
		if($("#blocklyTraceOperation").hasClass("doing") && ghost!=null){
			if(false == ghost.checkNext()){
//				setTimeout(function(){alert(MazeLearningMsg.Manual_TraceOperation_WrongOperation)},1500);
			}else if(ghost.isAllChecked()){
				setTimeout((function(){
					return function(){
						checkSceneGoal(ghost.interpreter);
					}
				})(),1500);
			}
		}
	}else{
		backupData.clearLast();
	}
	$("#piemenu_option_cl").attr("disabled",
			jp.ac.nuis.nakada.MazeViewer.getInstance().countPlayerExamples()==0);
	return moved;
}
function checkSceneGoal(interpreter){
	if(false == getCurrentScene().test(tracedPlacedNumbers)){
		return false;
	}
	var stages = jp.ac.nuis.nakada.MazeViewer.getInstance().getStages();
	var currentPlayerIndex = jp.ac.nuis.nakada.MazeViewer.getInstance().getCurrentPlayerIndex();
//console.log("+++ currentPlayerIndex = "+currentPlayerIndex);
	
	if(stages.length-1 != currentPlayerIndex){
		jp.ac.nuis.nakada.MazeViewer.getInstance().setCurrentPlayerIndex(currentPlayerIndex+1);
		setTimeout(function(){
			blocklyStartInterpreter(true);
//			$('#blocklyStartInterpreter').trigger('click');
		},1000);
		return false;
	}

	var nextScene = getNextSceneName(getCurrentSceneName());
	var curStatus = getSceneStatus(getCurrentSceneName());
	var curScore = getSceneScore(getCurrentSceneName());
	if(curStatus.startsWith("cleared")==false ||
		rankToNumber(curScore) > rankToNumber(getCurrentScene().getScore())){
		jp.ac.nuis.nakada.MazeViewer.getInstance().setSceneStatus(
			getCurrentSceneName(),"cleared_"+getCurrentScene().getScore());
	}
	if(nextScene != null && getSceneStatus(nextScene).startsWith("cleared")==false){
		jp.ac.nuis.nakada.MazeViewer.getInstance().setSceneStatus(
			nextScene,"trying");
	}
	updateSceneIcons();
	
	var nextButtons = [];
	var nextButtonHandlers = [];
	var message = MazeLearningMsg.HelpString.ClearedScene;
	var msg_size = "72px";
	if(nextScene != null){
		nextButtons.push(MazeLearningMsg.HelpString.Next_Scene);
		nextButtonHandlers.push(
			function(){
				setCurrentSceneName(nextScene);
				updateSceneIcons();
				disableAll(false);
				resetMaze();
			}
		);
	}else{
		console.log("last");
/*
		message += "<br />これですべて終わりです。";
		message += "<br /><span style='font-size:small'>プログラミングの才能あるかも？</span>";
*/
		message += MazeLearningMsg.HelpString.ClearedGame;
		msg_size = "32px";
	}
	nextButtons.push(MazeLearningMsg.HelpString.Stay_Scene);
	nextButtonHandlers.push(
		function(){
			disableAll(false);
		}
	);
	
	// save operation counter to cloud
	jp.ac.nuis.nakada.MazeViewer.getInstance().setOperationCounter(
		getCurrentSceneName(),operationCounter.toString());
	
	// goal ceremony
	jp.ac.nuis.nakada.MazeViewer.getInstance().soundPlay(3);
	disableAll(true);
	$('body').instract({
		string:message,
		align:'center',
		arrow:false,
		afterTag:scoreImage(getCurrentScene().getScore(),getCurrentScene().showLog),
		font_size:msg_size,
		offsetX:$('body').width()/2,
		offsetY:$('body').height()/2,
		targetEventToClose:null,
		buttons:nextButtons,
		buttonHandlers:nextButtonHandlers,
	});
	return true;
}
function rankToNumber(rank){
	var ranks = {
		'a':0, 'A':0,
		'b':1, 'B':1,
		'c':2, 'C':2,
	};
	return ranks[rank];
}
function scoreImage(rankStr,showLog){
console.log("showLog",showLog);
	var h = 170;
	var w = 209;
	function trans(rank,w){
		return -w*rank;
	}
	function clipRight(rank,w){
		return w*(rank+1);
	}
	function clipLeft(rank,w){
		return w*rank;
	}
	var sw = w/sceneNames.length;
	var sh = h*sw/w;
	var logs = '';
	var sts = getSceneStatuses();
	for(var i=0;i<sceneNames.length;i++){
		var border_clr = sceneNames[i]==getCurrentSceneName()?"red":"black";
		var z_index = sceneNames[i]==getCurrentSceneName()?"9999":"9";
		logs += '<div style="float:left;border:solid 1px '+border_clr+';'+
			'height:'+sh+'px;width:'+(sw-2)+'px;'+
			'z-index:'+z_index+';'+
			'margin-top:0px;margin-right:0px;">';
		if(sts[sceneNames[i]].startsWith('cleared')){
			var r = rankToNumber(getSceneScore(sceneNames[i]));
			logs += '<img src="scores.png" style="'+
				'transform:translateX('+trans(r,sw)+'px);'+
				'clip:rect(0px,'+clipRight(r,sw)+'px,'+sh+'px,'+clipLeft(r,sw)+'px);'+
				'position:absolute;width:'+(sw*3)+'px;'+
				'margin-left:0px;"'+
			'>';
		}
		logs += '</div>';
	}
	var rank = rankToNumber(rankStr);
	return ''+
		'<div style="float:left;height:'+(h+sh)+'px;width='+w+'px;">'+
			'<div style="clear:both;height:'+h+'px;width:'+w+'px;">'+
				'<img src="scores.png" style="'+
					'transform:translateX('+trans(rank,w)+'px);'+
					'clip:rect(0px,'+clipRight(rank,w)+'px,'+h+'px,'+clipLeft(rank,w)+'px);'+
					'position:absolute;'+
				'">'+
			'</div>'+
			(showLog===false?"":logs)+
		'</div>';
}
function canGo(localAngle){
	return jp.ac.nuis.nakada.MazeViewer.getInstance().canPlayerGo(localAngle);
}
function getPlacedNumber(){
	return jp.ac.nuis.nakada.MazeViewer.getInstance().getPlayerPlacedNumber();
}
function getPlacedNumbers(asc,add_not){
//console.log("#### getPlacedNumbers "+asc+","+add_not+" ",getCurrentScene());
	asc = asc===undefined?true:asc;
	add_not = add_not===undefined?false:add_not;
	var list = jp.ac.nuis.nakada.MazeViewer.getInstance().getPlacedNumbers(asc);
	if(add_not==true){
		var last_n = list[asc?0:list.length-1][2];
		var last_n_str = list[asc?0:list.length-1][0];
		var i = [];
		i.push(MazeLearningMsg.Block_Loop_BeforeNotNumber+last_n_str+MazeLearningMsg.Block_Loop_AfterNotNumber);
		i.push("=="+last_n+"||getPlacedNumber()==0");
		if(asc){
			list.unshift(i);
		}else{
			list.push(i);
		}
	}
	// ループブロックの「start」を変換する。
	// startという文字は、java部分に書かれていて再コンパイルの環境がないので、
	// ここで置換する。
	// 2019.08.20
	for(v in list){
		//console.log(list[v]);
		list[v][0] = list[v][0].replace("start",MazeLearningMsg.Block_StartPoint);
	}
	return list;
}
function getSceneStatuses(){
	var sts = {};
	for(var i=0;i<sceneNames.length;i++){
		sts[sceneNames[i]] = 'none';
	}
	var sts_strs = jp.ac.nuis.nakada.MazeViewer.getInstance().getSceneStatusesString().split(',');
	for(var i=0;i<sts_strs.length;i++){
		if(-1!=sts_strs[i].indexOf(':')){
			var pts = sts_strs[i].split(':');
			sts[pts[0]] = pts[1];
		}
	}
	// change none to trying before cleared scene because of inserted scene.
	var first_cleared_scene = -1;
	for(var i=0;i<sceneNames.length;i++){
//console.log(" "+i+" "+sts[sceneNames[i]]);
		if(first_cleared_scene == -1 && sts[sceneNames[i]].startsWith('cleared')){
			first_cleared_scene = i;
			break;
		}
	}
	for(var i=0;i<first_cleared_scene;i++){
		if(sts[sceneNames[i]] == 'none'){
			sts[sceneNames[i]] = 'trying';
		}
	}
	return sts;
}
function getSceneStatus(name){
	return getSceneStatuses()[name];
}
function getSceneScore(sceneName){
	if(getSceneStatus(sceneName).startsWith('cleared')){
		return getSceneStatus(sceneName).match('cleared_(.)')[1];
	}
	return '';
}
function updateSceneIcons(){
	$('.sceneItems').remove();
	var sts = getSceneStatuses();
	for(var i=0;i<sceneNames.length;i++){
		var tag = "<div class='sceneItems' id='scene_"+
			sceneNames[i]+
			"' style='border:solid 1px;float:left;width:20px;text-align:center;";
		var handler = null;

		var background = "";
		var cursor = "";
		if(sceneNames[i]==getCurrentSceneName()){
			background = "linear-gradient(white,blue,blue)";
		}else if(sts[sceneNames[i]].startsWith("cleared")){
			background = "linear-gradient(white,grey,grey)";
			cursor = "pointer";
		}else if(sts[sceneNames[i]] == "trying"){
			background = "linear-gradient(white,skyblue,skyblue)";
			cursor = "pointer";
		}else{
			background = scenes[sceneNames[i]].getBackgroundImage();
			if(availableAllScene){
				cursor = "pointer";
			}
		}
		tag += (background==""?"":("background-image:"+background+";"));
		tag += (cursor==""?"":("cursor:"+cursor+";"));
		tag += "'>"+(i+1)+"</div>";
		$('#clearSceneData').before(tag);
		if(cursor == 'pointer'){
			$('#scene_'+sceneNames[i]).click(function(){
				if(confirm(MazeLearningMsg.ChangeSceneCheck)){
					var name = $(this).attr('id').match('scene_(.*)')[1];
					jp.ac.nuis.nakada.MazeViewer.getInstance().setCurrentScene(name);
					resetMaze();
				}
			});
		}
	}
	
	var hasCleared = false;
	for(var s in sts){
		if(sts[s].startsWith("cleared")){
			hasCleared = true;
			break;
		}
	}
	$('#clearSceneData').off('click');
	if(hasCleared == false){
		$('#clearSceneData').css('cursor','');
	}else{
		$('#clearSceneData').css('cursor','pointer');
		$('#clearSceneData').on('click',function(event){
			if(confirm(MazeLearningMsg.ClearClearedSceneCheck)){
				setCurrentSceneName('');
				jp.ac.nuis.nakada.MazeViewer.getInstance().clearSceneStatuses();
				resetMaze();
			}
		});
	}
}
function mazeClickEnabled(enable,maxClicks){
	function updateMaxMazeClicks(){
		document.getElementById('mazePunchCapacity').innerHTML = 
			MazeLearningMsg.MazeClickCapacityBefore+
			window.maxMazeClicks+
			MazeLearningMsg.MazeClickCapacityAfter;
	}
	if(enable){
		$("#drawing_container").on('click',function(e){
			var x = e.pageX - $("#drawing_container").offset().left;
			var y = e.pageY - $("#drawing_container").offset().top;
			if(window.maxMazeClicks==0 && jp.ac.nuis.nakada.MazeViewer.isWall(x,y)){
				jp.ac.nuis.nakada.MazeViewer.getInstance().soundPlay(1);
			}else{
				window.maxMazeClicks += jp.ac.nuis.nakada.MazeViewer.getInstance().togglePath(x,y);
				updateMaxMazeClicks();
			}
		});
		window.maxMazeClicks = maxClicks;
		updateMaxMazeClicks();
	}else{
		$("#drawing_container").off('click');
		document.getElementById('mazePunchCapacity').innerHTML = '';
	}
}
function resetPlayerPosition(placedNumber){
	jp.ac.nuis.nakada.MazeViewer.getInstance().playerResets(placedNumber===undefined?-1:placedNumber);
	setPiemenuToPlayerAngle();
}
function disableAll(disable){
	var ev = disable==true?'none':'auto';
	$('#scene').css('pointer-events',ev);

	$('#drawingResetNumber').css('pointer-events',ev);
	$('#drawingReset').css('pointer-events',ev);
	$('#drawingBack').css('pointer-events',ev);
	$('#piemenu_container').css('pointer-events',ev);

	$('#sliderContainer').css('pointer-events',ev);
	$('#blocklyStartInterpreter').css('pointer-events',ev);
	$('#blocklyTraceOperation').css('pointer-events',ev);
	$('#blocklyShowSubsetRules').css('pointer-events',ev);
	$('#blocklyShowInstances').css('pointer-events',ev);
	$('#blocklyExtraction').css('pointer-events',ev);

	$('#tabs').css('pointer-events',ev);
	$('#mazeInstanceContainer').css('pointer-events',ev);
	$('#subsetRulesContainer').css('pointer-events',ev);
	disableBlockly(disable);
}
function disableBlockly(disable){
	var dsa = disableBlocklyDefault===undefined?disable:disableBlocklyDefault;
	var ev = dsa==true?'none':'auto';
	$('svg',$('#blocklyFrame')[0].contentWindow.document).css('pointer-events',ev);
}
function disableMaze(disable){
	var ev = disable==true?'none':'auto';
	$('#drawing_container').css('pointer-events',ev);
}
function resetMaze(){
	operationCounter.clear();
	backupData.clear();
	getCurrentScene().replay = getSceneStatus(getCurrentSceneName()).startsWith('cleared');
	jp.ac.nuis.nakada.MazeViewer.getInstance().setWorlds(getCurrentScene().maze());
	jp.ac.nuis.nakada.MazeViewer.getInstance().setPlayerRuleType(
		getCurrentScene().isLimitBlockConnection()?1:0);
	subsetRules.setHandler(null);
	subsetRules.clear();
	$('#blocklyFrame')[0].contentWindow.init({
		'placedNumbersFunc':window.getPlacedNumbers,
		'placedNumbersAsc':getCurrentScene().getWhileBlockNumberAsc(),
		'disableBlocks':getCurrentScene().getDisableBlocks(),
		'limitBlockConnection':getCurrentScene().isLimitBlockConnection(),
		'funcBlockType':getCurrentScene().getFuncBlockType(),
	});
	updateSceneIcons();
	mazeBlocklyInit();
	removeAllBlocklyTabs();
	resetTracedPlacedNumbers();
	rulesIndex = 0;
	
	setPiemenuToPlayerAngle();
	$("#drawingResetNumber").children().remove();
	var numbers = getPlacedNumbers();
	for(var n in numbers){
		$("#drawingResetNumber").append($("<option>").html(numbers[n][0]).val(numbers[n][2]));
	}
	getCurrentScene().startScene();
}
function resize(){
	var w = $(window).width();
	var h = $(window).height();
	$('#header').width(w-100);
	$('#footer').width(w-100);
	$('#blocklyContainer').width(w-500);
	$('#subsetRulesContainer').width(w-500);
	$('.panel.datagrid').width($('#blocklyFrame').width());

	$('#maze').height(h-100);
	$('#intermediate').height(h-100);
	$('#blocklyContainer').height(h-100);

	for(var i=0;i<window.PushoutElement.updateObjs.length;i++){
		window.PushoutElement.updateObjs[i].update();
	}
	var blocklyToolbarWidth = 177;//126 for english;
	$('#tags').width($('#blocklyFrame').width()-blocklyToolbarWidth);
}
$(function(){
	var designed_width = /*1200*/800+50;
	var designed_height = 42+680+24 +40;
	var actual_width = $(window).width();
	var actual_height = $(window).height();
	var ratio = Math.min(actual_width/designed_width,actual_height/designed_height);
//alert("designed="+designed_width+","+designed_height+" actual="+actual_width+","+actual_height+" ratio="+ratio);
	$("meta[name='viewport']").attr('content',
		'initial-scale='+ratio+',minimum-scale='+ratio+',maximum-scale='+(ratio+2.0)+',user-scalable=yes'
	);
	$(window).on('resize',function(){
		resize();
	});
	$("#drawingReset").click(function(){
		operationCounter.add($(this).attr('id'));
//console.log("resetPlayerPosition");
		resetPlayerPosition(Number($("#drawingResetNumber").val()));
		jp.ac.nuis.nakada.MazeViewer.getInstance().clearBackups();
		backupData.clear();
		if($("#blocklyTraceOperation").hasClass("doing")){
			removeGhost();
			createGhost();
		}
	});
	$("#drawingBack").click(function(){
		operationCounter.add($(this).attr('id'));
		backupData.restore();
		jp.ac.nuis.nakada.MazeViewer.getInstance().restore();
		setPiemenuToPlayerAngle();
		if(ghost!=null){
			ghost.checkBack();
		}
	});
	$("#thanks").click(function(){
		operationCounter.add($(this).attr('id'));
		$('#thanks_dialog').dialog('open')
	});
	backupData.updateButton();

	$('#thanks_dialog').dialog();
	$('#thanks_dialog').dialog('close');
	
	$('#thanks').css('cursor','pointer');
	
	$('#slider').slider({
		min:0,
		max:500,
		value:getCookie('interval','400'),
	});

	mazeInstances.inject(120);
	subsetRules.init(160);

	// this function is called after GWT onModuleLoad
	// If you use exported function from java, the method have to be called in onGWTLoad method.
	window.onGWTLoad = function(){
//console.log("onGWTLoad");
		jp.ac.nuis.nakada.MazeViewer.getInstance().setInstanceHandler(function(act,inst){
			switch(act){
			case 0:
				mazeInstances.addInstance(inst);
				break;
			case 1:
				mazeInstances.removeInstance(inst);
				break;
			}
		});
		var f = setInterval(function(){
//console.log($('#blocklyFrame')[0].contentWindow.init===undefined);
			if($('#blocklyFrame')[0].contentWindow.init !== undefined){
				clearInterval(f);

				// Init blockly with most large block because the width of the toolbox is not changed
				// after Blockly.updateToolbox
				$('#blocklyFrame')[0].contentWindow.init({
					'placedNumbersFunc':window.getPlacedNumbers,
					'limitBlockConnection':true,
				});
				resize();

				resetMaze();
			}
		},100);
	};
});
if(typeof String.prototype.startsWith != 'function'){
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	};
}

// Pie Menu -------------------------------------------------------------------
function pieMenuInit(){
	$('#piemenu_container').pieMenu({
		'starting_angel':0,
		'angel_difference' : 180,
		'radius':76,
	});
	$("#piemenu_container").css({"z-index":"9999"});
}
function setPiemenuToPlayerAngle(){
	var angle = jp.ac.nuis.nakada.MazeViewer.getInstance().getPlayerAngle();

	/*
	 *   maze    pieMenu
	 *    90       0
	 * 180 + 0 -90 + 90
	 *   -90     180
	 */

	// angle in maze is based on math, but css rotate is based on clockwise.
	$('#piemenu_container').pieSetAngle(360-(angle-90));
}
$(function(){
	pieMenuInit();
});


/* debug */
$("#debugTest").click(function(){
	
	/* available all scene for demo */
	console.log("all scenes are tryable.");
	availableAllScene = true;
	availableInstruction = false;
	updateSceneIcons();
	/**/
	
	/* show block svg */
	console.log($('#blocklyFrame')[0].contentWindow.getBlockSVG());
	/**/

	/* show current blocks in xml form */
	console.log(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
	/**/
	
	/* create maze partial image
	var img = $('<img></img>').attr({
		'src':jp.ac.nuis.nakada.MazeViewer.getInstance().toPng(),
	})[0];
console.log(img);
	$('body').append(img);
	/**/

	/* create Block SVG Image 
	$('body').append($('#blocklyFrame')[0].contentWindow.getBlockSVG());
	/**/
});
/* debug */
