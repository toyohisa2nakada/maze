function MazeInterpreter(bls,opts){
	MazeInterpreter.prototype.ERROR_NONE = 0;
	MazeInterpreter.prototype.ERROR_NOCODE = 1;
	MazeInterpreter.prototype.ERROR_MULTI_ROOT = 2;

	var options = {};
	var blocks = {};
	var program;
	var done;
	var funcs = [];
	this.errno = MazeInterpreter.prototype.ERROR_NONE;

	this.setOptions = function(opts){
		options = $.extend({
			highlight:'true',
		},opts===undefined?{}:opts);
	};
	this.setBlocks = function(bs){
		blocks = $.extend({
			'go'				:'go($1)',
			'turnLeft'			:'turnLeft()',
			'turnRight'			:'turnRight()',
			'turnBack'			:'turnBack()',
			'canGo'				:'canGo($1)',
			'getPlacedNumber'	:'getPlacedNumber()',
			'highlightBlock'	:'highlight($1)',
		},bs===undefined?{}:bs);
	}
	this.initApi = function(interpreter,scope){
//console.log("this.initApi")
		function highlight(id){
//console.log("highligt "+id);
			id = (id!==undefined ? id.toString() : '');
			return interpreter.createPrimitive(Blockly.mainWorkspace.highlightBlock(id));
		}
		for(var st in blocks){
			function getFunc(c,st){
				function inside(a){
//console.log("inside c="+c+",a="+a);
					done = true;
					// The interpreter passes arguments wrapped in its own pseudo-value
					// objects (see acorn_interpreter.js createPrimitive), not native
					// JS values; unwrap via .data.
					var v = (a && typeof a==='object' && 'data' in a) ? a.data : a;
					// highlightBlock's argument is always a real string (the block
					// ID) that must round-trip exactly, so it needs explicit quoting -
					// under modern Blockly, IDs contain hyphens/other characters that
					// broke when spliced in unquoted. Every other block ('go','canGo',
					// etc.) intentionally relies on the old unquoted behavior: e.g. the
					// "false" string emitted by the straight block's generated code is
					// spliced in bare so it evaluates as the JS boolean false, not the
					// string "false".
					var lit = (st==='highlightBlock') ? JSON.stringify(v) : String(v);
					var c2 = c.replace('$1',lit);
					return interpreter.createPrimitive(eval(c2));
				}
				return inside;
			}
			interpreter.setProperty(scope,st,
				interpreter.createNativeFunction(getFunc(blocks[st],st))
			);
		}
	};
	this.init = function(){
		Blockly.customVariables = [];
		Blockly.addVariable = function(n){
			if(-1 == $.inArray(n,Blockly.customVariables)){
				Blockly.customVariables.push(n);
			}
		};
		Blockly.JavaScript.addReservedWords('code');
		var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
		for(var i=0;i<Blockly.customVariables.length;i++){
			code = 'var '+Blockly.customVariables[i]+'=0;\n'+code;
		}
		if(code.length==0){
			this.errno = MazeInterpreter.prototype.ERROR_NOCODE;
			return false;
		}
		var countRoot = 0;
		var children = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace).childNodes;
		for(var i=0;i<children.length;i++){
			if('function_definition'!=$(children[i]).attr('type')){
				countRoot++;
			}
		}
		// test interactive (ignore not 1 connected block)
		/*
		if(countRoot != 1){
			this.errno = MazeInterpreter.prototype.ERROR_MULTI_ROOT;
			return false;
		}
		/**/
		if(options.highlight){
			// test interactive (modern Blockly's highlightBlock() always highlights;
			// the old traceOn() gate no longer exists)
		}
		program = new Interpreter(code,this.initApi);
		return true;
	};
	this.nextBlock = function(){
		done = false;
		var ret;
		while(true==(ret=program.step()) && done==false);
		return ret;
	}
	this.next = function(){
		if(program == null){
			return false;
		}
		if(false == this.nextBlock()){
			program = null;
			return false;
		}
		return true;
	};
	this.setBlocks(bls);
	this.setOptions(opts);
	this.init();
}
