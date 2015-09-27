'use strict';
//dddxdddddв

/*===========================================================================================
Доступ к БД через REST
===========================================================================================*/

servicesModule.factory('DALSrvc', function(RESTSrvc, $q) {	
	return {
		getPromise: function(method, url, obj){
			if (method=='save') method = 'post';
            var deferred = $q.defer();
            RESTSrvc.getPromise({method: method, url: url, data: obj}).then(
                function(data){
                    deferred.resolve(data.children ? data.children : data);
                },
                function(response){
                    if (response.data == ""){
                    	response.data = "Error status: " + response.status + ". Method: " + response.config.method + ". Url: " + response.config.url + "."; 
                    }
                    
                    deferred.reject(response);
			});

            return deferred.promise;
    	}
    }
});
  
