<!DOCTYPE HTML>
<html lang="en">

<head>
<title>E-Push Server</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0 ">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="E-Push Server" />

<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />

<!--  Style Sheet -->
<link href="css/menu.css" rel="stylesheet" type="text/css" media="all" />
<link rel="stylesheet" href="../../../../../css/bootstrap.min.css" type="text/css">
<link rel="stylesheet" href="../../../../../css/style.css" type="text/css" />
<link rel="stylesheet" href="../../../../../css/loadpopup.css" type="text/css" />
<link rel="stylesheet" href="../../../../../css/sweetalert.css" type="text/css">
<link rel="stylesheet" href="css/dashboard.css" type="text/css" />
<link rel="stylesheet" href="css/popup.css" type="text/css" />
</head>

<body oncopy="return false" oncut="return false" onpaste="return false" onload="JavaScript:DASHBOARD.InitPage()">
	<div class="main" id="main">

		<div class="menu-wrap">
			<nav class="navbar navbar-default navbar-fixed-top">
				<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
							<span class="icon-bar"></span> <span class="icon-bar"></span><span class="icon-bar"></span>
						</button>
						<p id="logo_epush" class="navbar-brand">E-PUSH SERVER</p>
					</div>
					<div class="collapse navbar-collapse" id="myNavbar">
						<ul class="nav navbar-nav">
							<li><a href="JavaScript:DASHBOARD.NavigateToDashboardPage ()">DashBoard</a></li>
							<li id="menugroup_admin" class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Admin<span class="caret"></span></a>
								<ul class="dropdown-menu">
									<li><a class="li" href="JavaScript:DASHBOARD.NavigateToPage('../../admin/userinfo/userinfo.jsp')">User Info</a></li>
								</ul></li>
							<li id="menugroup_master" class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Master<span class="caret"></span></a>
								<ul class="dropdown-menu">
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../master/employeeinfo/employeeinfo.jsp')">Employee Info</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../master/uploademployeeinfo/uploademployeeinfo.jsp')">Upload Employee Info</a></li>
								</ul></li>
							<li id="menugroup_devicemanagement" class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Device Management<span class="caret"></span>
							</a>
								<ul class="dropdown-menu">
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/deviceinfo/deviceinfo.jsp')">Device Info</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/devicelogs/devicelogs.jsp')">Device Log</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/devicelogsbl/devicelogsbl.jsp')">Device Log Black-List</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/devicecommands/devicecommands.jsp')">Device
											Commands</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/deviceoplogs/deviceoplogs.jsp')">Device Operation
											Log</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/deviceemployees/deviceemployees.jsp')">Device Employees
											</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/uploademployees/uploademployees.jsp')">Upload
											Employees To Devices</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/deleteemployees/deleteemployees.jsp')">Delete
											Employees From Devices</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/uploademployeesattendance/uploademployeesattendance.jsp')">Upload
											Employees Attendance</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/deviceemployeeprivilege/deviceemployeeprivilege.jsp')">Device
											Employees Privilege</a></li>
									<li><a href="JavaScript:DASHBOARD.NavigateToPage('../../devicemanagement/remoteemployeeenrollment/remoteemployeeenrollment.jsp')">Device
											Remote Employee Enrollment</a></li>

								</ul></li>
						</ul>

						<ul class="nav navbar-nav navbar-right">
							<li id="menugroup_userinfo" class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"> <span class="glyphicon glyphicon-user"></span>
									<label id="lbl_UserName"></label>
							</a>
								<div class="user-login-detail dropdown-menu">
									<h3>Last Login</h3>
									<p id="lbl_LastLoginTime"></p>
									<div class="changePassword">
										<button type="button" class="btn btn-primary cd-popup-trigger" onclick="JavaScript:DASHBOARD.ChangePassword()">Change
											Password</button>
									</div>
								</div></li>
							<li><a id="lbl_logout" href="JavaScript:DASHBOARD.Logout()"><span class="glyphicon glyphicon-log-out"></span> Log Out</a></li>

						</ul>

					</div>
				</div>

			</nav>
		</div>

		<div class="statistics">
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-6 col-md-6 col-xs-12 col-lg-3">
						<div class="employee-count">
							<span class="glyphicon glyphicon-user pull-right"></span>
							<h4>
								TOTAL <strong>EMPLOYEE</strong>
							</h4>
							<h3 id="lbl_employee_count">0</h3>
						</div>
					</div>
					<div class="col-sm-6 col-md-6 col-xs-12 col-lg-3">
						<div class="device-count">
							<span class="glyphicon glyphicon glyphicon-hdd pull-right"></span>
							<h4>
								TOTAL <strong>DEVICE</strong>
							</h4>
							<h3 id="lbl_device_count">0</h3>
						</div>
					</div>
					<div class="col-sm-6 col-md-6 col-xs-12 col-lg-3">
						<div class="log-count-month">
							<span class="glyphicon glyphicon glyphicon-th-list pull-right"></span>
							<h4>
								TOTAL <strong>LOG OF MONTH</strong>
							</h4>
							<h3 id="lbl_log_count_month">0</h3>
						</div>
					</div>
					<div class="col-sm-6 col-md-6 col-xs-12 col-lg-3">
						<div class="log-count-day">
							<span class="glyphicon glyphicon glyphicon-list-alt pull-right"></span>
							<h4>
								TOTAL <strong>LOG OF DAY</strong>
							</h4>
							<h3 id="lbl_log_count_day">0</h3>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
    <div id="div_Pages" class="load-page" align="center"></div>
	<div class="cd-popup">
		<div class="cd-popup-container">
			<div class="container-fluid">
				<div class="form-group">

					<table class="lbl-select">
						<tr>
							<th colspan="2">CHANGE PASSWORD</th>
						</tr>
						<tr>
							<td colspan="2"></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left">Old Password</p></td>
							<td><input type="password" class="form-control" id="txt_password_old" placeholder="********"></td>
						</tr>
						<tr id="lbl-select">
							<td><p align="left">New Password</p></td>
							<td><input type="password" class="form-control" id="txt_password" placeholder="********"></td>
						</tr>

						<tr id="lbl-select">
							<td><p align="left">Confirm Password</p></td>
							<td align="left"><input type="password" class="form-control" id="txt_confirm_password" placeholder="********" /></td>
						</tr>
						<tr>
							<td colspan="2" align="center"><hr>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:DASHBOARD.Btn_Password_Click ()">Submit</button>
								<button type="button" class="btn btn-primary btn-submit" onclick="JavaScript:DASHBOARD.ClosePopup()">Cancel</button></td>
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
	<script src="../../../../../js/jquery/jquery.1.11.1.min.js"></script>
	<script src="../../../../../js/bootstrap.min.js"></script>
	<script src="../../../../../js/json-utils.js"></script>
	<script src="../../../../../js/script.js"></script>
	<script src="../../../../../js/date-util.js"></script>
	<script src="../../../../../js/ds/DataStructure.js"></script>
	<script src="../../../../../js/ds/UserInfo.js"></script>
	<script src="../../../../../js/ds/StatisticsInfo.js"></script>
	<script src="../../../../../js/sweetalert.min.js"></script>
	<script src="js/msg.js"></script>
	<script src="js/dashboard.js"></script>
	<script src="js/popup.js"></script>
	<script>
		$('.navbar-collapse .dropdown-menu').click(function()
		{
			$(".navbar-collapse").collapse('hide');
		});
	</script>
</body>

</html>