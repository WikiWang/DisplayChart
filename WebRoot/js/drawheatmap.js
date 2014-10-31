var chart;
var titlestring = "实时活跃核数分布"; 
var jsondata;
$(function() {
	var time = new Date();
	var year = time.getFullYear();
	document.getElementById("history1").innerHTML = year + "年";
	document.getElementById("history2").innerHTML = (year-1) + "年";
	document.getElementById("history3").innerHTML = (year-2) + "年";
	var starttime = document.getElementById("startTime");
	var endtime = document.getElementById("endTime");
	for(var i = 2010; i<=year; i++){
		starttime.options.add(new Option(i,i));
		endtime.options.add(new Option(i,i));
	}
	drawheatmap();
});

function drawheatmap() {
	var datavalue; 		//select框的值
	var dataviewstring; //数据视角(环境用户、应用服务、作业规模)
	var dataYliststring;//纵坐标选择(userlist，applist，corelist)
	var dataliststring; //具体数据名(user,application,corelevel)
	for (i = 0; i < dataView.length; i++) {             
        if (dataView.options[i].selected == true){
        	datavalue = dataView.options[i].value;
        }            
    }
	switch (datavalue) {
	case '1':
		dataviewstring = "user-hpc";	
		dataYliststring = "userlist";
		dataliststring = "children";
		break;
	case '2':
		dataviewstring = "app-hpc";	
		dataYliststring = "applist";
		dataliststring = "children";
		break;
	case '3':
		dataviewstring = "core-hpc";	
		dataYliststring = "corelist";
		dataliststring = "children";
		break;
	default:
		break;
	}
	$.ajax({
        type: 'POST',
        url: 'GetEnviromentUsers',
        data: {file:'real-data.json'},
        dataType: 'json',
        success:function(data){   
        	jsondata = data;
        	getRealData(data,dataviewstring,dataYliststring,dataliststring);
        }
	});
}

function getRealData(data,dataviewstring,dataYliststring,dataliststring) {
	var hpclist = data[dataviewstring].hpclist;                     //集群列表
	var Ylist = data[dataviewstring][dataYliststring];					//用户列表
	var datalist = data[dataviewstring].data[dataliststring];       //数据列表
	var array = new Array(Ylist.length*hpclist.length);			//放入highcharts的数据数组
	var detaildata = new Array(Ylist.length);					//存储弹出框 显示的数据（二维数组）
	document.getElementById("refreshTime").innerHTML = data[dataviewstring].data.time;       
	for(var i=0; i<Ylist.length; i++){
		detaildata[i] = new Array(hpclist.length);
	}
	var height = Ylist.length*30;
	$('#container').css('height', (height+100)+'px');	
	var i,j,k,h;
	k=0;
	for(i=0; i<datalist.length; i++){
		h=0;
		for(j=0; j<hpclist.length; j++){        			
			if(h<datalist[i].children.length && datalist[i].children[h].name == hpclist[j]){
				array[k++] = new Array(j, i, datalist[i].children[h].jobcount);
				detaildata[i][j] = {"jobcount(PEND)":datalist[i].children[h]['jobcount(PEND)'],"jobcount(RUN)":datalist[i].children[h]['jobcount(RUN)'],"jobcount":datalist[i].children[h].jobcount};
				h++;
			}else{
				array[k++] = new Array(j, i, 0);
				detaildata[i][j] = {"jobcount(PEND)":0,"jobcount(RUN)":0,"jobcount":0};
			}        			        			        			        			        			
		}
	};
	drawReal(hpclist,Ylist,array,detaildata,"jobcount(PEND)","jobcount(RUN)");
}

function drawReal(xlist,ylist,array,detaildata,pendString,runString) {
	chart = new Highcharts.Chart({
		chart: {
        	renderTo: 'container', 
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40
        },

        title: {
            text: titlestring,
            style:{
            	visible:0
            }
        },

        xAxis: {
            categories:xlist,
            labels: { 
                rotation:90,
                width:100
            } 
        },

        yAxis: {
            categories:ylist,
            title: null
        },

        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '-' + this.series.yAxis.categories[this.point.y] + 
                '</b><br>sum:<b>' + this.point.value + 
                '</b><br>pend:<b>' + detaildata[this.point.y][this.point.x][pendString] +
                '</b><br>run:<b>' + detaildata[this.point.y][this.point.x][runString]+
                '</b>';
            }
        },

        series: [{
            name: 'real data',
            borderWidth: 1,
            data: array,
            dataLabels: {
                enabled: true,
                color: 'black',
                style: {
                    textShadow: 'none',
                    HcTextStroke: null
                }
            }
        }]

    });
}

