'use strict';
/*===========================================================================================
Компания
===========================================================================================*/

servicesModule.factory('CompanySrvc', function(RESTSrvc) {    
    return {
	    
        /* Сохранить / создать компанию */
        save: function(company){
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/company', data: company});
        },
        /* Удалить компанию по ИД */
        remove: function(id){
            return RESTSrvc.getPromise({method: 'DELETE', url: StiSetting.admin + '/company/' + id});
        },
        /* Получить компанию по ИД */
        get: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/company/' + id});
        },
        /* Получить все компании */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/company'});
        },
        /* Получить все компании для grid*/
         getAllForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, other){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText,
                       other: other};
            
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/company/grid', data: obj});
        },
        /* Получить все стажировки компании */
        getInterns: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/company/' + id + '/internship'});
        }
    }
});