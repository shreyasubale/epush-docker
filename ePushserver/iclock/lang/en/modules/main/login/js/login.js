LOGIN =
{
	// region "Module Ids"
	MI_LOGINUI : 11,

	// endregion

	// region "DB Function Ids"
	MFI_LOGINUI_InitModule : 11001,
	MFI_LOGINUI_Login : 11002,

	// endregion

	// region "Module DB Error Ids"
	DBEI_InCorrect_UserName_Password : 11001,

	// endregion
    UserName : "",
	Password : "",
	AutoLoginEnabled : false,

	// region "XML Node names"
	XMLTAG_CLoginInit : "CLoginInit",
	XMLTAG_CLoginInfo : "CLoginInfo",

	XMLTAG_SLanguageList : "SLanguageList",
	XMLTAG_SUserInfo : "SUserInfo",
	// endregion

	// message
	MSG : new MSG_LOGIN(),

    SetUserId : function ()
    {
        var strValue = GetRequestQueryParameter ("UserName") + "";
        if (strValue.localeCompare ('undefined') != 0)
        {
            this.UserName = strValue;
            this.AutoLoginEnabled = true;
            document.getElementById('txt_login').value = this.UserName;
        }
        else
        {
            this.AutoLoginEnabled = false;
        }
        strValue = GetRequestQueryParameter ("Password") + "";
        if (strValue.localeCompare ('undefined') != 0)
        {
            this.Password = strValue;
            this.AutoLoginEnabled = true;
            document.getElementById('txt_password').value = this.Password;
        }
        else
        {
            this.AutoLoginEnabled = false;
        }
    },

    InitPage : function ()
	{
		this.SetUserId ();
		if (this.AutoLoginEnabled)
		{
		    this.Btn_Login_Click ();
        }
        else
        {
            document.getElementById('container_login').style.display = "block";
            document.getElementById('login-form').style.display = "block";
        }
	},

	Btn_Login_Click : function(event)
	{
		if (this.Validate_Login_Click ())
		{
			ProcessServerRequest(this.RestRequestInfo(this.MFI_LOGINUI_Login), LOGIN.Process_LoginClick, false);
		}
	},

	Process_LoginClick : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, LOGIN.MSG))
		{
			try
			{
				var obj = JSON.parse(responseText);
				var oUserInfoObj = JSONUtil.GetJSONValues(obj, LOGIN.XMLTAG_SUserInfo, '');
				if (oUserInfoObj != 'undefined' && oUserInfoObj != null && oUserInfoObj.length > 0)
				{
					var oUserInfo = new DS_UserInfo();

					oUserInfo.InitDataStructure(JSONUtil.GetJSONValues( oUserInfoObj[0], 'data'));
					var nUserId = parseInt(oUserInfo.GetUserId());
					if (nUserId > 0)
					{
					    if (LOGIN.AutoLoginEnabled)
						    ProcessNavigate("../dashboard/dashboard.jsp?UserId="+ nUserId + "&PageId=1&AutoLogin=1");
                        else
						    ProcessNavigate("../dashboard/dashboard.jsp?UserId="+ nUserId + "&PageId=1&AutoLogin=0");
                    }
				}
			}
			catch (e)
			{
				alert(e);
			}
		}
	},

	Validate_Login_Click : function(event)
	{
		var bValid = false;
		var name = document.getElementById('txt_login').value;
		var password = document.getElementById('txt_password').value;
		if (name == "")
		{
			sweetAlert(this.MSG.CM_001);
		}
		else if (password == "")
		{
			sweetAlert(this.MSG.CM_002);
		}
		else
		{
			bValid = true;
		}
		return bValid;
	},

	RestRequestInfo : function(dDBProcessId)
	{
		var oRest = UserInfoRest(-1, '', -1) + ","
				+ ProcessInfoRest(this.MI_LOGINUI, dDBProcessId);
		oRest += ", \"" + CProcessDBData + "\" : [{\"" + DATA + "\" : [";

		var name = document.getElementById('txt_login').value;
		var password = document.getElementById('txt_password').value;

		var oRestData = "";
		if (dDBProcessId == this.MFI_LOGINUI_Login)
		{
			oRestData = -1 + DATA_SEPERATOR;
			oRestData += name + DATA_SEPERATOR;
			oRestData += password;
			oRestData = "{ \"" + this.XMLTAG_CLoginInfo + "\" : [{ \"" + DATA
					+ "\" : \"" + oRestData + "\" } ]}";
		}
		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	}
};
