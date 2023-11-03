DS_DeviceLogs = function() {

    this.DB_DeviceLogId = 0;
    this.DB_DeviceSName = 1;
    this.DB_SerialNumber = 2;
    this.DB_DeviceLocation = 3;
    this.DB_EmployeeCodeInDevice = 4;
    this.DB_EmployeeName = 5;
    this.DB_LogDate = 6;
    this.DB_DownloadDate = 7;
    this.DB_VerifyMethodName = 8;
    this.DB_Latitude = 9;
    this.DB_Longitude = 10;

	this.DS = new DS_DataStructure ();

	this.InitDataStructure = function (strText)
	{
		this.DS.JSONText = strText;
		this.DS.JSONTextArray = this.DS.GetDataArray (strText);
	};
};