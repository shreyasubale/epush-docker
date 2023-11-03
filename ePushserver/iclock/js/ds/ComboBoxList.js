DS_ComboBoxList = function() {

    this.DB_Index = 0;
    this.DB_Value = 1;
    this.DB_OrderId = 2;
    this.DB_Other01 = 3;
    this.DB_Other02 = 4;
    this.DB_Other03 = 5;

    this.DS = new DS_DataStructure ();

	this.InitDataStructure = function (strText)
	{
		this.DS.JSONText = strText;
	};
};