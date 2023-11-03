JSONUtil = {

	// return an array of objects according to key, value, or key and value matching
	GetJSONObjects : function(obj, key, val) {
		var objects = [];
		for ( var i in obj) {
			if (!obj.hasOwnProperty(i))
				continue;
			if (typeof obj[i] == 'object' && i != key) {
				objects = objects.concat(this.GetJSONObjects(obj[i], key, val));
			}
			// if key matches and value matches or if key matches and value is not
			// passed (eliminating the case where key matches but passed value does
			// not)
			else if ((i == key && obj[i] == val) || (i == key && val == '')) { //
				objects.push(obj);
			} else if (obj[i] == val && key == '') {
				// only add if the object is not already in the array
				if (objects.lastIndexOf(obj) == -1) {
					objects.push(obj);
				}
			}
		}
		return objects;
	},

	// return an array of values that match on a certain key
	GetJSONValues : function(obj, key) {
		var objects = [];
		for ( var i in obj) {
			if (!obj.hasOwnProperty(i))
				continue;
			if (typeof obj[i] == 'object' && i != key) {
				objects = objects.concat(this.GetJSONValues(obj[i], key));
			} else if (i == key) {
				objects.push(obj[i]);
			}
		}

		return objects;
	},

	// return an array of keys that match on a certain value
	GetJSONKeys : function(obj, val) {
		var objects = [];
		for ( var i in obj) {
			if (!obj.hasOwnProperty(i))
				continue;
			if (typeof obj[i] == 'object') {
				objects = objects.concat(this.GetJSONKeys(obj[i], val));
			} else if (obj[i] == val) {
				objects.push(i);
			}
		}
		return objects;
	},

	SplitString : function(string, splitters) {
		var list = [ string ];
		for (var i = 0, len = splitters.length; i < len; i++) {
			this.TraverseList(list, splitters[i], 0);
		}
		return this.Flatten(list);
	},

	TraverseList : function(list, splitter, index) {
		if (list[index]) {
			if ((list.constructor !== String)
					&& (list[index].constructor === String))
				(list[index] != list[index].split(splitter)) ? list[index] = list[index]
						.split(splitter)
						: null;
			(list[index].constructor === Array) ? this.TraverseList(list[index],
					splitter, 0) : null;
			(list.constructor === Array) ? this.TraverseList(list, splitter,
					index + 1) : null;
		}
	},

	Flatten : function (arr)
	{
		return arr.reduce (function(acc, val) {
			return acc.concat (val.constructor === Array ? JSONUtil.Flatten(val)
					: val);
		}, []);
	},

    GetRestData : function (strRestTag, arrObjects)
	{
		var strRestData = "";
		for (var nIndex = 0; nIndex < arrObjects.length; nIndex++)
		{
			var bLastIndex = ((nIndex == arrObjects.length - 1) ? true : false);
			strRestData += arrObjects[nIndex] + (bLastIndex == true ? "" : DATA_SEPERATOR);
		}

		strRestData = "{\"" + strRestTag + "\" : [{ \"" + DATA + "\" : \"" + strRestData + "\" }]}";
		return strRestData;
	},

    JSONToCSVConvertor : function (fileName, ShowReportTitle, ReportTitle, ShowLabel, arrHeaders, arrExcludeHeader, arrData, arrExcludeData)
    {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        //var arrData = typeof JSONData != 'object' ? JSON.parse (JSONData) : JSONData;
        var CSV = '';
        //Set Report title in first row or line

        if (ShowReportTitle)
        {
            CSV += ReportTitle + '\r\n\n';
        }

        //This condition will generate the Label/Header
        if (ShowLabel)
        {
            var row = "";

            if(arrHeaders)
            {
                for (var i = 0; i < arrHeaders.length; i++)
                {
                    var bFound = false;
                    for (var j = 0; j < arrExcludeHeader.length; j++)
                    {
                        if (i == parseInt (arrExcludeHeader [j]))
                        {
                            bFound = true;
                            break;
                        }
                    }
                    if (bFound == false)
                        row += '"' + arrHeaders[i] + '",';
                }
            }
            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++)
        {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            var nColumnIndex = 0;
            for (var colName in arrData[i])
            {
                var bFound = false;
                for (var j = 0; j < arrExcludeData.length; j++)
                {
                    if (nColumnIndex == parseInt (arrExcludeData [j]))
                    {
                        bFound = true;
                        break;
                    }
                }
                if (bFound == false)
                    row += '"' + arrData[i][colName] + '",';
                nColumnIndex++;
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';

        }

        if (CSV == '')
        {
            alert("Invalid data");
            return;
        }

        if(!fileName)
        {
            //Generate a file name
            fileName = "MyReport_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g,"_");
        }

        if (navigator.appName == "Microsoft Internet Explorer")
        {
            var oWin = window.open ();
            oWin.document.write ('sep=,\r\n' + CSV);
            oWin.document.close ();
            oWin.document.execCommand ('SaveAs', true, fileName + ".csv");
            oWin.close ();
        }
        else
        {
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
};