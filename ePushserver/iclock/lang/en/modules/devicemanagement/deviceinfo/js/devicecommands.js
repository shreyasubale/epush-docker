DEVICECOMMANDS =
{
    DC_00001 : 1,//"ResetDeviceError",
    DC_00002 : 2,//"ResetTransactionStamp",
    DC_00003 : 3,//"ResetOPStamp",
    DC_00004 : 4,//"ClearLogFromDevice",
    DC_00005 : 5,//"SetDeviceCardKey",
    DC_00006 : 6,//"SetDeviceSubnetMask",
    DC_00007 : 7,//"SetDeviceGateway",
    DC_00008 : 8,//"SetDeviceIPAddress",
    DC_00009 : 9,//"ResetPhotoStamp",
    DC_99999 : 99999,//"RestartDevice",

    FH_5 : "Change Device CardKey",
    FT_5 : "CardKey",

    FH_6 : "Change Device Subnet Mask",
    FT_6 : "Subnet Mask",

    FH_7 : "Change Device Gateway",
    FT_7 : "Default Gateway",

    FH_8 : "Change Device IP-Address",
    FT_8 : "IP Address",

    SubmitDeviceCommands : function (nDeviceCommandId, nDeviceId, strSerialNumber, strDeviceCommandInfo)
    {
        ProcessServerRequest (this.RestRequestInfo (DEVICEINFO.MFI_DEVICEINFOUI_Insert_DeviceCommands, nDeviceCommandId, nDeviceId, strSerialNumber, strDeviceCommandInfo), DEVICECOMMANDS.Process_DeviceCommands);
    },

    Process_DeviceCommands : function ()
	{
        var enddate = new Date ();
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICEINFO.MSG))
		{
			try
			{
                DEVICECOMMANDS.ClosePopup ();
			}
			catch (e)
			{
				alert (e);
			}
		}
	},

    ChangeResetDeviceError : function ()
    {
        var rowId =$("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            var nDeviceCommandId = DEVICECOMMANDS.DC_00001;
            var nDeviceId = rowData['lbl_DeviceId'];
            var strSerialNumber = rowData['lbl_SerialNo'];
            var strDeviceCommandInfo = " ";
            DEVICECOMMANDS.SubmitDeviceCommands (nDeviceCommandId, nDeviceId, strSerialNumber, strDeviceCommandInfo);
        }
    },

    ChangeResetTransactionStamp : function ()
    {
        var rowId =$("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            var nDeviceCommandId = DEVICECOMMANDS.DC_00002;
            var nDeviceId = rowData['lbl_DeviceId'];
            var strSerialNumber = rowData['lbl_SerialNo'];
            var strDeviceCommandInfo = " ";
            DEVICECOMMANDS.SubmitDeviceCommands (nDeviceCommandId, nDeviceId, strSerialNumber, strDeviceCommandInfo);
        }
    },

    ChangeResetOPStamp : function ()
    {
        var rowId =$("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            var nDeviceCommandId = DEVICECOMMANDS.DC_00003;
            var nDeviceId = rowData['lbl_DeviceId'];
            var strSerialNumber = rowData['lbl_SerialNo'];
            var strDeviceCommandInfo = " ";
            DEVICECOMMANDS.SubmitDeviceCommands (nDeviceCommandId, nDeviceId, strSerialNumber, strDeviceCommandInfo);
        }
    },

    ChangeResetPhotoStamp : function ()
    {
        var rowId =$("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            var nDeviceCommandId = DEVICECOMMANDS.DC_00009;
            var nDeviceId = rowData['lbl_DeviceId'];
            var strSerialNumber = rowData['lbl_SerialNo'];
            var strDeviceCommandInfo = " ";
            DEVICECOMMANDS.SubmitDeviceCommands (nDeviceCommandId, nDeviceId, strSerialNumber, strDeviceCommandInfo);
        }
    },

    ChangeClearLogFromDevice : function ()
    {
        var rowId =$("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            var nDeviceCommandId = DEVICECOMMANDS.DC_00004;
            var nDeviceId = rowData['lbl_DeviceId'];
            var strSerialNumber = rowData['lbl_SerialNo'];
            var strDeviceCommandInfo = " ";
            DEVICECOMMANDS.SubmitDeviceCommands (nDeviceCommandId, nDeviceId, strSerialNumber, strDeviceCommandInfo);
        }
    },

    ChangeDeviceCardKey : function ()
    {
        var rowId =$("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            document.getElementById ("dc_popup_header").innerHTML = this.FH_5;
            document.getElementById ("dc_command_title").innerHTML = this.FT_5;

            document.getElementById ("txt_ip_1").value  = "255";
            document.getElementById ("txt_ip_2").value  = "255";
            document.getElementById ("txt_ip_3").value  = "255";
            document.getElementById ("txt_ip_4").value  = "0";
            document.getElementById ("txt_ip_5").value  = "0";
            document.getElementById ("txt_ip_6").value  = "0";

            document.getElementById ("lbl_ip_4").style.display = "block";
            document.getElementById ("txt_ip_5").style.display = "block";
            document.getElementById ("lbl_ip_5").style.display = "block";
            document.getElementById ("txt_ip_6").style.display = "block";

            DEVICECOMMANDS.OpenPopup ();
        }
    },

    ChangeDeviceSubnetMask : function ()
    {
        var rowId =$("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            document.getElementById ("dc_popup_header").innerHTML = this.FH_6;
            document.getElementById ("dc_command_title").innerHTML = this.FT_6;

            document.getElementById ("txt_ip_1").value  = "255";
            document.getElementById ("txt_ip_2").value  = "255";
            document.getElementById ("txt_ip_3").value  = "255";
            document.getElementById ("txt_ip_4").value  = "0";

            document.getElementById ("lbl_ip_4").style.display = "none";
            document.getElementById ("txt_ip_5").style.display = "none";
            document.getElementById ("lbl_ip_5").style.display = "none";
            document.getElementById ("txt_ip_6").style.display = "none";
            DEVICECOMMANDS.OpenPopup ();
        }
    },

    ChangeDeviceGateway : function ()
    {
        var rowId =$("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            document.getElementById ("dc_popup_header").innerHTML = this.FH_7;
            document.getElementById ("dc_command_title").innerHTML = this.FT_7;

            document.getElementById ("txt_ip_1").value  = "192";
            document.getElementById ("txt_ip_2").value  = "168";
            document.getElementById ("txt_ip_3").value  = "1";
            document.getElementById ("txt_ip_4").value  = "1";

            document.getElementById ("lbl_ip_4").style.display = "none";
            document.getElementById ("txt_ip_5").style.display = "none";
            document.getElementById ("lbl_ip_5").style.display = "none";
            document.getElementById ("txt_ip_6").style.display = "none";
            DEVICECOMMANDS.OpenPopup ();
        }
    },

    ChangeDeviceIPAddress : function ()
    {
        var rowId =$("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            document.getElementById ("dc_popup_header").innerHTML = this.FH_8;
            document.getElementById ("dc_command_title").innerHTML = this.FT_8;

            var strIpAddress = rowData['lbl_IPAddress'];
            var arrIpAddress = strIpAddress.split (".");
            if (arrIpAddress && arrIpAddress.length > 3)
            {
                document.getElementById ("txt_ip_1").value  = arrIpAddress [0];
                document.getElementById ("txt_ip_2").value  = arrIpAddress [1];
                document.getElementById ("txt_ip_3").value  = arrIpAddress [2];
                document.getElementById ("txt_ip_4").value  = arrIpAddress [3];

                document.getElementById ("lbl_ip_4").style.display = "none";
                document.getElementById ("txt_ip_5").style.display = "none";
                document.getElementById ("lbl_ip_5").style.display = "none";
                document.getElementById ("txt_ip_6").style.display = "none";
            }
            DEVICECOMMANDS.OpenPopup ();
        }
    },

    RestartDevice : function ()
    {
        var rowId =$("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            var nDeviceCommandId = DEVICECOMMANDS.DC_99999;
            var nDeviceId = rowData['lbl_DeviceId'];
            var strSerialNumber = rowData['lbl_SerialNo'];
            var strDeviceCommandInfo = " ";
            DEVICECOMMANDS.SubmitDeviceCommands (nDeviceCommandId, nDeviceId, strSerialNumber, strDeviceCommandInfo);
        }
    },

    OpenPopup : function()
	{
        $('.popup_device_commands').addClass('is-visible');
	},

	ClosePopup : function()
	{
        $('.popup_device_commands').removeClass('is-visible');
	},

	SubmitPopup : function()
	{
        var rowId = $("#list").jqGrid('getGridParam','selrow');
        var rowData = jQuery("#list").getRowData(rowId);
        if (rowData)
        {
            var nDeviceId = rowData['lbl_DeviceId'];
            var strSerialNumber = rowData['lbl_SerialNo'];

            var strFormName = document.getElementById ("dc_command_title").innerHTML;
            var oElementIP01 = document.getElementById ("txt_ip_1");
            var oElementIP02 = document.getElementById ("txt_ip_2");
            var oElementIP03 = document.getElementById ("txt_ip_3");
            var oElementIP04 = document.getElementById ("txt_ip_4");
            var oElementIP05 = document.getElementById ("txt_ip_5");
            var oElementIP06 = document.getElementById ("txt_ip_6");

            var nDeviceCommandId = "";
            var strDeviceCommandInfo = "";
            var bValid = false;
            if (strFormName == this.FT_5 && this.ValidateIPAddress (oElementIP01, oElementIP02, oElementIP03, oElementIP04, oElementIP05, oElementIP06, true))
            {
                nDeviceCommandId = DEVICECOMMANDS.DC_00005;
                strDeviceCommandInfo = parseInt (oElementIP01.value) + "." + parseInt (oElementIP02.value) + "." + parseInt (oElementIP03.value) + "." + parseInt (oElementIP04.value)+ "." + parseInt (oElementIP05.value)+ "." + parseInt (oElementIP06.value);
                bValid = true;
            }
            else if (strFormName == this.FT_6 && this.ValidateIPAddress (oElementIP01, oElementIP02, oElementIP03, oElementIP04, oElementIP05, oElementIP06, false))
            {
                nDeviceCommandId = DEVICECOMMANDS.DC_00006;
                strDeviceCommandInfo = parseInt (oElementIP01.value) + "." + parseInt (oElementIP02.value) + "." + parseInt (oElementIP03.value) + "." + parseInt (oElementIP04.value);
                bValid = true;
            }
            else if (strFormName == this.FT_7 && this.ValidateIPAddress (oElementIP01, oElementIP02, oElementIP03, oElementIP04, oElementIP05, oElementIP06, false))
            {
                nDeviceCommandId = DEVICECOMMANDS.DC_00007;
                strDeviceCommandInfo = parseInt (oElementIP01.value) + "." + parseInt (oElementIP02.value) + "." + parseInt (oElementIP03.value) + "." + parseInt (oElementIP04.value);
                bValid = true;
            }
            else if (strFormName == this.FT_8 && this.ValidateIPAddress (oElementIP01, oElementIP02, oElementIP03, oElementIP04, oElementIP05, oElementIP06, false))
            {
                nDeviceCommandId = DEVICECOMMANDS.DC_00008;
                strDeviceCommandInfo = parseInt (oElementIP01.value) + "." + parseInt (oElementIP02.value) + "." + parseInt (oElementIP03.value) + "." + parseInt (oElementIP04.value);
                bValid = true;
            }

            if (bValid == true)
                DEVICECOMMANDS.SubmitDeviceCommands (nDeviceCommandId, nDeviceId, strSerialNumber, strDeviceCommandInfo);
        }
	},

    ValidateIPAddress : function(oElementIP01, oElementIP02, oElementIP03, oElementIP04, oElementIP05, oElementIP06, bCheckLast2Elements)
    {
        var bValid = false;

        if (NUMBERUtil.ValidateIPNumbers (oElementIP01.value) == false)
        {
            sweetAlert (DEVICEINFO.MSG.CM_301001)
            oElementIP01.focus();
        }
        else if (NUMBERUtil.ValidateIPNumbers (oElementIP02.value) == false)
        {
            sweetAlert (DEVICEINFO.MSG.CM_301001)
            oElementIP02.focus();
        }
        else if (NUMBERUtil.ValidateIPNumbers (oElementIP03.value) == false)
        {
            sweetAlert (DEVICEINFO.MSG.CM_301001)
            oElementIP03.focus();
        }
        else if (NUMBERUtil.ValidateIPNumbers (oElementIP04.value) == false)
        {
            sweetAlert (DEVICEINFO.MSG.CM_301001)
            oElementIP04.focus();
        }
        else if (bCheckLast2Elements == true && NUMBERUtil.ValidateIPNumbers (oElementIP05.value) == false)
        {
            sweetAlert (DEVICEINFO.MSG.CM_301001)
            oElementIP05.focus();
        }
        else if (bCheckLast2Elements == true && NUMBERUtil.ValidateIPNumbers (oElementIP06.value) == false)
        {
            sweetAlert (DEVICEINFO.MSG.CM_301001)
            oElementIP06.focus();
        }
        else
        {
            bValid = true;
        }
        return bValid;
    },

	RestRequestInfo : function (dDBProcessId, nDeviceCommandId, nDeviceId, strSerialNumber, strDeviceCommandInfo)
	{
		var oRest = UserInfoRest (-1, '', DEVICEINFO.UserId) + "," + ProcessInfoRest (DEVICEINFO.MI_DEVICEINFODUI, dDBProcessId);
		oRest += ", \""+ CProcessDBData +"\" : [{\"" + DATA + "\" : [";

		var oRestData = "";
		if (dDBProcessId == DEVICEINFO.MFI_DEVICEINFOUI_Insert_DeviceCommands)
		{
			oRestData = DEVICEINFO.UserId;
			oRestData = "{ \"" + DEVICEINFO.XMLTAG_CDeviceInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";

			var oDeviceRestData = DEVICEINFO.UserId + DATA_SEPERATOR;
			oDeviceRestData += nDeviceCommandId + DATA_SEPERATOR;
			oDeviceRestData += nDeviceId + DATA_SEPERATOR;
			oDeviceRestData += strSerialNumber + DATA_SEPERATOR;
			oDeviceRestData += strDeviceCommandInfo;
			oDeviceRestData = "{ \"" + DEVICEINFO.XMLTAG_CDeviceInfoInsertDeviceCommands + "\" : [{ \"" + DATA + "\" : \"" + oDeviceRestData + "\" } ]}";

			oRestData = oDeviceRestData + ", " + oRestData;
		}
		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	}
};
