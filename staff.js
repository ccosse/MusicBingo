var Staff=function(){
	var me={};
	me.widget=document.createElement("div");
	me.widget.className="staff";
	me.table=document.createElement("table");
	me.widget.appendChild(me.table);
	return me;
}
