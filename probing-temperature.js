
/* ********** GENERAL SCRIPTING **********************

*/

var temperature = script.addFloatParameter("Temperature","Sensore temperature",0,-25,100); 		//This will add a float number parameter (slider), default value of 0.1, with a range between 0 and 1
var isProbingSensor = script.addBoolParameter("isProbingSensor","Actively probing sensor for temperature",true); 			//This will add a boolean parameter (toggle), defaut unchecked

function init()
{

	// TODO : updateRate = 1;
	isProbingSensor.set(true);
	temperature.set(0.0);
}

/*
 This function will be called each time a parameter of your script has changed
*/

function scriptParameterChanged(param)
{
	//You can use the script.log() function to show an information inside the logger panel. To be able to actuallt see it in the logger panel, you will have to turn on "Log" on this script.
	script.log("Parameter changed : "+param.name); //All parameters have "name" property
	if(param.is(myTrigger)) script.log("Trigger !"); //You can check if two variables are the reference to the same parameter or object with the method .is()
	else if(param.is(myEnumParam)) script.log("Key = "+param.getKey()+", data = "+param.get()); //The enum parameter has a special function getKey() to get the key associated to the option. .get() will give you the data associated
	else script.log("Value is "+param.get()); //All parameters have a get() method that will return their value
}

/*
 This function, if you declare it, will launch a timer at 50hz, calling this method on each tick
*/

function update(deltaTime)
{
	if(isProbingSensor.get())
	{
		local.sendGET("set.cmd?user=admin&pass=12345678&cmd=gettemperature", params); //the address field will be appended to the module's base address
	}

	//script.log("temperature " + parseFloat(temperature));
}

/*
 This function will be called each time a parameter of this module has changed, meaning a parameter or trigger inside the "Parameters" panel of this module
 This function only exists because the script is in a module
*/
function moduleParameterChanged(param)
{
	if(param.isParameter())
	{
		script.log("Module parameter changed : "+param.name+" > "+param.get());
	}else 
	{
		script.log("Module parameter triggered : "+param.name);	
	}
}

/*
 This function will be called each time a value of this module has changed, meaning a parameter or trigger inside the "Values" panel of this module
 This function only exists because the script is in a module
*/

function moduleValueChanged(value)
{
	if(value.isParameter())
	{
		script.log("Module value changed : "+value.name+" > "+value.get());	
	}else 
	{
		script.log("Module value triggered : "+value.name);	
	}
}

function dataEvent(data, requestURL)
{
	//script.log("Data received, request URL :"+requestURL+"\nContent :\n" +data);
	
	// Parsing data
	var arrayData = data.split("&"); // Parsing data here;
	var arrayData2 = arrayData[0].split(" "); // Parsing data here;
	//temperature = parseFloat(arrayData2[1]);
	temperature.set(parseFloat(arrayData2[1]));
	
	//script.log("temperature : " + temperature);
}
