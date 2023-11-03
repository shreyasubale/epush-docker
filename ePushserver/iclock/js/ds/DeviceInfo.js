DS_DeviceInfo = function() {

    this.DB_DeviceId = 0;
    this.DB_DeviceFName = 1;
    this.DB_DeviceSName = 2;
    this.DB_DeviceDirection = 3;
    this.DB_SerialNumber = 4;
    this.DB_ConnectionType = 5;
    this.DB_IpAddress = 6;
    this.DB_BaudRate = 7;
    this.DB_ComKey = 8;
    this.DB_ComPort = 9;
    this.DB_LastDownloadedDate = 10;
    this.DB_C1 = 11;
    this.DB_C2 = 12;
    this.DB_C3 = 13;
    this.DB_C4 = 14;
    this.DB_C5 = 15;
    this.DB_C6 = 16;
    this.DB_C7 = 17;
    this.DB_TransactionStamp = 18;
    this.DB_LastPingDate = 19;
    this.DB_Status = 20;
    this.DB_DeviceType = 21;
    this.DB_OPStamp = 22;
    this.DB_DownLoadType = 23;
    this.DB_TimeZone = 24;
    this.DB_DeviceLocation = 25;
    this.DB_TimeOut = 26;

	this.DS = new DS_DataStructure ();

	this.InitDataStructure = function (strText)
	{
		this.DS.JSONText = strText;
	};
};