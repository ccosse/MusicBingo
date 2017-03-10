var KeySigs=function(){
	var me={};
	me.sigs=mksigs();
	me.widget=document.createElement("div");
	me.widget.className="keysigs";
	me.table=document.createElement("table");
	me.table.className="keysigs";

	me.getNext=function(sigkey,key,min){
		for(var kidx=0;kidx<me.sigs[sigkey][key].length;kidx++)
			if(me.sigs[sigkey][key][kidx]>=min)
				return me.sigs[sigkey][key][kidx]
	}
	me.sigCB=function(e){
		console.log("sigCB: "+e.target.innerHTML)
		sigkey=e.target.id.split(":")[0]
		sig=me.sigs[sigkey]
		window.keyboard.allOff()
		window.keyboard.receive(e.target.innerHTML,sig)

//Let's just apply keys from here:
		if(true){
			console.log("less than zero")
			//get root >= 50
			min_root=me.getNext(sigkey,'minkey_midi_roots',59)
			maj_root=me.getNext(sigkey,'majkey_midi_roots',59)
			console.log("maj_root: "+maj_root)
			var isMajor=false
			indices=[2,2,1,2,2,2,1]
			var root=maj_root
			if(!isMajor){
				indices=[2,1,2,2,1,2,2]
				root=min_root
			}
				root-=21
				scale=[root,]
				window.keyboard.colorKey(root,'orange')
				for(var idx=0;idx<indices.length;idx++){
					root+=indices[idx]
					console.log("root: "+root)
					scale.push(root)
					window.keyboard.colorKey(root,'lightgreen')
				}

			}
			else{}

	}

	for(var ridx=-7;ridx<8;ridx++){
		var tr=me.table.insertRow(-1);
//		var td0=tr.insertCell(-1);
//		var sigspot_table=document.createElement("table");
//		var str=sigspot_table.insertRow(-1);
//		var std;
		for(var cidx=0;cidx<7;cidx++){
			std=tr.insertCell(-1);
			std.className="spot";
			var sigspot=document.createElement("div");//natural=&#9838;
			if(ridx<0 && cidx<Math.abs(ridx))sigspot.innerHTML=me.sigs[ridx]['flatlist'][cidx]+"&#9837;";
			if(ridx>0 && cidx<Math.abs(ridx))sigspot.innerHTML=me.sigs[ridx]['sharplist'][cidx]+"&#9839;";
			sigspot.className="sigspot";
			sigspot.id=ridx+":"+cidx
			sigspot.addEventListener('click',me.sigCB,false)
			std.appendChild(sigspot);
		}

		std=tr.insertCell(-1);
		std.className="spot";
		var majspot=document.createElement("div");
		majspot.className="majspot";
		majspot.id=ridx+":major"
		majspot.innerHTML=me.sigs[ridx]['majkey'];
		majspot.addEventListener('click',me.sigCB,false)
		std.appendChild(majspot);

		std=tr.insertCell(-1);
		std.className="spot";

		var minspot=document.createElement("div");
		minspot.className="minspot";
		minspot.id=ridx+":minor"
		minspot.innerHTML=me.sigs[ridx]['minkey'];
		minspot.addEventListener('click',me.sigCB,false)
		std.appendChild(minspot);

//		td0.appendChild(sigspot_table);

	}
	me.widget.appendChild(me.table);
	return me;
}
