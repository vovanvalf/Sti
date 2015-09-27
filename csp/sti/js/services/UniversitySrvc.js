'use strict';
/*===========================================================================================
Университет
===========================================================================================*/

servicesModule.factory('UniversitySrvc', function(RESTSrvc) {    
    return {
	     /* LiveSearch */ 
	    getBySearchParameters: function(word){
            var config ={method: 'GET',url:StiSetting.user + '/json/university/' + word};
            return RESTSrvc.getPromise(config);
        },
        /* Получить университет по фильтру */
        findSimmilarUniversity: function(fullName){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/university/fullName/'+fullName});
        },
        /* Сохранить / создать университет */
        save: function(university){
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/university', data: university});
        },
        /* Удалить университет по ИД */
        remove: function(id){
            return RESTSrvc.getPromise({method: 'DELETE', url: StiSetting.admin + '/university/' + id});
        },
        /* Получить университет по ИД */
        get: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/university/' + id});
        },
        /* Получить все университеты */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.user + '/university'});
        },
        /* Получить все университеты для grid */
         getAllForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, other){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText,
                       other: other};
            
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/university/grid', data: obj});
        },
        /* Получить всех стажеров университета */
        getInterns: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/university/' + id + '/intern'});
        }
    }
});
