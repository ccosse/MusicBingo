var Staff=function(){
	var me={};
	me.sigs=mksigs();
	me.x0=0
	me.tc=new Image();
	me.tc.src='white_treble_clef.png';
	me.bc=new Image();
	me.bc.src='white_base_clef.png';
	me.img_flat=new Image();
	me.img_flat.src='white_flat.png';
	me.img_sharp=new Image();
	me.img_sharp.src='white_sharp.png';
	me.img_note=new Image();
	me.img_note.src='white_notehead.png';

	var dummy1=document.createElement('div').appendChild(me.tc);
	var dummy2=document.createElement('div').appendChild(me.bc);
	var dummy3=document.createElement('div').appendChild(me.img_flat);
	var dummy4=document.createElement('div').appendChild(me.img_sharp);
	var dummy5=document.createElement('div').appendChild(me.img_note);
	var inv=document.createElement("div");
	inv.style.visibility="hidden";
	inv.style.height='0px';
	inv.style.position='absolute'
	inv.style.top="0px"
	inv.appendChild(dummy1);
	inv.appendChild(dummy2);
	inv.appendChild(dummy3);
	inv.appendChild(dummy4);
	inv.appendChild(dummy5);
	document.body.appendChild(inv);
//
	me.widget=document.createElement("div");
	me.widget.className="staff";
	me.widget.id="staff";
	me.canvas=document.createElement("canvas");
	me.widget.appendChild(me.canvas);

	me.clear=function(){
		var bcr=me.canvas.getBoundingClientRect()
		me.x0=bcr.width/3
		var ctx=me.canvas.getContext("2d")
		ctx.fillStyle="#333333"
		ctx.fillRect(0,0,bcr.width,bcr.height)
	}

	me.drawNote=function(sharp,flat,key,keyname2use){
		notes=['A','B','C','D','E','F','G']
		var bcr=me.widget.getBoundingClientRect()
		var h2=bcr.height/2
		var dy=parseInt(bcr.height/18.)

		var octave=key['octave']
		if(key['midi']==56)octave=4//G# 3rd octave needs treated as 4th octave
		var y0=h2-0*dy-notes.indexOf(keyname2use)*dy/2+(4-octave)*3.5*dy
		if(octave<4){
			y0=h2-1.5*dy-notes.indexOf(keyname2use)*dy/2+(4-octave)*12/2*dy
		}
		if(sharp)
			ctx.drawImage(me.img_sharp,me.x0,y0-dy/2,dy,2*dy)
		if(flat)
			ctx.drawImage(me.img_flat,me.x0,y0-dy/2,dy,2*dy)

//if midi<61 then draw 2x ledger
		if(key['midi']<61 && octave>3){
			for(var yidx=-1;yidx<1;yidx++){
				ctx.strokeStyle='red'
				ctx.beginPath()
				ctx.moveTo(me.x0+dy/2,h2-dy/2-yidx*dy)
				ctx.lineTo(me.x0+dy/2+2*dy,h2-dy/2-yidx*dy)
				ctx.stroke()
				ctx.closePath()
			}
		}

		me.x0+=dy
		ctx.drawImage(me.img_note,me.x0,y0,dy,dy)
		me.x0+=dy
	}
	me.drawKeysig=function(sigidx){
		var sig=me.sigs[sigidx]
		var bcr=me.widget.getBoundingClientRect()
		var dy=parseInt(bcr.height/18.)

		if(sig['sharplist'].length>0){
			console.log("SHARPS");
			var img_sharp=me.img_sharp;
			img_sharp.width=parseInt(2*dy*img_sharp.width/img_sharp.height)+'';
			img_sharp.height=dy*2
			for(var sidx=0;sidx<sig['sig_coords'].length;sidx++){
				var coord=sig['sig_coords'][sidx];
				var xx=me.tc.width+coord[0]*dy;//bcr.width/3+coord[0]*img_sharp.width*.7;
				var yyy;
				var y0=bcr.height/2-2.5*dy
				yyy=y0-4*dy+dy/2*coord[1];
				ctx.drawImage(img_sharp,xx,yyy,img_sharp.width,img_sharp.height);

				yyy=y0+4*dy+dy/2*coord[1];
				ctx.drawImage(img_sharp,xx,yyy,img_sharp.width,img_sharp.height);
			}
		}
		if(sig['flatlist'].length>0){
			console.log("FLATS");
			var img_flat=me.img_flat
			img_flat.width=parseInt(2*dy*img_flat.width/img_flat.height)+'';
			img_flat.height=dy*2
			for(var sidx=0;sidx<sig['sig_coords'].length;sidx++){
				var coord=sig['sig_coords'][sidx];
				var xx=me.tc.width+coord[0]*dy;//bcr.width/3+coord[0]*img_sharp.width*.7;
				var yyy;
				var y0=bcr.height/2-2.5*dy
				yyy=y0-4.5*dy+dy/2*coord[1];
				ctx.drawImage(img_flat,xx,yyy,img_flat.width,img_flat.height);

				yyy=y0+3.5*dy+dy/2*coord[1];
				ctx.drawImage(img_flat,xx,yyy,img_flat.width,img_flat.height);
			}
		}
	}
	me.drawStaff=function(){
		var bcr=me.widget.getBoundingClientRect()
		me.canvas.height=bcr.height
		me.canvas.width=bcr.width
		var dy=parseInt(bcr.height/18.)
		var h2=bcr.height/2
		var h3=bcr.height/3
		ctx=me.canvas.getContext("2d")
		ctx.lineWidth='1';
		ctx.strokeStyle = 'white';

		ctx.beginPath();
		me.tc.height=h3;
		y_offset=h2-me.tc.height
		ctx.drawImage(me.tc,0,y_offset,me.tc.width,me.tc.height)
		for(var yidx=1;yidx<6;yidx++){
			ctx.moveTo(0,h2-dy/2-yidx*dy)
			ctx.lineTo(bcr.width,h2-dy/2-yidx*dy)
			ctx.stroke()
		}
		me.bc.height=h3;
		y_offset=h2
		ctx.drawImage(me.bc,0,y_offset,me.bc.width,me.bc.height)
		for(var yidx=1;yidx<6;yidx++){
			ctx.moveTo(0,h2+dy/2+yidx*dy)
			ctx.lineTo(bcr.width,h2+dy/2+yidx*dy)
			ctx.stroke()
		}
		ctx.closePath()
	}

	return me;
}
