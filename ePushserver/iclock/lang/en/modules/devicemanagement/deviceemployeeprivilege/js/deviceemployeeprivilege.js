DEVICEEMPLOYEEPRIVILEGE =
{
	// region "Module Ids"
	MI_DEVICEEMPLOYEEPRIVILEGEUI : 306,

	// endregion

	// region "DB Function Ids"
	MFI_DEVICEEMPLOYEEPRIVILEGEUI_InitModule : 306001,
	MFI_DEVICEEMPLOYEEPRIVILEGEUI_Upload : 306012,
	// endregion

	// region "Module DB Error Ids"

	// end region

	// region "XML Node names"
	XMLTAG_CDeviceEmployeePrivilegeInit : "CDeviceEmployeePrivilegeInit",
	XMLTAG_CDeviceEmployeePrivilegeUpload : "CDeviceEmployeePrivilegeUpload",

	XMLTAG_SDeviceEmployeePrivilegeList : "SDeviceEmployeePrivilegeList",
	XMLTAG_SEmployeeList : "SEmployeeList",
	XMLTAG_SDeviceFNameList : "SDeviceFNameList",
	// end region

	// message
	MSG : new MSG_DEVICEEMPLOYEEPRIVILEGE(),
	UserId : -1,
	IsAdmin : 0,
	NewEmployeeId : -1,

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
			ProcessServerRequest (this.RestRequestInfo(this.MFI_DEVICEEMPLOYEEPRIVILEGEUI_InitModule), DEVICEEMPLOYEEPRIVILEGE.Process_Init, true);
		}
	},

	Process_Init : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, DEVICEEMPLOYEEPRIVILEGE.MSG))
		{
			try
			{
				var obj = JSON.parse(responseText);
				FillCombo (obj, DEVICEEMPLOYEEPRIVILEGE.XMLTAG_SEmployeeList, document .getElementById ("cmb_employees"));
				FillCombo (obj, DEVICEEMPLOYEEPRIVILEGE.XMLTAG_SDeviceFNameList, document.getElementById ("cmb_device_fname"));

                jQuery.fn.filterByText = function (textbox, selectSingleMatch)
				{
					return this.each(function()
					{
						var select = this;
						var options = [];
						$(select).find('option').each(function()
						{
							options.push(
							{
								value : $(this).val(),
								text : $(this).text()
							});
						});
						$(select).data('options', options);
						$(textbox).bind('change keyup',function()
								{
									var options = $(select).empty().data('options');
									var search = $(this).val().trim();
									var regex = new RegExp(search, "gi");

									$.each(options, function(i)
									{
										var option = options[i];
										if (option.text.match(regex) != null)
										{
											$(select).append($('<option>').text(option.text).val(option.value));
										}
									});
									if (selectSingleMatch === true
											&& $(select).children().length === 1)
									{
										$(select).children().get(0).selected = true;
									}
								});
					});
				};

				$(function()
						{
							$('#cmb_employees').filterByText($('#search_cmb_employees'), false);
							$("select option").click(function()
							{
							});
						});

				$(function()
						{
							$('#cmb_device_fname').filterByText($('#search_cmb_device_fname'), false);
							$("select option").click(function()
							{
							});
						});
			}
			catch (e)
			{
				alert("Process_Init " + e);
			}
		}
	},

	UploadEmployeesPrivilege_Clicked : function()
	{
	    if (this.IsValid ())
            ProcessServerRequest (this.RestRequestInfo(this.MFI_DEVICEEMPLOYEEPRIVILEGEUI_Upload), DEVICEEMPLOYEEPRIVILEGE.Process_DeviceEmployeePrivilege, true);
	},

	IsValid : function()
	{
	    var bValid = false;
        var oCombo_Device = document.getElementById ("cmb_device_fname_selected");
	    var nComboLength_Device = oCombo_Device.options.length;
        var oCombo_Employees = document.getElementById ("cmb_employees_selected");
	    var nComboLength_Employees = oCombo_Employees.options.length;
        var privilege = GetComboBoxSelectedValue (document.getElementById ("cmb_privilegetypes"));

        if (nComboLength_Employees <= 0)
        {
            sweetAlert (this.MSG.CM_003);
        }
        else if (nComboLength_Device <= 0)
        {
            sweetAlert (this.MSG.CM_002);
        }
        else if (parseInt(privilege) < 0)
        {
            sweetAlert (this.MSG.CM_004);
        }

        else
        {
            bValid = true;
        }
	    return bValid;
    },

	Process_DeviceEmployeePrivilege : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, DEVICEEMPLOYEEPRIVILEGE.MSG))
		{
			try
			{
                sweetAlert (DEVICEEMPLOYEEPRIVILEGE.MSG.CM_001);
                document.getElementById ("search_cmb_employees").value = "";
                document.getElementById ("search_cmb_device_fname").value = "";

			    DEVICEEMPLOYEEPRIVILEGE.SelectAll ('#cmb_employees_selected', '#cmb_employees');
			    DEVICEEMPLOYEEPRIVILEGE.SelectAll ('#cmb_device_fname_selected', '#cmb_device_fname');
			}
			catch (e)
			{
				alert("Process_DeviceEmployeePrivilege " + e);
			}
		}
	},

	Select_All_Clicked : function(type)
	{
		if (type == 'employees')
			DEVICEEMPLOYEEPRIVILEGE.SelectAll('#cmb_employees', '#cmb_employees_selected')
		else
			DEVICEEMPLOYEEPRIVILEGE.SelectAll('#cmb_device_fname', '#cmb_device_fname_selected')
	},

	Remove_All_Clicked : function(type)
	{
		if (type == 'employees')
			DEVICEEMPLOYEEPRIVILEGE.SelectAll('#cmb_employees_selected', '#cmb_employees')
		else
			DEVICEEMPLOYEEPRIVILEGE.SelectAll('#cmb_device_fname_selected', '#cmb_device_fname')
	},

	Select_Clicked : function(type)
	{
		if (type == 'employees')
			DEVICEEMPLOYEEPRIVILEGE.Select('#cmb_employees', '#cmb_employees_selected')
		else
			DEVICEEMPLOYEEPRIVILEGE.Select('#cmb_device_fname', '#cmb_device_fname_selected')
	},

	Remove_Clicked : function(type)
	{
		if (type == 'employees')
			DEVICEEMPLOYEEPRIVILEGE.Select('#cmb_employees_selected', '#cmb_employees')
		else
			DEVICEEMPLOYEEPRIVILEGE.Select('#cmb_device_fname_selected', '#cmb_device_fname')
	},

	SelectAll : function(from, to)
	{
		var options = $(from + ' option').clone();
		$(to).append(options.sort(function(x, y)
		{
			return $(x).text() < $(y).text() ? -1 : 1;
		}));
		$(from).empty();
	},

	Select : function (from, to)
	{
		var options = $(from + ' option:selected').clone();
		$(to).append(options);
		var options1 = $(to + ' option').clone();
		$(to).empty();
		$(to).append(options1.sort(function(x, y)
		{
			return $(x).text() < $(y).text() ? -1 : 1;
		}));
		$(from + ' option:selected').remove();
	},

	GetEmployeeList : function ()
	{
	    var oRestData = "";
	    var oCombo = document.getElementById ("cmb_employees_selected");
	    var nComboLength = oCombo.options.length;
        for (var nIndex = 0; nIndex < nComboLength; nIndex++)
        {
            var bLastIndex = (nIndex == (nComboLength - 1)) ? true : false;
            oRestData += oCombo.options [nIndex].value + (bLastIndex == false ? LEVEL01DATA_SEPERATOR : "");
        }

        return oRestData;
    },

	GetDeviceList : function ()
	{
	    var oRestData = "";
	    var oCombo = document.getElementById ("cmb_device_fname_selected");
	    var nComboLength = oCombo.options.length;
        for (var nIndex = 0; nIndex < nComboLength; nIndex++)
        {
            var bLastIndex = (nIndex == (nComboLength - 1)) ? true : false;
            oRestData += oCombo.options [nIndex].value + (bLastIndex == false ? LEVEL01DATA_SEPERATOR : "");
        }

        return oRestData;
    },

	RestRequestInfo : function(dDBProcessId)
	{
		var oRest = UserInfoRest(-1, '', this.UserId) + "," + ProcessInfoRest(this.MI_DEVICEEMPLOYEEPRIVILEGEUI, dDBProcessId);
		oRest += ", \"" + CProcessDBData + "\" : [{\"" + DATA + "\" : [";

		var oRestData = "";
		if (dDBProcessId == this.MFI_DEVICEEMPLOYEEPRIVILEGEUI_InitModule)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CDeviceEmployeePrivilegeInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";
		}
		else if (dDBProcessId == this.MFI_DEVICEEMPLOYEEPRIVILEGEUI_Upload)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CDeviceEmployeePrivilegeInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";

            var oDeleteRestData = this.UserId + DATA_SEPERATOR;
            oDeleteRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_privilegetypes")) + DATA_SEPERATOR;
            oDeleteRestData += this.GetEmployeeList () + DATA_SEPERATOR;
            oDeleteRestData += this.GetDeviceList ();

			oDeleteRestData = "{\"" + this.XMLTAG_CDeviceEmployeePrivilegeUpload + "\" : [{ \"" + DATA + "\" : \"" + oDeleteRestData + "\" }]}";
            oRestData = oDeleteRestData + ", " + oRestData;
		}

		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";
		return oRest;
	},
};
