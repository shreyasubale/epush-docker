DS_DeviceCommands = function()
{
    this.DB_DeviceCommandId = 0;
    this.DB_DeviceSName = 1;
    this.DB_SerialNumber = 2;
    this.DB_DeviceLocation = 3;
    this.DB_Title = 4;
    this.DB_CreationDate = 5;
    this.DB_ExecutionDate = 6;
    this.DB_Status = 7;

    this.DS = new DS_DataStructure ();

    this.InitDataStructure = function (strText)
    {
        this.DS.JSONText = strText;
    };
};