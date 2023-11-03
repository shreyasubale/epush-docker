<!DOCTYPE html>
<html>
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

<!-- Style Sheets -->
<link rel="stylesheet" href="../../../../../css/bootstrap.min.css" type="text/css">
<link rel="stylesheet" href="../../../../../css/style.css" type="text/css" />
<link rel="stylesheet" href="../../../../../css/loadpopup.css" type="text/css" />
<link rel="stylesheet" href="../../../../../css/sweetalert.css" type="text/css">
<link rel="stylesheet" href="css/admin.css" type="text/css" />

</head>

<body>
	<div class="container">
		<div class="admin-form">
            <div class="form-group">
            <p class="admin-header">Database Configuration</p>

            <select id="cmb_dbtype" class="form-control input-sm input-small" onclick="JavaScript:ADMIN.Btn_DBType_Changed ()">
                <option value="0" selected >Select Database</option>
                <option value="1">MS-SQL</option>
                <option value="2">MY-SQL</option>
                <option value="3">Oracle</option>
            </select>

            <input class="form-control" type="text" id="txt_hostaddress" value="" placeholder="Host Name" />


            <input class="form-control" type="text" id="txt_port" value=""  placeholder="Port Number"  maxlength="6">

            <input class="form-control" type="text" id="txt_username" value="" placeholder="User Name" maxlength="15">

            <input class="form-control" type="password" id="txt_password" value="" placeholder="Password"  maxlength="15"></input>

            <input class="form-control" style="display:none;" type="text" id="txt_servicename" value="" placeholder="Service Name"  maxlength="15"></input>

            <input class="form-control" type="password" id="txt_configpassword" value="" placeholder="Configuration Password"  maxlength="15"></input>

            <button type="button" class="btn btn-info btn-submit" onclick="JavaScript:ADMIN.Btn_Submit_Click ()">Submit</button>

            </div>
        </div>
	</div>

    <!-- Script -->
    <script src="../../../../../js/jquery/jquery.1.11.1.min.js"></script>
    <script src="../../../../../js/bootstrap.min.js"></script>
    <script src="../../../../../js/json-utils.js"></script>
    <script src="../../../../../js/number-util.js"></script>
    <script src="../../../../../js/script.js"></script>
    <script src="../../../../../js/sweetalert.min.js"></script>
    <script src="js/msg.js"></script>
    <script src="js/admin.js"></script>

    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

</body>
</html>