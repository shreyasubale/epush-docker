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
<!-- REMOTEEMPLOYEEENROLLMENT CSS -->
<link rel="stylesheet" href="css/remoteemployeeenrollment.css" type="text/css" />
<link rel="stylesheet" href="css/menu.css" type="text/css" />

</head>

<body oncopy="return false" oncut="return false" onpaste="return false" onload="JavaScript:REMOTEEMPLOYEEENROLLMENT.InitPage()">

	<div class="container-fluid">
		<div class="row top-header">
			<div class="col-sm-2"></div>
			<div class="col-sm-8">
				<div class="jqgrid-header ui-widget-header">
					<div class="row">
						<div class="col-xs-10 txt-header">Remote Employee Enrollment at Device</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-2"></div>
			<div class="col-sm-8">
				<div class="form-filter" style="border-radius: 0 0 0px 0px; border: 1px solid #dddddd;">
					<div class="row">
						<div class="col-sm-1"></div>
						<div class="col-sm-5">
							<div class="sub-containers">
								<div style="padding-bottom: 10px;">
									<h5>Employees</h5>
								</div>
								<div>
									<div style="padding-bottom: 10px;">
										<input id="search_cmb_employees" type="text" class="form-control input-sm" placeholder="search employees" />
									</div>
									<div>
										<select id="cmb_employees" class="form-control" >
											<option value="0">[All]</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-5">
							<div class="sub-containers">
								<div style="padding-bottom: 10px;">
									<span>Devices</span>
								</div>
								<div>
									<div>
										<div style="padding-bottom: 10px;">
											<input id="search_cmb_device_fname" type="text" class="form-control input-sm" placeholder="search devices" />
										</div>
										<div>
											<select id="cmb_device_fname" class="form-control">
												<option value="0"></option>
											</select>
										</div>
									</div>
								</div>
								<div class="col-sm-1"></div>
							</div>
						</div>
						<div class="col-sm-1"></div>
					</div>
					<div class="row sub-containers">
					    <div class="col-sm-1 col-xs-0 col-lg-1 col-md-1"></div>
					    <div class="col-sm-3">
					        <select id="cmb_bio_type" class="form-control" onchange="JavaScript:REMOTEEMPLOYEEENROLLMENT.Biotype_Changed()">
                            	<option value="-1" selected>[Select Bio Type]</option>
                            	<option value="1">Finger</option>
                            </select>
					    </div>
					    <div class="col-sm-3" align="center">
					        <select id="cmb_retry_attempt" class="form-control" >
                            	<option value="0">[Select Retry Count]</option>
                            	<option value="3" selected>3</option>
                            	<option value="4">4</option>
                            	<option value="5">5</option>
                            </select>
					    </div>
					    <div class="col-sm-4" style="padding:5px;" align="center">
                           <input type="checkbox" id="chk_overwrite" checked>
                           <span style="margin-left:10px;font-size:15px;">Update Previous Bio?</span>
					    </div>
					    <div class="col-sm-1">
                        </div>
					</div>
					<div class="row sub-containers" id="biotype_finger_1" style="display:none;">
					    <div class="col-sm-1 col-xs-0 col-lg-1 col-md-1"></div>
					    <div class="col-sm-2" style="padding:5px;">
                           <input type="checkbox" id="chk_left_little">
                           <span style="margin-left:10px;font-size:15px;">Left Little</span>
					    </div>
					    <div class="col-sm-2" style="padding:5px;">
                           <input type="checkbox" id="chk_left_ring">
                           <span style="margin-left:10px;font-size:15px;">Left Ring</span>
					    </div>
					    <div class="col-sm-2" style="padding:5px;">
                           <input type="checkbox" id="chk_left_middle">
                           <span style="margin-left:10px;font-size:15px;">Left Middle</span>
					    </div>
					    <div class="col-sm-2" style="padding:5px;">
                           <input type="checkbox" id="chk_left_index">
                           <span style="margin-left:10px;font-size:15px;">Left Index</span>
					    </div>
					    <div class="col-sm-2" style="padding:5px;">
                           <input type="checkbox" id="chk_left_thumb">
                           <span style="margin-left:10px;font-size:15px;">Left Thumb</span>
					    </div>
					    <div class="col-sm-1">
                        </div>
					</div>
					<div class="row sub-containers" id="biotype_finger_2"  style="display:none;">
					    <div class="col-sm-1 col-xs-0 col-lg-1 col-md-1"></div>
					    <div class="col-sm-2" style="padding:5px;">
                           <input type="checkbox" id="chk_right_thumb">
                           <span style="margin-left:10px;font-size:15px;">Right Thumb</span>
					    </div>
					    <div class="col-sm-2" style="padding:5px;">
                           <input type="checkbox" id="chk_right_index">
                           <span style="margin-left:10px;font-size:15px;">Right Index</span>
					    </div>
					    <div class="col-sm-2" style="padding:5px;">
                           <input type="checkbox" id="chk_right_middle">
                           <span style="margin-left:10px;font-size:15px;">Right Middle</span>
					    </div>
					    <div class="col-sm-2" style="padding:5px;">
                           <input type="checkbox" id="chk_right_ring">
                           <span style="margin-left:10px;font-size:15px;">Right Ring</span>
					    </div>
					    <div class="col-sm-2" style="padding:5px;">
                           <input type="checkbox" id="chk_right_little">
                           <span style="margin-left:10px;font-size:15px;">Right Little</span>
					    </div>
					    <div class="col-sm-1">
                        </div>
					</div>
					<div class="row sub-containers">
                        <div class="col-sm-1 col-xs-0 col-lg-1 col-md-1"></div>
                        <div class="col-sm-4 col-xs-12 col-md-3 col-lg-3">
                            <div class="checkbox mobile-center">
                            </div>
                        </div>
                        <div class="col-sm-7 col-xs-12 col-md-6 col-lg-6">
                            <div class="checkbox mobile-center">
                            </div>
                        </div>
                        <div class="col-sm-11 col-xs-12 col-md-1 col-lg-1" align="right">
                            <button class="btn btn-default" onclick="JavaScript:REMOTEEMPLOYEEENROLLMENT.RemoteEmployeeEnrollment_Clicked()">Submit</button>
                        </div>
                        <div class="col-sm-1 col-xs-0 col-md-1 col-lg-1"></div>
                    </div>
				</div>
				<!-- col -->
				<div class="col-sm-2"></div>
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
	<script src="js/remoteemployeeenrollment.js"></script>

</body>
</html>