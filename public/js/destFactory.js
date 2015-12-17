(function(){
	'use strict'

	angular.module('destFactory', [])
		.factory('dests', dests)

	dests.$inject = [ '$http']	

	//maps factory
	function dests($http){
		var destsUrl = '/api/v1/destinations' 
		var dests = {}

		//this should return all the destinations
		dests.list = function(){
			return $http.get(destsUrl)
		}

		dests.addDest = function(data){
			return $http.post(destsUrl, data)
		}

		dests.getDest = function(data){
			return $http.get(destsUrl, data)
		}
		dests.addFavorite = function(data){
			return $http.get(destsUrl, data)
		}

		return dests
	}
}());