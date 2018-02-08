exports.isEmpty = function(value)
{
	if( value=='null' || typeof(value) === 'undefined'  || value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) )
	{
		return true;
	}else{
		return false;
	}
};
exports.stringEmpty = function(value)
{
	if( value=='null' || typeof(value) === 'undefined'  || value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) )
	{
		return "";
	}else{
		return value;
	}
};
