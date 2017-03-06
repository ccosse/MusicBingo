#!/usr/bin/python
from PIL import Image,ImageDraw,ImageFont
from random import random

def mkBrightColor():
	rval=[]
	for channel in ['r','g','b']:
		if random()>0.5:
			rval.append(int(255*(1-.8*random())))
		else:
			rval.append(0)

	return tuple(rval)

dy=20
tlc_tc=None

def mkTile():
	mode='RGBA'
	size=(200,200)
	h,w=size
	fill=(255,255,255)
	#fill=mkBrightColor()
	x=Image.new(mode,size,fill)
	x.save('my.png')

	tc=Image.open('treble_clef.png')
	print(tc.size)
	w0,h0=tc.size
	h1=int(2*h/3)
	w1=int(h1*w0/h0)
	print("%d,%d"%(w0,h0))
	print("%d,%d"%(w1,h1))
	tc2=tc.resize((w1,h1))

	tlc_tc=(20,int(h/5))
	x.paste(tc2,tlc_tc)

	#bottom line of staff up 100/426 from bottom of 426=h image used
	#coming from top that leaves 300/426
	#staff 1/5 x=int(tlc_tc[0]/2)
	#staff 1/5 y=tlc_tc[1]+int(300./426.*h1)
	x1,y1=(int(tlc_tc[0]/2),tlc_tc[1]+int(330./426.*h1))

	#draw lines of the staff
	for yidx in range(-2,7):
		y1=tlc_tc[1]+int(330./426.*h1)-yidx*dy
		color=(0,0,0)
		if yidx<0 or yidx>4:
			color=(255,0,0)
		for xp in range(x1,w-x1):
			x.putpixel((xp,y1),color)
	x.save('my.png')

	#now draw some notes
	q=Image.open('notehead.png')
	qsize=(int((dy-1)*q.size[0]/q.size[1]),int(dy-1))
	q=q.resize(qsize)
	print(q.size)
	dx=int(q.size[0]/2.+5)
	for yidx in range(-2,7):
		y1=tlc_tc[1]+int(330./426.*h1)-yidx*20+10
		x.paste(q,(int(w/2-dx),y1-q.size[1]))

		y1=tlc_tc[1]+int(330./426.*h1)-yidx*20
		x.paste(q,(int(w/2+dx),y1-q.size[1]))
	x.save('my.png')
	return x


#make BINGO letters:
font = ImageFont.truetype("mickey.ttf",220)
bingo=['B','I','N','G','O']
mode='RGBA'
size=(200,200)
fill=(255,255,255)
for letter in bingo:
	imgname="%s.png"%letter
	#fill=mkBrightColor()
	img=Image.new(mode,size,fill)
	draw = ImageDraw.Draw(img)
	color=mkBrightColor()
	x_offset=int(size[0]/2.-font.getsize(letter)[0]/2.)
	y_offset=int(size[1]/2.-font.getsize(letter)[1]/2.)
	draw.text((x_offset,y_offset),letter,color,font=font)
	img.save(imgname)

#make a single board
w_card=int(8.5/2.*300.)
h_card=int(11./2.*300.)
size_card=(w_card,h_card)
fill_card=(255,255,255)
fill=mkBrightColor()

img_card=Image.new(mode,size_card,fill_card)

#make 5x5 grid
for yidx in range(0,6):
	yy=int(yidx*h_card/6.)
	for xidx in range(0,w_card):
		img_card.putpixel((xidx,yy),(0,0,0))

for xidx in range(0,5):
	xx=int(xidx*w_card/5.)
	for yidx in range(0,h_card):
		img_card.putpixel((xx,yidx),(0,0,0))

for xidx in range(0,5):
	xx=int(xidx*w_card/5.)
	letter=bingo[xidx]
	infname="%s.png"%letter
	img_letter=Image.open(infname)
	x_offset=int(xx+w_card/5./2.-img_letter.size[0]/2.)
	y_offset=int(h_card/6./2.-img_letter.size[1]/2.)
	img_card.paste(img_letter,(x_offset,y_offset))

for xidx in range(0,5):
	xx=int(xidx*w_card/5.)
	for yidx in range(1,6):
		yy=int(yidx*h_card/6.)
		#img_tile=Image.open('my.png')
		img_tile=mkTile()
		img_tile=img_tile.resize((int(w_card/5.),int(w_card/5.)))
		x_offset=int(xx+w_card/5./2.-img_tile.size[0]/2.)
		y_offset=int(yy+h_card/6./2.-img_tile.size[1]/2.)
		img_card.paste(img_tile,(x_offset,y_offset))

img_card.save('card.png')
