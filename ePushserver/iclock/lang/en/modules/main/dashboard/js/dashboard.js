DASHBOARD =
{
	// region "Module Ids"
	MI_DASHBOARDUI : 12,

	// endregion

	// region "DB Function Ids"
	MFI_DASHBOARDUI_InitModule : 12001,
	MFI_DASHBOARDUI_Logout : 12002,
	MFI_DASHBOARDUI_Change_Password : 12003,
	MFI_DASHBOARDUI_Statistics_Info  : 12011,
	// endregion

	// region "Module DB Error Ids"

	// end region

	// region "XML Node names"
	XMLTAG_CDashboardInit : "CDashboardInit",
	XMLTAG_CLogout : "CLogout",
	XMLTAG_CChangePassword : "CChangePassword",

	XMLTAG_SUserInfo : "SUserInfo",
	XMLTAG_SEmployeeInfo : "SEmployeeInfo",
	XMLTAG_SStatisticsInfo : "SStatisticsInfo",

	// end region

	// message
	MSG : new MSG_DASHBOARD (),
	USERINFO : new DS_UserInfo (),
	STATSINFO : new DS_StatisticsInfo (),
	UserId : -1,
	IsAdmin : 0,
	TIMER : undefined,
	REFRESH_MILLISECONDS : 5000,
	AutoLoginEnabled : false,

	SetUserId : function ()
	{
        var strValue = GetRequestQueryParameter ("UserId") + "";
        if (strValue.localeCompare ('undefined') != 0)
        //if (strValue != 'undefined' && strValue != '')
        {
            this.UserId = strValue;
        }
        strValue = GetRequestQueryParameter ("PageId") + "";
        if (strValue.localeCompare ('undefined') != 0)
        //if (strValue != 'undefined' && strValue != '')
        {
            if (parseInt (strValue) == 1)
            {
                DASHBOARD.NavigateToDashboardPage ();
            }
        }

        strValue = GetRequestQueryParameter ("AutoLogin") + "";
        if (strValue.localeCompare ('undefined') != 0)
        //if (strValue != 'undefined' && strValue != '')
        {
            if (parseInt (strValue) == 1)
            {
                DASHBOARD.AutoLoginEnabled = true;

                document.getElementById('logo_epush').style.display = "none";
                document.getElementById('menugroup_admin').style.display = "none";
                document.getElementById('menugroup_master').style.display = "none";
                document.getElementById('menugroup_userinfo').style.display = "none";
                document.getElementById('lbl_logout').style.display = "none";
            }
            else
            {
                DASHBOARD.AutoLoginEnabled = false;
                document.getElementById('logo_epush').style.display = "block";
                document.getElementById('menugroup_admin').style.display = "block";
                document.getElementById('menugroup_master').style.display = "block";
                document.getElementById('menugroup_userinfo').style.display = "block";
                document.getElementById('lbl_logout').style.display = "block";
            }
        }
	},

	SetIsAdmin : function(nIsAdmin)
	{
        this.IsAdmin = nIsAdmin;
	},

	InitPage : function ()
	{
		this.SetUserId ();
		if (this.UserId > 0)
		{
			ProcessServerRequest (this.RestRequestInfo (this.MFI_DASHBOARDUI_InitModule), DASHBOARD.Process_Init, false);
		}
	},

	ClosePage : function ()
	{
		this.UserId = 0;
		DASHBOARD.StopTimer ();
	},

	ClosePopup : function(type)
	{
		$('.cd-popup').removeClass('is-visible');
	},

	Process_Init : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DASHBOARD.MSG))
		{
			try
			{
				var obj = JSON.parse (responseText);
				DASHBOARD.Process_Init_UserInfo (obj);
				//DASHBOARD.Process_Init_StatisticsInfo (obj);
				DASHBOARD.StartTimer ();
			}
			catch (e)
			{
				alert (e);
			}
		}
	},

	Process_Init_UserInfo : function (obj)
	{
		var oInfoObj = JSONUtil.GetJSONValues (obj, DASHBOARD.XMLTAG_SUserInfo, '');
		if (oInfoObj != 'undefined' && oInfoObj != null && oInfoObj.length > 0)
		{
			var oInfo = new DS_UserInfo ();
			var oObj = oInfoObj [0];
			var strDataText = JSONUtil.GetJSONValues (oObj, 'data');
			oInfo.InitDataStructure (strDataText);
			var nUserId = parseInt (oInfo.GetUserId ());
			document.getElementById ("lbl_UserName").innerHTML = oInfo.GetUserName ();
			var str = oInfo.GetLastLoginDate ();
			document.getElementById ("lbl_LastLoginTime").innerHTML = oInfo.GetLastLoginDate ();
			this.SetIsAdmin (oInfo.GetUserTypeId ());
		}
	},

	Process_Init_StatisticsInfo : function (obj)
	{
		var oInfoObj = JSONUtil.GetJSONValues (obj, DASHBOARD.XMLTAG_SStatisticsInfo, '');
		if (oInfoObj != 'undefined' && oInfoObj != null && oInfoObj.length > 0)
		{
			var oInfo = new DS_StatisticsInfo ();

			var oObj = oInfoObj [0];
			var strDataText = JSONUtil.GetJSONValues (oObj, 'data');
			oInfo.InitDataStructure (strDataText);
			document.getElementById ("lbl_employee_count").innerHTML = oInfo.GetEmployeeCount ();
			document.getElementById ("lbl_device_count").innerHTML = oInfo.GetDeviceCount ();

			var strMonth = oInfo.GetLogCount_Month ();
			if (oInfo.GetLogCount_Month_Not_Processed () > 0)
				strMonth = strMonth  + "/" + DASHBOARD.MSG.CM_005

			document.getElementById ("lbl_log_count_month").innerHTML = strMonth;
			document.getElementById ("lbl_log_count_day").innerHTML = oInfo.GetLogCount_Day ();
		}
	},

    StartTimer : function ()
    {
        DASHBOARD.StopTimer ();
        DASHBOARD.TIMER = setInterval (DASHBOARD.StartTimerEvent, DASHBOARD.REFRESH_MILLISECONDS);
    },

    StopTimer : function ()
    {
        if (DASHBOARD.TIMER != 'undefined')
            clearInterval (DASHBOARD.TIMER);
    },

    StartTimerEvent : function ()
    {
        DASHBOARD.StopTimer ();
        ProcessServerRequest (DASHBOARD.RestRequestInfo (DASHBOARD.MFI_DASHBOARDUI_Statistics_Info), DASHBOARD.Process_StartTimerEvent, false);
    },

	Process_StartTimerEvent : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DASHBOARD.MSG))
		{
			try
			{
				var obj = JSON.parse (responseText);
				DASHBOARD.Process_Init_StatisticsInfo (obj);
				DASHBOARD.StartTimer ();
			}
			catch (e)
			{
				alert (e);
			}
		}
	},

	Logout : function ()
	{
		if (this.UserId > 0)
		{
			ProcessServerRequest (DASHBOARD.RestRequestInfo (DASHBOARD.MFI_DASHBOARDUI_Logout), DASHBOARD.Process_Logout);
		}
	},

	Process_Logout : function ()
	{
		var responseText = this.responseText;
		DASHBOARD.UserId = 0;
		Logout ();
	},

	NavigateToDashboardPage : function ()
	{
	    var strPage = "../../devicemanagement/devicelogs/devicelogs.jsp";

		strPage = strPage + "?UserId=" + this.UserId + "&PageId=1";
        var nHeight = GetFormPageHeight ();
        document.getElementById ("div_Pages").innerHTML = "<object  width=\'100%\' height=\'"+nHeight+"\' type=\'text/html\' data=\'" + strPage + "\' ></object>";
	},

	NavigateToPage : function (strPage)
	{
        strPage = strPage + "?UserId=" + this.UserId + "&IsAdmin="+ this.IsAdmin;

        var nHeight = GetFormPageHeight ();
        document.getElementById ("div_Pages").innerHTML = "<object  width=\'100%\' height=\'"+nHeight+"\' type=\'text/html\' data=\'" + strPage + "\' ></object>";
	},

	Btn_Password_Click : function (event)
	{
		if (this.Validate_Password_Click ())
		{
			ProcessServerRequest (this.RestRequestInfo (this.MFI_DASHBOARDUI_Change_Password), DASHBOARD.Process_ChangePassword);
		}
	},

	Process_ChangePassword : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DASHBOARD.MSG) == false)
			DASHBOARD.Process_Logout ();
	},

	Close_ChangePassword_Popup : function (strVisibility)
	{
		$ ('.cd-popup').removeClass (strVisibility);
	},

	Validate_Password_Click : function (event)
	{
		var bValid = false;
		var str_OldPassword = document.getElementById ('txt_password_old').value;
		var strPassword = document.getElementById ('txt_password').value;
		var strConfirmPassword = document.getElementById ('txt_confirm_password').value;
		if (str_OldPassword == "")
		{
			sweetAlert (this.MSG.CM_001);
		}
		else if (strPassword == "")
		{
			sweetAlert (this.MSG.CM_002);
		}
		else if (strConfirmPassword == "")
		{
			sweetAlert (this.MSG.CM_003);
		}
		else if (strConfirmPassword != strPassword)
		{
			sweetAlert (this.MSG.CM_004);
		}
		else
		{
			bValid = true;
		}
		return bValid;
	},

	RestRequestInfo : function (dDBProcessId)
	{
		var oRest = UserInfoRest (-1, '', this.UserId) + "," + ProcessInfoRest (this.MI_DASHBOARDUI, dDBProcessId);
		oRest += ", \""+ CProcessDBData +"\" : [{\"" + DATA + "\" : [";

		var oRestData = "";
		if (dDBProcessId == this.MFI_DASHBOARDUI_InitModule)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CDashboardInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";
		}
		else if (dDBProcessId == this.MFI_DASHBOARDUI_Statistics_Info)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CDashboardInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";
		}
		else if (dDBProcessId == this.MFI_DASHBOARDUI_Logout)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CLogout + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";
		}
		else if (dDBProcessId == this.MFI_DASHBOARDUI_Change_Password)
		{
			oRestData = this.UserId + DATA_SEPERATOR;
			oRestData += document.getElementById ('txt_password_old').value + DATA_SEPERATOR;
			oRestData += document.getElementById ('txt_password').value;
			oRestData = "{\"" + this.XMLTAG_CChangePassword + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";
		}
		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	}
};
