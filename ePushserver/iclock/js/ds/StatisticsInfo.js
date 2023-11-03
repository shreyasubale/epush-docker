DS_StatisticsInfo = function() {
	this.DB_EmployeeCount = 0;
	this.DB_DeviceCount = 1;
	this.DB_LogCount_Month = 2;
	this.DB_LogCount_Day = 3;
	this.DB_LogCount_Month_Not_Processed = 4;
	this.DB_LogCount_Day_Not_Processed = 5;

	this.DS = new DS_DataStructure ();

	this.InitDataStructure = function (strText)
	{
		this.DS.JSONText = strText;
	};

	//#region Member Function
	/// <summary>
	/// Employee Count
	/// </summary>
	this.GetEmployeeCount = function () {
	    return this.DS.GetColumnForRow (this.DB_EmployeeCount);
	};
	/// <summary>
	/// Device Count
	/// </summary>
	this.GetDeviceCount = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_DeviceCount);
	};
	/// <summary>
	/// Log Count For Month
	/// </summary>
	this.GetLogCount_Month = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_LogCount_Month);
	};
	
	/// <summary>
	/// Log Count For Day
	/// </summary>
	this.GetLogCount_Day = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_LogCount_Day);
	};
	/// <summary>
	/// Log Count For Month _Not_Processed
	/// </summary>
	this.GetLogCount_Month_Not_Processed = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_LogCount_Month_Not_Processed);
	};
	
	/// <summary>
	/// Log Count For Day _Not_Processed
	/// </summary>
	this.GetLogCount_Day_Not_Processed = function ()
	{
	    return this.DS.GetColumnForRow (this.DB_LogCount_Day_Not_Processed);
	};
//#End Member Function		
};