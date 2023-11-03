DEVICEEMPLOYEES =
{
	// region "Module Ids"
	MI_DEVICEEMPLOYEESDUI : 305,

	// endregion

	// region "DB Function Ids"
	MFI_DEVICEEMPLOYEESUI_InitModule : 305001,
	MFI_DEVICEEMPLOYEESUI_Search : 305011,
	// endregion

	// region "Module DB Error Ids"

	// end region

	// region "XML Node names"
	XMLTAG_CDeviceEmployeesInit : "CDeviceEmployeesInit",
	XMLTAG_CDeviceEmployeesSearch : "CDeviceEmployeesSearch",

    XMLTAG_SOPLogTypeList : "SOPLogTypeList",
    XMLTAG_SDeviceList : "SDeviceList",
	XMLTAG_SDeviceEmployeesList : "SDeviceEmployeesList",
	// end region

	// message
	MSG : new MSG_DEVICEEMPLOYEES (),
	UserId : -1,
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
            DEVICEEMPLOYEES.InitGridView (arrData);
            DEVICEEMPLOYEES.Init_Dates ();

			ProcessServerRequest (this.RestRequestInfo (this.MFI_DEVICEEMPLOYEESUI_InitModule), DEVICEEMPLOYEES.Process_Init, true);
        }
    },
	ClosePage : function ()
	{
		this.UserId = 0;
	},

	Process_Init : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICEEMPLOYEES.MSG))
		{
			try
			{
				var obj = JSON.parse (responseText);
				FillCombo (obj, DEVICEEMPLOYEES.XMLTAG_SDeviceList, document.getElementById ("cmb_devices"));
			}
			catch (e)
			{
				alert (e);
			}
		}
	},

	Init_Dates : function ()
	{
        $( "#dp_fromdate" ).datepicker
        (
            {
                changeMonth: true,
                changeYear: true,
                dateFormat: "yy-mm",
                showButtonPanel: true,
                currentText: "This Month",
                onChangeMonthYear: function (year, month, inst)
                {
                    $(this).val($.datepicker.formatDate('yy-mm', new Date(year, month - 1, 1)));
                },
                onClose: function(dateText, inst)
                {
                    var month = $(".ui-datepicker-month :selected").val();
                    var year = $(".ui-datepicker-year :selected").val();
                    $(this).val($.datepicker.formatDate('yy-mm', new Date(year, month, 1)));
                    $(".ui-datepicker-calendar").hide();
                },
                beforeShow : function(input, inst)
                {
                    $(".ui-datepicker-calendar").hide();
                    if ((datestr = $(this).val()).length > 0)
                    {
                        actDate = datestr.split('-');
                        year = actDate[0];
                        month = actDate[1]-1;
                        day = actDate[1];
                        $(this).datepicker('option', 'defaultDate', new Date(year, month, day));
                        $(this).datepicker('setDate', new Date(year, month, day));
                    }
                }
            }
        ).focus(function ()
        {
             $(".ui-datepicker-calendar").hide();
             $('.ui-datepicker-calendar').detach();
         });


        $("#dp_fromdate").click(function ()
        {
            $(".ui-datepicker-calendar").hide();
            $('.ui-datepicker-calendar').detach();
        });

        var now = new Date();
        var month = (now.getMonth() + 1);
        var day = now.getDate();
        if(month < 10)
            month = "0" + month;
        if(day < 10)
            day = "0" + day;

        var today = now.getFullYear() + '-' + month;// + '-' + '01';
        $('#dp_fromdate').val(today);
    },

	SearchData_Clicked : function ()
	{
        if (DEVICEEMPLOYEES.ValidateDevice () == true)
		{
            this.ResetSearchFilters ();
	        $ ('#list').jqGrid ("clearGridData", true);
            ProcessServerRequest (this.RestRequestInfo (this.MFI_DEVICEEMPLOYEESUI_Search), DEVICEEMPLOYEES.Process_Search, true);
        }
        else
        {
            $ ('#list').jqGrid ("clearGridData", true);
        }
    },

    ResetSearchFilters : function ()
    {
       $("#list").setGridParam ({search : false, searchdata : {}, page : 1}).trigger ("reloadGrid");
    },

    ValidateDevice : function ()
    {
        var bValid = false;
        if (parseInt (GetComboBoxSelectedValue (document.getElementById ("cmb_devices"))) <= CON_DEFAULT)
        {
            sweetAlert ("Please Select Devices...");
        }
        else
        {
            bValid = true;
        }
        return bValid;
    },

	Process_Search : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, DEVICEEMPLOYEES.MSG))
		{
			try
			{
				var obj = JSON.parse (responseText);
                if (obj)
                {
                    DEVICEEMPLOYEES.Process_Init_DeviceEmployeeList (obj);
                }
			}
			catch (e)
			{
				alert (e);
			}
		}
	},

	Process_Init_DeviceEmployeeList : function (obj)
	{
        LoadingPopup ();
        var oInfoObj = JSONUtil.GetJSONValues (obj, DEVICEEMPLOYEES.XMLTAG_SDeviceEmployeesList, '');
        if (oInfoObj)
        {
            var arrInfoObj = JSONUtil.GetJSONValues (oInfoObj, 'data', '');
            if (arrInfoObj)
            {
                DEVICEEMPLOYEES.DisplayGridViewByBatch (arrInfoObj);
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
						label : 'Device-Id',
						name : 'lbl_DeviceId',
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
						width : 120,
						align : 'center'
					},
					{
						label : 'Device-Location',
						name : 'lbl_DeviceLocation',
						width : 120,
						align : 'center'
					},
					{
						label : 'Emp.Id',
						name : 'lbl_EmployeeId',
						width : 90,
						align : 'center',
						sorttype: 'number'
					},
					{
						label : 'Emp. Name',
						name : 'lbl_EmployeeName',
						width : 150,
						align : 'center'
					},
					{
						label : 'Emp.Code in Device',
						name : 'lbl_EmployeeCode',
						width : 120,
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
		var oRest = UserInfoRest (-1, '', this.UserId) + "," + ProcessInfoRest (this.MI_DEVICEEMPLOYEESDUI, dDBProcessId);
		oRest += ", \""+ CProcessDBData +"\" : [{\"" + DATA + "\" : [";

        var oSearchRestData = this.UserId + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_devices")) + DATA_SEPERATOR;
        oSearchRestData += (document.getElementById ("dp_fromdate").value + '-01') + DATA_SEPERATOR;
        oSearchRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_toptypes"));

        oSearchRestData = "{ \"" + this.XMLTAG_CDeviceEmployeesSearch + "\" : [{ \"" + DATA + "\" : \"" + oSearchRestData + "\" } ]}";

		var oRestData = "";
		if (dDBProcessId == this.MFI_DEVICEEMPLOYEESUI_InitModule)
		{
			oRestData = this.UserId;
			oRestData = "{ \"" + this.XMLTAG_CDeviceEmployeesInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" } ]}";

            oRestData = oSearchRestData + ", " + oRestData;
		}
		else if (dDBProcessId == this.MFI_DEVICEEMPLOYEESUI_Search)
		{
			oRestData = oSearchRestData;
		}
		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	}
};
