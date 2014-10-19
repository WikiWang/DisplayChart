$(function () {
	var hpclist,userlist,applist,joblist,user,dataview;
	for (i = 0; i < dataView.length; i++) {             
        if (dataView.options[i].selected == true){
        	dataview = dataView.options[i].text;
        }            
    }
	$.ajax({
        type: 'POST',
        url: 'GetEnviromentUsers',
        data: {username:dataview, content:'aaa'},
        dataType: 'json',
        success:function(data){        	
        	hpclist = data.hpclist;
        	userlist = data.userlist;
        	user = data.user;
        	alert(userlist[0]); 
        	var array = new Array(userlist.length*hpclist.length);
        	var height = String(userlist.length)*35+'px';
        	$('#container').css('minheight', height);
        	var i,j,k,h;
        	k=0;
        	for(i=0; i<user.length; i++){
        		h=0;
        		for(j=0; j<hpclist.length; j++){
        			if(user[i].realTimeData[h].hpcName != hpclist[j]){
        				array[k++] = new Array(j, i, 0);
        			}else{
        				array[k++] = new Array(j, i, user[i].realTimeData[h++].sum);
        			}        			
        		}
        	};
        	$('#container').highcharts({

                chart: {
                    type: 'heatmap',
                    marginTop: 40,
                    marginBottom: 40
                },


                title: {
                    text: '实时活跃核数分布'
                },

                xAxis: {
                    categories:hpclist,
                    labels: { 
                        rotation:90,
                        width:100
                    } 
                },

                yAxis: {
                    categories:userlist,
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
                    y: 25,
                    symbolHeight: 320
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.xAxis.categories[this.point.x] + '-' + this.series.yAxis.categories[this.point.y] + 
                        '</b><br>sum:<b>' + this.point.value + 
                        '</b><br>pend:<b>' + user[this.point.y].realTimeData[this.point.x].pend +
                        '</b><br>run:<b>' + user[this.point.y].realTimeData[this.point.x].run +
                        '</b>';
                    }
                },

                series: [{
                    name: 'Sales per employee',
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
    });
});
