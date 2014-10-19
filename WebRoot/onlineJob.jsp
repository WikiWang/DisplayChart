<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'onlineJob.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link rel="stylesheet" type="text/css" href="css/main.css">

<script src="js/jquery.1.9.1.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/heatmap.js"></script>
<script src="js/exporting.js"></script>
<script src="js/drawheatmap.js" charset="GBK"></script>
</head>
<body>
	<div class="column1">
		<select id="dataView" name="dataView">
			<option value="1">环境用户</option>
			<option value="2">作业规模</option>
			<option value="3">应用服务</option>
		</select> 
		<a class="ajax-time" id="" href="#">实时活跃</a>
		<a class="ajax-time" id="" href="#">2014年</a>
		<a class="ajax-time" id="" href="#">2013年</a>
		<a class="ajax-time" id="" href="#">2012年</a>
		<a class="ajax-time" id="" href="#">全部</a>
	</div>
	<div class="column2">
		<a>数据周期</a> <select name="startTime">
			<option value="1">2013.1</option>
			<option value="2">2013.2</option>
			<option value="3">2013.3</option>
		</select> <a>——</a> <select name="endTime">
			<option value="1">2014.1</option>
			<option value="2">2014.2</option>
			<option value="3">2014.3</option>
		</select> <input class="mybutton" type="button" value="确定" name="timeButton">
	</div>
	<div class="column3">
		<a class="pendcore">环境当前排队运行核数1237核</a> <a href="#" class="charts">热度矩阵图</a>
		<a href="#" class="charts">可放缩TREEMAP</a>
	</div>
	<div id="container" class="heatmap" ></div>
</body>
</html>
