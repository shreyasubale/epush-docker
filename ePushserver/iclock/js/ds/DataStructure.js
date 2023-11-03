DS_DataStructure = function() {

	this.JSONText = "";
	this.JSONTextArray = [];

	this.GetColumnForRow =
		function(nColumnIndex) 
		{
			var strData = "";
			var arrData = this.GetDataArray(this.JSONText);
			if (arrData != 'undefined' && arrData.length > 0) {
				strData = arrData[nColumnIndex];
			}
			return strData;
	};

	this.GetColumnForRowByIndex =
		function(nColumnIndex)
		{
			return this.JSONTextArray [nColumnIndex];
	    };

	this.GetDataArray = function(strText) {
		//var splitList = [ ];
		//splitList.push (DATA_SEPERATOR);
		//return JSONUtil.SplitString(strText, splitList);
		return (strText + "").split(DATA_SEPERATOR);
	};
};
