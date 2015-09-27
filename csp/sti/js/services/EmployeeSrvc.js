'use strict';
/*===========================================================================================
Сотрудники
===========================================================================================*/

servicesModule.factory('EmployeeSrvc', function(RESTSrvc) {    
    return {
	   
	    /* LiveSearch */ 
	    getBySearchParameters: function(word){
            var config ={method: 'GET',url:StiSetting.admin + '/json/employee/' + word};
            return RESTSrvc.getPromise(config);
        },    
        /* Сохранить / создать сотрудника */
        save: function(employee){
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/employee', data: employee});
        },
        /* Получить сотрудника по фильтру */
        findSimmilarEmployee: function(lastName,firstName,email){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/employee/lastName/'+lastName+'/firstName/'+firstName+'/email/'+email});
        },
        /* Удалить сотрудника по ИД */
        remove: function(id){
            return RESTSrvc.getPromise({method: 'DELETE', url: StiSetting.admin + '/employee/' + id});
        },
        /* Получить сотрудника по ИД */
        get: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/employee/' + id});
        },
        /* Получить всех сотрудников для grid */
        getAllForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, other){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText,
                       other: other};
            
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/employee/grid', data: obj});
        },
        /* Получить всех сотрудников */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url:StiSetting.admin+'/employee'});
        }
    }
});