function change() {
	var datavalue; 		//select框的值
	var dataviewstring; //数据视角(环境用户、应用服务、作业规模)
	var dataYliststring;//纵坐标选择(userlist，applist，corelist)
	var dataliststring; //具体数据名(user,application,corelevel)
	for (i = 0; i < dataView.length; i++) {             
        if (dataView.options[i].selected == true){
        	datavalue = dataView.options[i].value;
        }            
    }
	switch (datavalue) {
	case '1':
		dataviewstring = "user-hpc";	
		dataYliststring = "userlist";
		dataliststring = "children";
		break;
	case '2':
		dataviewstring = "app-hpc";	
		dataYliststring = "applist";
		dataliststring = "children";
		break;
	case '3':
		dataviewstring = "core-hpc";	
		dataYliststring = "corelist";
		dataliststring = "children";
		break;
	default:
		break;
	}
	chart = null;
	getRealData(jsondata,dataviewstring,dataYliststring,dataliststring);
}

function realData() {
	var datavalue; 		//select框的值
	var dataviewstring; //数据视角(环境用户、应用服务、作业规模)
	var dataYliststring;//纵坐标选择(userlist，applist，corelist)
	var dataliststring; //具体数据名(user,application,corelevel)
	for (i = 0; i < dataView.length; i++) {             
        if (dataView.options[i].selected == true){
        	datavalue = dataView.options[i].value;
        }            
    }
	switch (datavalue) {
	case '1':
		dataviewstring = "user-hpc";	
		dataYliststring = "userlist";
		dataliststring = "children";
		break;
	case '2':
		dataviewstring = "app-hpc";	
		dataYliststring = "applist";
		dataliststring = "children";
		break;
	case '3':
		dataviewstring = "core-hpc";	
		dataYliststring = "corelist";
		dataliststring = "children";
		break;
	default:
		break;
	}
	$.ajax({
        type: 'POST',
        url: 'GetEnviromentUsers',
        data: {file:'real-data.json'},
        dataType: 'json',
        success:function(data){   
        	jsondata = data;
        	getRealData(data,dataviewstring,dataYliststring,dataliststring);
        }
	});
}

function getHistory1() {
	var datavalue; 		//select框的值
	var dataviewstring; //数据视角(环境用户、应用服务、作业规模)
	var dataYliststring;//纵坐标选择(userlist，applist，corelist)
	var dataliststring; //具体数据名(user,application,corelevel)
	for (i = 0; i < dataView.length; i++) {             
        if (dataView.options[i].selected == true){
        	datavalue = dataView.options[i].value;
        }            
    }
	switch (datavalue) {
	case '1':
		dataviewstring = "user-hpc";	
		dataYliststring = "userlist";
		dataliststring = "children";
		break;
	case '2':
		dataviewstring = "app-hpc";	
		dataYliststring = "applist";
		dataliststring = "children";
		break;
	case '3':
		dataviewstring = "core-hpc";	
		dataYliststring = "corelist";
		dataliststring = "children";
		break;
	default:
		break;
	}
	$.ajax({
        type: 'POST',
        url: 'GetEnviromentUsers',
        data: {file:'short-data.json'},
        dataType: 'json',
        success:function(data){   
        	jsondata = data;
        	getHistoryData(data,dataviewstring,dataYliststring,dataliststring);
        }
	});
}

function getHistory2() {
	var datavalue; 		//select框的值
	var dataviewstring; //数据视角(环境用户、应用服务、作业规模)
	var dataYliststring;//纵坐标选择(userlist，applist，corelist)
	var dataliststring; //具体数据名(user,application,corelevel)
	for (i = 0; i < dataView.length; i++) {             
        if (dataView.options[i].selected == true){
        	datavalue = dataView.options[i].value;
        }            
    }
	switch (datavalue) {
	case '1':
		dataviewstring = "user-hpc";	
		dataYliststring = "userlist";
		dataliststring = "children";
		break;
	case '2':
		dataviewstring = "app-hpc";	
		dataYliststring = "applist";
		dataliststring = "children";
		break;
	case '3':
		dataviewstring = "core-hpc";	
		dataYliststring = "corelist";
		dataliststring = "children";
		break;
	default:
		break;
	}
	$.ajax({
        type: 'POST',
        url: 'GetEnviromentUsers',
        data: {file:'short-data.json'},
        dataType: 'json',
        success:function(data){   
        	jsondata = data;
        	getHistoryData(data,dataviewstring,dataYliststring,dataliststring);
        }
	});
}

