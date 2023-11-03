DEVICEINFO =
{
	// region "Module Ids"
	MI_DEVICEINFODUI : 301,
	// endregion

	// region "DB Function Ids"
	MFI_DEVICEINFOUI_InitModule : 301001,
	MFI_DEVICEINFOUI_Insert_DeviceInfo : 301002,
	MFI_DEVICEINFOUI_Update_DeviceInfo : 301003,
	MFI_DEVICEINFOUI_Delete_DeviceInfo : 301004,
	MFI_DEVICEINFOUI_Search : 301011,
	MFI_DEVICEINFOUI_Insert_DeviceCommands : 301012,
	// endregion

	// region "Module DB Error Ids"
	// end region

	// region "XML Node names"
	XMLTAG_CDeviceInfoInit : "CDeviceInfoInit",
	XMLTAG_CDeviceInfoInsert : "CDeviceInfoInsert",
	XMLTAG_CDeviceInfoUpdate : "CDeviceInfoUpdate",
	XMLTAG_CDeviceInfoDelete : "CDeviceInfoDelete",
	XMLTAG_CDeviceInfoSearch : "CDeviceInfoSearch",
	XMLTAG_CDeviceInfoInsertDeviceCommands : "CDeviceInfoInsertDeviceCommands",

    XMLTAG_SOPLogTypeList : "SOPLogTypeList",
    XMLTAG_SDeviceList : "SDeviceList",
	XMLTAG_SDeviceInfoList : "SDeviceInfoList",
	// end region

	// message
	MSG : new MSG_DEVICEINFO (),
	DEVICE_STATUS : new DEVICESTATUS (),
	UserId : -1,
	NewDeviceId : -1,
	TIMER : undefined,
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
            DEVICEINFO.InitGridView (arrData);
			ProcessServerRequest (this.RestRequestInfo (this.MFI_DEVICEINFOUI_InitModule), DEVICEINFO.Process_Init, true);
        }
    },
	ClosePage : function ()
	{
		this.UserId = 0;
	},

	Process_Init : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICEINFO.MSG))
		{
			try
			{
				var obj = JSON.parse (responseText);
				FillCombo (obj, DEVICEINFO.XMLTAG_SDeviceList, document.getElementById ("cmb_devices"));
				DEVICEINFO.Process_Init_DeviceInfoList (obj);
				document.getElementById ("frm_deviceInfo").reset ();
			}
			catch (e)
			{
				alert (e);
			}
		}
	},

	SearchData_Clicked : function ()
	{
        this.ResetSearchFilters ();
	    $ ('#list').jqGrid ("clearGridData", true);
        ProcessServerRequest (this.RestRequestInfo (this.MFI_DEVICEINFOUI_Search), DEVICEINFO.Process_Search, true);
    },

    ResetSearchFilters : function ()
    {
       $("#list").setGridParam ({search : false, searchdata : {}, page : 1}).trigger ("reloadGrid");
    },

	Process_Search : function ()
	{
        var enddate = new Date ();
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICEINFO.MSG))
		{
			try
			{
				var obj = JSON.parse (responseText);
				DEVICEINFO.Process_Init_DeviceInfoList (obj);
			}
			catch (e)
			{
				alert (e);
			}
		}
	},

	OpenPopup : function(type)
	{
		if (type == 'insert')
			$('.cd-insert-popup').addClass('is-visible');
		else
			$('.cd-popup').addClass('is-visible');
	},

	ClosePopup : function(type)
	{
	    DEVICEINFO.ClearPageInfo (type);
		if (type == 'insert')
			$('.cd-insert-popup').removeClass('is-visible');
		else
			$('.cd-popup').removeClass('is-visible');
	},

	ClearPageInfo : function(type)
	{
		if (type == 'insert')
		{
            document.getElementById ("txt_ins_name").value = "";
            document.getElementById ("txt_ins_shortname").value = "";
            document.getElementById ("txt_ins_serialnumber").value = "";
            document.getElementById ("txt_ins_ipaddress").value = "";
            document.getElementById ("txt_ins_location").value = "";
            document.getElementById ("txt_ins_timezone").value = "330";
            document.getElementById ("txt_ins_timeout").value = "300";
            document.getElementById ("cmb_ins_devicedirection").value = "in";
		}
		else
		{
            document.getElementById ("txt_upd_deviceid").value = "";
            document.getElementById ("txt_upd_name").value = "";
            document.getElementById ("txt_upd_shortname").value = "";
            document.getElementById ("txt_upd_serialnumber").value = "";
            document.getElementById ("txt_upd_ipaddress").value = "";
            document.getElementById ("txt_upd_location").value = "";
            document.getElementById ("txt_upd_timezone").value = "330";
            document.getElementById ("txt_upd_timeout").value = "300";
            document.getElementById ("cmb_upd_devicedirection").value = "in";
		}
	},

    InsertDeviceInfo : function ()
    {
        DEVICEINFO.OpenPopup ("insert");
    },

    UpdateDeviceInfo : function (rowid)
    {
		var rowData = jQuery('#list').jqGrid('getRowData', rowid);
		var data = JSON.parse(JSON.stringify(rowData));
		if (data)
		{
            document.getElementById ("txt_upd_deviceid").value = data['lbl_DeviceId'];
            document.getElementById ("txt_upd_name").value = data['lbl_DeviceFName'];
            document.getElementById ("txt_upd_shortname").value = data['lbl_DeviceSName'];
            document.getElementById ("txt_upd_serialnumber").value = data['lbl_SerialNo'];
            document.getElementById ("txt_upd_ipaddress").value = data['lbl_IPAddress'];
            document.getElementById ("txt_upd_location").value = data['lbl_Location'];
            document.getElementById ("txt_upd_timezone").value = data['lbl_Timezone'];
            document.getElementById ("txt_upd_timeout").value = data['lbl_Timeout'];
            document.getElementById ("cmb_upd_devicedirection").value = data['lbl_Direction'];

            DEVICEINFO.OpenPopup('update')
        }
    },

    DeleteDeviceInfo : function (rowid)
    {
	    swal
	    (
	        {
	            title: "Are you sure?",
	            text: this.MSG.CM_012,
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
                    DEVICEINFO.NewDeviceId = data ['lbl_DeviceId'];
                    if (DEVICEINFO.NewDeviceId > 0)
                    {
                        ProcessServerRequest (DEVICEINFO.RestRequestInfo (DEVICEINFO.MFI_DEVICEINFOUI_Delete_DeviceInfo), DEVICEINFO.Process_DeleteData, true);
                    }
                }
            }
        );
    },

	Process_DeleteData : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICEINFO.MSG))
		{
			try
			{
				var obj = JSON.parse (responseText);
				DEVICEINFO.Process_Init_DeviceInfoList (obj);
                swal ("Deleted!", DEVICEINFO.MSG.CM_011, "success");
			}
			catch (e)
			{
				alert("Process_DeleteData " + e);
			}
		}
        this.NewDeviceId = -1;
	},

    InsertDeviceInfo_Clicked : function ()
    {
        if (DEVICEINFO.Validate_InsertDeviceInfo ())
        {
            ProcessServerRequest (DEVICEINFO.RestRequestInfo (DEVICEINFO.MFI_DEVICEINFOUI_Insert_DeviceInfo), DEVICEINFO.Process_InsertDeviceInfo, true);
        }
    },

    UpdateDeviceInfo_Clicked : function ()
    {
        if (DEVICEINFO.Validate_UpdateDeviceInfo () == true)
        {
            ProcessServerRequest (DEVICEINFO.RestRequestInfo (DEVICEINFO.MFI_DEVICEINFOUI_Update_DeviceInfo), DEVICEINFO.Process_UpdateDeviceInfo, true);
        }
    },

	Validate_InsertDeviceInfo : function()
	{
	    var bValid = false;
        var strName = document.getElementById ("txt_ins_name").value + "";
        var strShortName = document.getElementById ("txt_ins_shortname").value + "";
        var strSerialNumber = document.getElementById ("txt_ins_serialnumber").value + "";
        var strIPAddress = document.getElementById ("txt_ins_ipaddress").value + "";
        var strLocation = document.getElementById ("txt_ins_location").value + "";
        var strTimezone = document.getElementById ("txt_ins_timezone").value + "";
        var strTimeout = document.getElementById ("txt_ins_timeout").value + "";

        if (strName.trim () == "")
            sweetAlert (this.MSG.CM_002);
        else if (strShortName.trim () == "")
            sweetAlert (this.MSG.CM_003);
        else if (strSerialNumber.trim () == "")
            sweetAlert (this.MSG.CM_004);
        else if (strIPAddress.trim () == "")
            sweetAlert (this.MSG.CM_005);
        else if (strLocation.trim () == "")
            sweetAlert (this.MSG.CM_006);
        else if (strTimezone.trim () == "")
            sweetAlert (this.MSG.CM_007);
        else if (NUMBERUtil.ValidateTimeZoneNumber (strTimezone.trim ()) == false)
            sweetAlert (this.MSG.CM_007);
        else if (strTimeout.trim () == "")
            sweetAlert (this.MSG.CM_008);
        else if (NUMBERUtil.ValidateNumbers (strTimeout.trim ()) == false)
            sweetAlert (this.MSG.CM_008);
        else
            bValid = true;


        return bValid;
    },

	Validate_UpdateDeviceInfo : function()
	{
	    var bValid = false;
        var strName = document.getElementById ("txt_upd_name").value + "";
        var strShortName = document.getElementById ("txt_upd_shortname").value + "";
        var strSerialNumber = document.getElementById ("txt_upd_serialnumber").value + "";
        var strIPAddress = document.getElementById ("txt_upd_ipaddress").value + "";
        var strLocation = document.getElementById ("txt_upd_location").value + "";
        var strTimezone = document.getElementById ("txt_upd_timezone").value + "";
        var strTimeout = document.getElementById ("txt_upd_timeout").value + "";

        if (strName.trim () == "")
            sweetAlert (this.MSG.CM_002);
        else if (strShortName.trim () == "")
            sweetAlert (this.MSG.CM_003);
        else if (strSerialNumber.trim () == "")
            sweetAlert (this.MSG.CM_004);
        else if (strIPAddress.trim () == "")
            sweetAlert (this.MSG.CM_005);
        else if (strLocation.trim () == "")
            sweetAlert (this.MSG.CM_006);
        else if (strTimezone.trim () == "")
            sweetAlert (this.MSG.CM_007);
        else if (NUMBERUtil.ValidateTimeZoneNumber (strTimezone.trim ()) == false)
            sweetAlert (this.MSG.CM_007);
        else if (strTimeout.trim () == "")
            sweetAlert (this.MSG.CM_008);
        else if (NUMBERUtil.ValidateNumbers (strTimeout.trim ()) == false)
            sweetAlert (this.MSG.CM_008);
        else
            bValid = true;

        return bValid;
    },

	Process_InsertDeviceInfo : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, DEVICEINFO.MSG))
		{
			try
			{
                DEVICEINFO.ClosePopup ("insert");
                DEVICEINFO.ClosePopup ("update");

                sweetAlert (DEVICEINFO.MSG.CM_009);

				var obj = JSON.parse (responseText);
				DEVICEINFO.Process_Init_DeviceInfoList (obj);
			}
			catch (e)
			{
				alert(e);
			}
		}
	},

	Process_UpdateDeviceInfo : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, DEVICEINFO.MSG))
		{
			try
			{
                DEVICEINFO.ClosePopup ("insert");
                DEVICEINFO.ClosePopup ("update");

                sweetAlert (DEVICEINFO.MSG.CM_010);
				var obj = JSON.parse (responseText);
				DEVICEINFO.Process_Init_DeviceInfoList (obj);
			}
			catch (e)
			{
				alert(e);
			}
		}
	},

	GetListViewRestData : function (oInfoObj, bIsFirstOrLast)
	{
		var arrData = [];
		if (oInfoObj != 'undefined' && oInfoObj != null && oInfoObj.length > 0)
		{
			var oObj = oInfoObj [0];
			if (oObj != 'undefined' && oObj.length > 0)
			{
			    var nLength = oObj.length;
			    var nDataIndex = 0;
			    var startdate = new Date ();
				for (var key in oObj)
				{
				    if (oObj.hasOwnProperty (key))
				    {
                        var strDataText = oObj[key].data;
                        var oInfo = new DS_DeviceInfo ();
                        oInfo.InitDataStructure (strDataText);

                        arrData [nDataIndex] =
                        {
                            lbl_DeviceId : oInfo.DS.GetColumnForRow (oInfo.DB_DeviceId),
                            lbl_DeviceFName : oInfo.DS.GetColumnForRow (oInfo.DB_DeviceFName),
                            lbl_DeviceSName : oInfo.DS.GetColumnForRow (oInfo.DB_DeviceSName),
                            lbl_SerialNo : oInfo.DS.GetColumnForRow (oInfo.DB_SerialNumber),
                            lbl_Direction : oInfo.DS.GetColumnForRow (oInfo.DB_DeviceDirection),
                            lbl_ConnType : oInfo.DS.GetColumnForRow (oInfo.DB_ConnectionType),
                            lbl_IPAddress : oInfo.DS.GetColumnForRow (oInfo.DB_IpAddress),
                            lbl_DownloadedDate : DEVICEINFO.IsValidDate (oInfo.DS.GetColumnForRow (oInfo.DB_LastDownloadedDate)),
                            lbl_PingDate : DEVICEINFO.IsValidDate (oInfo.DS.GetColumnForRow (oInfo.DB_LastPingDate)),
                            lbl_Stamp : oInfo.DS.GetColumnForRow (oInfo.DB_TransactionStamp),
                            lbl_OPStamp : oInfo.DS.GetColumnForRow (oInfo.DB_OPStamp),
                            lbl_PHStamp : oInfo.DS.GetColumnForRow (oInfo.DB_C7),
                            lbl_Timezone : oInfo.DS.GetColumnForRow (oInfo.DB_TimeZone),
                            lbl_Timeout : oInfo.DS.GetColumnForRow (oInfo.DB_TimeOut),
                            lbl_Location : oInfo.DS.GetColumnForRow (oInfo.DB_DeviceLocation),
                            lbl_Status : DEVICEINFO.GetDeviceStatusColor (oInfo.DS.GetColumnForRow (oInfo.DB_Status))//DEVICEINFO.GetDeviceStatus (oInfo, nDataIndex)
                        };

                        nDataIndex ++;
				    }
				}
			    var enddate = new Date ();
			}
		}

		return arrData;
    },

    IsValidDate : function (strDate)
	{
	    if (strDate == "1900-01-01 00:00:00")
	        strDate = "-"

        return strDate
    },

	GetDeviceStatusColor : function (oInfo)
	{
	    if (oInfo == "OFFLINE")
	        oInfo = "<p style='color:red;'>" + oInfo + "</p>";
	    else if (oInfo == "ONLINE")
	        oInfo = "<p style='color:green;'>" + oInfo + "</p>";

        return oInfo;
    },

	GetDeviceStatus : function (oInfo, nDataIndex)
	{
	    var strStatus = DEVICEINFO.DEVICE_STATUS.DS_ONLINE;
        var nC6 = parseInt (oInfo.DS.GetColumnForRow (oInfo.DB_C6));
        if (nC6 == 1)
        {
            strStatus = DEVICEINFO.DEVICE_STATUS.DS_ERROR;
        }
        else
        {
            if (oInfo.DS.GetColumnForRow (oInfo.DB_LastPingDate) != null && oInfo.DS.GetColumnForRow (oInfo.DB_LastPingDate) != "-")
            {
                var strLastPingDate = oInfo.DS.GetColumnForRow (oInfo.DB_LastPingDate);
                var oLastPingDate = new Date (Date.parse (strLastPingDate));

                var oCurrentDate = new Date ();
                var diffMs =  Math.abs (oCurrentDate - oLastPingDate);
                var diffMins = Math.floor ((diffMs/1000)/60);

                if (diffMins > 2)
                    strStatus = DEVICEINFO.DEVICE_STATUS.DS_OFFLINE;
            }
            else
                strStatus = DEVICEINFO.DEVICE_STATUS.DS_OFFLINE;
        }
	    return strStatus;
    },

	Process_Init_DeviceInfoList : function (obj)
	{
        var oInfoObj = JSONUtil.GetJSONValues (obj, DEVICEINFO.XMLTAG_SDeviceInfoList, '');
		var arrData = DEVICEINFO.GetListViewRestData (oInfoObj, true);
		DEVICEINFO.ReloadGridViewByBatch (arrData);
    },

	ReloadGridViewByBatch : function (arrData)
	{
        $ ('#list').setGridParam ({ 'suspendPager': true });
        $ ('#list').jqGrid ("clearGridData", true);
        $ ('#list').setGridParam ({ data: arrData });
        $ ('#list').trigger ('reloadGrid');
        $ ('#list').setGridParam ({ 'suspendPager': false });
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
			rownumWidth : 25,
            altRows : true,
			altclass : 'myAltRowClass',
			direction: "-rtl", // instructs the grid to use RTL settings
			viewrecords : true,
			rowList : [
					100, 500, 1000, 5000, 10000
			],
			pager : "#jqGridPager",
			gridComplete: InitContextMenu,
			colModel : [
					{
						label : 'Device-Id',
						name : 'lbl_DeviceId',
						width : 50,
						align : 'center',
						sorttype: 'number'
					},
					{
						label : 'Device-FullName',
						name : 'lbl_DeviceFName',
						width : 130,
						align : 'center',
					},
					{
						label : 'Device-ShortName',
						name : 'lbl_DeviceSName',
						width : 100,
						align : 'center'
					},
					{
						label : 'Serial No.',
						name : 'lbl_SerialNo',
						width : 110,
						align : 'center'
					},
					{
						label : 'Direction',
						name : 'lbl_Direction',
						width : 80,
						align : 'center',
						hidden : true
					},
					{
						label : 'Conn-Type',
						name : 'lbl_ConnType',
						width : 80,
						align : 'center',
						hidden : true
					},
					{
						label : 'IP-Address',
						name : 'lbl_IPAddress',
						width : 80,
						align : 'center',
						hidden : true
					},
					{
						label : 'Last Downloaded Date',
						name : 'lbl_DownloadedDate',
						width : 120,
						align : 'center',
						hidden : true
					},
					{
						label : 'Last Ping Date',
						name : 'lbl_PingDate',
						width : 110,
						align : 'center'
					},
					{
						label : 'Stamp',
						name : 'lbl_Stamp',
						width : 60,
						align : 'center'
					},
					{
						label : 'OP-Stamp',
						name : 'lbl_OPStamp',
						width : 60,
						align : 'center'
					},
					{
						label : 'PH-Stamp',
						name : 'lbl_PHStamp',
						width : 60,
						align : 'center'
					},
					{
						label : 'Timezone',
						name : 'lbl_Timezone',
						width : 80,
						align : 'center',
						hidden : true
					},
					{
						label : 'Timeout',
						name : 'lbl_Timeout',
						width : 80,
						align : 'center',
						hidden : true
					},
					{
						label : 'Location',
						name : 'lbl_Location',
						width : 80,
						align : 'center',
						hidden : true
					},
                    {
                        label : 'Edit',
                        name : 'lbl_Edit',
                        width : 50,
                        align : 'center',
                        formatter : fmt_edit,
                        editable : false
                    },
					{
						label : 'Status',
						name : 'lbl_Status',
						width : 50,
						align : 'center'
					},
                    {
                        label : 'Delete',
                        name : 'delete',
                        width : 50,
                        align : 'center',
                        formatter : fmt_delete,
                    },
				],
			viewrecords : true, // show the current page, data rang and total
			// records on the toolbar
		});

        function fmt_edit (cellval, options, rowdata)
		{
			var formatted_cellval = "<button class='cd-popup-trigger'  type='button'  onclick='JavaScript:DEVICEINFO.UpdateDeviceInfo ("
					+ options.rowId
					+ ");' title='edit'><i class='fa fa-edit'></i></button>";
			return formatted_cellval;
		}

		function fmt_delete(cellval, options, rowdata)
		{
			formatted_cellval = "<button class='cd-popup-trigger' type='button'  onclick='JavaScript:DEVICEINFO.DeleteDeviceInfo ("
					+ options.rowId
					+ ");' title='delete'><i class='fa fa-trash-o'></i></button>";
			return formatted_cellval;
		}

        function InitContextMenu ()
        {
            $(".jqgrow", "#list").contextMenu ('contextMenu',
            {
                bindings:
                {
                    'cm_resetdeviceerror': function (t)
                    {
                        DEVICECOMMANDS.ChangeResetDeviceError ();
                    },
                    'cm_resettransactionstamp': function (t)
                    {
                        DEVICECOMMANDS.ChangeResetTransactionStamp ();
                    },
                    'cm_resetopstamp': function (t)
                    {
                        DEVICECOMMANDS.ChangeResetOPStamp ();
                    },
                    'cm_resetphotostamp': function (t)
                    {
                        DEVICECOMMANDS.ChangeResetPhotoStamp ();
                    },
                    'cm_clearlogsfromdevice': function (t)
                    {
                        DEVICECOMMANDS.ChangeClearLogFromDevice ();
                    },
                    'cm_changedeviceipaddress': function (t)
                    {
                        DEVICECOMMANDS.ChangeDeviceIPAddress ();
                    },
                    'cm_changedevicecardkey': function (t)
                    {
                        DEVICECOMMANDS.ChangeDeviceCardKey ();
                    },
                    'cm_changedevicesubnetmask': function (t)
                    {
                        DEVICECOMMANDS.ChangeDeviceSubnetMask ();
                    },
                    'cm_changedevicegateway': function (t)
                    {
                        DEVICECOMMANDS.ChangeDeviceGateway ();
                    },
                    'cm_restartdevice': function (t)
                    {
                        DEVICECOMMANDS.RestartDevice();
                    }
                },

                onContextMenu: function (event, menu)
                {
                    var rowId = $(event.target).parent("tr").attr("id")
                    var grid = $("#list");
                    grid.setSelection (rowId);

                    return true;
                }
            });

            function RestartDevice(){}
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

	RestRequestInfo : function (dDBProcessId)
	{
		var oRest = UserInfoRest (-1, '', this.UserId) + "," + ProcessInfoRest (this.MI_DEVICEINFODUI, dDBProcessId);
		oRest += ", \""+ CProcessDBData +"\" : [{\"" + DATA + "\" : [";

        var oSearchRestData = this.UserId + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_devices")) + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_toptypes"));
        oSearchRestData = "{ \"" + this.XMLTAG_CDeviceInfoSearch + "\" : [{ \"" + DATA + "\" : \"" + oSearchRestData + "\" } ]}";

		var oRestData = "";
		if (dDBProcessId == this.MFI_DEVICEINFOUI_InitModule)
		{
			oRestData = this.UserId;
			oRestData = "{ \"" + this.XMLTAG_CDeviceInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";

			oRestData = oSearchRestData + ", " + oRestData;
		}
		else if (dDBProcessId == this.MFI_DEVICEINFOUI_Insert_DeviceInfo)
		{
			var oUserRestData = this.UserId
			oUserRestData = "{\"" + this.XMLTAG_CDeviceInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oUserRestData + "\" }]}";

			var arrObjects =
			    [
                    this.UserId,
                    -1,
                    document.getElementById("txt_ins_name").value,
                    document.getElementById("txt_ins_shortname").value,
                    document.getElementById("txt_ins_serialnumber").value,
                    document.getElementById("txt_ins_ipaddress").value,
                    document.getElementById("txt_ins_location").value,
                    document.getElementById("txt_ins_timezone").value,
                    document.getElementById("txt_ins_timeout").value,
                    GetComboBoxSelectedValue (document.getElementById ("cmb_ins_devicedirection"))
                 ];
			oRestData = JSONUtil.GetRestData (this.XMLTAG_CDeviceInfoInsert, arrObjects);
			oRestData = oUserRestData + ", " + oRestData + ", " + oSearchRestData;
		}
		else if (dDBProcessId == this.MFI_DEVICEINFOUI_Update_DeviceInfo)
		{
			var oUserRestData = this.UserId
			oUserRestData = "{\"" + this.XMLTAG_CDeviceInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oUserRestData + "\" }]}";

			var arrObjects =
			    [
                    this.UserId,
                    document.getElementById("txt_upd_deviceid").value,
                    document.getElementById("txt_upd_name").value,
                    document.getElementById("txt_upd_shortname").value,
                    document.getElementById("txt_upd_serialnumber").value,
                    document.getElementById("txt_upd_ipaddress").value,
                    document.getElementById("txt_upd_location").value,
                    document.getElementById("txt_upd_timezone").value,
                    document.getElementById("txt_upd_timeout").value,
                    GetComboBoxSelectedValue (document.getElementById ("cmb_upd_devicedirection"))
                 ];

			oRestData = JSONUtil.GetRestData (this.XMLTAG_CDeviceInfoUpdate, arrObjects);
			oRestData = oUserRestData + ", " + oRestData + ", " + oSearchRestData;
		}
		else if (dDBProcessId == this.MFI_DEVICEINFOUI_Delete_DeviceInfo)
		{
			var oUserRestData = this.UserId
			oUserRestData = "{\"" + this.XMLTAG_CDeviceInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oUserRestData + "\" }]}";

			var arrObjects =
			    [
                    this.NewDeviceId
                 ];

			oRestData = JSONUtil.GetRestData (this.XMLTAG_CDeviceInfoDelete, arrObjects);
			oRestData = oUserRestData + ", " + oRestData + ", " + oSearchRestData;
		}
        else if (dDBProcessId == this.MFI_DEVICEINFOUI_Search)
		{
			oRestData = oSearchRestData;
		}
		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	}
};
