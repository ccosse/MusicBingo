//util.js
var get=function(target_id){
	return document.getElementById(target_id);
}
var mkBrightColor=function(){
	var hexvals=['A','B','C','D','E','F'];
	var rval='#';
	for(var dummy=0;dummy<6;dummy++){
		var hidx=parseInt(Math.random()*hexvals.length);
		rval+=hexvals[hidx];
	}
	return rval;
}
