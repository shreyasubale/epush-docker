<!DOCTYPE HTML>
<html lang="en">
<head>

<title>E-Push Server</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="E-Push Server" />

<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />

<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<!--  Style Sheet -->
<!-- BootStrap CSS -->
<link rel="stylesheet" href="../../../../../css/bootstrap.min.css">
<link rel="stylesheet" href="../../../../../css/bootstrap-theme.min.css">

<!--Font Awesome-->
<link rel="stylesheet" href="../../../../../css/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="../../../../../css/font-awesome/font-awesome-animation.min.css">

<!-- Jquery CSS -->
<link rel="stylesheet" type="text/css" media="screen" href="../../../../../css/juqery-ui/jquery-ui.css" />
<!--jqGrid CSS-->
<link rel="stylesheet" type="text/css" media="screen" href="../../../../../js/usercontrols/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" media="screen" href="../../../../../js/usercontrols/jqgrid/css/ui.jqgrid-bootstarp.css" />
<!-- Generic CSS -->
<link rel="stylesheet" href="../../../../../css/style.css" type="text/css" />
<link rel="stylesheet" href="../../../../../css/loadpopup.css" type="text/css" />
<link rel="stylesheet" href="../../../../../css/sweetalert.css" type="text/css">
<link rel="stylesheet" href="../../../../../css/popup.css" type="text/css">
<!-- EmployeeInfo CSS -->
<link rel="stylesheet" href="css/uploademployeeinfo.css" type="text/css" />
<link rel="stylesheet" href="css/menu.css" type="text/css" />


</head>

<body oncopy="return false" oncut="return false" onpaste="return false" onload="JavaScript:UPLOADEMPLOYEEINFO.InitPage()">

	<div class="container">
		<div class="jqgrid-header ui-widget-header txt-header" id="form_title">Upload Employees Info</div>
		<div class="jqgrid-filter"  id="form_filter">
			<div class="row" align="center">
				<div class="col-xs-5">
				</div>
				<div class="col-xs-7">
				</div>
			</div>
			<div class="row" align="center">
				<div class="col-xs-5">
				</div>
				<div class="col-xs-3">
					<input type="file" id="file_employees" accept=".csv"/>
				</div>
				<div class="col-xs-3">
                    <button class="btn btn-default" onclick="JavaScript:UPLOADEMPLOYEEINFO.UploadEmployeeInfo_Clicked()">Upload Employees</button>
				</div>
				<div class="col-xs-1">
				</div>
			</div>
		</div>
		<div class="row" align="center">
			<div class="col-xs-12">
				<div id="grid" class="jqGrid" style="min-width: 500px">
					<table id="list">
					</table>
					<div id="jqGridPager"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Load -->
	<div class="cd-load-popup">
		<div class="cd-popup-container">
			<div class="container-fluid">
				<div class="form-load-group">
					<table class="lbl-load-select">
						<tr>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td><img src="../../../../../img/loader.GIF" /></td>
						</tr>
						<tr>
							<td align="center">Loading<img src="../../../../../img/loader1.GIF" /></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<!-- Script -->
	<!-- Jquery JS-->
	<script src="../../../../../js/jquery/jquery-ui.js"></script>
	<script src="../../../../../js/jquery/jquery.1.11.1.min.js"></script>
	<script src="../../../../../js/jquery/jquery-csv.js"></script>

	<!-- JQGrid JS -->
	<script type="text/ecmascript" src="../../../../../js/usercontrols/jqgrid/js/jquery.jqGrid.min.js"></script>
	<script type="text/ecmascript" src="../../../../../js/usercontrols/jqgrid/js/i18n/grid.locale-en.js"></script>
	<!-- BootStrap JS -->
	<script src="../../../../../js/bootstrap.min.js"></script>
	<!-- Generic JS -->
	<script src="../../../../../js/json-utils.js"></script>
	<script src="../../../../../js/script.js"></script>
	<script src="../../../../../js/date-util.js"></script>
	<script src="../../../../../js/ds/DataStructure.js"></script>
	<script src="../../../../../js/ds/EmployeeInfo.js"></script>
	<script src="../../../../../js/sweetalert.min.js">
	</script><script src="../../../../../js/popup.js"></script>
	<!-- EmployeeInfo JS -->
	<script src="js/msg.js"></script>
	<script src="js/uploademployeeinfo.js"></script>

</body>
</html>