function getHistory3() {
	var datavalue; 		//select框的值
	var dataviewstring; //数据视角(环境用户、应用服务、作业规模)
	var dataYliststring;//纵坐标选择(userlist，applist，corelist)
	var dataliststring; //具体数据名(user,application,corelevel)
	for (i = 0; i < dataView.length; i++) {             
        if (dataView.options[i].selected == true){
        	datavalue = dataView.options[i].value;
        }            
    }
	switch (datavalue) {
	case '1':
		dataviewstring = "user-hpc";	
		dataYliststring = "userlist";
		dataliststring = "children";
		break;
	case '2':
		dataviewstring = "app-hpc";	
		dataYliststring = "applist";
		dataliststring = "children";
		break;
	case '3':
		dataviewstring = "core-hpc";	
		dataYliststring = "corelist";
		dataliststring = "children";
		break;
	default:
		break;
	}
	$.ajax({
        type: 'POST',
        url: 'GetEnviromentUsers',
        data: {file:'short-data.json'},
        dataType: 'json',
        success:function(data){   
        	jsondata = data;
        	getHistoryData(data,dataviewstring,dataYliststring,dataliststring);
        }
	});
}

function getHistoryall() {
	var datavalue; 		//select框的值
	var dataviewstring; //数据视角(环境用户、应用服务、作业规模)
	var dataYliststring;//纵坐标选择(userlist，applist，corelist)
	var dataliststring; //具体数据名(user,application,corelevel)
	for (i = 0; i < dataView.length; i++) {             
        if (dataView.options[i].selected == true){
        	datavalue = dataView.options[i].value;
        }            
    }
	switch (datavalue) {
	case '1':
		dataviewstring = "user-hpc";	
		dataYliststring = "userlist";
		dataliststring = "children";
		break;
	case '2':
		dataviewstring = "app-hpc";	
		dataYliststring = "applist";
		dataliststring = "children";
		break;
	case '3':
		dataviewstring = "core-hpc";	
		dataYliststring = "corelist";
		dataliststring = "children";
		break;
	default:
		break;
	}
	$.ajax({
        type: 'POST',
        url: 'GetEnviromentUsers',
        data: {file:'long-data.json'},
        dataType: 'json',
        success:function(data){   
        	jsondata = data;
        	getHistoryData(data,dataviewstring,dataYliststring,dataliststring);
        }
	});
}

function getHistoryData(data,dataviewstring,dataYliststring,dataliststring) {
	var hpclist = data[dataviewstring].hpclist;                     //集群列表
	var Ylist = data[dataviewstring][dataYliststring];					//用户列表
	var datalist = data[dataviewstring].data[dataliststring];       //数据列表
	var array = new Array(Ylist.length*hpclist.length);			//放入highcharts的数据数组
	var detaildata = new Array(Ylist.length);					//存储弹出框 显示的数据（二维数组）
	document.getElementById("refreshTime").innerHTML = data[dataviewstring].data.time;       
	for(var i=0; i<Ylist.length; i++){
		detaildata[i] = new Array(hpclist.length);
	}
	var height = Ylist.length*30;
	$('#container').css('height', (height+100)+'px');	
	var i,j,k,h;
	k=0;
	for(i=0; i<datalist.length; i++){
		h=0;
		for(j=0; j<hpclist.length; j++){        			
			if(h<datalist[i].children.length && datalist[i].children[h].name == hpclist[j]){
				array[k++] = new Array(j, i, datalist[i].children[h].jobcount);
				h++;
			}else{
				array[k++] = new Array(j, i, 0);
			}        			        			        			        			        			
		}
	};
	alert(hpclist.length);
	alert(Ylist.length);
	alert(array.length);
	drewHistory(hpclist,Ylist,array,detaildata);
}

function drewHistory(xlist,ylist,array,detaildata) {
	chart = new Highcharts.Chart({
		chart: {
        	renderTo: 'container', 
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40
        },

        title: {
            text: titlestring,
            style:{
            	visible:0
            }
        },

        xAxis: {
            categories:xlist,
            tickInterval:100,
            labels: { 
                rotation:90,
                width:100
            } 
        },

        yAxis: {
            categories:ylist,
            title: null
        },

        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '-' + this.series.yAxis.categories[this.point.y] + 
                '</b><br>sum:<b>' + this.point.value + 
                '</b>';
            }
        },

        series: [{
            name: 'history data',
            borderWidth: 1,
            data: array,
            dataLabels: {
                enabled: true,
                color: 'black',
                style: {
                    textShadow: 'none',
                    HcTextStroke: null
                }
            }
        }]

    });
}