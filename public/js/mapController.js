(function(){
	angular.module('mapCtrl', [])
		.controller('mapController', mapController)

	function mapController(){
		var self = this
		self.name = 'Map'
		self.map = null

		self.googleMap = function(){
			  self.map =	new google.maps.Map(document.getElementById('map'), {
				    center: {lat: 34.0218579, lng: -118.5154401}, //34.0218579,-118.5154401
				    zoom: 8
		  })

		 }
		 self.googleMap()
	}

}());
