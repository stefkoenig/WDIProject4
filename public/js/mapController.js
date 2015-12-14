(function(){
	angular.module('mapCtrl', [])
		.controller('mapController', mapController)

	mapController.$inject = ['maps']


	function mapController(maps){
		// console.log('instantiate mapController')

		var self = this
		// console.log('this', this)

		self.name = 'Map'

		self.api = maps
		// console.log('maps', maps)
		// console.log(map)

		self.googleMap = function(){
			console.log('hello from googleMap function in controller')
			  	maps = new google.maps.Map(document.getElementById('map'), {
				    center: {lat: -34.397, lng: 150.644},
				    zoom: 8
		  })

		 } 

	}
		 
}());		