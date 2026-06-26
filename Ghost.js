function Ghost(){
	function HlBlocks(){
		window.HlBlocks = this;
		this.hl_index = 0;
		this.posAndHl;
		this.timerId = null;
		
		this.set = function(hl){
			if(this.timerId != null){
				clearTimeout(this.timerId);
			}
			this.posAndHl = hl;
			this.hl_index = 0;
			this.timerId = setTimeout(this.timerFunc,0);
		};
		this.timerFunc = function(){
			window.HlBlocks.timerId = null;
			Blockly.mainWorkspace.highlightBlock(window.HlBlocks.posAndHl.hl[window.HlBlocks.hl_index]);
			window.HlBlocks.hl_index++;
			if(window.HlBlocks.hl_index<window.HlBlocks.posAndHl.hl.length){
				window.HlBlocks.timerId = setTimeout(window.HlBlocks.timerFunc,1000);
			}
		};
	}
	
	// test interactive
	this.playerPosAndAngle = [];
	this.blockToPosAndAngleIndexes = {};
	this.blockIdToSaveIndex = -1;
	this.stopInterpreter = false;

	this.uuid = jp.ac.nuis.nakada.MazeViewer.getInstance().createPlayerGhost();
	this.hl_candidate = [];
	this.posAndHl = [];
	this.checkingIndex = -1;
	this.interpreter;
	this.hlBlocks = new HlBlocks();
	
	this.updateBlockId = function(dif){
		for(var i=0;i<this.posAndHl.length;i++){
			for(var j=0;j<this.posAndHl[i].hl.length;j++){
				this.posAndHl[i].hl[j]+=dif;
			}
		}
	}
	this.checkBack = function(){
		if(this.checkingIndex>0){
			this.checkingIndex--;
		}
	}
	this.isAllChecked = function(){
		return this.checkingIndex == this.posAndHl.length;
	}
	this.checkNext = function(){
		this.checkingIndex++;
		if(this.checkingIndex-1 >= this.posAndHl.length){
			return false;
		}
		var g = this.posAndHl[this.checkingIndex-1];
		this.hlBlocks.set(g);

		var px = jp.ac.nuis.nakada.MazeViewer.getInstance().getPlayerPosIndexX();
		var py = jp.ac.nuis.nakada.MazeViewer.getInstance().getPlayerPosIndexY();
		return px==g.x && py==g.y;
	}
	this.setInterpreter = function(interp){
		// test interactive
		this.stopInterpreter = false;
		this.playerPosAndAngle.push(this.getPlayerPosAngle());

		this.interpreter = interp;
		var max = 1000;
		for(var i=0;i<max && true==this.interpreter.next();i++);
		if(i==max){
			return false;
		}
		// test interactive
		if(this.blockIdToSaveIndex != -1){
			this.pushBlock(this.blockIdToSaveIndex);
			this.blockIdToSaveIndex = -1;
		}

		this.checkingIndex = 0;
		return true;
	}
	this.go = function(){
		if(this.stopInterpreter == true){
			return;
		}
		jp.ac.nuis.nakada.MazeViewer.getInstance().ghostGoes(this.uuid);
		// test interactive
		if(this.posAndHl.length!=0){
			var s0 = this.playerPosAndAngle[this.playerPosAndAngle.length-1];
			var s1 = this.getPlayerPosAngle();
			var hl = this.posAndHl[this.posAndHl.length-1].hl;
			if(s0.x==s1.x && s0.y==s1.y && s0.angle==s1.angle && hl.toString()==this.hl_candidate.toString()){
				this.hl_candidate = [];
				return;
			}
		}

		this.posAndHl.push({
			'x':jp.ac.nuis.nakada.MazeViewer.getInstance().getGhostPosIndexX(this.uuid),
			'y':jp.ac.nuis.nakada.MazeViewer.getInstance().getGhostPosIndexY(this.uuid),
			'hl':this.hl_candidate,
		});
		this.hl_candidate = [];
		
		// test interactive
		this.playerPosAndAngle.push(this.getPlayerPosAngle());
	};
	this.turnLeft = function(){
		jp.ac.nuis.nakada.MazeViewer.getInstance().ghostTurns(this.uuid,90);
		// test interactive
		this.playerPosAndAngle.push(this.getPlayerPosAngle());
	};
	this.turnRight = function(){
		jp.ac.nuis.nakada.MazeViewer.getInstance().ghostTurns(this.uuid,-90);
		// test interactive
		this.playerPosAndAngle.push(this.getPlayerPosAngle());
	};
	this.turnBack = function(){
		this.turnLeft();
		this.turnLeft();
		// test interactive
		this.playerPosAndAngle.push(this.getPlayerPosAngle());
	};
	this.canGo = function(angle){
		return jp.ac.nuis.nakada.MazeViewer.getInstance().canGhostGo(this.uuid,angle);
	};
	this.getPlacedNumber = function(){
		return jp.ac.nuis.nakada.MazeViewer.getInstance().getGhostPlacedNumber(this.uuid);
	};
	this.highlight = function(id){
		// test interactive
//console.log("block=",Blockly.mainWorkspace.getBlockById(id).type);
		if(this.blockIdToSaveIndex != -1){
			this.pushBlock(this.blockIdToSaveIndex);
			this.blockIdToSaveIndex = -1;
		}
		if(Blockly.mainWorkspace.getBlockById(id).type=='while_playerPlacedNumber'){
			this.pushBlock(id);
		}
		this.blockIdToSaveIndex = id;
		// end test interactive

		this.hl_candidate.push(id);
	}
	
	// test interactive
	this.pushBlock = function(blockId){
		var indexes = this.blockToPosAndAngleIndexes[blockId];
		if(indexes === undefined){
			indexes = [];
		}
		if(indexes.length==0 || indexes[indexes.length-1]!=this.playerPosAndAngle.length-1){
			indexes.push(this.playerPosAndAngle.length-1);
		}
		this.blockToPosAndAngleIndexes[blockId] = indexes;
	}
	
	// test interactive
	this.getPlayerPosAngle = function(){
		/*
		return "x="+jp.ac.nuis.nakada.MazeViewer.getInstance().getGhostPosIndexX(this.uuid)+
			",y="+jp.ac.nuis.nakada.MazeViewer.getInstance().getGhostPosIndexY(this.uuid)+
			",angle="+jp.ac.nuis.nakada.MazeViewer.getInstance().getGhostAngle(this.uuid);
		*/
		return {
			x:jp.ac.nuis.nakada.MazeViewer.getInstance().getGhostPosIndexX(this.uuid),
			y:jp.ac.nuis.nakada.MazeViewer.getInstance().getGhostPosIndexY(this.uuid),
			angle:jp.ac.nuis.nakada.MazeViewer.getInstance().getGhostAngle(this.uuid),
		};
	}
}
