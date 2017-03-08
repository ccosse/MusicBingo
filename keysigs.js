var KeySigs=function(){
	var me={};
	me.sigs=mksigs();
	me.widget=document.createElement("div");
	me.widget.className="keysigs";
	me.table=document.createElement("table");
	me.table.className="keysigs";

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
			std.appendChild(sigspot);
		}

		std=tr.insertCell(-1);
		std.className="spot";
		var majspot=document.createElement("div");
		majspot.className="majspot";
		majspot.innerHTML=me.sigs[ridx]['majkey'];
		std.appendChild(majspot);

		std=tr.insertCell(-1);
		std.className="spot";

		var minspot=document.createElement("div");
		minspot.className="minspot";
		minspot.innerHTML=me.sigs[ridx]['minkey'];
		std.appendChild(minspot);

//		td0.appendChild(sigspot_table);

	}
	me.widget.appendChild(me.table);
	return me;
}
