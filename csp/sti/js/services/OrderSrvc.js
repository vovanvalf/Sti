'use strict';
/*===========================================================================================
Заявка
===========================================================================================*/

servicesModule.factory('OrderSrvc', function(RESTSrvc) {    
    return {
        /* Сохранить / создать заявку */
        save: function(intern){
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.user + '/order', data: intern});
        },
        /* Удалить заявку по ИД */
        remove: function(id){
            return RESTSrvc.getPromise({method: 'DELETE', url: StiSetting.admin + '/order/' + id});
        },
        /* Получить заявку по ИД */
        get: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/order/' + id});
        },
        /* Получить все заявки для grid */
        getAllForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, other){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText,
                       other: other};
            
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/order/grid', data: obj});
        },
        /* Получить все заявки */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url:StiSetting.admin+'/order'});
        }
    }
});
