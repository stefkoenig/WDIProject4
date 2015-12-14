(function() {
	'use strict'

	angular.module('app.routes', [ 'ngRoute' ])
		.config(['$routeProvider', '$locationProvider', mapRoutes])

	function mapRoutes($routeProvider, $locationProvider){
	$routeProvider
      .when('/', {
        templateUrl: 'partials/map.html',
        // controller: 'mapController',
        // controllerAs: 'mapCtrl'
      })
	  .otherwise({
	    redirectTo: '/'
	  });
	}  	
}());