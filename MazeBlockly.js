var scriptInterpreter;
var ghost = null;
var fireTabsOnSelect = true;
var fireTabsOnUnselect = true;
var fireTabsOnClose = true;
var blocklyBlockCapacityBindData = null;

var mazeBlocklyBound = false;

// test interactive
var codebackup = null;
var selected = null;

var blocklyWorkspaceChanged = function(e){
	// test interactive
	/*
console.log("Blockly workspace changed");
	if($("#blocklySimulation").hasClass("doing")==false){
		jp.ac.nuis.nakada.MazeViewer.getInstance().clearInteractivePlayers();
		return;
	}

	var codeChanged = false;
	if(codebackup==null || codebackup!=Blockly.JavaScript.workspaceToCode()){
		codebackup = Blockly.JavaScript.workspaceToCode();
		removeGhost();
		createGhost();
		if(Blockly.selected != null){
//			console.log(Blockly.selected.getRelativeToSurfaceXY());
		}
//		$('#debugCode').html(Blockly.JavaScript.workspaceToCode());
		selected = Blockly.selected;
		codeChanged = true;
console.log("codeChanged");
	}
	
	if(codeChanged==true||Blockly.selected!=selected){
console.log("create ghost 1");
		selected = Blockly.selected;
		jp.ac.nuis.nakada.MazeViewer.getInstance().clearInteractivePlayers();
		if(selected!=null && (selected.type=='straight'||selected.type=='turn')){
			jp.ac.nuis.nakada.MazeViewer.getInstance().changeInteractivePlayersOdd();
		}
		var len = selected==null?(ghost==null?0:ghost.playerPosAndAngle.length):
			ghost.blockToPosAndAngleIndexes[selected.id].length;
		for(var i=0;i<len;i++){
			var index = selected==null?i:
				ghost.blockToPosAndAngleIndexes[selected.id][i];
			jp.ac.nuis.nakada.MazeViewer.getInstance().addInteractivePlayers(
				ghost.playerPosAndAngle[index].x,
				ghost.playerPosAndAngle[index].y,
				ghost.playerPosAndAngle[index].angle,
				index);
		}
console.log("create ghost 2");
	}
	// end test interactive
	*/
};

