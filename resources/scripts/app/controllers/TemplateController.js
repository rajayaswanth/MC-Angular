gr6Admin.controller("TemplateController",function($scope, $rootScope, $location, $window,localStorageService){

	console.log("Template Controller Loaded");
	$scope.loggedIn="";

	$scope.init=function(){
		console.log("in init function");
		$scope.loggedIn=localStorageService.get("logged_in");
		$scope.dash = {color: "#222"};
		if($scope.loggedIn)
			$scope.loadUser();
		$scope.superUser = false;
	}

	$scope.logOut = function(e)
	{
		localStorageService.remove('logged_in');
		localStorageService.remove('authData');
		$scope.loggedIn=false;		
		$window.location.reload();
		e.preventDefault();
	};

	$scope.loadUser = function() 
	{
		
	};

});