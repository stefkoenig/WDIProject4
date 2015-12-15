angular.module('caliApp', ['app.routes','mapCtrl', 'mainCtrl', 'userCtrl', 
	'userService', 'authService', 'destFactory'])
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor')
  })
