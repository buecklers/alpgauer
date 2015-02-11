angular.module('alpgauer', ['ngRoute','ngAnimate'])

.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'content/home.html',
			controller: 'HomeCtrl'		
		})
		.when('/kreation', {
			templateUrl:'content/kreation.html'
		})
		.when('/leistung', {
			templateUrl:'content/leistung.html'
		})
		.when('/umsetzung', {
			templateUrl:'content/umsetzung.html'
		})
		.when('/alpgauer', {
			templateUrl:'content/alpgauer.html'
		})
		.when('/alpgauer_mehr', {
			templateUrl:'content/alpgauer_mehr.html'
		})
		.when('/referenzen', {
			templateUrl:'content/referenzen.html'
		})
		.when('/kontakt', {
			templateUrl:'content/kontakt.html'
		})
})

.controller('HomeCtrl', function($scope, $location){
	$scope.init = function(){
		console.log('init: '+ $location.url());
		$scope.target = $location.url() == '/' | $location.url()==''? 'home' : $location.url().substr(1, $location.url().length);
	}

	
	//$scope.buttonselect = $scope.target.substr(1, $scope.target.length)+'_selected';

	console.log($scope.target);

	$scope.go = function(target){
		$scope.target = target=='/'? 'home' : target;
		$location.url(target);
		$scope.buttonselect = target.substr(0, target.length)+'_selected';
	}

})

.filter('buttonselected', function(){
	return function(button, target){
		return button == target? true : false;
	}

});