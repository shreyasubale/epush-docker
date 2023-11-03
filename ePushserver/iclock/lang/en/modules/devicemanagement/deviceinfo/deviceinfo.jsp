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
<!--  Device Management CSS -->
<link href="css/deviceinfo.css" rel="stylesheet" type="text/css" />

<!--Font Awesome-->
<link rel="stylesheet" href="../../../../../css/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="../../../../../css/font-awesome/font-awesome-animation.min.css">

</head>
<body oncopy="return false" oncut="return false" onpaste="return false" onload="JavaScript:DEVICEINFO.InitPage()"
	onunload="JavaScript:DEVICEINFO.ClosePage()">

	<div class="container">
		<form id="frm_deviceInfo">
			<div class="jqgrid-header ui-widget-header">
				<div class="row">
					<div class="col-xs-2">Device Info</div>
					<div class="col-xs-10" align="right">
						<button class="header-edit" data-toggle="tooltip" data-placement="left" title="Please click here to Add New Device.." type="button"
							onclick="JavaScript:DEVICEINFO.InsertDeviceInfo()">
							<i class="fa fa-plus"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="jqgrid-filter">
				<div class="row" align="center">
					<div class="col-xs-7"></div>
					<div class="col-xs-2">
						<h6>
							<small>TOP</small>
						</h6>
					</div>
					<div class="col-xs-2">
						<h6>
							<small>DEVICES</small>
						</h6>
					</div>
					<div class="col-xs-1"></div>
				</div>
				<div class="row" align="center">
					<div class="col-xs-7"></div>
					<div class="col-xs-2">
						<select id="cmb_toptypes" class="form-control input-sm input-small">
							<option value="0">[All]</option>
							<option value="1" selected>[Top-500]</option>
							<option value="2">[Top-1000]</option>
						</select>
					</div>
					<div class="col-xs-2">
						<select id="cmb_devices" class="form-control input-sm input-small">
							<option value="0">[All]</option>
						</select>
					</div>
					<div class="col-xs-1">
						<button class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="left" title="Please click here to search.." type="button"
							onclick="JavaScript:DEVICEINFO.SearchData_Clicked()">
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
			<form>
	</div>

	<div class="contextMenu" id="contextMenu" style="display: none; width: 400px;">
		<ul style="width: 400px; font-size: 65%;">
			<li id="cm_resetdeviceerror">
				<div class="context-menu">
					<div class="context-menu-lbl">
						<div class="context-menu-icon">
							<i class="fa fa-cog fa-spin fa-2x"></i>
						</div>
						<span class="context-menu-lbl-txt">&nbsp;Reset Device Error</span>
					</div>
				</div>
			</li>
			<li id="cm_resettransactionstamp">
				<div class="context-menu">
					<div class="context-menu-lbl">
						<div class="context-menu-icon">
							<i class="fa fa-exchange fa-rotate-180 fa-2x faa-passing animated"></i>
						</div>
						<span class="context-menu-lbl-txt">&nbsp;Reset Transaction Stamp</span>
					</div>
				</div>
			</li>
			<li id="cm_resetopstamp">
				<div class="context-menu">
					<div class="context-menu-lbl">
						<div class="context-menu-icon">
							<i class="fa fa-exchange fa-rotate-270 fa-2x faa-horizontal animated"></i>
						</div>
						<span class="context-menu-lbl-txt">&nbsp;Reset OP Stamp</span>
					</div>
				</div>
			</li>
			<li id="cm_resetphotostamp">
				<div class="context-menu">
					<div class="context-menu-lbl">
						<div class="context-menu-icon">
							<i class="fa fa-exchange fa-rotate-270 fa-2x faa-horizontal animated"></i>
						</div>
						<span class="context-menu-lbl-txt">&nbsp;Reset Photo Stamp</span>
					</div>
				</div>
			</li>
			<li id="cm_clearlogsfromdevice">
				<div class="context-menu">
					<div class="context-menu-lbl">
						<div class="context-menu-icon">
							<i class="fa fa-recycle fa-2x faa-pulse animated"></i>
						</div>
						<span class="context-menu-lbl-txt">&nbsp;Clear Logs From Device</span>
					</div>
				</div>
			</li>
			<li id="cm_changedeviceipaddress">
				<div class="context-menu">
					<div class="context-menu-lbl">
						<div class="context-menu-icon">
							<i class="fa fa-desktop fa-2x faa-pulse animated"></i>
						</div>
						<span class="context-menu-lbl-txt">&nbsp;Change Device IP Address</span>
					</div>
				</div>
			</li>
			<li id="cm_changedevicesubnetmask">
				<div class="context-menu">
					<div class="context-menu-lbl">
						<div class="context-menu-icon">
							<i class="fa fa-desktop fa-2x faa-pulse animated"></i>
						</div>
						<span class="context-menu-lbl-txt">&nbsp;Change Device Subnet Mask</span>
					</div>
				</div>
			</li>
			<li id="cm_changedevicegateway">
				<div class="context-menu">
					<div class="context-menu-lbl">
						<div class="context-menu-icon">
							<i class="fa fa-desktop fa-2x faa-pulse animated"></i>
						</div>
						<span class="context-menu-lbl-txt">&nbsp;Change Device Gateway</span>
					</div>
				</div>
			</li>
			<li id="cm_changedevicecardkey">
				<div class="context-menu">
					<div class="context-menu-lbl">
						<div class="context-menu-icon">
							<i class="fa fa-key fa-2x"></i>
						</div>
						<span class="context-menu-lbl-txt">&nbsp;Change Device Card Key</span>
					</div>
				</div>
			</li>
			<li id="cm_restartdevice">
				<div class="context-menu">
					<div class="context-menu-lbl">
						<div class="context-menu-icon">
							<i class="fa fa-refresh fa-spin fa-2x"></i>
						</div>
						<span class="context-menu-lbl-txt">&nbsp;Restart Device</span>
					</div>
				</div>
			</li>
		</ul>
	</div>

	<!-- Update -->
	<div class="cd-popup">
		<div class="cd-popup-container">
			<div class="container-fluid">
				<div class="form-group">
					<table class="lbl-select">
						<tr>
							<th colspan="5" class="txt-header">Update Device Info</th>
						</tr>
						<tr>
							<td colspan="5"><input type="text" class="form-control input-sm" id="txt_upd_deviceid" style="display: none;" readonly></input></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Device Name</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_upd_name"></input></td>
							<td></td>
							<td><p align="left" class="input-label">Short Name</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_upd_shortname"></input></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Serial Number</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_upd_serialnumber"></input></td>
							<td></td>
							<td><p align="left" class="input-label">IP Address</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_upd_ipaddress"></input></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Location</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_upd_location"></input></td>
							<td></td>
							<td><p align="left" class="input-label">Timezone</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_upd_timezone"></input></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Timeout</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_upd_timeout"></input></td>
							<td></td>
							<td><p align="left" class="input-label">Direction</p></td>
							<td><select id="cmb_upd_devicedirection" class="form-control input-sm input-small">
									<option value="in" selected>In Device</option>
									<option value="out">Out Device</option>
									<option value="altinout">Alternate In/Out Device</option>
									<option value="inout">System Direction(In/Out) Device</option>
							</select></td>
						</tr>
						<tr>
							<td colspan="5" align="center"><hr>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:DEVICEINFO.UpdateDeviceInfo_Clicked()">Update</button>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:DEVICEINFO.ClosePopup('update')">Cancel</button></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<!-- cd-popup-container -->
	</div>

	<!-- Insert -->
	<div class="cd-insert-popup">
		<div class="cd-popup-container">
			<div class="container-fluid">
				<div class="form-group">
					<table class="lbl-select">
						<tr>
							<th colspan="5" class="txt-header">Add Device Info</th>
						</tr>
						<tr>
							<td colspan="5"></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Device Name</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_ins_name"></input></td>
							<td></td>
							<td><p align="left" class="input-label">Short Name</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_ins_shortname"></input></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Serial Number</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_ins_serialnumber"></input></td>
							<td></td>
							<td><p align="left" class="input-label">IP Address</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_ins_ipaddress"></input></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Location</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_ins_location"></input></td>
							<td></td>
							<td><p align="left" class="input-label">Timezone</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_ins_timezone" value="330"></input></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left" class="input-label">Timeout</p></td>
							<td><input type="text" class="form-control input-sm" id="txt_ins_timeout" value="300"></input></td>
							<td></td>
							<td><p align="left" class="input-label">Direction</p></td>
							<td>
							    <select id="cmb_ins_devicedirection" class="form-control input-sm input-small">
									<option value="in" selected>In Device</option>
									<option value="out">Out Device</option>
									<option value="altinout">Alternate In/Out Device</option>
									<option value="inout">System Direction(In/Out) Device</option>
							    </select>
                            </td>
						</tr>

						<tr>
							<td colspan="5" align="center"><hr>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:DEVICEINFO.InsertDeviceInfo_Clicked()">Add</button>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:DEVICEINFO.ClosePopup('insert')">Cancel</button></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<!-- cd-popup-container -->
	</div>

	<div class="popup_device_commands">
		<div class="cd-popup-container" style="max-width: 400px;">
			<div class="container-fluid">
				<div class="form-group">
					<table class="lbl-select">
						<tr>
							<th colspan="2" class="txt-header" id=""><p id="dc_popup_header">Add Employee</th>
						</tr>
						<tr>
							<td></td>
						</tr>
						<tr id="lbl-select" class="ip">
							<td><p align="left" class="input-label" id="dc_command_title">IP Address</p></td>
							<td align="left">
								<div>
									<div style="display: inline-block;" id="ip_1_block">
										<input type="text" id="txt_ip_1" value="" style="width: 30px; text-align: center;" maxlength="3"></input> <label id="lbl_ip_1"><sub>.</sub></label>
									</div>
									<div style="display: inline-block;" id="ip_2_block">
										<input type="text" id="txt_ip_2" value="" style="width: 30px; text-align: center;" maxlength="3"></input> <label id="lbl_ip_2"><sub>.</sub></label>
									</div>
									<div style="display: inline-block;" id="ip_3_block">
										<input type="text" id="txt_ip_3" value="" style="width: 30px; text-align: center;" maxlength="3"></input> <label id="lbl_ip_3"><sub>.</sub></label>
									</div>
									<div style="display: inline-block;" id="ip_4_block">
										<input type="text" id="txt_ip_4" value="" style="width: 30px; text-align: center;" maxlength="3"></input> <label id="lbl_ip_4"><sub>.</sub></label>
									</div>
									<div style="display: inline-block;" id="ip_5_block">
										<input type="text" id="txt_ip_5" value="" style="width: 30px; text-align: center;" maxlength="3"></input> <label id="lbl_ip_5"><sub>.</sub></label>
									</div>
									<div style="display: inline-block;" id="ip_6_block">
										<input type="text" id="txt_ip_6" value="" style="width: 30px; text-align: center;" maxlength="3"></input>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td colspan="2" align="center"><hr>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:DEVICECOMMANDS.SubmitPopup()">Submit</button>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:DEVICECOMMANDS.ClosePopup()">Cancel</button></td>
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

	<script src="../../../../../js/jquery/jquery.1.11.1.min.js"></script>
	<script src="../../../../../js/jquery/jquery-ui.js"></script>
	<!-- This is the Javascript file of jqGrid -->
	<script type="text/ecmascript" src="../../../../../js/usercontrols/jqgrid/js/jquery.jqGrid.min.js"></script>
	<script type="text/ecmascript" src="../../../../../js/usercontrols/jqgrid/js/ContextMenu.js"></script>
	<!-- This is the localization file of the grid controlling messages, labels, etc.
    <!-- We support more than 40 localizations -->
	<script type="text/ecmascript" src="../../../../../js/usercontrols/jqgrid/js/i18n/grid.locale-en.js"></script>

	<script src="../../../../../js/bootstrap.min.js"></script>
	<script src="../../../../../js/json-utils.js"></script>
	<script src="../../../../../js/number-util.js"></script>
	<script src="../../../../../js/script.js"></script>
	<script src="../../../../../js/ds/DataStructure.js"></script>
	<script src="../../../../../js/ds/DeviceInfo.js"></script>
	<script src="../../../../../js/ds/ComboBoxList.js"></script>
	<script src="../../../../../js/sweetalert.min.js"></script>
	<script src="../../../../../js/popup.js"></script>
	<script src="js/msg.js"></script>
	<script src="js/devicecommands.js"></script>
	<script src="js/devicestatus.js"></script>
	<script src="js/deviceinfo.js"></script>

</body>
</html>