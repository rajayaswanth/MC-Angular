/*******************************************************************************
 * Copyright (c) 2014 VMware, Inc. All rights reserved.
 ******************************************************************************/

var gr6Admin = angular.module('gr6Admin', ['ngRoute', 'ui.bootstrap', 'LocalStorageModule']);

/**
 * Mapping to the URLs
 */
gr6Admin.config(['$routeProvider', '$httpProvider', 'localStorageServiceProvider', function($routeProvider, $httpProvider, localStorageServiceProvider) {
    console.log("Starting GR6 Admin config. Mapping the URLs to the controllers and the templates");

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    //console.log($httpProvider.defaults.headers);

    $routeProvider
		    .when('/', {
                controller: 'LoginController',
                templateUrl: 'resources/views/login.html'
            })
            .when('/register', {
                controller: 'LoginController',
                templateUrl: 'resources/views/register.html'
            })
    localStorageServiceProvider
        .setPrefix('gr6Admin')
        .setStorageType('localStorage')
        .setNotify(true, true)

    return gr6Admin;
}]);


// gr6Admin.run(function(editableOptions, $rootScope, $location) {
//   //editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
//   $rootScope.location = $location;
// });
