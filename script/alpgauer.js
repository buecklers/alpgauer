angular.module('alpgauer', ['ngRoute','ngAnimate', 'mailService'])

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
			templateUrl:'content/kontakt.php',
			controller: 'FormCtrl'
		})
		.when('/impressum', {
			templateUrl:'content/impressum.html'
		})
})

.controller('HomeCtrl',['$scope', '$location', function($scope, $location){
	$scope.init = function(){
		console.log('init: '+ $location.url());
		$scope.target = $location.url() == '/' | $location.url()==''? 'home' : $location.url().substr(1, $location.url().length);
	}

	$scope.go = function(target){
		$scope.target = target=='/'? 'home' : target;
		$location.url(target);
		$scope.buttonselect = target.substr(0, target.length)+'_selected';
	}

}])

.controller('FormCtrl', ['$scope', 'mail', function ($scope, mail){
	$scope.sent = false;
	$scope.formular = {
		'gender' : '',
		'vorname' : '',
		'nachname': '',
		'email': '',
		'nachricht': '',
		'captcha':'',
		'captchaPlaceholder':'Code hier eingeben'
	}

	$scope.submit = function(){
		mail.sendMail($scope.formular).then(function(resp){
			console.log(resp);
				if(resp == '1'){
					$scope.sent = true;
				}else{
					$scope.formular.captchaPlaceholder = 'falscher Code';
					$scope.formular.captcha = '';
				}
			},
			function(resp){
				console.log('mail not sent')
			})

	}

}])

.filter('buttonselected', function(){
	return function(button, target){
		return button == target? true : false;
	}

});