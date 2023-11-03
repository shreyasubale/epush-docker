ADMIN =
{
	// region "Module Ids"
	MI_ADMINUI : 10,
	// endregion

	// region "DB Function Ids"
	MFI_ADMINUI_InitModule : 10001,
	MFI_ADMINUI_DBConfiguration : 10002,
	// endregion

	// region "XML Node names"
	XMLTAG_CAdminInit : "CAdminInit",
	XMLTAG_CAdminDBConfig : "CAdminDBConfig",

	// message
	MSG : new MSG_ADMIN (),

	Btn_DBType_Changed : function ()
	{
        document.getElementById ('txt_servicename').style.display = "none";

		var nDBTypeId = document.getElementById ('cmb_dbtype').value;
	    if (nDBTypeId == 3)
	    {
	        document.getElementById ('txt_servicename').style.display = "block";
	    }
	},

	Btn_Submit_Click : function(event)
	{
		if (this.Validate_Admin_Click ())
		{
			ProcessServerRequest_DBConfig ("&DBConfig=1", this.RestRequestInfo (this.MFI_ADMINUI_DBConfiguration), ADMIN.Process_Submit_Click, false);
		}
	},

	Process_Submit_Click : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, ADMIN.MSG))
		{
            ;;/alert ("Process_Submit_Click>>>" + responseText)
        }
	},

	Validate_Admin_Click : function(event)
	{
        var bValid = false;
        var strDBType = document.getElementById ("cmb_dbtype").value + "";
        var strHostAddress = document.getElementById ("txt_hostaddress").value + "";
        var strPort = document.getElementById ("txt_port").value + "";
        var strUserName = document.getElementById ("txt_username").value + "";
        var strPassword = document.getElementById ("txt_password").value + "";
        var strServiceName = document.getElementById ("txt_servicename").value + "";
        var strConfigPassword = document.getElementById ("txt_configpassword").value + "";

        if (parseInt (strDBType.trim ()) == 0)
        {
            sweetAlert (this.MSG.CM_001);
            document.getElementById ("cmb_dbtype").value = 0;
            document.getElementById ("cmb_dbtype").focus ();
        }
        else if (strHostAddress.trim () == "")
        {
            sweetAlert (this.MSG.CM_002);
            document.getElementById ("txt_hostaddress").value = "";
            document.getElementById ("txt_hostaddress").focus ();
        }
        else if (strPort.trim () == "")
        {
            sweetAlert (this.MSG.CM_003);
            document.getElementById ("txt_port").value = "";
            document.getElementById ("txt_port").focus ();
        }
        else if (NUMBERUtil.ValidateNumbers (strPort.trim ()) == false)
        {
            sweetAlert (this.MSG.CM_003);
            document.getElementById ("txt_port").value = "";
            document.getElementById ("txt_port").focus ();
        }
        else if (strUserName.trim () == "")
        {
            sweetAlert (this.MSG.CM_004);
            document.getElementById ("txt_username").value = "";
            document.getElementById ("txt_username").focus ();
        }
        else if (strPassword.trim () == "")
        {
            sweetAlert (this.MSG.CM_005);
            document.getElementById ("txt_password").value = "";
            document.getElementById ("txt_password").focus ();
        }
        else if (parseInt (strDBType.trim ()) == 3 && strServiceName.trim () == "")
        {
            sweetAlert (this.MSG.CM_006);
            document.getElementById ("txt_servicename").value = "";
            document.getElementById ("txt_servicename").focus ();
        }
        else if (strConfigPassword.trim () == "")
        {
            sweetAlert (this.MSG.CM_007);
            document.getElementById ("txt_configpassword").value = "";
            document.getElementById ("txt_configpassword").focus ();
        }
        else
            bValid = true;

        return bValid;
	},

    RestRequestInfo : function (dDBProcessId)
    {
        var oRest = UserInfoRest(-1, '', -1) + "," + ProcessInfoRest (this.MI_ADMINUI, dDBProcessId);
        oRest += ", \"" + CProcessDBData + "\" : [{\"" + DATA + "\" : [";

        var oRestData = "";
        if (dDBProcessId == this.MFI_ADMINUI_DBConfiguration)
        {
            oRestData += document.getElementById ('cmb_dbtype').value + DATA_SEPERATOR;
            oRestData += document.getElementById ('txt_hostaddress').value + DATA_SEPERATOR;
            oRestData += document.getElementById ('txt_port').value + DATA_SEPERATOR;
            oRestData += document.getElementById ('txt_username').value + DATA_SEPERATOR;
            oRestData += document.getElementById ('txt_password').value + DATA_SEPERATOR;
            oRestData += document.getElementById ('txt_servicename').value + DATA_SEPERATOR;
            oRestData += document.getElementById ('txt_configpassword').value
            oRestData = "{ \"" + this.XMLTAG_CAdminDBConfig + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";
        }
        oRest = oRest + oRestData + "]}]";
        oRest = "{ " + oRest + "}";
        return oRest;
    }
};
