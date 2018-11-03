gr6Admin.controller('LoginController', function($scope, $rootScope, $location,$window, LoginService, localStorageService) {
	console.log("Login Controller loaded");

	$scope.userLogin = {};
	
	$scope.errors = [];

	$scope.loggedIn = localStorageService.get('logged_in')||false;

	$scope.init = function() 
	{
		//if already loggedIn then go to Dashboard
 		if(localStorageService.get('logged_in')){
			$scope.goToURL('/landing');
		}
		$scope.userLogin = {};
		
	};
	
	/*
	* Navigate to the HTML page specified in path variable
	*/
	$scope.goToURL = function(path) 
	{
		$location.path(path);
	};
	
	/*
	* Allows user to login with email and password credentials
	*/
	$scope.login = function(valid) 
	{
		$scope.submitted = false; //on login button click

		if(!valid)
		{
			console.log("Login Form Validation Error");
			$scope.submitted = true;
			return;
		}

		console.log("Logging In..");
		var request = {};
		request.grant_type = "password";
    	request.client_id = "AKIAI7P3SOTCRBKNR3IA";
    	request.client_secret = "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";
		request.username = $scope.userLogin.email;
		request.password = $scope.userLogin.password;

		//Check if email and password is present in database and get access token, refresh token
		LoginService.validate(JSON.stringify(request), function(data) 
		{
			if(data != null) 
			{
				localStorageService.set('authData', data);
				localStorageService.set('logged_in',true);
				$scope.loadUser()
			} 
		}, 
		function(data, status)
		{
			console.log("In error");
			$scope.noLogin = true;
			//console.log($scope.noLogin);
			$scope.errors = []
			$scope.errors.push("Error: Username or Password is incorrect");
		}, 
		function(data, status) 
		{
			console.log("In forbidden");
		});
	};

	$scope.loadUser = function() 
	{
		LoginService.validate(JSON.stringify(request), function(data) {
			
		}, function(data, status) {
			console.log("In error");
		}, function(data, status) {
			console.log("In forbidden");
		});
	};
});