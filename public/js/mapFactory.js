(function() {
	'use strict';

	angular.module('mapFactory', [])
	    .factory('maps', maps)

	 maps.$inject = ['$http']   
 
		//map factory
		function maps($http){
			var apiUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDRxCNJRLIGry1B2oUx6Qs2F8zyKVj5lHY&callback=googleMap"
			console.log(apiUrl)	

			var maps = {}
			console.log('maps variable in map factory', maps)	
			

			maps.googleMap = function(){
				 return $http.get(apiUrl)	
				 	console.log('googleMap function in factory', $http.get(apiUrl))	 
			} 
			return maps	
		}
}());
