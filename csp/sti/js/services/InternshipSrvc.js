'use strict';
/*===========================================================================================
Стажировка
===========================================================================================*/

servicesModule.factory('InternshipSrvc', function(RESTSrvc) {    
    return {
        /* Сохранить / создать стажировку */
        save: function(internship){
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/internship', data: internship});
        },
        /* Удалить стажировку по ИД */
        remove: function(id){
            return RESTSrvc.getPromise({method: 'DELETE', url: StiSetting.admin + '/internship/' + id});
        },
        /* Получить стажировку по ИД */
        get: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/internship/' + id});
        },
        /* Получить все стажировки для grid */
        getAllForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, other){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText,
                       other: other};
            
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/internship/grid', data: obj});
        },
        /* Получить все стажеровки */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url:StiSetting.user+'/internship'});
        }
    }
});
