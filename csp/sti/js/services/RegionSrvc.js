'use strict';

/*===========================================================================================
Регионы, города
===========================================================================================*/

servicesModule.factory('RegionSrvc', function(RESTSrvc) {
	return {
		
	    /* Все города по начальным буквам */
        getAllCitiesStartsWith: function(startsWith){
           var config ={method: 'GET',url:StiSetting.user + '/json/city/' + startsWith};
            return RESTSrvc.getPromise(config);
        }
    }
});
  
