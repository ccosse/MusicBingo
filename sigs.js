
var mksigs=function(){
	console.log('mksigs');
	var	sigs={
			'-7':{
				'majkey':'C Flat Major',
				'minkey':'A Flat Minor',
				'flatlist':['B','E','A','D','G','C','F'],
				'sharplist':[],
				'sigkey':'-7',
				'sig_coords':[[1,4],[2,1],[3,5],[4,2],[5,6],[6,3],[7,7]],
				'minkey_midi_roots':[32,44,56,68,80,92,104],
				'majkey_midi_roots':[23,35,47,59,71,83,95,107]
			},
			'-6':{
				'majkey':'G Flat Major',
				'minkey':'E Flat Minor',
				'flatlist':['B','E','A','D','G','C'],
				'sharplist':[],
				'sigkey':'-6',
				'sig_coords':[[1,4],[2,1],[3,5],[4,2],[5,6],[6,3]],
				'minkey_midi_roots':[27,39,51,63,75,87,99],
				'majkey_midi_roots':[30,42,54,66,78,90,102]
			},
			'-5':{
				'majkey':'D Flat Major',
				'minkey':'B Flat Minor',
				'flatlist':['B','E','A','D','G'],
				'sharplist':[],
				'sigkey':'-5',
				'sig_coords':[[1,4],[2,1],[3,5],[4,2],[5,6]],
				'minkey_midi_roots':[22,34,46,58,70,82,94,106],
				'majkey_midi_roots':[25,37,49,61,73,85,97]
			},
			'-4':{
				'majkey':'A Flat Major',
				'minkey':'F Minor',
				'flatlist':['B','E','A','D'],
				'sharplist':[],
				'sigkey':'-4',
				'sig_coords':[[1,4],[2,1],[3,5],[4,2]],
				'minkey_midi_roots':[29,41,53,65,77,89,101],
				'majkey_midi_roots':[32,44,56,68,80,92,104]
			},
			'-3':{
				'majkey':'E Flat Major',
				'minkey':'C Minor',
				'flatlist':['B','E','A'],
				'sharplist':[],
				'sigkey':'-3',
				'sig_coords':[[1,4],[2,1],[3,5]],
				'minkey_midi_roots':[24,36,48,60,72,84,96,108],
				'majkey_midi_roots':[27,39,51,63,75,87,99]
			},
			'-2':{
				'majkey':'B Flat Major',
				'minkey':'G Minor',
				'flatlist':['B','E'],
				'sharplist':[],
				'sigkey':'-2',
				'sig_coords':[[1,4],[2,1]],
				'minkey_midi_roots':[31,43,55,67,79,91,103],
				'majkey_midi_roots':[22,34,46,58,70,82,94,106]
			},
			'-1':{
				'majkey':'F Major',
				'minkey':'D Minor',
				'flatlist':['B'],
				'sharplist':[],
				'sigkey':'-1',
				'sig_coords':[[1,4]],
				'minkey_midi_roots':[26,38,50,62,74,86,98],
				'majkey_midi_roots':[29,41,53,65,77,89,101]
			},
			'0':{
				'majkey':'C Major',
				'minkey':'A Minor',
				'flatlist':[],
				'sharplist':[],
				'sigkey':'0',
				'sig_coords':[],
				'minkey_midi_roots':[21,33,45,57,69,81,93,105],
				'majkey_midi_roots':[24,36,48,60,72,84,96,108]
			},
			'1':{
				'majkey':'G Major',
				'minkey':'E Minor',
				'flatlist':[],
				'sharplist':['F'],
				'sigkey':'1',
				'sig_coords':[[1,0]],
				'minkey_midi_roots':[28,40,52,64,76,88,100],
				'majkey_midi_roots':[31,43,55,67,79,91,103]
			},
			'2':{
				'majkey':'D Major',
				'minkey':'B Minor',
				'flatlist':[],
				'sharplist':['F','C'],
				'sigkey':'2',
				'sig_coords':[[1,0],[2,3]],
				'minkey_midi_roots':[23,35,47,59,71,83,95,107],
				'majkey_midi_roots':[26,38,50,62,74,86,98]
			},
			'3':{
				'majkey':'A Major',
				'minkey':'F Sharp Minor',
				'flatlist':[],
				'sharplist':['F','C','G'],
				'sigkey':'3',
				'sig_coords':[[1,0],[2,3],[3,-1]],
				'minkey_midi_roots':[30,42,54,66,78,90,102],
				'majkey_midi_roots':[21,33,45,57,69,81,93,105]
			},
			'4':{
				'majkey':'E Major',
				'minkey':'C Sharp Minor',
				'flatlist':[],
				'sharplist':['F','C','G','D'],
				'sigkey':'4',
				'sig_coords':[[1,0],[2,3],[3,-1],[4,2]],
				'minkey_midi_roots':[25,37,49,61,72,84,96],
				'majkey_midi_roots':[28,40,52,64,76,88,100]
			},
			'5':{
				'majkey':'B Major',
				'minkey':'G Sharp Minor',
				'flatlist':[],
				'sharplist':['F','C','G','D','A'],
				'sigkey':'5',
				'sig_coords':[[1,0],[2,3],[3,-1],[4,2],[5,5]],
				'minkey_midi_roots':[32,44,56,68,80,92,104],
				'majkey_midi_roots':[23,35,47,59,71,83,95,107]
			},
			'6':{
				'majkey':'F Sharp Major',
				'minkey':'D Sharp Minor',
				'flatlist':[],
				'sharplist':['F','C','G','D','A','E'],
				'sigkey':'6',
				'sig_coords':[[1,0],[2,3],[3,-1],[4,2],[5,5],[6,1]],
				'minkey_midi_roots':[27,39,51,63,75,87,99],
				'majkey_midi_roots':[30,42,54,66,78,90,102]
			},
			'7':{
				'majkey':'C Sharp Major',
				'minkey':'A Sharp Minor',
				'flatlist':[],
				'sharplist':['F','C','G','D','A','E','B'],
				'sigkey':'7',
				'sig_coords':[[1,0],[2,3],[3,-1],[4,2],[5,5],[6,1],[7,4]],
				'minkey_midi_roots':[22,34,46,58,70,82,94,106],
				'majkey_midi_roots':[25,37,49,61,73,85,97]
			},
		}
		return sigs
}
