DEVICECOMMANDS =
{
	// region "Module Ids"
	MI_DEVICECOMMANDSDUI : 303,

	// endregion

	// region "DB Function Ids"
	MFI_DEVICECOMMANDSUI_InitModule : 303001,
	MFI_DEVICECOMMANDSUI_Delete : 303004,
	MFI_DEVICECOMMANDSUI_Search : 303011,
	// endregion

	// region "Module DB Error Ids"

	// end region

	// region "XML Node names"
	XMLTAG_CDeviceCommandsInit : "CDeviceCommandsInit",
	XMLTAG_CDeviceCommandsDelete : "CDeviceCommandsDelete",
	XMLTAG_CDeviceCommandsSearch : "CDeviceCommandsSearch",

    XMLTAG_SOPLogTypeList : "SOPLogTypeList",
    XMLTAG_SDeviceList : "SDeviceList",
	XMLTAG_SDeviceCommandsList : "SDeviceCommandsList",
	// end region

	// message
	MSG : new MSG_DEVICECOMMANDS (),
	UserId : -1,
	LastDeviceCommandId : -1,
	NewDeviceCommandId : -1,
	TIMER : undefined,
	REFRESH_MILLISECONDS : 30000,
	GRIDVIEW_LOAD_SIZE : 10000,

	SetUserId : function ()
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

	InitPage : function ()
	{
        this.SetUserId ();
		if (this.UserId > 0)
		{
            var arrData = [];
            DEVICECOMMANDS.InitGridView (arrData);
            DEVICECOMMANDS.Init_Dates ();

			ProcessServerRequest (this.RestRequestInfo (this.MFI_DEVICECOMMANDSUI_InitModule), DEVICECOMMANDS.Process_Init, true);
        }
    },
	ClosePage : function ()
	{
		this.UserId = 0;
	},

	Process_Init : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICECOMMANDS.MSG))
		{
			try
			{
				var obj = JSON.parse (responseText);
				FillCombo (obj, DEVICECOMMANDS.XMLTAG_SDeviceList, document.getElementById ("cmb_devices"));

                LoadingPopup ();
                DEVICECOMMANDS.Process_Init_DeviceCommandList (obj);
                CloseLoadingPopup ();
			}
			catch (e)
			{
				alert (e);
			}
		}
	},

	Init_Dates : function ()
	{
        $( "#dp_fromdate" ).datepicker({dateFormat: 'yy-mm-dd'});
        $( "#dp_todate" ).datepicker({dateFormat: 'yy-mm-dd'});

        var now = new Date();
        var month = (now.getMonth() + 1);
        var day = now.getDate();
        if(month < 10)
            month = "0" + month;
        if(day < 10)
            day = "0" + day;

        var today = now.getFullYear() + '-' + month + '-' + day;

         $('#dp_fromdate').val(today);
         $('#dp_todate').val(today);
    },

	SearchData_Clicked : function ()
	{
	    this.LastDeviceCommandId = 0;
        this.ResetSearchFilters ();
	    $ ('#list').jqGrid ("clearGridData", true);
        ProcessServerRequest (this.RestRequestInfo (this.MFI_DEVICECOMMANDSUI_Search), DEVICECOMMANDS.Process_Search, true);
    },

    ResetSearchFilters : function ()
    {
       $("#list").setGridParam ({search : false, searchdata : {}, page : 1}).trigger ("reloadGrid");
    },

	Process_Search : function ()
	{
        var enddate = new Date ();
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICECOMMANDS.MSG))
		{
			try
			{
				var obj = JSON.parse (responseText);
                if (obj)
                {
                    DEVICECOMMANDS.Process_Init_DeviceCommandList (obj);
                }
			}
			catch (e)
			{
				alert (e);
			}
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
						label : 'Command-Id',
						name : 'lbl_DeviceCommandId',
						width : 90,
						align : 'center',
						sorttype: 'number'
					},
					{
						label : 'Device-Name',
						name : 'lbl_DeviceSName',
						width : 120,
						align : 'center'
					},
					{
						label : 'Serial No.',
						name : 'lbl_SerialNo',
						width : 80,
						align : 'center'
					},
					{
						label : 'Device-Location',
						name : 'lbl_DeviceLocation',
						width : 120,
						align : 'center'
					},
					{
						label : 'Device-Commands',
						name : 'lbl_Command',
						width : 150,
						align : 'center'
					},
					{
						label : 'Created-Date',
						name : 'lbl_CreatedDate',
						width : 100,
						align : 'center'
					},
					{
						label : 'Executed-Date',
						name : 'lbl_ExecutedDate',
						width : 100,
						align : 'center'
					},
					{
						label : 'Status',
						name : 'lbl_Status',
						width : 70,
						align : 'center'
					},
                    {
                        label : 'Delete',
                        name : 'lbl_Delete',
                        width : 50,
                        align : 'center',
                        formatter : fmt_delete,
                    },
				],
			viewrecords : true, // show the current page, data rang and total
			// records on the toolbar

		});

		function fmt_delete(cellval, options, rowdata)
		{
		    if (rowdata ['lbl_Status'] == "PENDING")
		    {
                formatted_cellval = "&nbsp;";
                return formatted_cellval;
            }
            else
            {
                formatted_cellval = "<button class='cd-popup-trigger' type='button'  onclick='JavaScript:DEVICECOMMANDS.DeleteDeviceCommand ("
                        + options.rowId
                        + ");' title='delete'><i class='fa fa-trash-o'></i></button>";
                return formatted_cellval;
            }
		}

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

    DeleteDeviceCommand : function (rowid)
    {
	    swal
	    (
	        {
	            title: "Are you sure?",
	            text: this.MSG.CM_002,
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "Yes, delete it!",
	            closeOnConfirm: false
            },
            function ()
            {
                var rowData = jQuery ('#list').jqGrid ('getRowData', rowid);
                var data = JSON.parse (JSON.stringify (rowData));
                if (data)
                {
                    DEVICECOMMANDS.NewDeviceCommandId = data ['lbl_DeviceCommandId'];
                    if (DEVICECOMMANDS.NewDeviceCommandId > 0)
                    {
                        ProcessServerRequest (DEVICECOMMANDS.RestRequestInfo (DEVICECOMMANDS.MFI_DEVICECOMMANDSUI_Delete), DEVICECOMMANDS.Process_DeleteData, true);
                    }
                }
            }
        );
    },

	Process_DeleteData : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICECOMMANDS.MSG))
		{
			try
			{
                var obj = JSON.parse (responseText);
                if (obj)
                {
                    DEVICECOMMANDS.Process_Init_DeviceCommandList (obj);
                }
                swal ("Deleted!", DEVICECOMMANDS.MSG.CM_001, "success");
			}
			catch (e)
			{
				alert("Process_DeleteData " + e);
			}
		}
        this.NewDeviceCommandId = -1;
	},

	RestRequestInfo : function (dDBProcessId)
	{
		var oRest = UserInfoRest (-1, '', this.UserId) + "," + ProcessInfoRest (this.MI_DEVICECOMMANDSDUI, dDBProcessId);
		oRest += ", \""+ CProcessDBData +"\" : [{\"" + DATA + "\" : [";

        var oSearchRestData = this.UserId + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_devices")) + DATA_SEPERATOR;
        oSearchRestData += document.getElementById ("dp_fromdate").value + DATA_SEPERATOR;
        oSearchRestData += document.getElementById ("dp_todate").value + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_toptypes")) + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_statustypes")) + DATA_SEPERATOR;
        oSearchRestData += this.LastDeviceCommandId;
        oSearchRestData = "{ \"" + this.XMLTAG_CDeviceCommandsSearch + "\" : [{ \"" + DATA + "\" : \"" + oSearchRestData + "\" } ]}";

		var oRestData = "";
		if (dDBProcessId == this.MFI_DEVICECOMMANDSUI_InitModule)
		{
			oRestData = this.UserId;
			oRestData = "{ \"" + this.XMLTAG_CDeviceCommandsInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";

            oRestData = oSearchRestData + ", " + oRestData;
		}
		else if (dDBProcessId == this.MFI_DEVICECOMMANDSUI_Delete)
		{
			var oUserRestData = this.UserId
			oUserRestData = "{\"" + this.XMLTAG_CDeviceCommandsInit + "\" : [{ \"" + DATA + "\" : \"" + oUserRestData + "\" }]}";

			var arrObjects =
			    [
                    this.NewDeviceCommandId
                 ];
			oRestData = JSONUtil.GetRestData (this.XMLTAG_CDeviceCommandsDelete, arrObjects);
			oRestData = oUserRestData + ", " + oRestData + ", " + oSearchRestData;
		}
		else if (dDBProcessId == this.MFI_DEVICECOMMANDSUI_Search)
		{
			oRestData = oSearchRestData;
		}
		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	}
};
