(function() {
	'use strict'

	angular.module('app.routes', [ 'ngRoute' ])
		.config(['$routeProvider', '$locationProvider', mapRoutes])

	function mapRoutes($routeProvider, $locationProvider){
	$routeProvider
		.when('/maps', {
			templateUrl: 'partials/map.html',
			controller: 'mapController',
			controllerAs: 'mapCtrl'
		})
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'mainController',
			controllerAs: 'login'
		})
		.when('/signup', {
			templateUrl: 'partials/signup.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})
		.when('/users',{
			controller: 'userController',
			controllerAs: 'user'
		})
		.otherwise({
			redirectTo: '/maps'
		});
	}
}());
