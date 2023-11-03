UPLOADEMPLOYEESATTENDANCE =
{
	// region "Module Ids"
	MI_UPLOADEMPLOYEESATTENDANCEUI : 353,

	// endregion

	// region "DB Function Ids"
	MFI_UPLOADEMPLOYEESATTENDANCEUI_InitModule : 353001,
	MFI_UPLOADEMPLOYEESATTENDANCEUI_Upload : 353012,
	// endregion

	// region "Module DB Error Ids"

	// end region

	// region "XML Node names"
	XMLTAG_CUploadEmployeesAttendanceInit : "CUploadEmployeesAttendanceInit",
    XMLTAG_CUploadEmployeesAttendanceUpload : "CUploadEmployeesAttendanceUpload",

	XMLTAG_SDeviceInfoList : "SDeviceInfoList",
	// end region

	// message
	MSG : new MSG_UPLOADEMPLOYEESATTENDANCE(),
	UserId : -1,
	IsAdmin : 0,
	NewFileContent : "",
	NewFileData : "",

	SetUserId : function()
	{
	    if (IsValidParentPage ())
	    {
            var strValue = GetRequestQueryParameter ("UserId");
            if (strValue != 'undefined' && strValue != '')
            {
                this.UserId = strValue;
            }
        }
	},

	SetIsAdmin : function()
	{
		var strValue = GetRequestQueryParameter ("IsAdmin");

		if (strValue != 'undefined' && strValue != '')
		{
			this.IsAdmin = strValue;
		}
	},

	InitPage : function()
	{
		this.SetUserId ();
		this.SetIsAdmin ();
		if (this.UserId > 0)
		{
            document.getElementById ('file_attendance').addEventListener ('change', UPLOADEMPLOYEESATTENDANCE.ReadSingleFile, false);
            var arrData = [];
            UPLOADEMPLOYEESATTENDANCE.InitGridView (arrData);

			ProcessServerRequest (this.RestRequestInfo (this.MFI_UPLOADEMPLOYEESATTENDANCEUI_InitModule), UPLOADEMPLOYEESATTENDANCE.Process_Init, true);
		}
	},

	Process_Init : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, UPLOADEMPLOYEESATTENDANCE.MSG))
		{
			try
			{
				var obj = JSON.parse(responseText);
				FillCombo (obj, UPLOADEMPLOYEESATTENDANCE.XMLTAG_SDeviceInfoList, document.getElementById ("cmb_devices"));
			}
			catch (e)
			{
				alert("Process_Init " + e);
			}
		}
	},

    ReadSingleFile : function (evt)
    {
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];

        if (f)
        {
            var r = new FileReader ();
            r.onload = function (e)
            {
                var contents = e.target.result;
                UPLOADEMPLOYEESATTENDANCE.NewFileContent = contents;
                UPLOADEMPLOYEESATTENDANCE.ShowEmployeesAttendance ();
            }
            r.readAsText (f);
        }
        else
        {
            sweetAlert ("Failed to load file");
        }
    },

    ValidateDevice : function ()
    {
        var bValid = false;
        if (parseInt (GetComboBoxSelectedValue (document.getElementById ("cmb_devices"))) <= CON_DEFAULT)
        {
            sweetAlert (this.MSG.CM_002);
        }
        else
        {
            bValid = true;
        }
        return bValid;
    },

    ShowEmployeesAttendance : function ()
    {
		if (this.ValidateDevice () == true)
		{
		    var arrData = [];
		    var nDataIndex = 0;
		    var nRowIndex = 1;
		    this.NewFileData = "";
		    var arrFileData = this.NewFileContent.split ("\r\n")
		    if (arrFileData != null && arrFileData.length > 0)
		    {
		        var nRowLength = arrFileData.length;
		        //var nDeviceId = parseInt (GetComboBoxSelectedValue (document.getElementById ("cmb_devices")));
		        for (var nIndex = 0; nIndex < nRowLength; nIndex++)
		        {
		            var arrData_Columns = arrFileData [nIndex].split ("\t");
		            if (arrData_Columns != null && arrData_Columns.length > 5)
		            {
		                arrData_Columns = this.ValidateAttendanceData (arrData_Columns);
		                var strCode = arrData_Columns [0];
		                var strLogDate = arrData_Columns [1];
		                if (strCode != "" || strLogDate != "")
		                {
                            var strPunchDirection = arrData_Columns [3];
                            var strVerifyMode = arrData_Columns [4];
                            var strWorkCode = arrData_Columns [5];
                            var strDeviceId = arrData_Columns [2] == null ? 0 : arrData_Columns [2];
                            var strLongitude = arrData_Columns [6] == null ? 0 : arrData_Columns [6];
                            var strLatitude = arrData_Columns [7] == null ? 0 : arrData_Columns [7];

                            var strData = strCode + LEVEL02DATA_SEPERATOR +
                                strLogDate + LEVEL02DATA_SEPERATOR +
                                strPunchDirection + LEVEL02DATA_SEPERATOR +
                                strVerifyMode + LEVEL02DATA_SEPERATOR +
                                strWorkCode + LEVEL02DATA_SEPERATOR +
                                strDeviceId + LEVEL02DATA_SEPERATOR +
                                strLongitude + LEVEL02DATA_SEPERATOR +
                                strLatitude+ LEVEL02DATA_SEPERATOR;

                            if (this.NewFileData == "")
                            {
                                this.NewFileData = strData;
                            }
                            else
                            {
                                this.NewFileData = this.NewFileData + LEVEL01DATA_SEPERATOR + strData;
                            }

                            arrData [nDataIndex] =
                            {
                                lbl_Index : nRowIndex,
                                lbl_Code : strCode,
                                lbl_LogDate : strLogDate,
                                lbl_PunchDirection : strPunchDirection,
                                lbl_VerifyMode : strVerifyMode,
                                lbl_WorkCode : strWorkCode,
                                lbl_DeviceId : strDeviceId,
                                lbl_Longitude : strLongitude,
                                lbl_Latitude : strLatitude
                            };

                            nRowIndex ++;
                            nDataIndex ++;
                        }
                    }
		        }
		    }
		    else
		    {
		        sweetAlert (this.MSG.CM_003);
		    }
		    UPLOADEMPLOYEESATTENDANCE.DisplayGridViewByBatch (arrData);
		}
    },

    ValidateAttendanceData : function (arrData_Columns)
    {
        var validData = []; // initialise an empty array
        for (var nIndex = 0; nIndex < arrData_Columns.length; nIndex++)
        {
            var temp = arrData_Columns [nIndex];
            //alert ( temp + "---" + (temp == "" || temp == null))
            if (temp == null || temp == "")
            {
                continue;
            }
            else
            {
                validData.push(temp);  // the array will dynamically grow
            }
        }
        return validData;
    },

    UploadEmployeesAttendance_Clicked : function()
    {
		if (this.ValidateDevice () == true && this.NewFileData != "")
		{
			ProcessServerRequest (this.RestRequestInfo (this.MFI_UPLOADEMPLOYEESATTENDANCEUI_Upload), UPLOADEMPLOYEESATTENDANCE.Process_UploadEmployeesAttendance_Clicked, true);
		}
    },

	Process_UploadEmployeesAttendance_Clicked : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, UPLOADEMPLOYEESATTENDANCE.MSG))
		{
            sweetAlert (UPLOADEMPLOYEESATTENDANCE.MSG.CM_001);
            var arrData = [];
		    UPLOADEMPLOYEESATTENDANCE.DisplayGridViewByBatch (arrData);
		}
	},

	Process_Init_DeviceCommandList : function (obj)
	{
        LoadingPopup ();
        var oInfoObj = JSONUtil.GetJSONValues (obj, DEVICECOMMANDS.XMLTAG_SDeviceCommandsList, '');
        if (oInfoObj)
        {
            var arrInfoObj = JSONUtil.GetJSONValues (oInfoObj, 'data', '');
            if (arrInfoObj)
            {
                DEVICECOMMANDS.DisplayGridViewByBatch (arrInfoObj);
            }
        }
        CloseLoadingPopup ();
    },

	DisplayGridViewByBatch : function (arrData)
    {
        LoadingPopup ();
        $ ('#list').setGridParam ({ 'suspendPager': true });
        $ ('#list').jqGrid ('clearGridData', true);
        $ ('#list').setGridParam ({ 'data': arrData });
        $ ('#list').trigger ('reloadGrid');
        $ ('#list').setGridParam ({ 'suspendPager': false });

        CloseLoadingPopup ();
    },

	InitGridView : function (arrData)
	{
		var data1 = $ ("#list").jqGrid (
		{
			datatype : "local",
			editurl : 'clientArray',
			data : arrData,
			height : 300,
			autowidth : true,
			shrinkToFit : true,
			page : 1,
			rowNum : 100,
			rownumbers : true,
			rownumWidth : 35,
            altRows : true,
			altclass : 'myAltRowClass',
			direction: "-rtl", // instructs the grid to use RTL settings
			viewrecords : true,
			rowList : [
					100, 500, 1000, 5000, 10000
			],
			pager : "#jqGridPager",
			colModel : [
					{
						label : '#',
						name : 'lbl_Index',
						width : 60,
						align : 'center',
						sorttype: 'number'
					},
					{
						label : 'Employee Code',
						name : 'lbl_Code',
						width : 200,
						align : 'center'
					},
					{
						label : 'Log Date-Time',
						name : 'lbl_LogDate',
						width : 200,
						align : 'center'
					},
					{
						label : 'Punch Direction',
						name : 'lbl_PunchDirection',
						width : 80,
						align : 'center',
						hidden : true
					},
					{
						label : 'Verify Mode',
						name : 'lbl_VerifyMode',
						width : 80,
						align : 'center',
						hidden : true
					},
					{
						label : 'Work Code',
						name : 'lbl_WorkCode',
						width : 60,
						align : 'center',
						hidden : true
					},
					{
						label : 'Device Id',
						name : 'lbl_DeviceId',
						width : 100,
						align : 'center',
						hidden : true
					},
					{
						label : 'Longitude',
						name : 'lbl_Longitude',
						width : 70,
						align : 'center',
						hidden : true
					},
					{
						label : 'Latitude',
						name : 'lbl_Latitude',
						width : 70,
						align : 'center',
						hidden : true
					}
				],
			viewrecords : true, // show the current page, data rang and total
			// records on the toolbar

		});

		// add navigation bar with some built in actions for the grid
		$ ('#list').navGrid ('#jqGridPager',
		{
			edit : false,
			add : false,
			del : false,
			search : true,
			refresh : true,
			view : false,
			position : "left",
			cloneToTop : false
		});

		$ ("#list").jqGrid ('bindKeys');

		$ (window).resize (function ()
		{
			var outerwidth = $ ('#grid').width ();
			$ ('#list').setGridWidth (outerwidth);
			$ ("#list").jqGrid ({

			})
			// setGridWidth method sets a new width to the grid dynamically
		});
    },

	RestRequestInfo : function (dDBProcessId)
	{
		var oRest = UserInfoRest (-1, '', this.UserId) + "," + ProcessInfoRest (this.MI_UPLOADEMPLOYEESATTENDANCEUI, dDBProcessId);
		oRest += ", \"" + CProcessDBData + "\" : [{\"" + DATA + "\" : [";

		var oRestData = "";
		if (dDBProcessId == this.MFI_UPLOADEMPLOYEESATTENDANCEUI_InitModule)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CUploadEmployeesAttendanceInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";
		}
        else if (dDBProcessId == this.MFI_UPLOADEMPLOYEESATTENDANCEUI_Upload)
        {
            oRestData = this.UserId + DATA_SEPERATOR;
            oRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_devices")) + DATA_SEPERATOR;
            oRestData += this.NewFileData;

            oRestData = "{ \"" + this.XMLTAG_CUploadEmployeesAttendanceUpload + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";
            this.NewFileData = "";
        }

		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	},
};
