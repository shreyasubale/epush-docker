    /* Author:

     */
    var DATA = "data";
    var DATA_SEPERATOR = "##IDS##";
    var LEVEL01DATA_SEPERATOR = "##IDSL01##";
    var LEVEL02DATA_SEPERATOR = "##IDSL02##";
    var XMLTAG_SProcessDBData = "SProcessDBData";
    var XMLTAG_SErrorMessage = "SErrorMessage";
    var XMLTAG_SErrorId = "SErrorId";
    var REQUEST_URL = "/iclock/ProcessWebSiteRequest.aspx?EPS=1.01";
    var REQUEST_STATUS_LOGOUT = 0;
    var REQUEST_STATUS_SUCCESS = 200;
    var READY_STATE_COMPLETED = 4;

    var CUserInfo = "CUserInfo";
    var CProcessDBInfo = "CProcessDBInfo";
    var CProcessDBData = "CProcessDBData";

    var CON_DEFAULT   = 1;
    var CON_ALL       = 2;
    var CON_DEFAULT_DATE = "1900-01-01";
    var CON_DEFAULT_DATETIME = "1900-01-01 00:00:00";

    function UserInfoRest (nLanguageId, strLanguageCode, nUserId)
    {
        var oRest = "";
        oRest += nLanguageId + DATA_SEPERATOR;// LanguageId
        oRest += strLanguageCode + DATA_SEPERATOR;// LanguageCode
        oRest += nUserId;// UserId

        return "\"" + CUserInfo + "\" : [{ \"" + DATA + "\" : \"" + oRest + "\" } ]";
    }

    function GetTimeZone ()
    {
        return /\((.*)\)/.exec(new Date().toString())[1];
    }

    function GetTimeZoneOffset ()
    {
        var oDate = new Date ();
        return oDate.getTimezoneOffset ();
    }

    function ProcessInfoRest (dModuleId, dDBProcessId)
    {
        var oRest = "";
        oRest += (dModuleId) + DATA_SEPERATOR;// ModuleId
        oRest += (dDBProcessId);// ProcessId

        return " \"" + CProcessDBInfo + "\" : [{ \"" + DATA + "\" : \"" + oRest + "\" } ]";
    }

    function ProcessServerRequest (oRest, callback, bShowLoadingPopup)
    {
        ProcessServerRequest_DBConfig ("", oRest, callback, bShowLoadingPopup);
    }

    function ProcessServerRequest_DBConfig (strUrl, oRest, callback, bShowLoadingPopup)
    {
        try
        {
            if (bShowLoadingPopup == true)
                LoadingPopup ();

            var oRequest = GetRequestObject ();
            var oUrl = REQUEST_URL + strUrl;
            oRequest.open ('POST', oUrl, true);
            oRequest.setRequestHeader ('Content-Type', 'text/plain');
            oRequest.onreadystatechange = function ()
            {
                if (this.readyState == READY_STATE_COMPLETED && this.status == REQUEST_STATUS_SUCCESS)
                {
                    if (typeof callback == "function")
                    {
                        if(bShowLoadingPopup == true)
                            CloseLoadingPopup ();
                        callback.apply (oRequest);
                    }
                }
                else if (this.readyState == READY_STATE_COMPLETED && this.status == REQUEST_STATUS_LOGOUT)
                {
                    Logout ();
                }
            };
            oRequest.send (oRest);
        }
        catch (e)
        {}
    }

    function Logout ()
    {
        ProcessNavigate ("../login/login.jsp");
    }

    function LoadingPopup ()
    {
        $('.cd-load-popup').addClass('is-visible');
    }

    function CloseLoadingPopup ()
    {
        $('.cd-load-popup').removeClass('is-visible');
    }

    function LoadJSCSSFile (filename, filetype)
    {
        if (filetype == "js") // if filename is a external JavaScript file
        {
            var fileref = document.createElement ('script')
            fileref.setAttribute ("type", "text/javascript")
            fileref.setAttribute ("src", filename)
        }
        else if (filetype == "css") // if filename is an external CSS file
        {
            var fileref = document.createElement ("link")
            fileref.setAttribute ("rel", "stylesheet")
            fileref.setAttribute ("type", "text/css")
            fileref.setAttribute ("href", filename)
        }

        if (typeof fileref != "undefined")
        {
            document.getElementsByTagName ("head") [0].appendChild (fileref);
        }
    }

    function SetClientSideInclude (id, url, js, css)
    {
        LoadJSCSSFile (js, "js");
        LoadJSCSSFile (css, "css");

        SetInnerHtmlForId (id, url);
    }

    function SetInnerHtmlForId (id, url)
    {
        var oRequest = GetRequestObject ();
        var element = document.getElementById (id);
        if (!element)
        {
            alert ("Bad id " + id + "passed to SetClientSideInclude." + "You need a div or span element " + "with this id in your page.");
            return;
        }

        if (oRequest)
        {
            // Synchronous request, wait till we have it all
            oRequest.open ('GET', url, false);
            oRequest.send (null);
            element.innerHTML = oRequest.responseText;
        }
        else
        {
            element.innerHTML = "Sorry, your browser does not support " + "XMLHTTPRequest objects. This page requires " + "Internet Explorer 5 or better for Windows, "
                    + "or Firefox for any system, or Safari. Other " + "compatible browsers may also exist.";
        }
    }

    function ProcessNavigate (url)
    {
        var ua = navigator.userAgent.toLowerCase (), isIE = ua.indexOf ('msie') !== -1, version = parseInt (ua.substr (4, 2), 10);

        // Internet Explorer 8 and lower
        if (isIE && version < 9)
        {
            var link = document.createElement ('a');
            link.href = url;
            document.body.appendChild (link);
            link.click ();
        }

        // All other browsers
        else
        {
            window.location.href = url;
        }
    }

    function ShowErrorMessage (responseText, msgObj)
    {
        var bValid = true;
        try
        {
            if (responseText == "DBCONFIGSUCCESS")
            {
                sweetAlert ("Database Configuration Successfull...");
                ProcessNavigate ("../login/login.jsp");
            }
            else if (responseText.indexOf ("Database Not Configured") > 0)
            {
                ProcessNavigate ("../../../../../databaseconfig.jsp");
            }
            else if (responseText != "LOGOUT")
            {
                var obj = JSON.parse (responseText);
                var errorMsgObj = JSONUtil.GetJSONValues (obj, XMLTAG_SErrorMessage, '');
                var arrMessage = JSONUtil.GetJSONValues (errorMsgObj, DATA);
                if (arrMessage != 'undefined' && arrMessage != null && arrMessage.length > 0)
                {
                    for (var nEIndex = 0; nEIndex < arrMessage.length; nEIndex++)
                    {
                        var errObj = arrMessage [nEIndex].toString ();
                        if (errObj != '')
                        {
                            bValid = false;
                            var strErrorName = "SM_" + parseInt (errObj);

                            eval ("var " + strErrorName + "='';");
                            sweetAlert (eval ("msgObj" + "." + strErrorName))
                        }
                    }
                }
            }
            else
            {
                bValid = false;
                ProcessNavigate ("../login/login.jsp");
            }
        }
        catch (e)
        {
            alert (e);
        }

        return bValid;
    }

    function GetRequestQueryParameter (strParamName)
    {
        var strValue = "";
        var query = location.search.substring (1);
        var parameters = {};
        var keyValues = query.split (/&/);
        for (var nIndex = 0; nIndex < keyValues.length; nIndex++)
        {
            var keyValue = keyValues [nIndex];
            var keyValuePairs = keyValue.split (/=/);
            if (keyValuePairs != 'undefined' && keyValuePairs.length > 0)
            {
                var key = keyValuePairs [0];
                var value = keyValuePairs [1];
                parameters [key] = value;
            }
        }
        strValue = parameters [strParamName];

        return strValue;
    }

    function GetFormatDateTime (strDateTime)
    {
        return new Date (strDateTime);
    }

    function GetMainOffsetHeight ()
    {
        return document.getElementById("main").offsetHeight;
    }

    function GetWindowInnerHeight ()
    {
        return window.innerHeight;
    }

    function IsValidParentPage ()
    {
        var bValid = true;

        var oParentElement = window.parent.document.getElementById ('lbl_logout');
        if (oParentElement == null)
            bValid = false;

        if (bValid == false)
            IsValidParentPage_Logout ();

        return bValid;
    }

    function IsValidParentPage_Logout ()
    {
        ProcessNavigate ("../../../../../index.jsp");
    }

    function GetFormPageHeight ()
    {
        var nHeight = 470;
        if(GetWindowInnerHeight () > 800)
            nHeight = window.innerHeight - GetMainOffsetHeight () * 2.5;
        else if(GetWindowInnerHeight () > 640)
            nHeight = window.innerHeight - GetMainOffsetHeight () * 2.3;

        return nHeight;
    }

    function FillCombo (objJson, strTagName, oCombo)
    {
        var oInfoObj = JSONUtil.GetJSONValues (objJson, strTagName, '');
        if (oInfoObj != 'undefined' && oInfoObj != null && oInfoObj.length > 0)
        {
            var oObj = oInfoObj [0];
            if (oObj != 'undefined' && oObj.length > 0)
            {
                ClearComboBox (oCombo);
                for (var nIndex = 0; nIndex < oObj.length; nIndex++)
                {
                    var strDataText = JSONUtil.GetJSONValues (oObj [nIndex], 'data');
                    var oInfo = new DS_ComboBoxList ();
                    oInfo.InitDataStructure (strDataText);

                    var oOptions = document.createElement ("option");
                    oOptions.setAttribute ("role", "option");
                    oOptions.style.fontWeight = "bold";
                    oOptions.value = oInfo.DS.GetColumnForRow (oInfo.DB_Index);
                    oOptions.innerHTML = "&nbsp;" + oInfo.DS.GetColumnForRow (oInfo.DB_Value);
                    oCombo.appendChild (oOptions);
                }
            }
        }
    }

    function GetComboBoxSelectedValue (oCombo)
    {
        return oCombo.options[oCombo.selectedIndex].value;
    }
    function GetComboBoxSelectedText (oCombo)
    {
        return oCombo.options[oCombo.selectedIndex].text;
    }

    function ClearComboBox (oCombo)
    {
        if (oCombo == null)
            return;
        if (oCombo.options == null)
            return;
        while (oCombo.options.length > 0)
        {
            oCombo.remove (0);
            if (oCombo.options.length == 0)
                break;
        }
    }

    function GetRequestObject ()
    {
        var oRequest = false;
        // For Safari, Firefox, and other non-MS browsers
        if (window.XMLHttpRequest)
        {
            try
            {
                oRequest = new XMLHttpRequest ();
            }
            catch (e)
            {
                oRequest = false;
            }
        }
        else if (window.ActiveXObject)
        {
            // For Internet Explorer on Windows
            try
            {
                oRequest = new ActiveXObject ("Msxml2.XMLHTTP");
            }
            catch (e)
            {
                try
                {
                    oRequest = new ActiveXObject ("Microsoft.XMLHTTP");
                }
                catch (e)
                {
                    oRequest = false;
                }
            }
        }

        return oRequest;
    }
