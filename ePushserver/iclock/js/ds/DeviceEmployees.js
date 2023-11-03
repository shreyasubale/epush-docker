DS_DeviceCommands = function()
{
    this.DB_DeviceId = 0;
    this.DB_DeviceSName = 1;
    this.DB_SerialNumber = 2;
    this.DB_DeviceLocation = 3;
    this.DB_EmployeeId = 4;
    this.DB_EmployeeName = 5;
    this.DB_EmployeeCode = 6;

    this.DS = new DS_DataStructure ();

    this.InitDataStructure = function (strText)
    {
        this.DS.JSONText = strText;
    };
};