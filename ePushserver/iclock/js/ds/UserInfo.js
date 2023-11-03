DS_UserInfo = function() {

	this.DB_UserId = 0;
	this.DB_UserName = 1;
	this.DB_UserTypeId = 2;
	this.DB_UserType = 3;
	this.DB_LastLoginDate = 4;
	this.DB_LanguageId = 5;
	this.DB_LanguageCode = 6;
	this.DB_AccessTypeId = 7;
	this.DB_AccessType = 8;

	this.DS = new DS_DataStructure ();

	this.InitDataStructure = function (strText)
	{
		this.DS.JSONText = strText;
	};

	//#region Member Function
	/// <summary>
	/// Language Id.
	/// </summary>
	this.GetLanguageId = function () {
	    return this.DS.GetColumnForRow (this.DB_LanguageId);
	};
	/// <summary>
	/// Language Code.
	/// </summary>
	this.GetLanguageCode = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_LanguageCode);
	};
	/// <summary>
	/// User Id.
	/// </summary>
	this.GetUserId = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_UserId);
	};
	
	/// <summary>
	/// User Name.
	/// </summary>
	this.GetUserName = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_UserName);
	};

	/// <summary>
	/// User Type Id.
	/// </summary>
	this.GetUserTypeId = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_UserTypeId);
	};

	/// <summary>
	/// User Type.
	/// </summary>
	this.GetUserType = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_UserType);
	};

	/// <summary>
	/// Last Login Date.
	/// </summary>
	this.GetLastLoginDate = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_LastLoginDate);
	};

	/// <summary>
	/// Access Type Id.
	/// </summary>
	this.GetAccessTypeId = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_AccessTypeId);
	};

	/// <summary>
	/// Access Type.
	/// </summary>
	this.GetAccessType = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_AccessType);
	};
//#End Member Function		
};