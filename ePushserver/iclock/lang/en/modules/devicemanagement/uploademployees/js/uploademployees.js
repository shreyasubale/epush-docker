UPLOADEMPLOYEES =
{
	// region "Module Ids"
	MI_UPLOADEMPLOYEESUI : 351,

	// endregion

	// region "DB Function Ids"
	MFI_UPLOADEMPLOYEESUI_InitModule : 351001,
	MFI_UPLOADEMPLOYEESUI_Upload : 351012,
	// endregion

	// region "Module DB Error Ids"

	// end region

	// region "XML Node names"
	XMLTAG_CUploadEmployeesInit : "CUploadEmployeesInit",
	XMLTAG_CUploadEmployeesUpload : "CUploadEmployeesUpload",

	XMLTAG_SUploadEmployeesList : "SUploadEmployeesList",
	XMLTAG_SEmployeeList : "SEmployeeList",
	XMLTAG_SDeviceFNameList : "SDeviceFNameList",
	// end region

	// message
	MSG : new MSG_UPLOADEMPLOYEES(),
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
			ProcessServerRequest (this.RestRequestInfo(this.MFI_UPLOADEMPLOYEESUI_InitModule), UPLOADEMPLOYEES.Process_Init, true);
		}
	},

	Process_Init : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, UPLOADEMPLOYEES.MSG))
		{
			try
			{
				var obj = JSON.parse(responseText);
				FillCombo (obj, UPLOADEMPLOYEES.XMLTAG_SEmployeeList, document .getElementById ("cmb_employees"));
				FillCombo (obj, UPLOADEMPLOYEES.XMLTAG_SDeviceFNameList, document.getElementById ("cmb_device_fname"));

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

	UploadEmployees_Clicked : function()
	{
	    if (this.IsValidUploadEmployees ())
            ProcessServerRequest (this.RestRequestInfo(this.MFI_UPLOADEMPLOYEESUI_Upload), UPLOADEMPLOYEES.Process_UploadEmployees, true);
	},

	IsValidUploadEmployees : function()
	{
	    var bValid = false;
        var oCombo_Device = document.getElementById ("cmb_device_fname_selected");
	    var nComboLength_Device = oCombo_Device.options.length;
        var oCombo_Employees = document.getElementById ("cmb_employees_selected");
	    var nComboLength_Employees = oCombo_Device.options.length;

        var nUserChecked = document.getElementById ("chk_upload_user").checked ? 1 : 0;
        var nUserFPChecked = document.getElementById ("chk_upload_user_finger_print").checked ? 1 : 0;
        var nUserFaceChecked = document.getElementById ("chk_upload_user_face").checked ? 1 : 0;

        var nUserVoiceChecked = document.getElementById ("chk_upload_voice_print").checked ? 1 : 0;
        var nUserIrisChecked = document.getElementById ("chk_upload_iris").checked ? 1 : 0;
        var nUserRetinaChecked = document.getElementById ("chk_upload_retina").checked ? 1 : 0;
        var nUserPalmprintChecked = document.getElementById ("chk_upload_palm_print").checked ? 1 : 0;
        var nUserFingerveinChecked = document.getElementById ("chk_upload_finger_vein").checked ? 1 : 0;
        var nUserPalmChecked = document.getElementById ("chk_upload_palm").checked ? 1 : 0;

        if (nComboLength_Device <= 0)
        {
            sweetAlert (this.MSG.CM_002);
        }
        else if (nComboLength_Employees <= 0)
        {
            sweetAlert (this.MSG.CM_003);
        }
        else if (nUserChecked == 0)
        {
            sweetAlert (this.MSG.CM_004);
        }
        else if (nUserFPChecked == 1 && nUserChecked == 0)
        {
            sweetAlert (this.MSG.CM_005);
        }
        else if (nUserFaceChecked == 1 && nUserChecked == 0)
        {
            sweetAlert (this.MSG.CM_006);
        }
        else if (nUserVoiceChecked == 1 && nUserChecked == 0)
        {
            sweetAlert (this.MSG.CM_007);
        }
        else if (nUserIrisChecked == 1 && nUserChecked == 0)
        {
            sweetAlert (this.MSG.CM_008);
        }
        else if (nUserRetinaChecked == 1 && nUserChecked == 0)
        {
            sweetAlert (this.MSG.CM_009);
        }
        else if (nUserPalmprintChecked == 1 && nUserChecked == 0)
        {
            sweetAlert (this.MSG.CM_010);
        }
        else if (nUserFingerveinChecked == 1 && nUserChecked == 0)
        {
            sweetAlert (this.MSG.CM_011);
        }
        else if (nUserPalmChecked == 1 && nUserChecked == 0)
        {
            sweetAlert (this.MSG.CM_012);
        }
        else
        {
            bValid = true;
        }
	    return bValid;
    },

	Process_UploadEmployees : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, UPLOADEMPLOYEES.MSG))
		{
			try
			{
                sweetAlert (UPLOADEMPLOYEES.MSG.CM_001);

                document.getElementById ("search_cmb_employees").value = "";
                document.getElementById ("search_cmb_device_fname").value = "";
                document.getElementById ("chk_upload_user").checked = false;
                document.getElementById ("chk_upload_user_finger_print").checked = false;
                document.getElementById ("chk_upload_user_face").checked = false;

                document.getElementById ("chk_upload_voice_print").checked = false;
                document.getElementById ("chk_upload_iris").checked = false;
                document.getElementById ("chk_upload_retina").checked = false;
                document.getElementById ("chk_upload_palm_print").checked = false;
                document.getElementById ("chk_upload_finger_vein").checked = false;
                document.getElementById ("chk_upload_palm").checked = false;

			    UPLOADEMPLOYEES.SelectAll ('#cmb_employees_selected', '#cmb_employees');
			    UPLOADEMPLOYEES.SelectAll ('#cmb_device_fname_selected', '#cmb_device_fname');
			}
			catch (e)
			{
				alert("Process_UploadEmployees " + e);
			}
		}
	},

	Select_All_Clicked : function(type)
	{
		if (type == 'employees')
			UPLOADEMPLOYEES.SelectAll('#cmb_employees', '#cmb_employees_selected')
		else
			UPLOADEMPLOYEES.SelectAll('#cmb_device_fname', '#cmb_device_fname_selected')
	},

	Remove_All_Clicked : function(type)
	{
		if (type == 'employees')
			UPLOADEMPLOYEES.SelectAll('#cmb_employees_selected', '#cmb_employees')
		else
			UPLOADEMPLOYEES.SelectAll('#cmb_device_fname_selected', '#cmb_device_fname')
	},

	Select_Clicked : function(type)
	{
		if (type == 'employees')
			UPLOADEMPLOYEES.Select('#cmb_employees', '#cmb_employees_selected')
		else
			UPLOADEMPLOYEES.Select('#cmb_device_fname', '#cmb_device_fname_selected')
	},

	Remove_Clicked : function(type)
	{
		if (type == 'employees')
			UPLOADEMPLOYEES.Select('#cmb_employees_selected', '#cmb_employees')
		else
			UPLOADEMPLOYEES.Select('#cmb_device_fname_selected', '#cmb_device_fname')
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

	GetEmployeeList : function()
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

	GetDeviceList : function()
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
		var oRest = UserInfoRest(-1, '', this.UserId) + "," + ProcessInfoRest(this.MI_UPLOADEMPLOYEESUI, dDBProcessId);
		oRest += ", \"" + CProcessDBData + "\" : [{\"" + DATA + "\" : [";

		var oRestData = "";
		if (dDBProcessId == this.MFI_UPLOADEMPLOYEESUI_InitModule)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CUploadEmployeesInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";
		}
		else if (dDBProcessId == this.MFI_UPLOADEMPLOYEESUI_Upload)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CUploadEmployeesInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";

             var oUploadRestData = this.UserId + DATA_SEPERATOR;
            oUploadRestData += (document.getElementById ("chk_upload_user").checked ? 1 : 0) + DATA_SEPERATOR;
            oUploadRestData += (document.getElementById ("chk_upload_user_finger_print").checked ? 1 : 0) + DATA_SEPERATOR;
            oUploadRestData += (document.getElementById ("chk_upload_user_face").checked ? 1 : 0) + DATA_SEPERATOR;
            oUploadRestData += this.GetEmployeeList () + DATA_SEPERATOR;
            oUploadRestData += this.GetDeviceList () + DATA_SEPERATOR;
            oUploadRestData += (document.getElementById ("chk_upload_voice_print").checked ? 1 : 0) + DATA_SEPERATOR;
            oUploadRestData += (document.getElementById ("chk_upload_iris").checked ? 1 : 0) + DATA_SEPERATOR;
            oUploadRestData += (document.getElementById ("chk_upload_retina").checked ? 1 : 0) + DATA_SEPERATOR;
            oUploadRestData += (document.getElementById ("chk_upload_palm_print").checked ? 1 : 0) + DATA_SEPERATOR;
            oUploadRestData += (document.getElementById ("chk_upload_finger_vein").checked ? 1 : 0) + DATA_SEPERATOR;
            oUploadRestData += (document.getElementById ("chk_upload_palm").checked ? 1 : 0);


			oUploadRestData = "{\"" + this.XMLTAG_CUploadEmployeesUpload + "\" : [{ \"" + DATA + "\" : \"" + oUploadRestData + "\" }]}";
            oRestData = oUploadRestData + ", " + oRestData;
		}
		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";

		return oRest;
	},
};
