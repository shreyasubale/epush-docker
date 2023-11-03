DEVICELOGS =
{
    // region "Module Ids"
    MI_DEVICELOGSDUI : 302,

    // endregion

    // region "DB Function Ids"
    MFI_DEVICELOGSUI_InitModule : 302001,
    MFI_DEVICELOGSUI_Search : 302011,
    MFI_DEVICELOGSUI_AutoRefresh : 302012,
    // endregion

    // region "Module DB Error Ids"

    // end region

    // region "XML Node names"
    XMLTAG_CDeviceLogsInit : "CDeviceLogsInit",
    XMLTAG_CDeviceLogsSearch : "CDeviceLogsSearch",
    XMLTAG_CDeviceLogsAutoRefresh : "CDeviceLogsAutoRefresh",

    XMLTAG_SOPLogTypeList : "SOPLogTypeList",
    XMLTAG_SDeviceList : "SDeviceList",
    XMLTAG_SDeviceLogsList : "SDeviceLogsList",
    // end region

    // message
    MSG : new MSG_DEVICELOGS (),
    UserId : -1,
    PageId : 0,
    LastDeviceLogId : -1,
    LastDeviceLogDate : '1900-01-01 00:00:00',
    TIMER : undefined,
    REFRESH_MILLISECONDS : 5000,
    GRIDVIEW_LOAD_SIZE : 10000,

    SetUserId : function ()
    {
	    if (IsValidParentPage ())
	    {
            document.getElementById ("form_filter").style.display = "block";
            var strValue = GetRequestQueryParameter ("UserId");
            if (strValue != 'undefined' && strValue != '')
            {
                this.UserId = strValue;
            }
            strValue = GetRequestQueryParameter ("PageId");
            if (strValue != 'undefined' && strValue != '')
            {
                if (parseInt (strValue) == 1)
                {
                    document.getElementById ("form_title").innerHTML = DEVICELOGS.MSG.CH_001;
                    document.getElementById ("form_filter").style.display = "none";
                    this.PageId = strValue;
                }
            }
            else
            {
                document.getElementById ("form_title").innerHTML = DEVICELOGS.MSG.CH_002;
            }
        }
    },

    InitPage : function ()
    {
        this.SetUserId ();
        if (this.UserId > 0)
        {
            var arrData = [];
            DEVICELOGS.InitGridView (arrData);
            DEVICELOGS.StartTimer ();
            DEVICELOGS.Init_Dates ();

            if (this.PageId == 1)
            {
                var elem_autorefresh = document.getElementById("chb_autorefresh");
                elem_autorefresh.removeEventListener ("onclick", DEVICELOGS.AutoRefresh_Clicked);
                elem_autorefresh.checked = true;
                elem_autorefresh.addEventListener ("onclick", DEVICELOGS.AutoRefresh_Clicked);
                DEVICELOGS.AutoRefresh_Clicked ();
            }
            ProcessServerRequest (this.RestRequestInfo (this.MFI_DEVICELOGSUI_InitModule), DEVICELOGS.Process_Init, false);
        }
    },
    ClosePage : function ()
    {
        this.UserId = 0;
        DEVICELOGS.StopTimer ();
    },

    Process_Init : function ()
    {
        var responseText = this.responseText;
        if (ShowErrorMessage (responseText, DEVICELOGS.MSG))
        {
            try
            {
                var obj = JSON.parse (responseText);
                FillCombo (obj, DEVICELOGS.XMLTAG_SDeviceList, document.getElementById ("cmb_devices"));

                LoadingPopup ();
                DEVICELOGS.Process_Init_DeviceLogList (obj);
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
        DEVICELOGS.StopTimer ();
        this.LastDeviceLogId = 0;
        this.LastDeviceLogDate = '1900-01-01 00:00:00';
        this.ResetSearchFilters ();

        if (parseInt (nTypeId) == 1)
        {
            var elem_autorefresh = document.getElementById("chb_autorefresh");
            if (elem_autorefresh.checked)
            {
                elem_autorefresh.removeEventListener ("onclick", DEVICELOGS.AutoRefresh_Clicked);
                elem_autorefresh.checked = false;
                elem_autorefresh.addEventListener ("onclick", DEVICELOGS.AutoRefresh_Clicked);
            }
        }
        $ ('#list').jqGrid ("clearGridData", true);
        ProcessServerRequest (this.RestRequestInfo (this.MFI_DEVICELOGSUI_Search), DEVICELOGS.Process_Search, true);
    },

    ResetSearchFilters : function ()
    {
       $("#list").setGridParam ({search : false, searchdata : {}, page : 1}).trigger ("reloadGrid");
    },

    Process_Search : function ()
    {
        LoadingPopup ();
        var responseText = this.responseText;
        if (ShowErrorMessage (responseText, DEVICELOGS.MSG))
        {
            try
            {
                var obj = JSON.parse (responseText);
                if (obj)
                {
                    DEVICELOGS.Process_Init_DeviceLogList (obj, false);
                }
            }
            catch (e)
            {
                alert ("Process_Search>>" + e);
            }
        }
        CloseLoadingPopup ();
        DEVICELOGS.StartTimer ();
    },

    AutoRefresh_Clicked : function ()
    {
        if (document.getElementById ("chb_autorefresh").checked)
        {
            DEVICELOGS.Init_Dates ();
            DEVICELOGS.SearchData_Clicked (2);
        }
        else
        {
            DEVICELOGS.StopTimer ();
            $ ('#list').jqGrid ("clearGridData", true);
        }
    },

    StartTimer : function ()
    {
        if (document.getElementById ("chb_autorefresh").checked)
            DEVICELOGS.TIMER = setInterval (DEVICELOGS.StartTimerEvent, DEVICELOGS.REFRESH_MILLISECONDS);
        else
            DEVICELOGS.StopTimer ();
    },

    StopTimer : function ()
    {
        if (DEVICELOGS.TIMER != 'undefined')
            clearInterval (DEVICELOGS.TIMER);
    },

    StartTimerEvent : function ()
    {
        DEVICELOGS.StopTimer ();
        ProcessServerRequest (DEVICELOGS.RestRequestInfo (DEVICELOGS.MFI_DEVICELOGSUI_AutoRefresh), DEVICELOGS.Process_TimerEvent);
    },

    Process_TimerEvent : function ()
    {
        var responseText = this.responseText;
        if (ShowErrorMessage (responseText, DEVICELOGS.MSG))
        {
            try
            {
                var obj = JSON.parse (responseText);
                if (obj)
                {
                    DEVICELOGS.Process_Init_DeviceLogList (obj, true);
                }
            }
            catch (e)
            {
            }
        }
        DEVICELOGS.StartTimer ();
    },

    Process_Init_DeviceLogList : function (obj, bAddFirstOrLast)
    {
        LoadingPopup ();
        var oInfoObj = JSONUtil.GetJSONValues (obj, DEVICELOGS.XMLTAG_SDeviceLogsList, '');
        if (oInfoObj)
        {
            var arrInfoObj = JSONUtil.GetJSONValues (oInfoObj, 'data', '');
            if (arrInfoObj)
            {
                DEVICELOGS.DisplayGridViewByBatch (arrInfoObj, bAddFirstOrLast);
                DEVICELOGS.SetLastRecordInfo (oInfoObj, true)
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
                        var oInfo = new DS_DeviceLogs ();
                        oInfo.InitDataStructure (strDataText);

                        if (this.PageId == 0)
                        {
                            if (bIsFirstOrLast == true && nDataIndex == 0)
                            {
                                DEVICELOGS.LastDeviceLogId = oInfo.DS.GetColumnForRow (oInfo.DB_DeviceLogId);
                                DEVICELOGS.LastDeviceLogDate = oInfo.DS.GetColumnForRow (oInfo.DB_LogDate);
                                break;
                            }
                            else if (bIsFirstOrLast == false && (nDataIndex == (oObj.length - 1)))
                            {
                                DEVICELOGS.LastDeviceLogId = oInfo.DS.GetColumnForRow (oInfo.DB_DeviceLogId);
                                DEVICELOGS.LastDeviceLogDate = oInfo.DS.GetColumnForRow (oInfo.DB_LogDate);
                                break;
                            }
                        }
                        else
                        {
                            this.LastDeviceLogId = 0;
                            this.LastDeviceLogDate = '1900-01-01 00:00:00';
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
        if (this.PageId == 1)
        {
            arrData_New = arrData;
        }
        else
        {
            if (bAddFirstOrLast == true)
            {
                var arrData_Old = $ ('#list').getGridParam ('data');
                arrData_New = arrData.concat (arrData_Old);
            }
            else
            {
                arrData_New = arrData;
            }
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
                        label : 'Device-LogId',
                        name : 'lbl_DeviceLogId',
                        width : 70,
                        align : 'center',
                        sorttype: 'number'
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
                    },
                    {
                        label : 'Emp-Code',
                        name : 'lbl_EmployeeCode',
                        width : 100,
                        align : 'center'
                    },
                    {
                        label : 'Emp-Name',
                        name : 'lbl_EmployeeName',
                        width : 100,
                        align : 'center'
                    },
                    {
                        label : 'Log-Date',
                        name : 'lbl_LogDate',
                        width : 100,
                        align : 'center'
                    },
                    {
                        label : 'Downloaded-Date',
                        name : 'lbl_DowloadDate',
                        width : 100,
                        align : 'center'
                    },
                    {
                        label : 'Verify Method',
                        name : 'lbl_VerifyMethodName',
                        width : 120,
                        align : 'center'
                    },
                     {
                         label : 'Lat',
                         name : 'lbl_Latitude',
                         width : 60,
                         align : 'center'
                     },
                      {
                          label : 'Long.',
                          name : 'lbl_Longitude',
                          width : 60,
                          align : 'center'
                      },
                      {
                          label : 'Log.Img',
                          name : 'lbl_Logimage',
                          width : 60,
                          height : 20,
                          align : 'center',
                          edittype: 'image',
                          formatter: ImageFormatter
                      }
                ],
            viewrecords : true, // show the current page, data rang and total
            // records on the toolbar
        });

        function ImageFormatter (cellval, options, rowdata)
        {
            var strName = "";
            var strDate = "";
            if (rowdata)
            {
                strName = rowdata['lbl_EmployeeName'];
                strDate = rowdata['lbl_LogDate'];
            }

            var strImage = "../../../../../img/LogImage/" + cellval + ".jpg";
            return "<a href=\"javascript:void(0)\" onclick=\"JavaScript:DEVICELOGS.ShowImage('" + strImage + "', '" + strName + "', '" + strDate + "');\" data-rel=\"popup\" data-position-to=\"window\"><img src='" + strImage + "' width='60px' height='60px' /></a>";
        };

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

    ShowImage : function (strImageName, strName, strDate)
    {
       var _Name = document.getElementById ('txt_Name');
       var _Date = document.getElementById ('txt_LogDate');
       var _Img = document.getElementById ('lbl_LogImage');

        _Name.value = strName;
        _Date.value = strDate;
       _Img.src = strImageName;
    	$('.cd-popup').addClass('is-visible');
    },

    ClosePopup : function(type)
    {
    	$('.cd-popup').removeClass('is-visible');
    },
    RestRequestInfo : function (dDBProcessId)
    {
        var oRest = UserInfoRest (-1, '', this.UserId) + "," + ProcessInfoRest (this.MI_DEVICELOGSDUI, dDBProcessId);
        oRest += ", \""+ CProcessDBData +"\" : [{\"" + DATA + "\" : [";

        var oSearchRestData = this.UserId + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_devices")) + DATA_SEPERATOR;
        oSearchRestData += document.getElementById ("dp_fromdate").value + DATA_SEPERATOR;
        oSearchRestData += document.getElementById ("dp_todate").value + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_toptypes")) + DATA_SEPERATOR;
        oSearchRestData += this.LastDeviceLogId + DATA_SEPERATOR;
        oSearchRestData += this.LastDeviceLogDate;
        oSearchRestData = "{ \"" + this.XMLTAG_CDeviceLogsSearch + "\" : [{ \"" + DATA + "\" : \"" + oSearchRestData + "\" } ]}";

        var oRestData = "";
        if (dDBProcessId == this.MFI_DEVICELOGSUI_InitModule)
        {
            oRestData = this.UserId;
            oRestData = "{ \"" + this.XMLTAG_CDeviceLogsInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";

            oRestData = oSearchRestData + ", " + oRestData;
        }
        else if (dDBProcessId == this.MFI_DEVICELOGSUI_Search)
        {
            oRestData = oSearchRestData;
        }
        else if (dDBProcessId == this.MFI_DEVICELOGSUI_AutoRefresh)
        {
            oRestData = this.UserId + DATA_SEPERATOR;
            oRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_devices")) + DATA_SEPERATOR;
            oRestData += document.getElementById ("dp_fromdate").value + DATA_SEPERATOR;
            oRestData += document.getElementById ("dp_todate").value + DATA_SEPERATOR;
            oRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_toptypes")) + DATA_SEPERATOR;
            oRestData += this.LastDeviceLogId + DATA_SEPERATOR;
            oRestData += this.LastDeviceLogDate;
            oRestData = "{ \"" + this.XMLTAG_CDeviceLogsAutoRefresh + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";
        }
        oRest = oRest + oRestData + "]}]";
        oRest = "{ " + oRest + "}";
        return oRest;
    }
};
