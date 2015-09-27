'use strict';
/*===========================================================================================
Оценки Pet,Eng
===========================================================================================*/

servicesModule.factory('MarksSrvc', function(RESTSrvc) {    
    return {
        getEngAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url:StiSetting.user+'/eng'});
        },
         getPetAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url:StiSetting.user+'/pet'});
        }
    }
});
