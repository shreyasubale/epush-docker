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

<!--[if lt IE 9]>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.js"></script>
<![endif]-->

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
<!-- UPLOADEMPLOYEES CSS -->
<link rel="stylesheet" href="css/uploademployees.css" type="text/css" />
<link rel="stylesheet" href="css/menu.css" type="text/css" />

</head>

<body oncopy="return false" oncut="return false" onpaste="return false" onload="JavaScript:UPLOADEMPLOYEES.InitPage()">

	<div class="container-fluid">
		<div class="row top-header">
			<div class="col-sm-1"></div>
			<div class="col-sm-10">
				<div class="jqgrid-header ui-widget-header">
					<div class="row">
						<div class="col-xs-10">Upload Employees To Multiple Devices</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-1"></div>
			<div class="col-sm-10">
				<div class="form-filter" style="border-radius: 0 0 0px 0px; border: 1px solid #dddddd;">
					<div class="row">
						<div class="col-sm-6">
							<div class="sub-containers">
								<div>
									<h5><b>Employees</b></h5>
								</div>
								<div>
									<div style="padding-bottom: 2px;">
										<input id="search_cmb_employees" type="text" class="form-control input-sm" placeholder="search employees" />
									</div>
									<div>
										<select id="cmb_employees" class="form-control mobileSelect multi_select" ondblclick="JavaScript:UPLOADEMPLOYEES.Select_Clicked ('employees')" multiple>
											<option value="0">[All]</option>
										</select>
									</div>
								</div>
							</div>
							<div class="sub-containers">
								<div class="row">
									<div class="col-sm-2 col-xs-2"></div>
									<div class="col-sm-2 col-xs-2">
										<button class="btn btn-default btn-sm" onclick="JavaScript:UPLOADEMPLOYEES.Select_Clicked('employees')">
											<i class="fa fa-angle-down faa-float animated-hover"></i>
										</button>
									</div>

									<div class="col-sm-2 col-xs-2">
										<button class="btn btn-default btn-sm" onclick="JavaScript:UPLOADEMPLOYEES.Select_All_Clicked('employees')">
											<i class="fa fa-angle-double-down faa-float animated-hover"></i>
										</button>
									</div>
									<div class="col-sm-2 col-xs-2">
										<button class="btn btn-default btn-sm" onclick="JavaScript:UPLOADEMPLOYEES.Remove_All_Clicked('employees')">
											<i class="fa fa-angle-double-up faa-float animated-hover"></i>
										</button>
									</div>

									<div class="col-sm-2 col-xs-2">
										<button class="btn btn-default btn-sm" onclick="JavaScript:UPLOADEMPLOYEES.Remove_Clicked('employees')">
											<i class="fa fa-angle-up faa-float animated-hover"></i>
										</button>
									</div>
									<div class="col-sm-2 col-xs-2"></div>
								</div>
							</div>
							<div>
								<div>
									<span>Selected Employees</span>
								</div>

								<div>
									<select id="cmb_employees_selected" class="form-control mobileSelect multi_select" ondblclick="JavaScript:UPLOADEMPLOYEES.Remove_Clicked ('employees')" multiple>
									</select>
								</div>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="sub-containers">
								<div>
									<span>Devices</span>
								</div>
								<div>
									<div>
										<div style="padding-bottom: 2px;">
											<input id="search_cmb_device_fname" type="text" class="form-control input-sm" placeholder="search devices" />
										</div>
										<div>
											<select id="cmb_device_fname" class="form-control mobileSelect multi_select" ondblclick="JavaScript:UPLOADEMPLOYEES.Select_Clicked('device')" multiple>
												<option value="0"></option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div class="sub-containers">
								<div class="row">
									<div class="col-sm-2 col-xs-2"></div>
									<div class="col-sm-2 col-xs-2">
										<button class="btn btn-default btn-sm" onclick="JavaScript:UPLOADEMPLOYEES.Select_Clicked('device')">
											<i class="fa fa-angle-down faa-float animated-hover"></i>
										</button>
									</div>

									<div class="col-sm-2 col-xs-2">
										<button class="btn btn-default btn-sm" onclick="JavaScript:UPLOADEMPLOYEES.Select_All_Clicked('device')">
											<i class="fa fa-angle-double-down  faa-float animated-hover"></i>
										</button>
									</div>
									<div class="col-sm-2 col-xs-2">
										<button class="btn btn-default btn-sm" onclick="JavaScript:UPLOADEMPLOYEES.Remove_All_Clicked('device')">
											<i class="fa fa-angle-double-up  faa-float animated-hover"></i>
										</button>
									</div>

									<div class="col-sm-2 col-xs-2">
										<button class="btn btn-default btn-sm" onclick="JavaScript:UPLOADEMPLOYEES.Remove_Clicked('device')">
											<i class="fa fa-angle-up faa-float animated-hover"></i>
										</button>
									</div>
									<div class="col-sm-2 col-xs-2"></div>
								</div>
							</div>
							<div>
								<div>
									<span>Selected Devices</span>
								</div>
								<div>
									<select id="cmb_device_fname_selected" class="form-control mobileSelect multi_select"  ondblclick="JavaScript:UPLOADEMPLOYEES.Remove_Clicked('device')" multiple>
									</select>
								</div>
							</div>
						</div>
						<div class="col-sm-1"></div>
					</div>

					<div class="row sub-containers">
					    <div class="col-lg-1"></div>
						<div class="col-sm-4 col-xs-12 col-md-2 col-lg-2">
							<div class="checkbox mobile-center">
								<input type="checkbox" id="chk_upload_user" class="checkbox"/>
								<h6>Upload User</h6>
							</div>
						</div>
						<div class="col-sm-4 col-xs-12 col-md-2 col-lg-2">
							<div class="checkbox mobile-center">
								<input type="checkbox" id="chk_upload_user_finger_print">Upload Fingerprint
							</div>
						</div>
						<div class="col-sm-6 col-xs-12 col-md-2 col-lg-2">
							<div class="checkbox mobile-center">
								<input type="checkbox" id="chk_upload_user_face">Upload Face
							</div>
						</div>
						<div class="col-sm-8 col-xs-12 col-md-2 col-lg-2">
							<div class="checkbox mobile-center">
								<input type="checkbox" id="chk_upload_palm">Upload Palm
							</div>
						</div>
						<div class="col-sm-10 col-xs-12 col-md-2 col-lg-2">
							<div class="checkbox mobile-center" style="display:none;">
								<input type="checkbox" id="chk_upload_voice_print" class="checkbox">Upload Voiceprint
							</div>
						</div>
					</div>
					<div class="row sub-containers" style="display:none;">
					    <div class="col-lg-1"></div>
						<div class="col-sm-7 col-xs-12 col-md-3 col-lg-2">
							<div class="checkbox mobile-center">
								<input type="checkbox" id="chk_upload_retina">Upload Retina
							</div>
						</div>
						<div class="col-sm-4 col-xs-12 col-md-3 col-lg-2">
							<div class="checkbox mobile-center">
								<input type="checkbox" id="chk_upload_palm_print" class="checkbox">Upload Palmprint
							</div>
						</div>
						<div class="col-sm-7 col-xs-12 col-md-3 col-lg-2">
							<div class="checkbox mobile-center">
								<input type="checkbox" id="chk_upload_finger_vein">Upload FingerVein
							</div>
						</div>
						<div class="col-sm-7 col-xs-12 col-md-3 col-lg-2">
							<div class="checkbox mobile-center">
								<input type="checkbox" id="chk_upload_iris">Upload Iris
							</div>
						</div>
					</div>
					<div class="row">
					    <div class="col-lg-10"></div>
						<div class="col-sm-11 col-xs-12 col-md-1 col-lg-2">
							<button class="btn btn-default" onclick="JavaScript:UPLOADEMPLOYEES.UploadEmployees_Clicked()">Submit</button>
						</div>
					</div>
				</div>
				<!-- col -->
				<div class="col-sm-1"></div>
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

	<!-- BootStrap JS -->
	<script src="../../../../../js/bootstrap.min.js"></script>
	<!-- Generic JS -->
	<script src="../../../../../js/json-utils.js"></script>
	<script src="../../../../../js/script.js"></script>
	<script src="../../../../../js/date-util.js"></script>
	<script src="../../../../../js/ds/DataStructure.js"></script>
	<script src="../../../../../js/ds/EmployeeInfo.js"></script>
	<script src="../../../../../js/sweetalert.min.js"></script>
	<script src="../../../../../js/ds/ComboBoxList.js"></script>
	<!-- uploademployees JS -->
	<script src="js/msg.js"></script>
	<script src="js/uploademployees.js"></script>

</body>
</html>