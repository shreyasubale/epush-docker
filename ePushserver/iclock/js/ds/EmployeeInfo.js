DS_EmployeeInfo = function()
{

	this.DB_EmployeeId = 0;
	this.DB_EmployeeName = 1;
	this.DB_EmployeeCode = 2;
	this.DB_StringCode = 3;
	this.DB_NumericCode = 4;
	this.DB_Gender = 5;
	this.DB_CompanyId = 6;
	this.DB_DepartmentId = 7;
	this.DB_Designation = 8;
	this.DB_CategoryId = 9;
	this.DB_DOJ = 10;
	this.DB_DOR = 11;
	this.DB_DOC = 12;
	this.DB_EmployeeCodeInDevice = 13;
	this.DB_EmployeeRFIDNumber = 14;
	this.DB_EmployementType = 15;
	this.DB_Status = 16;
	this.DB_EmployeeDevicePassword = 17;
	this.DB_EmployeeDeviceGroup = 18;
	this.DB_FatherName = 19;
	this.DB_MotherName = 20;
	this.DB_ResidentialAddress = 21;
	this.DB_PermanentAddress = 22;
	this.DB_ContactNo = 23;
	this.DB_Email = 24;
	this.DB_DOB = 25;
	this.DB_PlaceOfBirth = 26;
	this.DB_Nomenee1 = 27;
	this.DB_Nomenee2 = 28;
	this.DB_Remarks = 29;
	this.DB_RecordStatus = 30;
	this.DB_C1 = 31;
	this.DB_C2 = 32;
	this.DB_C3 = 33;
	this.DB_C4 = 34;
	this.DB_C5 = 35;
	this.DB_C6 = 36;
	this.DB_C7 = 37;
	this.DB_Location = 38;
	this.DB_BLOODGROUP = 39;
	this.DB_WorkPlace = 40;
	this.DB_ExtensionNo = 41;
	this.DB_LoginName = 42;
	this.DB_LoginPassword = 43;
	this.DB_Grade = 44;
	this.DB_Team = 45;
	this.DB_IsRecieveNotification = 46;
	this.DB_HolidayGroup = 47;
	this.DB_ShiftGroupId = 48;
	this.DB_ShiftRosterId = 49;
	this.DB_LastModifiedBy = 50;

	this.DS = new DS_DataStructure();

	this.InitDataStructure = function(strText)
	{
		this.DS.JSONText = strText;
	};
	
	this.GetData= function (type)
	{
	    return this.DS.GetColumnForRow (type);
	};
};