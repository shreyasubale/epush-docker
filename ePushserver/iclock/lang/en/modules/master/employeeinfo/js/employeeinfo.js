EMPLOYEEINFO =
{
	// region "Module Ids"
	MI_EMPLOYEEINFOUI : 101,

	// endregion
	// region "DB Function Ids"
	MFI_EMPLOYEEINFOUI_InitModule : 101001,
	MFI_EMPLOYEEINFOUI_Insert : 101002,
	MFI_EMPLOYEEINFOUI_Update : 101003,
	MFI_EMPLOYEEINFOUI_Delete : 101004,
	MFI_EMPLOYEEINFOUI_Search : 101011,
	// endregion

	// region "Module DB Error Ids"
	// end region

	// region "XML Node names"
	XMLTAG_CEmployeeInfoInit : "CEmployeeInfoInit",
	XMLTAG_CEmployeeInfoInsert : "CEmployeeInfoInsert",
	XMLTAG_CEmployeeInfoUpdate : "CEmployeeInfoUpdate",
	XMLTAG_CEmployeeInfoDelete : "CEmployeeInfoDelete",
	XMLTAG_CEmployeeInfoSearch : "CEmployeeInfoSearch",

	XMLTAG_SEmployeeInfoList : "SEmployeeInfoList",
	XMLTAG_SEmployeeInfoInsert : "SEmployeeInfoInsert",
	XMLTAG_SEmployeeInfoUpdate : "SEmployeeInfoUpdate",
	// end region

	// message
	MSG : new MSG_EMPLOYEEINFO(),
	UserId : -1,
	IsAdmin : 0,
	NewEmployeeId : -1,
	STATUS_ACTIVE : "ACTIVE",
	STATUS_INACTIVE : "IN-ACTIVE",

	SetUserId : function()
	{
	    if (IsValidParentPage ())
	    {
            var strValue = GetRequestQueryParameter("UserId");
            if (strValue != 'undefined' && strValue != '')
            {
                this.UserId = strValue;
            }
        }
	},

	SetIsAdmin : function()
	{
		var strValue = GetRequestQueryParameter("IsAdmin");
		if (strValue != 'undefined' && strValue != '')
		{
			this.IsAdmin = strValue;
		}
	},

	InitPage : function()
	{
		this.SetUserId();
		this.SetIsAdmin();
		if (this.UserId > 0)
		{
			ProcessServerRequest(this .RestRequestInfo(this.MFI_EMPLOYEEINFOUI_InitModule), EMPLOYEEINFO.Process_Init, true);
		}
	},

	Process_Init : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, EMPLOYEEINFO.MSG))
		{
			try
			{
				var obj = JSON.parse(responseText);
				var oInfoObj = JSONUtil.GetJSONValues (obj, EMPLOYEEINFO.XMLTAG_SEmployeeInfoList, '');
				var arrData = EMPLOYEEINFO.GetListViewRestData (oInfoObj);
				EMPLOYEEINFO.InitGridView (arrData)
			}
			catch (e)
			{
				alert("Process_Init " + e);
			}
		}
	},

	InsertUser_Clicked : function()
	{
		if (EMPLOYEEINFO.Validate_Insert_Input_Click() == true)
		{
			ProcessServerRequest (EMPLOYEEINFO.RestRequestInfo (EMPLOYEEINFO.MFI_EMPLOYEEINFOUI_Insert), EMPLOYEEINFO.Process_InsertUser, true);
		}
	},

	UpdateUser_Clicked : function()
	{
		if (EMPLOYEEINFO.Validate_Update_Input_Click() == true)
		{
			ProcessServerRequest(EMPLOYEEINFO.RestRequestInfo (EMPLOYEEINFO.MFI_EMPLOYEEINFOUI_Update), EMPLOYEEINFO.Process_UpdateUser, true);
		}
	},

	Clear_InsertEmployee_Page : function()
	{
		document.getElementById ("txt_insert_emp_name").value = "";
		document.getElementById ("txt_insert_emp_code").value = "";
		document.getElementById ("txt_insert_emp_code_in_device").value = "";
		document.getElementById ("txt_insert_emp_device_pwd").value = "";
		document.getElementById ("txt_insert_rfid_number").value = "";
		document.getElementById ("cmb_insert_status").value = "1";
	},

	SearchData_Clicked : function ()
	{
        this.ResetSearchFilters ();
		ProcessServerRequest (this .RestRequestInfo(this.MFI_EMPLOYEEINFOUI_Search), EMPLOYEEINFO.Process_SearchData, true);
	},

    ResetSearchFilters : function ()
    {
       $("#list").setGridParam ({search : false, searchdata : {}, page : 1}).trigger ("reloadGrid");
    },

	Process_SearchData : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, EMPLOYEEINFO.MSG))
		{
			try
			{
				var obj = JSON.parse(responseText);
				EMPLOYEEINFO.Process_Init_EmployeeInfoList (obj);
			}
			catch (e)
			{
				alert("Process_SearchData " + e);
			}
		}
	},

	Process_InsertUser : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, EMPLOYEEINFO.MSG))
		{
			try
			{
                $('.cd-insert-popup').removeClass('is-visible');

			    sweetAlert (EMPLOYEEINFO.MSG.CM_003)
				var obj = JSON.parse(responseText);
				EMPLOYEEINFO.Process_Init_EmployeeInfoList (obj);
			}
			catch (e)
			{
				alert("Process_Insert_Update_Search " + e);
			}
		}
	},

	Process_UpdateUser : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, EMPLOYEEINFO.MSG))
		{
			try
			{
                $('.cd-popup').removeClass('is-visible');

			    sweetAlert (EMPLOYEEINFO.MSG.CM_004)
				var obj = JSON.parse(responseText);
				EMPLOYEEINFO.Process_Init_EmployeeInfoList (obj);
			}
			catch (e)
			{
				alert("Process_Insert_Update_Search " + e);
			}
		}
	},

    Validate_Insert_Input_Click : function(event)
	{
		var bValid = false;
		var strEmployeeCode = document.getElementById('txt_insert_emp_code').value;
		var strEmployeeCodeInDevice = document .getElementById('txt_insert_emp_code_in_device').value;
		if (strEmployeeCode == "")
		{
			sweetAlert (this.MSG.CM_001);
		}
		else if (strEmployeeCodeInDevice == "")
		{
			sweetAlert (this.MSG.CM_002);
		}
		else
		{
			bValid = true;
		}
		return bValid;
	},

	Validate_Update_Input_Click : function(event)
	{
		var bValid = false;
		var strEmployeeCode = document.getElementById ('txt_update_emp_code').value;
		var strEmployeeCodeInDevice = document .getElementById ('txt_update_emp_code_in_device').value;
		if (strEmployeeCode == "")
		{
			sweetAlert(this.MSG.CM_001);
		}
		else if (strEmployeeCodeInDevice == "")
		{
			sweetAlert(this.MSG.CM_002);
		}
		else
		{
			bValid = true;
		}
		return bValid;
	},

	UpdateEmployeeInfo : function(rowid)
	{
		var rowData = jQuery ('#list').jqGrid ('getRowData', rowid);
		var data = JSON.parse (JSON.stringify (rowData));
		if (data)
		{
            document.getElementById ("txt_update_emp_id").value = data ['id'];
            document.getElementById ("txt_update_emp_name").value = (data ['name'] + "").trim();
            document.getElementById ("txt_update_emp_code").value = data ['code'];
            document.getElementById ("txt_update_emp_code_in_device").value = data ['codeindevice'];
            document.getElementById ("txt_update_emp_device_pwd").value = data ['devicepassword'];
            document.getElementById ("txt_update_rfid_number").value = data ['rfidnumber'];
            var nStatus = data['status'] == this.STATUS_INACTIVE ? 0 : 1;
            document.getElementById ("cmb_update_status").value = nStatus;
        }
		EMPLOYEEINFO.OpenPopup ('update')
	},

	DeleteEmployeeInfo : function(rowid)
	{
	    swal
	    (
	        {
	            title: "Are you sure?",
	            text: this.MSG.CM_006,
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "Yes, In-Activate it!",
	            closeOnConfirm: false
            },
            function ()
            {
                var rowData = jQuery ('#list').jqGrid ('getRowData', rowid);
                var data = JSON.parse (JSON.stringify (rowData));
                if (data)
                {
                    EMPLOYEEINFO.NewEmployeeId = data ['id'];
                    if (EMPLOYEEINFO.NewEmployeeId > 0)
                    {
                        ProcessServerRequest (EMPLOYEEINFO.RestRequestInfo (EMPLOYEEINFO.MFI_EMPLOYEEINFOUI_Delete), EMPLOYEEINFO.Process_DeleteData, true);
                    }
                }
            }
        );
	},

	Process_DeleteData : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, EMPLOYEEINFO.MSG))
		{
			try
			{
				var obj = JSON.parse(responseText);
				EMPLOYEEINFO.Process_Init_EmployeeInfoList (obj);
                swal ("In-Activate!", EMPLOYEEINFO.MSG.CM_005, "success");
			}
			catch (e)
			{
				alert("Process_DeleteData " + e);
			}
		}
        this.NewEmployeeId = -1;
	},

	/*
	 * JqGrid_Delete : function(rowid) { $('#list').jqGrid('delRowData', rowid); },
	 */

	Process_Init_EmployeeInfoList : function(obj)
	{
		var oInfoObj = JSONUtil.GetJSONValues (obj, EMPLOYEEINFO.XMLTAG_SEmployeeInfoList, '');
		var arrData = EMPLOYEEINFO.GetListViewRestData (oInfoObj);
		EMPLOYEEINFO.ReloadGridViewByBatch (arrData);
	},

	GetListViewRestData : function(oInfoObj)
	{
		var mydata = [];
		if (oInfoObj != 'undefined' && oInfoObj != null && oInfoObj.length > 0)
		{
			var oInfo = new DS_EmployeeInfo();
			var oObj = oInfoObj[0];
			if (oObj != 'undefined' && oObj.length > 0)
			{
				for (var nIndex = 0; nIndex < oObj.length; nIndex++)
				{
					var strDataText = JSONUtil.GetJSONValues(oObj[nIndex], 'data');
					oInfo.InitDataStructure(strDataText);

					mydata[nIndex] =
					{
						id : oInfo.GetData(oInfo.DB_EmployeeId),
						name : oInfo.GetData(oInfo.DB_EmployeeName),
						code : oInfo.GetData(oInfo.DB_EmployeeCode),
						codeindevice : oInfo .GetData(oInfo.DB_EmployeeCodeInDevice),
						devicepassword : oInfo .GetData(oInfo.DB_EmployeeDevicePassword),
						rfidnumber : oInfo.GetData(oInfo.DB_EmployeeRFIDNumber),
						status : EMPLOYEEINFO.GetEmployeeStatus (oInfo.GetData (oInfo.DB_RecordStatus))
					};
				}
			}
		}

		return mydata;
	},

	GetEmployeeStatus : function (strStatusId)
	{
	    var strStatus = this.STATUS_ACTIVE;
        var nStatusId = parseInt (strStatusId);
        if (nStatusId == 0)
        {
            strStatus = this.STATUS_INACTIVE;
        }
	    return strStatus;
    },

	ReloadGridViewByBatch : function(arrData)
	{
		$('#list').setGridParam ({ 'suspendPager' : true });
		$('#list').jqGrid("clearGridData", true);
		$('#list').setGridParam ({ data : arrData });
		$('#list').trigger ('reloadGrid');
		$('#list').setGridParam ({'suspendPager' : false});
	},

	InitGridView : function(mydata)
	{
		var data1 = $("#list").jqGrid(
		{
			datatype : "local",
			editurl : 'clientArray',
			data : mydata,
			height : 300,
			autowidth : true,
			reloadAfterSubmit : false,
			shrinkToFit : true,
			page : 1,
			rowNum : 100,
			rownumbers : true,
			rownumWidth : 35,
			viewrecords : true,
            altRows : true,
			altclass : 'myAltRowClass',
			rowList : [ 100, 500, 1000, 5000, 10000 ],
			pager : "#jqGridPager",
			colModel :
			[
			{
				label : 'Empl. Id',
				name : 'id',
				width : 80,
				align : 'center',
				editoptions :
				{
					custom_element : readOnlyElement,
					custom_value : readOnlyValue
				},
				editrules :
				{
					required : true,
				},
			},
			{
				label : 'Emp. Name',
				name : 'name',
				width : 150,
				sorttype : 'string',
				formatter : 'string',
				align : 'left',
			},
			{
				label : 'Emp. Code',
				name : 'code',
				width : 100,
				sorttype : 'string',
				formatter : 'string',
				edittype : "text",
				align : 'center',
			},
			{
				label : 'Emp. Code In Device',
				name : 'codeindevice',
				width : 100,
				sorttype : 'string',
				formatter : 'string',
				align : 'center',
			},
			{
				label : 'Emp. Device Pwd.',
				name : 'devicepassword',
				width : 100,
				align : 'center',
				editable : true
			},
			{
				label : 'RFID Number',
				name : 'rfidnumber',
				width : 100,
				formatter : 'string',
				align : 'center',
			},
			{
				label : 'Status',
				name : 'status',
				width : 60,
				formatter : 'string',
				align : 'center',
			},
			{
				label : 'Edit',
				name : 'edit',
				width : 50,
				align : 'center',
				formatter : fmt_edit,
			},
			{
				label : 'In-Activate',
				name : 'delete',
				width : 50,
				align : 'center',
				formatter : fmt_delete,
			},
			],
			viewrecords : true,
		})

		function fmt_edit(cellval, options, rowdata)
		{
			formatted_cellval = "<button class='cd-popup-trigger' type='button'  onclick='JavaScript:EMPLOYEEINFO.UpdateEmployeeInfo("
					+ options.rowId
					+ ");' title='edit'><i class='fa fa-edit'></i></button>";
			return formatted_cellval;
		}

		function fmt_delete(cellval, options, rowdata)
		{
			formatted_cellval = "<button class='cd-popup-trigger' type='button'  onclick='JavaScript:EMPLOYEEINFO.DeleteEmployeeInfo("
					+ options.rowId
					+ ");' title='In-Activate'><i class='fa fa-trash-o'></i></button>";
			return formatted_cellval;
		}

		function readOnlyElement(value, options)
		{
			return $('<span></span>',
			{
				text : value
			});
		}

		function readOnlyValue(elem, operation, value)
		{
			if (operation === 'get')
			{
				return $(elem).text();
				EMPLOYEEINFO.NewUserId = $(elem).text();
			}
			else if (operation === 'set')
			{
				$('span', elem).text(value);
			}
		}

		// add navigation bar with some built in actions for the grid
		$('#list').navGrid('#jqGridPager',
		{
			edit : false,
			jqModel : true,
			add : false,
			del : false,
			search : true,
			refresh : true,
			view : false,
			position : "left",
			cloneToTop : false,
		});
        $('#list').jqGrid
        ( 'navButtonAdd','#jqGridPager',
            {
                caption:"Export to CSV",
                onClickButton : function ()
                {
                    var arrHeader = $("#list").jqGrid ('getGridParam','colNames');
                    var arrData = $("#list").jqGrid ('getGridParam', 'data');
                    var arrExcludeHeader = [0, 1, 7, 8, 9]
                    var arrExcludeData = [0, 6, 7, 8]
                    JSONUtil.JSONToCSVConvertor ('EmployeeInfo', false, "Employee Details", true, arrHeader, arrExcludeHeader, arrData, arrExcludeData);
                }
            }
        );

		$("#list").jqGrid ('bindKeys');

		$(window).resize (function ()
		{
			var outerwidth = $('#grid').width ();
			$('#list').setGridWidth (outerwidth);
			$("#list").jqGrid({

			})
			// setGridWidth method sets a new width to the grid dynamically
		});
	},

	OpenPopup : function(type)
	{
		if (type == 'insert')
		{
			$('.cd-insert-popup').addClass('is-visible');
			EMPLOYEEINFO.Clear_InsertEmployee_Page();
		}
		else
			$('.cd-popup').addClass('is-visible');
	},

	ClosePopup : function(type)
	{
		// open PopUp
		if (type == 'insert')
			$('.cd-insert-popup').removeClass('is-visible');
		else
			$('.cd-popup').removeClass('is-visible');
	},

	RestRequestInfo : function(dDBProcessId)
	{
		var oRest = UserInfoRest(-1, '', this.UserId) + "," + ProcessInfoRest(this.MI_EMPLOYEEINFOUI, dDBProcessId);
		oRest += ", \"" + CProcessDBData + "\" : [{\"" + DATA + "\" : [";

		var oSearchData = "";

		oSearchData += GetComboBoxSelectedValue(document.getElementById("cmb_toptypes")) + DATA_SEPERATOR;
		oSearchData += GetComboBoxSelectedValue (document.getElementById ("cmb_statustypes"));
		oSearchData = "{ \"" + this.XMLTAG_CEmployeeInfoSearch + "\" : [{ \"" + DATA + "\" : \"" + oSearchData + "\" } ]}";

		var oRestData = "";
		if (dDBProcessId == this.MFI_EMPLOYEEINFOUI_InitModule)
		{
			oRestData = this.UserId;
			oRestData = "{\"" + this.XMLTAG_CEmployeeInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";
			oRestData = oSearchData + ", " + oRestData;
		}

		else if (dDBProcessId == this.MFI_EMPLOYEEINFOUI_Search)
		{
			oRestData = oSearchData;
		}
		else if (dDBProcessId == this.MFI_EMPLOYEEINFOUI_Insert)
		{
			var oUserRestData = this.UserId;
			oUserRestData = "{\"" + this.XMLTAG_CEmployeeInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oUserRestData + "\" }]}";
			var arrObjects =
			[
                EMPLOYEEINFO.NewEmployeeId,
                " " + document.getElementById('txt_insert_emp_name').value,
                " " + document.getElementById('txt_insert_emp_code').value,
                " " + document.getElementById('txt_insert_emp_code_in_device').value,
                " " + document.getElementById('txt_insert_emp_device_pwd').value,
                " " + document.getElementById('txt_insert_rfid_number').value,
                " " + GetComboBoxSelectedValue (document.getElementById ("cmb_insert_status"))
            ];

			oRestData = JSONUtil.GetRestData (EMPLOYEEINFO.XMLTAG_CEmployeeInfoInsert, arrObjects);
			oRestData = oUserRestData + ", " + oRestData + ", " + oSearchData;
		}
		else if (dDBProcessId == this.MFI_EMPLOYEEINFOUI_Update)
		{
			var oUserRestData = this.UserId;
			oUserRestData = "{\"" + this.XMLTAG_CEmployeeInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oUserRestData + "\" }]}";
			var arrObjects =
			[
                document.getElementById('txt_update_emp_id').value,
                " " + document.getElementById('txt_update_emp_name').value,
                " " + document.getElementById('txt_update_emp_code').value,
                " " + document.getElementById('txt_update_emp_code_in_device').value,
                " " + document.getElementById('txt_update_emp_device_pwd').value,
                " " + document.getElementById('txt_update_rfid_number').value,
                " " + GetComboBoxSelectedValue (document.getElementById ("cmb_update_status"))
            ];
			oRestData = JSONUtil.GetRestData (EMPLOYEEINFO.XMLTAG_CEmployeeInfoUpdate, arrObjects);
			oRestData = oUserRestData + ", " + oRestData + ", " + oSearchData;
		}
		else if (dDBProcessId == this.MFI_EMPLOYEEINFOUI_Delete)
		{
			var oUserRestData = this.UserId;
			oUserRestData = "{\"" + this.XMLTAG_CEmployeeInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oUserRestData + "\" }]}";
			var arrObjects =
			[
                EMPLOYEEINFO.NewEmployeeId
            ];

			oRestData = JSONUtil.GetRestData (EMPLOYEEINFO.XMLTAG_CEmployeeInfoDelete, arrObjects);
			oRestData = oUserRestData + ", " + oRestData + ", " + oSearchData;
		}
		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	},
};
