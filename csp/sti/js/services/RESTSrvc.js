'use strict';
//dddxdddddвd

/*===========================================================================================
Access to REST API
===========================================================================================*/

servicesModule.factory('RESTSrvc', function($http, $q) {	
	return {
		getPromise: function(config){
            var deferred = $q.defer();
			//$('#divLoader').show();
            $http(config).
                success(function(data, status, headers, config){
                    //$('#divLoader').hide();
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config){
	                //$('#divLoader').hide();
                    deferred.reject(data, status, headers, config);
                });

            return deferred.promise;
    	}
    }
});