NUMBERUtil =
{
	ValidateNumbers : function(strNumber)
	{
        var bValid = true;
        if (isNaN (strNumber) == true)
        {
            bValid = false;
        }
        return bValid
	},

	ValidateIPNumbers : function(strNumber)
	{
        var bValid = NUMBERUtil.ValidateNumbers (strNumber);
        if (bValid)
        {
            if (parseInt (strNumber) >= 0 && parseInt (strNumber) <= 255)
                bValid = true;
        }
        return bValid
	},

	ValidateTimeZoneNumber : function(strNumber)
	{
        var bValid = NUMBERUtil.ValidateNumbers (strNumber);
        if (bValid)
        {
            var remainder = parseInt (strNumber) % 15;
            if (remainder == 0)
            {
                bValid = true;
            }
        }
        return bValid
	}
};