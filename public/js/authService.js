(function() {
  'use strict';
  //create angular module for auth service
  angular.module('authService', [])
  // create a function to export for your service
  .factory('AuthToken', AuthToken)
  .factory('Auth', Auth)
  .factory('AuthInterceptor', AuthInterceptor)

  function Auth( $http, $q, AuthToken ){
    var authFactory = {}
    authFactory.login = function(username, password){
        return $http.post('/api/v1/authenticate', {
            username: username,
            password: password
        })
        .success(function(data){
            AuthToken.setToken(data.token)
            return data
        })
    }
    authFactory.logout = function(){
        AuthToken.setToken()
    }
    authFactory.isLoggedIn = function(){
        if ( AuthToken.getToken() )
            return true
        else
            return false
    }
    authFactory.getUser = function(){
        if ( AuthToken.getToken() )
            return $http.get('/api/v1/me', {cache: false})
        else
            return $q.reject({message: 'User has no token'})

    }
    return authFactory
  }

  function AuthInterceptor( $q, AuthToken){
    var authIntercept = {}

    authIntercept.request = function(config){
        var token = AuthToken.getToken()

        if ( token ){
            config.headers['x-access-token'] = token

        }

        return config
    }

    authIntercept.responseError = function(response){
        if ( response.status == 403 )
            $location.path('/login')

        return $q.reject(response)
    }

    return authIntercept
  }

  function AuthToken( $window ) {
    var authTokenFactory = {}
    //get the token out of local storage
    authTokenFactory.getToken = function(){
      return $window.localStorage.getItem('token')
    }
    authTokenFactory.setToken = function(token){
        if ( token )
            $window.localStorage.setItem('token', token)
        else
            $window.localStorage.removeItem('token')
    }

    return authTokenFactory
  }

  function AuthInterceptor( $q, $location, AuthToken ){

    var interceptorFactory = {};

	// this will happen on all HTTP requests
	interceptorFactory.request = function(config) {

		// grab the token
		var token = AuthToken.getToken();

		// if the token exists, add it to the header as x-access-token
		if (token)
			config.headers['x-access-token'] = token;

		return config;
  }
  // happens on response errors
	interceptorFactory.responseError = function(response) {

		// if our server returns a 403 forbidden response
		if (response.status == 403) {
			AuthToken.setToken();
			$location.path('/login');
		}

		// return the errors from the server as a promise
		return $q.reject(response);
	}

	return interceptorFactory;

}
}());
