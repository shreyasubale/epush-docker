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
<!--  Device Management CSS -->
<link href="css/deviceoplogs.css" rel="stylesheet" type="text/css" />


</head>
<body oncopy="return false" oncut="return false" onpaste="return false" onload="JavaScript:DEVICEOPLOGS.InitPage()"
	onunload="JavaScript:DEVICEOPLOGS.ClosePage()">

	<div class="container">
		<div class="jqgrid-header ui-widget-header">Device Operations Logs</div>
		<div class="jqgrid-filter">
			<div class="row" align="center">
				<div class="col-xs-1">
					<h6>
						<small>AUTO-RELOAD</small>
					</h6>
				</div>
				<div class="col-xs-2">
					<h6>
						<small>TOP</small>
					</h6>
				</div>
				<div class="col-xs-2">
					<h6>
						<small>LOG TYPE</small>
					</h6>
				</div>
				<div class="col-xs-2">
					<h6>
						<small>DEVICES</small>
					</h6>
				</div>
				<div class="col-xs-2">
					<h6>
						<small>FROM DATE</small>
					</h6>
				</div>
				<div class="col-xs-2">
					<h6>
						<small>TO DATE</small>
					</h6>
				</div>
				<div class="col-xs-1"></div>
			</div>
			<div class="row" align="center">
				<div class="col-xs-1">
					<input type="checkbox" id="chb_autorefresh" style="vertical-align: middle;" onclick="JavaScript:DEVICEOPLOGS.AutoRefresh_Clicked()">
				</div>
				<div class="col-xs-2">
					<select id="cmb_toptypes" class="form-control input-sm input-small">
						<option value="0">[All]</option>
						<option value="1">[Top-500]</option>
						<option value="2" selected>[Top-1000]</option>
						<option value="3">[Top-5000]</option>
						<option value="4">[Top-10000]</option>
						<option value="5">[Top-50000]</option>
						<option value="6">[Top-100000]</option>
					</select>
				</div>
				<div class="col-xs-2">
					<select id="cmb_logtypes" class="form-control input-sm input-small">
						<option value="0">[All]</option>
					</select>
				</div>
				<div class="col-xs-2">
					<select id="cmb_devices" class="form-control input-sm input-small">
						<option value="0">[All]</option>
					</select>
				</div>
				<div class="col-xs-2">
					<input type="text" id="dp_fromdate" maxlength="10" class="form-control input-sm input-small" style="text-align: center;" />
				</div>
				<div class="col-xs-2">
					<input type="text" id="dp_todate" maxlength="10" class="form-control input-sm input-small" style="text-align: center;" />
				</div>
				<div class="col-xs-1">
					<button class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="left" title="Please click here to search.." type="button"
						onclick="JavaScript:DEVICEOPLOGS.SearchData_Clicked(1)">
						<i class="fa fa-search"></i>
					</button>
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

    <script src="../../../../../js/jquery/jquery.1.11.1.min.js"></script>
    <script src="../../../../../js/jquery/jquery-ui.js"></script>
    <!-- This is the Javascript file of jqGrid -->
    <script type="text/ecmascript" src="../../../../../js/usercontrols/jqgrid/js/jquery.jqGrid.src.js"></script>
    <!-- This is the localization file of the grid controlling messages, labels, etc.
    <!-- We support more than 40 localizations -->
    <script type="text/ecmascript" src="../../../../../js/usercontrols/jqgrid/js/i18n/grid.locale-en.js"></script>

    <script src="../../../../../js/bootstrap.min.js"></script>
    <script src="../../../../../js/json-utils.js"></script>
    <script src="../../../../../js/script.js"></script>
    <script src="../../../../../js/ds/DataStructure.js"></script>
    <script src="../../../../../js/ds/DeviceOPLogs.js"></script>
    <script src="../../../../../js/ds/ComboBoxList.js"></script>
    <script src="../../../../../js/sweetalert.min.js"></script>
    <script src="js/msg.js"></script>
    <script src="js/deviceoplogs.js"></script>

</body>
</html>