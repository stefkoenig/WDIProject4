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

				var contentString = '<div id="content">'+
	      '<div id="siteNotice">'+
	      '</div>'+
	      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
	      '<div id="bodyContent">'+
	      '<p><b>'+ data.name +'</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
	      'sandstone rock formation in the southern part of the '+
	      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
	      'south west of the nearest large town, Alice Springs; 450&#160;km '+
	      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
	      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
	      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
	      'Aboriginal people of the area. It has many springs, waterholes, '+
	      'rock caves and ancient paintings. Uluru is listed as a World '+
	      'Heritage Site.</p>'+
	      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
	      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
	      '(last visited June 22, 2009).</p>'+
	      '</div>'+
	      '</div>';




							 var marker = new google.maps.Marker({
						        map: resultsMap,
						        // position: results[0].geometry.location
										// title: data.name
					      	});

									// var infowindow = new google.maps.InfoWindow({
		     				// 			content: contentString
		   					// 			});
								// marker.addListener('click', function() {
								// infowindow.open(map, marker);
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
		}
		self.googleMap()
		self.getDest()


	}

}());
