'use strict';
/*===========================================================================================
Стажёр
===========================================================================================*/

servicesModule.factory('InternSrvc', function(RESTSrvc) {    
    return {
        /* Сохранить / создать стажера */
        save: function(intern){
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/intern', data: intern});
        },
        /* Получить стажера по фильтру */
        findSimmilarIntern: function(lastName,firstName,dob){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/intern/lastName/'+lastName+'/firstName/'+firstName+'/dob/'+dob});
        },
        /* Создать стажера из заявки */
        create: function(intern){
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/createintern', data: intern});
        },
        /* Удалить стажера по ИД */
        remove: function(id){
            return RESTSrvc.getPromise({method: 'DELETE', url: StiSetting.admin + '/intern/' + id});
        },
        /* Получить стажера по ИД */
        get: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: StiSetting.admin + '/intern/' + id});
        },
        /* Получить всех стажеров для grid */
        getAllForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, other){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText,
                       other: other};
            
            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/intern/grid', data: obj});
        },
        /* Все слушатели обучения для таблицы */
        getInternshipStudentsForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, trainingId){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText,
                       trainingId: trainingId};

            return RESTSrvc.getPromise({method: 'POST', url: StiSetting.admin + '/internship/student/grid', data: obj});
        },
        /* Получить всех стажеров */
        getAll: function(){
            return RESTSrvc.getPromise({method: 'GET', url:StiSetting.admin+'/intern'});
        }
    }
});
