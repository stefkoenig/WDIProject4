(function() {
	'use strict';
	angular.module('dests', [])
		.directive('navBar', navBar)
		// .directive('carForm', carForm)
		// .filter('reverse', reverse)

	// function reverse() {
	// 	return function(items) {
	// 		return items.slice().reverse();
	// 	};
	// }

	// function carForm(){
	// 	var directive = {
	// 		restrict: 'E',
	// 		templateUrl: '/partials/car-form.html'
	// 	}
	// 	return directive
	// }

	function navBar(){
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/nav.html',
			transclude: true
		}
	
		return directive
	}
}());
