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
<link rel="stylesheet" href="../../../../../css/popup.css" type="text/css" />
<link rel="stylesheet" href="../../../../../css/sweetalert.css" type="text/css">
<!-- UserInfo CSS -->
<link rel="stylesheet" href="css/userinfo.css" type="text/css" />
<link rel="stylesheet" href="css/menu.css" type="text/css" />


</head>

<body oncopy="return false" oncut="return false" onpaste="return false" onload="JavaScript:USERINFO.InitPage()">
	<div class="container">
		<div class="jqgrid-header ui-widget-header">

			<div class="row">
				<div class="col-xs-2 txt-header">USER INFO</div>
				<div class="col-xs-10" align="right">
					<button class=" header-edit" onclick="JavaScript:USERINFO.OpenPopup('insert')">
						<i class="fa fa-plus"></i>
					</button>
				</div>
			</div>
		</div>
		<div class="jqgrid-filter">
			<div class="row" align="center">
				<div class="col-xs-5"></div>
				<div class="col-xs-2">
					<h6>
						<small>User Types</small>
					</h6>
				</div>
				<div class="col-xs-2">
					<h6>
						<small>TOP</small>
					</h6>
				</div>
				<div class="col-xs-2">
					<h6>
						<small>Status</small>
					</h6>
				</div>
				<div class="col-xs-1"></div>
			</div>
			<div class="row" align="center">
				<div class="col-xs-5"></div>
				<div class="col-xs-2">
					<select id="cmb_usertypes" class="form-control input-sm input-small">
						<option value="-1" selected>[All]</option>
						<option value="0">Normal User</option>
						<option value="1">Admin User</option>
					</select>
				</div>
				<div class="col-xs-2">
					<select id="cmb_toptypes" class="form-control input-sm input-small">
						<option value="0">[All]</option>
						<option value="1" selected>[Top-500]</option>
						<option value="2">[Top-1000]</option>
						<option value="3">[Top-5000]</option>
					</select>
				</div>
				<div class="col-xs-2">
					<select id="cmb_status" class="form-control input-sm input-small">
						<option value="-1" selected>[All]</option>
						<option value="0">Disabled</option>
						<option value="1">Enabled</option>
					</select>
				</div>
				<div class="col-xs-1">
					<button class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="left" title="Please click here to search.." type="button"
						onclick="JavaScript:USERINFO.SearchData_Clicked ()">
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

	<div class="cd-popup" role="alert">
		<div class="cd-popup-container">
			<div class="container-fluid">
				<div class="form-group">
					<table class="lbl-select">
						<tr>
							<th colspan="5">Update User Info</th>
						</tr>
						<tr>
							<td colspan="5"><input type="text" class="form-control input-sm" id="txt_upd_id" style="display: none;" readonly></input></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Login Name</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_upd_name"></input></td>
							<td></td>
							<td><p align="left" class="input-label">Password</p></td>
							<td><input type="password" class="form-control input-sm" id="txt_upd_pwd" value="********"></input></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Update Password</p></td>
							<td align="left"><input type="checkbox" id="cb_upd_updatepwd" value=""></td>
							<td></td>
							<td><p align="left" class="input-label">Admin</p></td>
							<td align="left"><input type="checkbox" id="cb_upd_admin" value=""></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Status</p></td>
							<td align="left"><input type="checkbox" id="cb_upd_enable" value="" title="Enable or Disable User"></td>
						<tr>
						<tr>
							<td colspan="5" align="center"><hr>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:USERINFO.UpdateUser_Clicked()">Update</button>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:USERINFO.ClosePopup('update')">Cancel</button></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<!-- cd-popup-container -->
	</div>

	<div class="cd-insert-popup" role="alert">
		<div class="cd-popup-container">
			<div class="container-fluid">
				<div class="form-group">
					<table class="lbl-select">
						<tr>
							<th colspan="5">Add User Info</th>
						</tr>
						<tr>
							<td colspan="5"></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Login Name</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_ins_name"></input></td>
							<td></td>
							<td><p align="left" class="input-label">Password</p></td>
							<td><input type="password" class="form-control input-sm" id="txt_ins_pwd"></input></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Admin</p></td>
							<td align="left"><input type="checkbox" id="cb_ins_admin" value=""></td>
							<td></td>
							<td><p align="left" class="input-label">Status</p></td>
							<td align="left"><input type="checkbox" id="cb_ins_enable" value="" title="Enable or Disable User" checked></td>
						</tr>
						<tr>
							<td colspan="5" align="center"><hr>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:USERINFO.InsertUser_Clicked()">Add</button>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:USERINFO.ClosePopup('insert')">Cancel</button></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<!-- cd-popup-container -->
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
	<script src="../../../../../js/ds/UserInfo.js"></script>
	<script src="../../../../../js/sweetalert.min.js"></script>
	<script src="../../../../../js/popup.js"></script>
	<!-- UserInfo JS -->
	<script src="js/msg.js"></script>
	<script src="js/userinfo.js"></script>

</body>
</html>