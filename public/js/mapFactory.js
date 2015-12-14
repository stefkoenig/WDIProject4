(function() {
	'use strict';

	angular.module('mapFactory', [])
	    .factory('maps', maps)

	 maps.$inject = ['$http']   
 
		//map factory
		function maps($http){
			var maps = {}	

			maps.googleMap = function(){
				 var apiUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDRxCNJRLIGry1B2oUx6Qs2F8zyKVj5lHY&callback=initMap"
				 return $http.get(apiUrl)		 
			} 
			return maps	
		}
}());
