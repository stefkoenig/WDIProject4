angular.module('userService', [])

.factory('User', function($http) {

	// create a new object
	var userFactory = {};

	// get a single user
	userFactory.get = function(username) {
		return $http.get('/api/v1/users/' + username);
	};

	// get all users
	userFactory.all = function() {
		return $http.get('/api/v1/users/');
	};

	// create a user
	userFactory.create = function(userData) {
		return $http.post('/api/v1/users/', userData);
	};

	// update a user
	userFactory.update = function(username, userData) {
		return $http.put('/api/v1/users/' + username, userData);
	};

	// delete a user
	userFactory.delete = function(username) {
		return $http.delete('/api/v1/users/' + username);
	};

	// return our entire userFactory object
	return userFactory;

});