function setBlocklyBlockCapacity(maxBlocks){
	// Modern Blockly's remainingCapacity() reads workspace.options.maxBlocks
	// (set once at inject time), not a mutable workspace.maxBlocks property
	// like the old API - so write there too, or this setting is ignored.
	Blockly.mainWorkspace.maxBlocks = maxBlocks;
	Blockly.mainWorkspace.options.maxBlocks = maxBlocks;
	if(blocklyBlockCapacityBindData!=null){
		Blockly.removeChangeListener(blocklyBlockCapacityBindData);
		blocklyBlockCapacityBindData = null;
	}
	if(maxBlocks == Infinity){
		document.getElementById('blocklyBlockCapacity').innerHTML = '';
	}else{
		function onchange(){
			document.getElementById('blocklyBlockCapacity').innerHTML =
				MazeLearningMsg.BlockCapacityBefore+
				Blockly.mainWorkspace.remainingCapacity()+
				MazeLearningMsg.BlockCapacityAfter;
		}
		blocklyBlockCapacityBindData = Blockly.addChangeListener(onchange);
		onchange();
	}
}
function getFirstBlockName(rule){
	var ret = "";
	var blockType = rule.match('.*?type=.*?type=\"(.*?)\".*')[1];
	if(blockType == 'straight'){
		ret = "st";
	}else{
		switch(blockType){
		case 'if':
			ret = 'if ';
			break;
		case 'turn':
			ret = 'tr ';
			break;
		}
		var attrName = rule.match('.*?selections.*?\"selections\">(.*?)</field>.*')[1];
		switch(attrName){
		case 'canGo(-90)':
		case 'turnRight();':
			ret += 'r';
			break;
		case 'canGo(0)':
			ret += 'st';
			break;
		case 'canGo(90)':
		case 'turnLeft();':
			ret += 'l';
			break;
		}
	}
	return ret;
}
function backupAllTabs(){
	var tabs = $('#tabs').tabs('tabs');
	var selectedIndex = getSelectedIndexBlocklyTab();
	var backup = [];
	var i;
	for(i=0;i<tabs.length;i++){
		backup.push({
			title:tabs[i].panel('options').title,
			content:tabs[i].panel('options').content,
			closable:tabs[i].panel('options').closable,
			selected: i==selectedIndex,
			iconCls:tabs[i].panel('options').iconCls,
		})
	}
	return backup;
}
function restoreAllTabs(data){
	var same = (function(tabs,backup){
		if(tabs.length!=backup.length){
			return false;
		}
		var i;
		for(i=0;i<tabs.length;i++){
			if(tabs[i].panel('options').title != backup[i].title ||
				tabs[i].panel('options').content != backup[i].content ||
				tabs[i].panel('options').closable != backup[i].closable ||
//				tabs[i].panel('options').selected != backup[i].selected ||
				tabs[i].panel('options').iconCls != backup[i].iconCls){
				return false;
			}
		}
		return true;
	})($('#tabs').tabs('tabs'),data);
	if(false == same){
		fireTabsOnSelect = false;
		fireTabsOnUnselect = false;
		fireTabsOnClose = false;
		var i;
		for(i=$('#tabs').tabs('tabs').length-1;i>=0;i--){
			$('#tabs').tabs('close',i);
		}
		for(i=0;i<data.length;i++){
			addNewTab(data[i]);
		}
		fireTabsOnSelect = true;
		fireTabsOnUnselect = true;
		fireTabsOnClose = true;
	}
}
function addNewTab(tab){
	$("#tabs").tabs('add',{
		title:tab.title,
		content:tab.content,
		closable:tab.closable,
		selected:tab.selected,
		iconCls:tab.iconCls,
	});
}
function removeAllBlocklyTabs(removeRules){
	var fire = removeRules===undefined?false:removeRules;
//console.log("removeAllBlocklyTabs before "+$('#tabs').tabs('tabs').length+" rules.length="+rules.length);
	fireTabsOnSelect = fire;
	fireTabsOnUnselect = fire;
	var i = $('#tabs').tabs('tabs').length-1;
	while(i>=0){
		if($("#tabs").tabs('tabs')[i].panel('options').content=='computer'){
			$('#tabs').tabs('close',i);
		}
		i--;
	}
//console.log("removeAllBlocklyTabs after  "+$('#tabs').tabs('tabs').length+" rules.length="+rules.length);
	fireTabsOnSelect = true;
	fireTabsOnUnselect = true;
}
function addBlocklyTabs(rules){
	var i;
	for(i=0;i<rules.length;i++){
		addNewTab({
			title:getFirstBlockName(rules[i]),
			content:'computer',
			closable:true,
			selected: false,
			iconCls:'icon-computer',
		});
	}
}
function getSelectedIndexBlocklyTab(){
	return $('#tabs').tabs('getTabIndex',$('#tabs').tabs('getSelected'));
}
function selectBlocklyTab(index){
//console.log("selectBlocklyTab before selected:"+getSelectedIndexBlocklyTab()+" # tags:"+$('#tabs').tabs('tabs').length+" toChangeIndex:"+index);
	fireTabsOnSelect = false;
	fireTabsOnUnselect = false;
	$("#tabs").tabs('select',index);
//console.log("selectBlocklyTab after  selected:"+getSelectedIndexBlocklyTab()+" # tags:"+$('#tabs').tabs('tabs').length+" toChangeIndex:"+index);
	fireTabsOnSelect = true;
	fireTabsOnUnselect = true;
}
function mazeBlocklyBind(){
	$('#tabs').tabs({
		tabPosition:'bottom',
		border:false,
		onUnselect:function(title,index){
			if(fireTabsOnUnselect){
//console.log("onUnselect "+title+" "+index);
				rules[index] = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
			}
		},
		onSelect:function(title,index){
			if(fireTabsOnSelect){
				rulesIndex = index;
				replaceBlocklyWorkspace(rules[rulesIndex],
						{startDelay:0,fadeOutDuration:0,});
			}
		},
		onClose:function(title,index){
			if(fireTabsOnClose){
				var idx = getSelectedIndexBlocklyTab();
				if(idx == -1){
					idx = index;
				}
				rules.splice(index,1);
			}
		},
	});
	$("#tabs").tabs('add',{
		title:MazeLearningMsg.Default_Rule,
		content:'user',
		closable:false,
		iconCls:'icon-user',
	});

	$("#blocklyStartInterpreter").click(function(){
		if($("#blocklyStartInterpreter").hasClass("doing")){
			if(scriptInterpreter != null){
				scriptInterpreter.toStop = true;
			}
			disableBlockly(false);
			disableMaze(false);
		}else{
			operationCounter.add($(this).attr('id'));
			if(true == blocklyStartInterpreter()){
				// test interactive (user can update during script running )
				//disableBlockly(true);

				disableMaze(true);
			}
		}
	});
	
	$("#blocklySimulation").click(function(){
		blocklyChangeButton("Simulation");
		blocklyWorkspaceChanged();
	})
	
	$("#blocklyTraceOperation").click(function(){
		if($("#blocklyTraceOperation").hasClass("doing")){
			removeGhost();
			$('#blocklyStartInterpreter').removeAttr("disabled");
		}else{
			operationCounter.add($(this).attr('id'));
			if(false == createGhost()){
				return false;
			}
			$('#blocklyStartInterpreter').attr("disabled","disabled");
		}
		blocklyChangeButton("TraceOperation");
	});
	
	var btns = [];
	btns['ShowInstances'] = {
		off:function(){
			mazeInstances.visible(false);
		},
		on:function(){
			jp.ac.nuis.nakada.MazeViewer.getInstance().setPlayerBeforeAngle();
			jp.ac.nuis.nakada.MazeViewer.getInstance().clearPlayerExamples();
			mazeInstances.clear();
			mazeInstances.visible(true);
		},
	};
	btns['ShowSubsetRules'] = {
		off:function(){
			subsetRules.visible(false);
		},
		on:function(){
			subsetRules.visible(true);
		},
	};
	btns['Extraction'] = {
		off:function(){
			mazeInstances.visible(false);
		},
		on:function(){
			jp.ac.nuis.nakada.MazeViewer.getInstance().setPlayerBeforeAngle();
			jp.ac.nuis.nakada.MazeViewer.getInstance().clearPlayerExamples();
			mazeInstances.clear();
			mazeInstances.visible(true);
		},
	};
	for(var name in btns){
		$('#blockly'+name).attr('btnName',name);
		$('#blockly'+name).click(function(){
			var n = $(this).attr('btnName');
			if($(this).hasClass("doing")){
				btns[n].off();
			}else{
				operationCounter.add($(this).attr('id'));
				for(var cn in btns){
					if(cn!=n && $('#blockly'+cn).hasClass("doing")){
						$('#blockly'+cn).trigger('click');
					}
				}
				btns[n].on();
			}
			blocklyChangeButton(n);
		});
	}
}
function createGhost(){
	if(getCurrentScene().beforeTest()==false){
		return false;
	}
	var intp = new MazeInterpreter({
		'go'				:'ghost.go()',
		'turnLeft'			:'ghost.turnLeft()',
		'turnRight'			:'ghost.turnRight()',
		'turnBack'			:'ghost.turnBack()',
		'canGo'				:'ghost.canGo($1)',
		'getPlacedNumber'	:'ghost.getPlacedNumber()',
		'highlightBlock'	:'ghost.highlight($1)',
	});
	if(intp.errno != MazeInterpreter.prototype.ERROR_NONE){
		if(intp.errno == MazeInterpreter.prototype.ERROR_MULTI_ROOT){
			alert(MazeLearningMsg.Manual_TraceOperation_Multi_Root);
		}
		return false;
	}
	ghost = new Ghost();
	var ret = ghost.setInterpreter(intp);
	if(ret == false){
		// test interactive (no error dialog)
//		alert(MazeLearningMsg.Manual_TraceOperation_ProgramNotStop);
		return false;
	}
	resetTracedPlacedNumbers();
	return true;
}
function removeGhost(){
	if(ghost != null){
		jp.ac.nuis.nakada.MazeViewer.getInstance().removePlayerGost(ghost.uuid);
		ghost = null;
	}
}
function mazeBlocklyInit(){
	Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
	Blockly.JavaScript.addReservedWords('highlightBlock');
	Blockly.mainWorkspace.clear();
	Blockly.mainWorkspace.getCanvas().removeEventListener(
		"blocklyWorkspaceChange",blocklyWorkspaceChanged,false);
	Blockly.mainWorkspace.getCanvas().addEventListener(
		"blocklyWorkspaceChange",blocklyWorkspaceChanged,false);

	if(mazeBlocklyBound == false){
		mazeBlocklyBind();
		mazeBlocklyBound = true;
	}
	var buttons = [
		"#blocklyTraceOperation",
		"#blocklyShowSubsetRules",
		"#blocklyShowInstances",
		"#blocklyExtraction"
	];
	for(var i=0;i<buttons.length;i++){
		if($(buttons[i]).hasClass("doing")){
			$(buttons[i]).trigger("click");
		}
	}
}
function replaceBlocklyWorkspace(xml,options){
	$("svg",$('#blocklyFrame')[0].contentWindow.document).elementAnimate(function(){
		var fid = Blockly.mainWorkspace.getAllBlocks()[0];
		if(fid !== undefined){
			fid = fid.id;
		}
		Blockly.mainWorkspace.clear();
		Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,xml);
		if(fid!==undefined && ghost!=null && Blockly.mainWorkspace.getAllBlocks()[0]!==undefined){
			ghost.updateBlockId(Blockly.mainWorkspace.getAllBlocks()[0].id-fid);
		}
	},options);
}
function blocklyButtonVisibility(bname/*selector*/,visible){
	var addition = {
		'StartInterpreter':'#sliderContainer',
	};
	var func = {
		'true':'show()',
		'false':'hide()',
	};
	var selector = "#blockly"+bname;

	var methods = [
		'$(selector).'+func[visible]+';',
		'$(selector+"Cond").'+func[visible]+';',
		addition[bname]===undefined?'':'$("'+addition[bname]+'").'+func[visible]+';',
	];
	for(var i=0;i<methods.length;i++){
		eval(methods[i]);
	}
}
function blocklyChangeButton(bname){
	var msgDefStr = "Manual_"+bname;
	var selector = "#blockly"+bname;
	if($(selector).hasClass("doing")){
		$(selector).html(MazeLearningMsg[msgDefStr]);
//		var condStr = $(selector+"Cond").html();
//		$(selector+"Cond").html(condStr.replace("---","-x-"));
		var cond = $(selector+"Cond"+" img:first-child");
		if(cond.attr("src")!==undefined){
			cond.attr("src",cond.attr("src").replace("_c.","_d."));
		}
		$(selector).css("background","#dddddd");
		$(selector).css("color","#000000");
	}else{
		$(selector).html(MazeLearningMsg[msgDefStr+"_BSIDE"]);
//		var condStr = $(selector+"Cond").html();
//		$(selector+"Cond").html(condStr.replace("-x-","---"));
		var cond = $(selector+"Cond"+" img:first-child");
		if(cond.attr("src")!==undefined){
			cond.attr("src",cond.attr("src").replace("_d.","_c."));
		}
			
		$(selector).css("background","#808080");
		$(selector).css("color","#9f9f9f");
	}
	$(selector).toggleClass("doing")
}
function blocklyStartInterpreter(unreset){
	scriptInterpreter = null;
	if(getCurrentScene().beforeTest()==false){
		return false;
	}

	scriptInterpreter = new MazeInterpreter();
	if(scriptInterpreter.errno != MazeInterpreter.prototype.ERROR_NONE){
		if(scriptInterpreter.errno == MazeInterpreter.prototype.ERROR_MULTI_ROOT){
			alert(MazeLearningMsg.Manual_Interpreter_Multi_Root);
		}
		return false;
	}
	
	console.log("test RESET!!!",jp.ac.nuis.nakada.MazeViewer.getInstance().getCurrentPlayerIndex());
	console.log("unreset",unreset);
	if(!(unreset!==undefined && unreset===true)){
		$('#drawingReset').trigger('click');
	}

	// test interactive
	/*
	$('#drawingReset').trigger('click');
	*/

	blocklyChangeButton("StartInterpreter");
	scriptInterpreter.toStop = false;
	resetTracedPlacedNumbers();
	
	function nextStep(){
		if(scriptInterpreter.toStop==false && scriptInterpreter.next()==true){
			window.setTimeout(nextStep,$('#slider').slider('getValue'));
			document.cookie = 'interval='+$('#slider').slider('getValue');
		}else{
			disableMaze(false);
			disableBlockly(false);
			blocklyChangeButton("StartInterpreter");
			if(scriptInterpreter.toStop==false){
				if(false == checkSceneGoal(scriptInterpreter)){
					// test interactive
					/*
					setTimeout(function(){
						$('#blocklyStartInterpreter').trigger('click');
					},500);
					*/
				}
			}
		}
	}	
	nextStep();
	return true;
}
