var HttpCommunicationUtil = function($http, $rootScope, localStorageService, $location, $window) {
	var factory = {};
	//TODO: This end-point should be used...
	var host = $location.host();

     if(host == "ED.com"){
         var baseUrl = "";
     }else{
         var baseUrl = "";
	 }
	var baseUrl = "http://localhost:9000/api/1.0/";

	var processData = {};

	//For refreshing access token
	var refresh = {};
	refresh.grant_type = "refresh_token";
	refresh.client_id = "AKIAI7P3SOTCRBKNR3IA";
	refresh.client_secret = "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";
	
	//Set the header of request with access token
	var authData = {};
	function setHeader()
	{
		authData = localStorageService.get('authData');
		if(authData) 
		{
			$http.defaults.headers.common.Authorization = "Bearer " + authData.access_token;
		}
	}	

	factory.doPost = function(url, data, successCallbackFunction, errorCallbackFunction, forbiddenCallbackFunction){
		$http.defaults.headers.post["Content-Type"] = "application/json; charset = utf-8"
		setHeader();
		processData.methodName = "doPost";
		processData.url = url;
		processData.data = data;
		$http.post(baseUrl + url, data)
		.success(function(data, status, headers, config){
			successCallbackFunction(data, status, headers, config);
		})
		.error(function(data, status, headers, config){
			console.log("Error callback called for url: "+url+" with POST method with status: "+status+" and data: ");
			console.log(data);
			if(status == "401" && (!data))
			{
				refreshAccessToken(successCallbackFunction, errorCallbackFunction, forbiddenCallbackFunction);
			}	
			errorCallbackFunction(data, status, headers, config);
		});
	},


	factory.doPut = function(url, data, successCallbackFunction, errorCallbackFunction, forbiddenCallbackFunction){
		console.log("doPut called");
		setHeader();
		processData.methodName = "doPut";
		processData.url = url;
		processData.data = data;
		$http.put(baseUrl + url, data)
		.success(function(data, status, headers, config){
			successCallbackFunction(data, status, headers, config);
		})
		.error(function(data, status, headers, config){
			console.log("Error callback called for url: "+url+" with PUT method with status: "+status+" and data: ");
			console.log(data);
			if(status == "401" && (!data))
			{
				refreshAccessToken(successCallbackFunction, errorCallbackFunction, forbiddenCallbackFunction);
			}
			errorCallbackFunction(data, status, headers, config);
		});
	},
	
	factory.doGet = function(url, successCallbackFunction, errorCallbackFunction, forbiddenCallbackFunction){
		setHeader();
		processData.methodName = "doGet";
		processData.url = url;
		$http.get(baseUrl + url)
		.success(function(data, status, headers, config){
			successCallbackFunction(data, status, headers, config);
		})
		.error(function(data, status, headers, config){
			console.log("Error callback called for url: "+url+" with method GET with status: "+status+" and data: ");
			console.log(data);
			if(status == "401" && (!data))
			{
				refreshAccessToken(successCallbackFunction, errorCallbackFunction, forbiddenCallbackFunction);
			}
			errorCallbackFunction(data, status, headers, config);
		});
	};

	factory.doDelete = function(url, successCallbackFunction, errorCallbackFunction, forbiddenCallbackFunction){
		setHeader();
		processData.methodName = "doDelete";
		processData.url = url;
		$http.delete(baseUrl + url)
		.success(function(data, status, headers, config){
			successCallbackFunction(data, status, headers, config);
		})
		.error(function(data, status, headers, config){
			console.log("Error callback called for url: "+url+" with method DELETE with status: "+status+" and data: ");
			console.log(data);
			if(status == "401" && (!data))
			{
				refreshAccessToken(successCallbackFunction, errorCallbackFunction, forbiddenCallbackFunction);
			}
			errorCallbackFunction(data, status, headers, config);
		});
	};
	
	return factory;
};

if(typeof gr6Admin !== 'undefined') {
	gr6Admin.factory('HttpCommunicationUtil', HttpCommunicationUtil);
}
