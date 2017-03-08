var Keyboard=function(){
	var me={};
	me.widget=document.createElement("div");
	me.widget.className="keyboard";
	me.canvas=document.createElement("canvas")
	me.canvas.width=window.innerWidth/2.
//	me.canvas.height=200;
	me.widget.appendChild(me.canvas)

me.mkKey=function(ktype,tlcx,dx){
//			msg="(%d,%d,%d,%d)"%(tlcx,self.tlcy,tlcx+dx,self.tlcy+self.kh)
//console.log(tlcx+","+me.tlcy+","+(tlcx+dx).toString()+","+(me.tlcy+me.kh).toString());
//			#print msg
//			#if DEBUG:self.debug_panel.append(msg)

			tlcy=me.tlcy
			kw1=me.kw1
			kh=me.kh
			bw=me.bw
			bh=me.bh

			p=[]
			if(ktype!='black'){//#l/c/r
				if(ktype=='left'){
					p.push(tlcx,tlcy)
					p.push(tlcx+kw1-dx,tlcy)
					p.push(tlcx+kw1-dx,tlcy+bh)
					p.push(tlcx+kw1,tlcy+bh)
					p.push(tlcx+kw1,tlcy+kh)
					p.push(tlcx,tlcy+kh)
					p.push(tlcx,tlcy)
				}
				else if(ktype=='right'){
					p.push(tlcx+dx,tlcy)
					p.push(tlcx+kw1,tlcy)
					p.push(tlcx+kw1,tlcy+kh)
					p.push(tlcx,tlcy+kh)
					p.push(tlcx,tlcy+bh)
					p.push(tlcx+dx,tlcy+bh)
					p.push(tlcx+dx,tlcy)
				}
				else if(ktype=='center'){
					p.push(tlcx+dx,tlcy)
					p.push(tlcx+kw1-dx,tlcy)
					p.push(tlcx+kw1-dx,tlcy+bh)
					p.push(tlcx+kw1,tlcy+bh)
					p.push(tlcx+kw1,tlcy+kh)
					p.push(tlcx,tlcy+kh)
					p.push(tlcx,tlcy+bh)
					p.push(tlcx+dx,tlcy+bh)
					p.push(tlcx+dx,tlcy)
				}
				else if(ktype=='blank'){
					p.push(tlcx,tlcy)
					p.push(tlcx+kw1,tlcy)
					p.push(tlcx+kw1,tlcy+kh)
					p.push(tlcx,tlcy+kh)
					p.push(tlcx,tlcy)
				}
				else{
					p.push(tlcx+kw1-dx,tlcy)
					p.push(tlcx+kw1+dx,tlcy)
					p.push(tlcx+kw1+dx,tlcy+bh)
					p.push(tlcx+kw1-dx,tlcy+bh)
					p.push(tlcx+kw1-dx,tlcy)
				}
			}
			else{
				console.log(ktype)
				p.push(tlcx+me.kw1-dx,tlcy)
				p.push(tlcx+me.kw1+2*dx,tlcy)
				p.push(tlcx+me.kw1+2*dx,tlcy+bh)
				p.push(tlcx+me.kw1-dx,tlcy+bh)
				p.push(tlcx+me.kw1-dx,tlcy)
			}
//			console.log(p);
			return p
}//me.mkKey

			me.W=window.innerWidth/2.;
			var SF=1.;
			me.kw1=parseInt(me.W*SF/52);
			me.kw=me.kw1*52;
			me.kh=parseInt(me.kw/9.15);

			me.tlcx=(me.W-me.kw)/2
			me.tlcy=0//(me.H-me.kh)/2

			me.lines=[]
			me.lines.push([me.tlcx,me.tlcy,me.tlcx+me.kw,me.tlcy])
			me.lines.push([me.tlcx+me.kw,me.tlcy,me.tlcx+me.kw,me.tlcy+me.kh])
			me.lines.push([me.tlcx+me.kw,me.tlcy+me.kh,me.tlcx,me.tlcy+me.kh])
			me.lines.push([me.tlcx,me.tlcy+me.kh,me.tlcx,me.tlcy])

			me.keys=[]
			me.kidxByMidi={}

			//B+W Keys:
			me.bw=parseInt(me.kw1/2.2)
			me.bh=parseInt(me.kh/1.7)

			count=10;//A
			ws=[1,3,5,6,8,10,12]
			bx=[2,4,7,9,11]

			names=['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']
			freq=27.5
			midi=21
			oidx=0
			nidx=11
			fact=Math.pow(2.,1./12.)

			tlcx=me.tlcx
			for(var kidx=0;kidx<88;kidx++){
				//#if DEBUG:print kidx
				ktype=null;
				if(kidx==0)ktype='left'
				else if(kidx==87)ktype='blank'
				else if(count==1)ktype='left'
				else if(count==2)ktype='black'
				else if(count==3)ktype='center'
				else if(count==4)ktype='black'
				else if(count==5)ktype='right'
				else if(count==6)ktype='left'
				else if(count==7)ktype='black'
				else if(count==8)ktype='center'
				else if(count==9)ktype='black'
				else if(count==10)ktype='center'
				else if(count==11)ktype='black'
				else if(count==12)ktype='right'

				if(ktype=='left')dx=me.bw/2;
				else if(ktype=='center')dx=+me.bw/2
				else if(ktype=='right')dx=+me.bw/2
				else if(ktype=='black')dx=+me.bw/2
				else if(ktype=='blank')dx=0

				if(ktype=='black'){
					default_color='black'
					isBlack=true
				}
				else{
					default_color='white'
					isBlack=false
				}

//				kidx+=1

				nidx+=1
				if(nidx>11)nidx=0
				if(nidx==0)oidx+=1
				freq*=fact

				me.keys.push(
					{
						'polygon':me.mkKey(ktype,tlcx,dx),
						'ktype':ktype,
						'kidx':kidx,
						'isBlack':isBlack,
						'name':names[nidx],
						'octave':oidx,
						'midi':midi,
						'freq':freq,
						'default_color':default_color,
						'color':default_color,
						'hilight_color':'orange',
//						#
						'y1':0,
						'played':0,
						'xscroll':0,
						'xplay':0,
						'ylist':null,
						'isaccidental':0,
						'sharp':0,
						'flat':0
					}
				)

				me.kidxByMidi[`midi`]=me.keys.length-1
				midi+=1
				count+=1
				if(count>12)count=1

				if(ws.indexOf(count)>-1 && kidx!=0)
					tlcx+=me.kw1

		}//kidx<88

//	console.log(me.keys);
	var ctx=me.canvas.getContext("2d");
//	ctx.fillStyle = 'lightgreen';
//	ctx.fillRect(0,0,me.W,130);

	for(var kidx=0;kidx<me.keys.length;kidx++){
	var k=me.keys[kidx]
	console.log(k['name'])
	console.log(k['polygon'].length)
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.lineCap='round';
	ctx.strokeStyle = 'black';
	var p=k['polygon'];
	ctx.moveTo(p[0],p[1]);
	for(var pidx=0;pidx<p.length;pidx+=2){
		console.log("move to: "+p[pidx]+","+p[pidx+1])
//		ctx.moveTo(p[pidx],p[pidx+1]);
		if(!p[pidx+2]){
			console.log("closing path")
			ctx.closePath();
			ctx.fillStyle = '#FFFFFF';
			if(k['isBlack'])ctx.fillStyle = '#000000';
			ctx.fill();
			ctx.stroke();
		}
		else{
			console.log("line to: "+p[pidx+2]+","+p[pidx+3])
			ctx.lineTo(p[pidx+2],p[pidx+3]);
		}
	}
}

	return me;
}
