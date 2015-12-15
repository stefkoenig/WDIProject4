angular.module('caliApp', ['app.routes', 'mapCtrl', 'mainCtrl', 'userCtrl', 'authService'])
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor')
  })
