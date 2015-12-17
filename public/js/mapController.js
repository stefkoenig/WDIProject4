(function(){
	angular.module('mapCtrl', [])
		.controller('mapController', mapController)

	mapController.$inject = ['dests', '$window']

	function mapController(dests, $window){
		var self = this
		self.name = 'Map'
		self.map = null
		//passing in the factory
		self.api = dests
		//array to contain full list of destinations
		self.dests = []
		//new destination object
		self.newDest = {}
		//single destination
		self.dest = null
		var marker;


		//method to build a goolge map from google API
		self.googleMap = function(){
			var myLatLng = {lat: 37.7833, lng: -122.4167}
				self.map = new google.maps.Map(document.getElementById('map'), {
				    center: myLatLng,
				    zoom: 6
		 		 })

			//retrieve the list of desinations
			self.api.list().success(function(response){
				self.dests = response
				console.log('inside the self.api.list()', response)
			})

			//add a controller method to add a new desination when user submits form
			self.addDest = function(name,address,comments){

				var data = {name: name, address: address, comments: comments}
				console.log('you are in the addDest function', data)

				self.api.addDest(data).then(function success(response){
					self.dests.push(response.data.dest)
						console.log(response.data.dest)
					self.newDest = {}
				})
			}

			var geocoder = new google.maps.Geocoder();

			//add a controller method to get the last desination in the array

			function geocodeAddress(geocoder, resultsMap, dest) {
				dest.forEach(function(data){
					var address = data.address
					console.log(address, "what are you:")

					geocoder.geocode({'address': address}, function(results, status) {

					    if (status === google.maps.GeocoderStatus.OK) {
					      resultsMap.setCenter(results[0].geometry.location);


							 var marker = new google.maps.Marker({
						        map: resultsMap,

						        position: results[0].geometry.location
					      	})

					      	var contentString = '<div id="content">'+
							      '<div id="siteNotice">'+ 
							      '</div>'+ 
							      '<h1 id="firstHeading" class="firstHeading">' + data.name + '</h1>'+ 
							      '<p class="glyphicon glyphicon-star"></p>' +
							      '<div id="bodyContent">'+
							      '<p><b>Address:</b> '+ data.address +'</p>'+
							      '<p><b>Comments:</b> '+ data.comments +'</p>'+
							      '<p>Yelp: A link: <a href="https://"somewhere">' + '</a>'+
							      '</p>'+
							      '</div>'+
							      '</div>'; 
							      
				  			var infowindow = new google.maps.InfoWindow({
	    						content: contentString
	  						});

					      	marker.addListener('click', function() {
	    						infowindow.open(self.map, marker);
	  						});


				    	} else {
				    	  	alert('Geocode was not successful for the following reason: ' + status);
				   		}
			  		})



				})

			}

			self.geocoderSpot = function(dest) {
			    geocodeAddress(geocoder, self.map, dest)
			    console.log('you are at the geocoderSpot function', self.dest)
			}

			self.getDest = function(data) {
				var setDest = new Promise(function(resolve, reject) {
					self.api.getDest(data).success(function(response) {
						self.dest = response
						resolve(self.dest)
					})
				})

				setDest.then(function(dest) {
					self.geocoderSpot(dest)
					console.log('the then promise worked!')
				})
			}

			self.addFavorite = function(destId){
				self.api.addFavorite(destId).success(function(response){
				console.log('you are in the addFavorite: ', response)
				})
			}
		}
		self.googleMap()
		self.getDest()
	}

}());
