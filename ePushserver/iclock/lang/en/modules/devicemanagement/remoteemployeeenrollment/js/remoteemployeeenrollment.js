REMOTEEMPLOYEEENROLLMENT =
{
	// region "Module Ids"
	MI_REMOTEEMPLOYEEENROLLMENTUI : 307,

	// endregion

	// region "DB Function Ids"
	MFI_REMOTEEMPLOYEEENROLLMENTUI_InitModule : 307001,
	MFI_REMOTEEMPLOYEEENROLLMENTUI_Upload : 307012,
	// endregion

	// region "Module DB Error Ids"

	// end region

	// region "XML Node names"
	XMLTAG_CRemoteEmployeeEnrollmentInit : "CRemoteEmployeeEnrollmentInit",
	XMLTAG_CRemoteEmployeeEnrollmentUpload : "CRemoteEmployeeEnrollmentUpload",

	XMLTAG_SRemoteEmployeeEnrollmentList : "SRemoteEmployeeEnrollmentList",
	XMLTAG_SEmployeeList : "SEmployeeList",
	XMLTAG_SDeviceFNameList : "SDeviceFNameList",
	// end region

	// message
	MSG : new MSG_REMOTEEMPLOYEEENROLLMENT(),
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
			ProcessServerRequest (this.RestRequestInfo(this.MFI_REMOTEEMPLOYEEENROLLMENTUI_InitModule), REMOTEEMPLOYEEENROLLMENT.Process_Init, true);
		}
	},

	Process_Init : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, REMOTEEMPLOYEEENROLLMENT.MSG))
		{
			try
			{
				var obj = JSON.parse(responseText);
				FillCombo (obj, REMOTEEMPLOYEEENROLLMENT.XMLTAG_SEmployeeList, document .getElementById ("cmb_employees"));
				FillCombo (obj, REMOTEEMPLOYEEENROLLMENT.XMLTAG_SDeviceFNameList, document.getElementById ("cmb_device_fname"));

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

    Biotype_Changed: function()
    {
        var biotype = GetComboBoxSelectedValue (document.getElementById ("cmb_bio_type"));
        if (biotype == 1)
        {
            document.getElementById ("biotype_finger_1").style.display = "block";
            document.getElementById ("biotype_finger_2").style.display = "block";
        }
        else
        {
            document.getElementById ("biotype_finger_1").style.display = "none";
            document.getElementById ("biotype_finger_2").style.display = "none";
        }
    },
	RemoteEmployeeEnrollment_Clicked : function()
	{
	    if (this.IsValid ())
            ProcessServerRequest (this.RestRequestInfo(this.MFI_REMOTEEMPLOYEEENROLLMENTUI_Upload), REMOTEEMPLOYEEENROLLMENT.Process_RemoteEmployeeEnrollment, true);
	},

	IsValid : function()
	{
	    var bValid = false;
        var device =  GetComboBoxSelectedValue (document.getElementById ("cmb_device_fname"));
        var employees = GetComboBoxSelectedValue (document.getElementById ("cmb_employees"));
        var biotype = GetComboBoxSelectedValue (document.getElementById ("cmb_bio_type"));
        var retry = GetComboBoxSelectedValue (document.getElementById ("cmb_retry_attempt"));

        if (employees <= 0)
        {
            sweetAlert (this.MSG.CM_003);
        }
        else if (device <= 0)
        {
            sweetAlert (this.MSG.CM_002);
        }
        else if (parseInt (biotype) <= -1)
        {
            sweetAlert (this.MSG.CM_004);
        }
        else if (retry <= 0)
        {
            sweetAlert (this.MSG.CM_005);
        }
        else if (parseInt (biotype) == 1 && this.IsValid_Biotype_Finger () == false)
        {
            sweetAlert (this.MSG.CM_010);
        }
        else
        {
            bValid = true;
        }
	    return bValid;
    },

    IsValid_Biotype_Finger : function()
	{
	    var bValid = false;

	    var oCombo_LL = document.getElementById ("chk_left_little").checked ? 1 : 0;
	    var oCombo_LR = document.getElementById ("chk_left_ring").checked ? 1 : 0;
	    var oCombo_LM = document.getElementById ("chk_left_middle").checked ? 1 : 0;
	    var oCombo_LI = document.getElementById ("chk_left_index").checked ? 1 : 0;
	    var oCombo_LT = document.getElementById ("chk_left_thumb").checked ? 1 : 0;

	    var oCombo_RT = document.getElementById ("chk_right_thumb").checked ? 1 : 0;
	    var oCombo_RI = document.getElementById ("chk_right_index").checked ? 1 : 0;
	    var oCombo_RM = document.getElementById ("chk_right_middle").checked ? 1 : 0;
	    var oCombo_RR = document.getElementById ("chk_right_ring").checked ? 1 : 0;
	    var oCombo_RL = document.getElementById ("chk_right_little").checked ? 1 : 0;


        bValid = document.getElementById ("chk_left_little").checked |
        	    document.getElementById ("chk_left_ring").checked |
        	    document.getElementById ("chk_left_middle").checked |
        	    document.getElementById ("chk_left_index").checked |
        	    document.getElementById ("chk_left_thumb").checked |
        	    document.getElementById ("chk_right_thumb").checked |
        	    document.getElementById ("chk_right_index").checked |
        	    document.getElementById ("chk_right_middle").checked |
        	    document.getElementById ("chk_right_ring").checked |
        	    document.getElementById ("chk_right_little").checked;

	    return bValid;
	},

	Process_RemoteEmployeeEnrollment : function()
	{
		var responseText = this.responseText;
		if (ShowErrorMessage(responseText, REMOTEEMPLOYEEENROLLMENT.MSG))
		{
			try
			{
                sweetAlert (REMOTEEMPLOYEEENROLLMENT.MSG.CM_001);
                //document.getElementById ("search_cmb_employees").value = "";
                //document.getElementById ("search_cmb_device_fname").value = "";

                //$('#cmb_employees').filterByText($('#search_cmb_employees'), false);

			    //document.getElementById ("cmb_employees").value = -1;
			}
			catch (e)
			{
				alert("Process_RemoteEmployeeEnrollment " + e);
			}
		}
	},

	GetEmployeeList : function ()
	{
	    var oRestData = document.getElementById ("cmb_employees").value;
        return oRestData;
    },

	GetDeviceList : function ()
	{
	    var oRestData = document.getElementById ("cmb_device_fname").value;
        return oRestData;
    },

	GetBioindexList : function ()
	{
	    var oCombo_LL = document.getElementById ("chk_left_little").checked ? "1" : "-1";
	    var oCombo_LR = document.getElementById ("chk_left_ring").checked ? "1" : "-1";
	    var oCombo_LM = document.getElementById ("chk_left_middle").checked ? "1" : "-1";
	    var oCombo_LI = document.getElementById ("chk_left_index").checked ? "1" : "-1";
	    var oCombo_LT = document.getElementById ("chk_left_thumb").checked ? "1" : "-1";

	    var oCombo_RT = document.getElementById ("chk_right_thumb").checked ? "1" : "-1";
	    var oCombo_RI = document.getElementById ("chk_right_index").checked ? "1" : "-1";
	    var oCombo_RM = document.getElementById ("chk_right_middle").checked ? "1" : "-1";
	    var oCombo_RR = document.getElementById ("chk_right_ring").checked ? "1" : "-1";
	    var oCombo_RL = document.getElementById ("chk_right_little").checked ? "1" : "-1";

        var oRestData = oCombo_LL + LEVEL01DATA_SEPERATOR + oCombo_LR + LEVEL01DATA_SEPERATOR + oCombo_LM +
            LEVEL01DATA_SEPERATOR + oCombo_LI + LEVEL01DATA_SEPERATOR + oCombo_LT + LEVEL01DATA_SEPERATOR + oCombo_RT +
            LEVEL01DATA_SEPERATOR + oCombo_RI + LEVEL01DATA_SEPERATOR + oCombo_RM + LEVEL01DATA_SEPERATOR + oCombo_RR +
            LEVEL01DATA_SEPERATOR + oCombo_RL;

        return oRestData;
    },

	RestRequestInfo : function(dDBProcessId)
	{
		var oRest = UserInfoRest(-1, '', this.UserId) + "," + ProcessInfoRest(this.MI_REMOTEEMPLOYEEENROLLMENTUI, dDBProcessId);
		oRest += ", \"" + CProcessDBData + "\" : [{\"" + DATA + "\" : [";

		var oRestData = "";
		if (dDBProcessId == this.MFI_REMOTEEMPLOYEEENROLLMENTUI_InitModule)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CRemoteEmployeeEnrollmentInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";
		}
		else if (dDBProcessId == this.MFI_REMOTEEMPLOYEEENROLLMENTUI_Upload)
		{
			oRestData = this.UserId
			oRestData = "{\"" + this.XMLTAG_CRemoteEmployeeEnrollmentInit + "\" : [{ \"" + DATA + "\" : \"" + oRestData + "\" }]}";

            var oUploadRestData = this.UserId + DATA_SEPERATOR;
            oUploadRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_bio_type")) + DATA_SEPERATOR;
            oUploadRestData += GetComboBoxSelectedValue (document.getElementById ("cmb_retry_attempt")) + DATA_SEPERATOR;
            oUploadRestData += (document.getElementById ("chk_overwrite").checked ? 1 : 0) + DATA_SEPERATOR;
            oUploadRestData += this.GetEmployeeList () + DATA_SEPERATOR;
            oUploadRestData += this.GetDeviceList () + DATA_SEPERATOR;
            oUploadRestData += this.GetBioindexList ();

			oUploadRestData = "{\"" + this.XMLTAG_CRemoteEmployeeEnrollmentUpload + "\" : [{ \"" + DATA + "\" : \"" + oUploadRestData + "\" }]}";
            oRestData = oUploadRestData + ", " + oRestData;
		}

		oRest = oRest + oRestData + "]}]";
		oRest = "{ " + oRest + "}";

		return oRest;
	},
};
