<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'treemap.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

    <link type="text/css" rel="stylesheet" href="css/style.css"/>
    <link type="text/css" rel="stylesheet" href="css/treemap.css"/> 
    <link rel="stylesheet" type="text/css" href="css/main.css">   
    <script src="js/jquery.1.9.1.min.js"></script>
    <script src="d3/d3.js"></script>
    <script src="d3/d3.layout.js"></script>
    <script src="js/drawtreemap.js" charset="GBK"></script>

  </head>
  
  <body>
    <div class="column1">
		<select id="dataView" name="dataView" onchange="change()">
			<option value="1">环境用户</option>
			<option value="2">应用服务</option>
			<option value="3">作业规模</option>
		</select> 
		<a id="realtime" onclick="realdata()">实时活跃</a>
		<a id="history1" onclick="gethistory1()"></a>
		<a id="history2" onclick="gethistory2()"></a>
		<a id="history3" onclick="gethistory3()"></a>
		<a id="historyall" onclick="gethistoryall()">全部</a>
	</div>
	<div class="column2">
		<a>数据周期：</a> 
		<select id="startTime">
		</select> 
		<a>年</a>
		<select>
			<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option>
			<option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
		</select>
		<a>月</a>
		<a>——</a>
		<select id="endTime">
		</select>
		<a>年</a>
		<select>
			<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option>
			<option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
		</select>
		<a>月</a>
		<input class="mybutton" type="button" value="确定" name="timeButton">
	</div>
	<div class="column3">
		<a class="pendcore">环境当前排队运行核数1237核</a> 
		<a href="#" class="charts">热度矩阵图</a>
		<a href="#" class="charts">可放缩TREEMAP</a>
	</div>
	<div id="body">
		 <div id="footer">
        d3.layout.treemap
        <div class="hint">click or option-click to descend or ascend</div>
        <div><select>
          <option value="size">Size</option>
          <option value="count">Count</option>
        </select></div>
      </div>
	</div>
	<div class="foot">
		<a>更新时间：</a>
		<label id="refreshTime"></label> 
		<a class="seeDetails" href="">查看详细列表</a>
	</div>
  </body>
</html>
