UPLOADEMPLOYEEINFO =
{
	// region "Module Ids"
	MI_UPLOADEMPLOYEEINFOUI : 102,

	// endregion

	// region "DB Function Ids"
	MFI_UPLOADEMPLOYEEINFOUI_InitModule : 102001,
	MFI_UPLOADEMPLOYEEINFOUI_Upload : 102012,
	// endregion

	// region "Module DB Error Ids"

	// end region

	// region "XML Node names"
	XMLTAG_CUploadEmployeeInfoInit : "CUploadEmployeeInfoInit",
    XMLTAG_CUploadEmployeeInfoUpload : "CUploadEmployeeInfoUpload",

	XMLTAG_SDeviceInfoList : "SDeviceInfoList",
	// end region

	// message
	MSG : new MSG_UPLOADEMPLOYEEINFO(),
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
            document.getElementById ('file_employees').addEventListener ('change', UPLOADEMPLOYEEINFO.ReadSingleFile, false);
            var arrData = [];
            UPLOADEMPLOYEEINFO.InitGridView (arrData);
		}
	},

    ReadSingleFile : function (evt)
    {
        //Retrieve the first (and only!) File from the FileList object
        var oFile = evt.target.files[0];

        if (oFile)
        {
            var r = new FileReader ();
            r.onload = function (e)
            {
                var contents = e.target.result;
                UPLOADEMPLOYEEINFO.NewFileContent = contents;
                UPLOADEMPLOYEEINFO.ShowEmployeesAttendance ();
            }
            r.readAsText (oFile);
        }
        else
        {
            sweetAlert (this.MSG.CM_005);
        }
    },

    ShowEmployeesAttendance : function ()
    {
        var arrData = [];
        var nDataIndex = 0;
        var nRowIndex = 1;
        this.NewFileData = "";

        var csv = this.NewFileContent;
        var arrFileData = $.csv.toArrays (csv, {onParseValue:$.csv.hooks.castToScalar});
        if (arrFileData != null && arrFileData.length > 0)
        {
            var bValid = true;
            var nRowLength = arrFileData.length;
            try
            {
                for (var nIndex = 1; nIndex < nRowLength; nIndex++)
                {
                    var arrColumnData = arrFileData [nIndex];
                    if (arrColumnData != null && arrColumnData.length > 4)
                    {
                        var strDeviceCode = arrColumnData [2];
                        if (arrColumnData [2] != null && (strDeviceCode + "").trim () != "")
                        {
                            var strName = arrColumnData [0];
                            if (arrColumnData [0] == null)
                                strName = " ";

                            var strCode = arrColumnData [1];
                            if (arrColumnData [1] == null)
                                strCode = " ";

                            var strPassword = arrColumnData [3];
                            if (arrColumnData [3] == null)
                                strPassword = " ";

                            var strCardNumber = arrColumnData [4];
                            if (arrColumnData [4] == null)
                                strCardNumber = " ";

                            var strData = strName + LEVEL02DATA_SEPERATOR +
                                strCode + LEVEL02DATA_SEPERATOR +
                                strDeviceCode + LEVEL02DATA_SEPERATOR +
                                strPassword + LEVEL02DATA_SEPERATOR +
                                strCardNumber + LEVEL02DATA_SEPERATOR ;

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
                                lbl_Name : strName,
                                lbl_Code : strCode,
                                lbl_DeviceCode : strDeviceCode,
                                lbl_Password : strPassword,
                                lbl_CardNumber : strCardNumber
                            };

                            nRowIndex ++;
                            nDataIndex ++;
                        }
                        else
                        {
                            bValid = false;
                            break;
                        }
                    }
                }
            }
            catch (e)
            {
                alert ("UPLOADEMPLOYEEINFO>>ShowEmployeesAttendance>>Error>>" + e);
            }
            if (bValid == true)
            {
                UPLOADEMPLOYEEINFO.DisplayGridViewByBatch (arrData);
            }
            else
            {
                sweetAlert (this.MSG.CM_004);
            }
        }
    },

    UploadEmployeeInfo_Clicked : function()
    {
		if (this.NewFileData != "")
		{
			ProcessServerRequest (this.RestRequestInfo (this.MFI_UPLOADEMPLOYEEINFOUI_Upload), UPLOADEMPLOYEEINFO.Process_UploadEmployeeInfo_Clicked, true);
		}
    },

	Process_UploadEmployeeInfo_Clicked : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, UPLOADEMPLOYEEINFO.MSG))
		{
            sweetAlert (UPLOADEMPLOYEEINFO.MSG.CM_001);
            var arrData = [];
		    UPLOADEMPLOYEEINFO.DisplayGridViewByBatch (arrData);
		    // Clear also hidden fields:
            $("input:file").clearInputs(true);
		}
	},

	Process_Init_DeviceCommandList : function (obj)
	{
        LoadingPopup ();
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
						width : 50,
						align : 'center',
						sorttype: 'number'
					},
					{
						label : 'Employee Name',
						name : 'lbl_Name',
						width : 150,
						align : 'center'
					},
					{
						label : 'Employee Code',
						name : 'lbl_Code',
						width : 150,
						align : 'center'
					},
					{
						label : 'Device Code',
						name : 'lbl_DeviceCode',
						width : 150,
						align : 'center'
					},
					{
						label : 'Password',
						name : 'lbl_Password',
						width : 150,
						align : 'center'
					},
					{
						label : 'Card Number',
						name : 'lbl_CardNumber',
						width : 150,
						align : 'center'
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
		var oRest = UserInfoRest (-1, '', this.UserId) + "," + ProcessInfoRest (this.MI_UPLOADEMPLOYEEINFOUI, dDBProcessId);
		oRest += ", \"" + CProcessDBData + "\" : [{\"" + DATA + "\" : [";

		var oRestData = "";
        if (dDBProcessId == this.MFI_UPLOADEMPLOYEEINFOUI_Upload)
        {
            oRestData = this.UserId + DATA_SEPERATOR;
            oRestData += this.NewFileData;

            oRestData = "{ \"" + this.XMLTAG_CUploadEmployeeInfoUpload + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";
            this.NewFileData = "";
        }

		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	},
};
