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
<link rel="stylesheet" href="css/login.css" type="text/css" />

</head>

<body id="body_login" oncopy="return false" oncut="return false" onpaste="return false" onload="JavaScript:LOGIN.InitPage()">
	<div id="container_login">
        <div class="container">
            <div id="login-form" class="login-form">
                <form role="form" action="JavaScript:LOGIN.Btn_Login_Click ()">
                    <div class="form-group">
                        <input type="text" class="form-control" id="txt_login" placeholder="User Name"> <input type="password" class="form-control"
                            id="txt_password" placeholder="Password" />
                    </div>

                    <div class="clear"></div>
                    <input type="submit" class="btn btn-default btn-md" value="Login">
                    <div class="clear"></div>
                </form>
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
    </div>
    <!-- Script -->
    <script src="../../../../../js/jquery/jquery.1.11.1.min.js"></script>
    <script src="../../../../../js/bootstrap.min.js"></script>
    <script src="../../../../../js/json-utils.js"></script>
    <script src="../../../../../js/script.js"></script>
    <script src="../../../../../js/ds/DataStructure.js"></script>
    <script src="../../../../../js/ds/UserInfo.js"></script>
    <script src="../../../../../js/sweetalert.min.js"></script>
    <script src="js/msg.js"></script>
    <script src="js/login.js"></script>

    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

</body>
</html>