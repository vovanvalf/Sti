'use strict';
//
/*===========================================================================================
Фильтр и общая настройка для заголовков
===========================================================================================*/


localizationModule.filter('localize', function(StiDictionary) {
    return function(input) { 
    	//console.log('call localize'); 
        return StiDictionary.getTranslate(input, StiSetting.lang);
    }
});



servicesModule.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.headers.common['Accept-Language'] = StiSetting.lang;
}]);

