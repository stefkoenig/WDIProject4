(function(){
	'use strict'

	angular.module('destFactory', [])
		.factory('dests', dests)

	dests.$inject = [ '$http']	

	//maps factory
	function dests($http){
		var destsUrl = '/api/v1/maps' 
		var dests = {}

		//this should return all the destinations
		dests.list = function(){
			return $http.get(destsUrl)
		}
		return dests
	}
}());