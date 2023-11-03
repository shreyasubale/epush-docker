USERINFO =
{
	// region "Module Ids"
	MI_USERINFODUI : 99,
	// endregion

	// region "DB Function Ids"
	MFI_USERINFOUI_InitModule : 99001,
	MFI_USERINFOUI_Insert : 99002,
	MFI_USERINFOUI_Update : 99003,
	MFI_USERINFOUI_Search : 99011,
	// endregion

	// region "Module DB Error Ids"
	// end regon

	// region "XML Node names"
	XMLTAG_CUserInfoInit : "CUserInfoInit",
	XMLTAG_CUserInfoInsert : "CUserInfoInsert",
	XMLTAG_CUserInfoUpdate : "CUserInfoUpdate",
	XMLTAG_CUserInfoSearch : "CUserInfoSearch",

	XMLTAG_SUserInfoList : "SUserInfoList",
	XMLTAG_SUserInfoInsert : "SUserInfoInsert",
	XMLTAG_SUserInfoUpdate : "SUserInfoUpdate",
	// end region

	// message
	MSG : new MSG_USERINFO(),
	UserId : -1,
	IsAdmin : 0,
	NewUserId : -1,

	SetUserId : function()
	{
	    if (IsValidParentPage ())
	    {
            var strValue = GetRequestQueryParameter ("UserId") + "";
            if (strValue != 'undefined' && strValue != '')
            {
                this.UserId = strValue;
            }
        }
	},

	SetIsAdmin : function()
	{
		var strValue = GetRequestQueryParameter ("IsAdmin") + "";
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
			ProcessServerRequest (this.RestRequestInfo(this.MFI_USERINFOUI_InitModule), USERINFO.Process_Init, true);
		}
	},

	Process_Init : function()
	{
		var responseText = this.responseText;

		if (ShowErrorMessage (responseText, USERINFO.MSG))
		{
			try
			{
				var obj = JSON.parse(responseText);
				var oInfoObj = JSONUtil.GetJSONValues (obj, USERINFO.XMLTAG_SUserInfoList, '');
				var arrData = USERINFO.GetListViewRestData (oInfoObj);
				USERINFO.InitGridView (arrData)
			}
			catch (e)
			{
				alert(e);
			}
		}
	},

	InsertUser_Clicked : function()
	{
		var elemUserName = document.getElementById ('txt_ins_name');
		var elemPassword = document.getElementById ('txt_ins_pwd');

		if (USERINFO.Validate_UserInfo (elemUserName, elemPassword) == true)
		{
		    ProcessServerRequest (USERINFO.RestRequestInfo (USERINFO.MFI_USERINFOUI_Insert), USERINFO.Process_InsertUser, true);
		    $('.cd-insert-popup').removeClass ('is-visible');
		}
	},
	
	Validate_UserInfo : function(elemUserName, elemPassword)
	{
		var bValid = false;
		var strUserName = elemUserName.value;
		var strPassword = elemPassword.value;

        if (parseInt (this.IsAdmin) == 0)
        {
			sweetAlert(this.MSG.CM_005);
        }
        else if (strUserName == "")
		{
			sweetAlert(this.MSG.CM_001);
			elemUserName.focus ();
		}
		else if (strPassword == "")
		{
			sweetAlert(this.MSG.CM_002);
			elemPassword.focus ();
		}
		else
		{
			bValid = true;
		}
		
		return bValid;
	},

	UpdateUser_Clicked : function()
	{
		var elemUserName = document.getElementById ('txt_upd_name');
		var elemPassword = document.getElementById ('txt_upd_pwd');

		if (USERINFO.Validate_UserInfo (elemUserName, elemPassword) == true)
		{
            ProcessServerRequest (USERINFO.RestRequestInfo(USERINFO.MFI_USERINFOUI_Update), USERINFO.Process_UpdateUser, true);
            $('.cd-popup').removeClass('is-visible');
        }
	},

	SearchData_Clicked : function()
	{
        this.ResetSearchFilters ();
		ProcessServerRequest (this.RestRequestInfo(this.MFI_USERINFOUI_Search), USERINFO.Process_SearchData, true);
	},

    ResetSearchFilters : function ()
    {
       $("#list").setGridParam ({search : false, searchdata : {}, page : 1}).trigger ("reloadGrid");
    },

    ShowUserInfoList : function (responseText)
    {
        try
        {
            var obj = JSON.parse (responseText);
            USERINFO.Process_Init_UserInfoList (obj);
        }
        catch (e)
        {
            alert(e);
        }
    },

	Process_SearchData : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage (responseText, USERINFO.MSG))
		{
		    USERINFO.ShowUserInfoList (responseText);
		}
	},

	Process_InsertUser : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, USERINFO.MSG))
		{
            sweetAlert (USERINFO.MSG.CM_003);
		    USERINFO.ShowUserInfoList (responseText);
		}
		
	},

	Process_UpdateUser : function ()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, USERINFO.MSG))
		{
            sweetAlert (USERINFO.MSG.CM_004);
		    USERINFO.ShowUserInfoList (responseText);
		}
	},

	EditUser_Clicked : function (rowid)
	{
		var rowData = jQuery('#list').jqGrid('getRowData', rowid);
		var data = JSON.parse(JSON.stringify(rowData));
		if (data)
		{
            document.getElementById ("txt_upd_id").value = data['userid'];
            document.getElementById ("txt_upd_name").value = data['name'];
            document.getElementById ("cb_upd_admin").checked = (data['admin'] == "YES" ? true : false)
            document.getElementById ("cb_upd_enable").checked = (data['status'] == "Enabled" ? true : false)
            USERINFO.OpenPopup('update')
        }
	},

	/*
	 * JqGrid_Delete : function(rowid) { $('#list').jqGrid('delRowData', rowid); },
	 */

	Process_Init_UserInfoList : function(obj)
	{
		var oInfoObj = JSONUtil.GetJSONValues(obj, USERINFO.XMLTAG_SUserInfoList, '');
		var arrData = USERINFO.GetListViewRestData(oInfoObj);
		USERINFO.ReloadGridViewByBatch(arrData);
	},

	GetListViewRestData : function(oInfoObj)
	{
		var mydata = [];
		if (oInfoObj != 'undefined' && oInfoObj != null && oInfoObj.length > 0)
		{
			var oInfo = new DS_UserInfo();
			var oObj = oInfoObj[0];
			if (oObj != 'undefined' && oObj.length > 0)
			{
				for (var nIndex = 0; nIndex < oObj.length; nIndex++)
				{
					var strDataText = JSONUtil.GetJSONValues(oObj[nIndex],
							'data');
					oInfo.InitDataStructure(strDataText);
					if (oInfo.GetUserTypeId() == 1)
					{
						var admin = "YES"
					}
					else
					{
						admin = "&nbsp;"
					}
					if(oInfo.GetAccessTypeId() == 1)
					{
						var status = "Enabled"
					}
					else
					{
						status = "Disabled"
					}
					mydata[nIndex] =
					{
						userid : oInfo.GetUserId(),
						name : oInfo.GetUserName(),
						pwd : "********",
						admin : admin,
						lastlogin : oInfo.GetLastLoginDate(),
						status : status
					};
				}
			}
		}

		return mydata;
	},

	ReloadGridViewByBatch : function(arrData)
	{
		$('#list').setGridParam ({'suspendPager' : true});
		$('#list').jqGrid("clearGridData", true);
		$('#list').setGridParam({data : arrData});
		$('#list').trigger('reloadGrid');
		$('#list').setGridParam({'suspendPager' : false});
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
			rownumWidth : 25,
			viewrecords : true,
            altRows : true,
			altclass : 'myAltRowClass',
            rowList : [ 100, 500, 1000, 5000, 10000  ],
			pager : "#jqGridPager",
			colModel :
			[
			{
				label : 'User Id',
				name : 'userid',
				width : 80,
				align : 'center',
				edittype : "text",
				editable : true,
				edittype : 'custom',
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
				label : 'Login-Name',
				name : 'name',
				width : 120,
				sorttype : 'string',
				formatter : 'string',
				align : 'center',
				editable : true,
				editrules :
				{
					custom : true,
					custom_func : validate
				}
			},
			{
				label : 'Password',
				name : 'pwd',
				width : 0,
				sorttype : 'string',
				formatter : 'string',
				edittype : "password",
				align : 'center',
				editable : true,
				editrules :
				{
					custom : true,
					custom_func : validate
				},
				hidden : true,
				editoptions : {

				}
			},
			{
				label : 'cbPassword',
				name : 'cbpwd',
				width : 0,
				sorttype : 'string',
				formatter : 'string',
				align : 'center',
				editable : true,
				hidden : true,
				edittype : 'checkbox',
				editoptions :
				{
					edithidden : true,
				}
			},
			{
				label : 'Admin',
				name : 'admin',
				width : 80,
				sorttype : 'string',
				formatter : 'string',
				align : 'center',
				editable : true,
				edittype : "checkbox",
			},
			{
				label : 'Last-Login',
				name : 'lastlogin',
				width : 300,
				align : 'center',
				editable : true
			},
			{
				label : 'Edit',
				name : 'edit',
				width : 50,
				align : 'center',
				formatter : fmt_edit,
				editable : false
			},
			{
				label : 'Status',
				name : 'status',
				width : 50,
				align : 'center',
				editable : false
			}, ],
			viewrecords : true,

		})

		function fmt_edit(cellval, options, rowdata)
		{
			formatted_cellval = "<button class='cd-popup-trigger'  type='button'  onclick='JavaScript:USERINFO.EditUser_Clicked("
					+ options.rowId
					+ ");' title='edit'><i class='fa fa-edit'></i></button>";
			return formatted_cellval;
		}

		/*
		 * function fmt_delete(cellval, options, rowdata) { formatted_cellval = "<button
		 * onclick='JavaScript:USERINFO.JqGrid_Delete(" + options.rowId + ");'
		 * title='edit'><i class='icon-remove'></i></button>"; return
		 * formatted_cellval; }
		 */

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
				USERINFO.NewUserId = $(elem).text();
			}
			else if (operation === 'set')
			{
				$('span', elem).text(value);
			}
		}

		function validate (value, colname)
		{
			if (value == "")
			{
				if (colname == "Login-Name")
				{
					return
					    [ false, "Please enter Login Name" ];
				}
				else if (colname == "Password")
				{
					return
					    [ false, "Please enter Password" ];
				}
			}
			else
			{
				return
				[ true, "" ];
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

		$("#list").jqGrid('bindKeys');

		$(window).resize(function()
		{
			var outerwidth = $('#grid').width();
			$('#list').setGridWidth(outerwidth);
			$("#list").jqGrid({

			})
			// setGridWidth method sets a new width to the grid dynamically
		});
	},

	Clear_InsertUser_Page : function()
	{
	    document.getElementById ("txt_ins_name").value = "";
	    document.getElementById ("txt_ins_pwd").value = "";
	    document.getElementById ("cb_ins_admin").checked = false;
	    document.getElementById ("cb_ins_enable").checked = false;
    },

	Clear_UpdateUser_Page : function()
	{
    },

	OpenPopup : function(type)
	{
		if (type == 'insert')
		{
		    USERINFO.Clear_InsertUser_Page ();
			$('.cd-insert-popup').addClass('is-visible');
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
		var oRest = UserInfoRest(-1, '', this.UserId) + "," + ProcessInfoRest(this.MI_USERINFODUI, dDBProcessId);
		oRest += ", \"" + CProcessDBData + "\" : [{\"" + DATA + "\" : [";

		var oSearchData = "";
		oSearchData += GetComboBoxSelectedValue (document .getElementById ("cmb_usertypes")) + DATA_SEPERATOR;
		oSearchData += GetComboBoxSelectedValue(document .getElementById("cmb_toptypes")) + DATA_SEPERATOR;
		oSearchData += GetComboBoxSelectedValue(document .getElementById("cmb_status"));
		oSearchData = "{ \"" + this.XMLTAG_CUserInfoSearch + "\" : [{ \"" + DATA + "\" : \"" + oSearchData + "\" } ]}";

		var oRestData = "";
		if (dDBProcessId == this.MFI_USERINFOUI_InitModule)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CUserInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";

			oRestData = oSearchData + ", " + oRestData;
		} 
		else if (dDBProcessId == this.MFI_USERINFOUI_Search)
		{
			oRestData = oSearchData;
		} 
		else if (dDBProcessId == this.MFI_USERINFOUI_Insert)
		{
			var oUserRestData = this.UserId
			oUserRestData = "{\"" + this.XMLTAG_CUserInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oUserRestData + "\" }]}";
			var adminValue = (document.getElementById("cb_ins_admin").checked == true ? 1: 0);
			var statusValue = (document.getElementById("cb_ins_enable").checked == true ? 1: 0);

			var arrObjects =
			    [
                    USERINFO.NewUserId,
                    document.getElementById("txt_ins_name").value,
                    document.getElementById("txt_ins_pwd").value,
                    adminValue,
                    statusValue
                 ];
			oRestData = JSONUtil.GetRestData (USERINFO.XMLTAG_CUserInfoInsert, arrObjects);
			oRestData = oUserRestData + ", " + oRestData + ", " + oSearchData;
		} 
		else if (dDBProcessId == this.MFI_USERINFOUI_Update)
		{
			var oUserRestData = this.UserId
			oUserRestData = "{\"" + this.XMLTAG_CUserInfoInit + "\" : [{ \"" + DATA + "\" : \"" + oUserRestData + "\" }]}";
			var adminValue = (document.getElementById ('cb_upd_admin').checked == true ? 1 : 0);
			var statusValue = (document.getElementById ("cb_upd_enable").checked == true ? 1: 0);
			var updatePassword = (document.getElementById ('cb_upd_updatepwd').checked == true ? 1: 0);

			var arrObjects =
                [
                    document.getElementById('txt_upd_id').value,
                    document.getElementById('txt_upd_name').value,
                    document.getElementById('txt_upd_pwd').value,
                    updatePassword, adminValue, statusValue
                ];

			oRestData = JSONUtil.GetRestData(USERINFO.XMLTAG_CUserInfoUpdate,arrObjects);
			oRestData = oUserRestData + ", " + oRestData + ", " + oSearchData;
		}
		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	},
};
