angular.module('caliApp', ['app.routes','mapCtrl', 'mainCtrl', 'userCtrl', 
	'userService', 'authService','dests', 'destFactory'])
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor')
  })
