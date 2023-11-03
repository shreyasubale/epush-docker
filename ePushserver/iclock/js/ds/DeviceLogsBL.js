DS_DeviceLogsBL = function() {

    this.DB_DeviceLogId = 0;
    this.DB_DeviceSName = 1;
    this.DB_SerialNumber = 2;
    this.DB_DeviceLocation = 3;
    this.DB_LogDate = 4;
    this.DB_DownloadDate = 5;

	this.DS = new DS_DataStructure ();

	this.InitDataStructure = function (strText)
	{
		this.DS.JSONText = strText;
		this.DS.JSONTextArray = this.DS.GetDataArray (strText);
	};
};