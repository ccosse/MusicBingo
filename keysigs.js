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
//		window.keyboard.receive(e.target.innerHTML,sig)
		window.staff.clear()
		window.staff.drawStaff()
		window.staff.drawKeysig(sigkey)

//Let's just apply keys from here:
		min_root=me.sigs[sigkey]['min_root']//me.getNext(sigkey,'minkey_midi_roots',59)
		maj_root=me.sigs[sigkey]['maj_root']//me.getNext(sigkey,'majkey_midi_roots',59)
		console.log("maj_root: "+maj_root+" min_root: "+min_root)
		var isMajor=false
		var splitHTML=e.target.innerHTML.split(" ")

		if(splitHTML[splitHTML.length-1]=="Major"){
			isMajor=true;
			console.log("isMajor=true")
		}
		else{
			console.log("isMajor=false")
		}

		indices=[2,2,1,2,2,2,1]
		var root=maj_root
		if(!isMajor){
			indices=[2,1,2,2,1,2,2]
			console.log('min_root')
			root=min_root
		}
//		root-=21
		scale=[root,]
		var kidx=window.keyboard.kidxByMidi[root.toString()]
		var key=window.keyboard.keys[kidx]
		console.log(key['name'],key['midi'])
		var keycolor='green'
		if(me.sigs[sigkey]['sharplist'].indexOf(key['name'][0])>-1)
			keycolor='red'

		var keyname2use=key['name']
		if(key['name']=='A#')keyname2use='B'
		if(key['name']=='B#')keyname2use='C'
		if(key['name']=='C#')keyname2use='D'//ie d-flat
		if(key['name']=='D#')keyname2use='E'//ie e-flat
		if(key['name']=='E#')keyname2use='F'//this one is different;f-flat=E
		if(key['name']=='F#')keyname2use='G'//ie g-flat
		if(key['name']=='G#')keyname2use='A'

		if(me.sigs[sigkey]['flatlist'].indexOf(keyname2use)>-1)
				keycolor='orange'

		window.keyboard.colorKey(root-21,keycolor)
		for(var idx=0;idx<indices.length-1;idx++){
			root+=indices[idx]
//			console.log("root: "+root)
			scale.push(root)
//			console.log(window.keyboard.kidxByMidi)
			var kidx=window.keyboard.kidxByMidi[root.toString()]
//			console.log('kidx='+kidx)
			var key=window.keyboard.keys[kidx]
			console.log(key['name'],key['midi'])
			keycolor='green'
			if(me.sigs[sigkey]['sharplist'].indexOf(key['name'][0])>-1)
				keycolor='red'

			var keyname2use=key['name']
			if(key['name']=='A#')keyname2use='B'
			if(key['name']=='B#')keyname2use='C'
			if(key['name']=='C#')keyname2use='D'//ie d-flat
			if(key['name']=='D#')keyname2use='E'//ie e-flat
			if(key['name']=='E#')keyname2use='F'//this one is different;f-flat=E
			if(key['name']=='F#')keyname2use='G'//ie g-flat
			if(key['name']=='G#')keyname2use='A'

			if(me.sigs[sigkey]['flatlist'].indexOf(keyname2use)>-1)
					keycolor='orange'
			window.keyboard.colorKey(root-21,keycolor)
		}
	}//me.sigCB

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
		var minspot=document.createElement("div");
		minspot.className="minspot";
		minspot.id=ridx+":minor"
		minspot.innerHTML=me.sigs[ridx]['minkey'];
		minspot.addEventListener('click',me.sigCB,false)
		std.appendChild(minspot);

		std=tr.insertCell(-1);
		std.className="spot";
		var majspot=document.createElement("div");
		majspot.className="majspot";
		majspot.id=ridx+":major"
		majspot.innerHTML=me.sigs[ridx]['majkey'];
		majspot.addEventListener('click',me.sigCB,false)
		std.appendChild(majspot);

//		td0.appendChild(sigspot_table);
		if(ridx==-7){
			std=tr.insertCell(-1);
			std.rowSpan='16'
			var img=new Image()
			img.src='cof5.png'
			img.width=parseInt(window.innerWidth/5.)
			std.appendChild(img)
			std.className='cof'
		}

	}
	me.widget.appendChild(me.table);
	return me;
}
