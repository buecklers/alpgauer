angular.module('mailService', [])

.provider('mail', function(){

	this.phpservice = "php/mail.php";
	
	this.$get = function($http, $q){
		var self = this;

		var service = {
			sendMail : function(params){
				var deferred = $q.defer();
				$http({
					method:'POST',
					url:self.phpservice,
					params : params,
					data : JSON.stringify(params),
					headers: {'Content-Type':'application/x-www-form-urlencoded'}
				})
				.success(function(resp){
					deferred.resolve(resp);
				})
				.error(function(error){
					deferred.resolve('-1');
				})
				return deferred.promise;
			}
		}
		return service;
	}
})