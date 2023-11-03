DS_DeviceOPLogs = function() {

    this.DB_DeviceOperationLogId = 0;
    this.DB_OperationLogTypeName = 1;
    this.DB_DeviceOperationLogExecutedOn = 2;
    this.DB_DeviceId = 3;
    this.DB_SerialNumber = 4;
    this.DB_DeviceSName = 5;
    this.DB_DeviceLocation = 6;

	this.DS = new DS_DataStructure ();

	this.InitDataStructure = function (strText)
	{
		this.DS.JSONText = strText;
	};
};