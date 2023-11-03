DEVICEOPLOGS =
{
	// region "Module Ids"
	MI_DEVICEOPLOGSDUI : 304,

	// endregion

	// region "DB Function Ids"
	MFI_DEVICEOPLOGSUI_InitModule : 304001,
	MFI_DEVICEOPLOGSUI_Search : 304011,
	MFI_DEVICEOPLOGSUI_AutoRefresh : 304012,
	// endregion

	// region "Module DB Error Ids"

	// end region

	// region "XML Node names"
	XMLTAG_CDeviceOPLogsInit : "CDeviceOPLogsInit",
	XMLTAG_CDeviceOPLogsSearch : "CDeviceOPLogsSearch",
	XMLTAG_CDeviceOPLogsAutoRefresh : "CDeviceOPLogsAutoRefresh",

    XMLTAG_SOPLogTypeList : "SOPLogTypeList",
    XMLTAG_SDeviceList : "SDeviceList",
	XMLTAG_SDeviceOPLogsList : "SDeviceOPLogsList",
	// end region

	// message
	MSG : new MSG_DEVICEOPLOGS (),
	UserId : -1,
	LastDeviceOPLogId : -1,
	TIMER : undefined,
	REFRESH_MILLISECONDS : 10000,
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
            DEVICEOPLOGS.InitGridView (arrData);
            DEVICEOPLOGS.StartTimer ();
            DEVICEOPLOGS.Init_Dates ();

			ProcessServerRequest (this.RestRequestInfo (this.MFI_DEVICEOPLOGSUI_InitModule), DEVICEOPLOGS.Process_Init, true);
        }
    },
	ClosePage : function ()
	{
		this.UserId = 0;
		DEVICEOPLOGS.StopTimer ();
	},

	Process_Init : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICEOPLOGS.MSG))
		{
			try
			{
				var obj = JSON.parse (responseText);
				FillCombo (obj, DEVICEOPLOGS.XMLTAG_SOPLogTypeList, document.getElementById ("cmb_logtypes"));
				FillCombo (obj, DEVICEOPLOGS.XMLTAG_SDeviceList, document.getElementById ("cmb_devices"));

                LoadingPopup ();
                DEVICEOPLOGS.Process_Init_DeviceOPLogList (obj);
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

	SearchData_Clicked : function (nTypeId)
	{
	    DEVICEOPLOGS.StopTimer ();
	    this.LastDeviceOPLogId = 0;
        this.ResetSearchFilters ();

        if (nTypeId == 1)
        {
            var elem_autorefresh = document.getElementById("chb_autorefresh");
            if (elem_autorefresh.checked)
            {
                elem_autorefresh.removeEventListener ("onclick", DEVICEOPLOGS.AutoRefresh_Clicked);
                elem_autorefresh.checked = false;
                elem_autorefresh.addEventListener ("onclick", DEVICEOPLOGS.AutoRefresh_Clicked);
            }
        }
	    $ ('#list').jqGrid ("clearGridData", true);
        ProcessServerRequest (this.RestRequestInfo (this.MFI_DEVICEOPLOGSUI_Search), DEVICEOPLOGS.Process_Search, true);
    },

    ResetSearchFilters : function ()
    {
       $("#list").setGridParam ({search : false, searchdata : {}, page : 1}).trigger ("reloadGrid");
    },

	Process_Search : function ()
	{
        LoadingPopup ();
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICEOPLOGS.MSG))
		{
            try
            {
                var obj = JSON.parse (responseText);
                if (obj)
                {
                    DEVICEOPLOGS.Process_Init_DeviceOPLogList (obj, false);
                }
            }
            catch (e)
            {
                alert ("Process_Search>>" + e);
            }
		}
        CloseLoadingPopup ();
        DEVICEOPLOGS.StartTimer ();
	},

    AutoRefresh_Clicked : function ()
    {
        if (document.getElementById ("chb_autorefresh").checked)
        {
            DEVICEOPLOGS.Init_Dates ();
            DEVICEOPLOGS.SearchData_Clicked (2);
        }
        else
        {
            DEVICEOPLOGS.StopTimer ();
            $ ('#list').jqGrid ("clearGridData", true);
        }
    },

	StartTimer : function ()
	{
	    if (document.getElementById ("chb_autorefresh").checked)
            DEVICEOPLOGS.TIMER = setInterval (DEVICEOPLOGS.StartTimerEvent, DEVICEOPLOGS.REFRESH_MILLISECONDS);
        else
            DEVICEOPLOGS.StopTimer ();
    },

	StopTimer : function ()
	{
	    if (DEVICEOPLOGS.TIMER != 'undefined')
            clearInterval (DEVICEOPLOGS.TIMER);
    },

	StartTimerEvent : function ()
	{
	    DEVICEOPLOGS.StopTimer ();
        ProcessServerRequest (DEVICEOPLOGS.RestRequestInfo (DEVICEOPLOGS.MFI_DEVICEOPLOGSUI_Search), DEVICEOPLOGS.Process_TimerEvent);
    },

	Process_TimerEvent : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICEOPLOGS.MSG))
		{
			try
			{
                var obj = JSON.parse (responseText);
                if (obj)
                {
                    DEVICEOPLOGS.Process_Init_DeviceOPLogList (obj, true);
                }

				var obj = JSON.parse (responseText);
                var oInfoObj = JSONUtil.GetJSONValues (obj, DEVICEOPLOGS.XMLTAG_SDeviceOPLogsList, '');
                var arrData = DEVICEOPLOGS.GetListViewRestData (oInfoObj, false);
                if (arrData != null && arrData.length > 0)
                {
                    $ ('#list').addRowData ("item", arrData, "first");
                    $ ('#list').trigger ('reloadGrid');
                }
			}
			catch (e)
			{
			}
		}
        DEVICEOPLOGS.StartTimer ();
	},

	Process_Init_DeviceOPLogList : function (obj, bAddFirstOrLast)
	{
        LoadingPopup ();
        var oInfoObj = JSONUtil.GetJSONValues (obj, DEVICEOPLOGS.XMLTAG_SDeviceOPLogsList, '');
        if (oInfoObj)
        {
            var arrInfoObj = JSONUtil.GetJSONValues (oInfoObj, 'data', '');
            if (arrInfoObj)
            {
                DEVICEOPLOGS.DisplayGridViewByBatch (arrInfoObj, bAddFirstOrLast);
                DEVICEOPLOGS.SetLastRecordInfo (oInfoObj, true)
            }
        }
        CloseLoadingPopup ();
    },

    SetLastRecordInfo : function (oInfoObj, bIsFirstOrLast)
    {
        if (oInfoObj != 'undefined' && oInfoObj != null && oInfoObj.length > 0)
        {
            var oObj = oInfoObj [0];
            if (oObj != 'undefined' && oObj.length > 0)
            {
                var nDataIndex = 0;
                for (var key in oObj)
                {
                    if (oObj.hasOwnProperty (key))
                    {
                        var strDataText = oObj[key].data;
                        var oInfo = new DS_DeviceOPLogs ();
                        oInfo.InitDataStructure (strDataText);

                        if (bIsFirstOrLast == true && nDataIndex == 0)
                        {
                            DEVICEOPLOGS.LastDeviceOPLogId = oInfo.DS.GetColumnForRow (oInfo.DB_DeviceOperationLogId);
                            break;
                        }
                        else if (bIsFirstOrLast == false && (nDataIndex == (oObj.length - 1)))
                        {
                            DEVICEOPLOGS.LastDeviceOPLogId = oInfo.DS.GetColumnForRow (oInfo.DB_DeviceOperationLogId);
                            break;
                        }
                    }
                    nDataIndex ++;
                }
            }
        }
    },

    DisplayGridViewByBatch : function (arrData, bAddFirstOrLast)
    {
        LoadingPopup ();
        var arrData_New;
        if (bAddFirstOrLast == true)
        {
            var arrData_Old = $ ('#list').getGridParam ('data');
            arrData_New = arrData.concat (arrData_Old);
        }
        else
        {
            arrData_New = arrData;
        }

        $ ('#list').setGridParam ({ 'suspendPager': true });
        $ ('#list').jqGrid ('clearGridData', true);
        $ ('#list').setGridParam ({ 'data': arrData_New });
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
						label : 'Device-OPLogId',
						name : 'lbl_DeviceOPLogId',
						width : 70,
						align : 'center',
						sorttype: 'number'
					},
					{
						label : 'Log-Type',
						name : 'lbl_LogType',
						width : 100,
						align : 'center'
					},
					{
						label : 'ExecutedOn',
						name : 'lbl_ExecutedOn',
						width : 100,
						align : 'center'
					},
					{
						label : 'Device-Name',
						name : 'lbl_DeviceSName',
						width : 100,
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
						width : 100,
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
		var oRest = UserInfoRest (-1, '', this.UserId) + "," + ProcessInfoRest (this.MI_DEVICEOPLOGSDUI, dDBProcessId);
		oRest += ", \""+ CProcessDBData +"\" : [{\"" + DATA + "\" : [";

        var oSearchRestData = this.UserId + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_logtypes")) + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_devices")) + DATA_SEPERATOR;
        oSearchRestData += document.getElementById ("dp_fromdate").value + DATA_SEPERATOR;
        oSearchRestData += document.getElementById ("dp_todate").value + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_toptypes")) + DATA_SEPERATOR;
        oSearchRestData += this.LastDeviceOPLogId;
        oSearchRestData = "{ \"" + this.XMLTAG_CDeviceOPLogsSearch + "\" : [{ \"" + DATA + "\" : \"" + oSearchRestData + "\" } ]}";

		var oRestData = "";
		if (dDBProcessId == this.MFI_DEVICEOPLOGSUI_InitModule)
		{
			oRestData = this.UserId;
			oRestData = "{ \"" + this.XMLTAG_CDeviceOPLogsInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";

            oRestData = oSearchRestData + ", " + oRestData;
		}
		else if (dDBProcessId == this.MFI_DEVICEOPLOGSUI_Search)
		{
		    oRestData = oSearchRestData;
		}
		else if (dDBProcessId == this.MFI_DEVICEOPLOGSUI_AutoRefresh)
		{
			oRestData = this.UserId + DATA_SEPERATOR;
			oRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_logtypes")) + DATA_SEPERATOR;
            oRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_devices")) + DATA_SEPERATOR;
			oRestData += document.getElementById ("dp_fromdate").value + DATA_SEPERATOR;
			oRestData += document.getElementById ("dp_todate").value + DATA_SEPERATOR;
			oRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_toptypes")) + DATA_SEPERATOR;
			oRestData += this.LastDeviceOPLogId;
			oRestData = "{ \"" + this.XMLTAG_CDeviceOPLogsAutoRefresh + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";
		}
		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	}
};
