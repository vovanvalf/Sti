'use strict';

/*===========================================================================================
Other
===========================================================================================*/

servicesModule.factory('OtherSrvc', function(RESTSrvc) {    
    return {
        getLanguages: function(){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.user + '/language'});
        },
        checkAdmin: function(isLogin){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/checkAdmin/' + isLogin});
        },
        setUnknownKey: function(key){
	        console.log('unknownkey = '+key);
	        return RESTSrvc.getPromise({method: 'POST', url: StiSetting.user + '/unknownkey', data: {key: key}});
	    } 
    }
});
