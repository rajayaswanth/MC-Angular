gr6Admin.service('LoginService', function (HttpCommunicationUtil, $rootScope) {
	/*
    * Validate Credentials submitted by user and Access token
    */
	this.validate = function(data, successCB, errorCB, forbiddenCB) 
	{
        console.log("In Login Service for validating the user");
        
        HttpCommunicationUtil.doPost(apiConstants["login"]["oauthentication"], data, successCB, errorCB, forbiddenCB);
    };

});