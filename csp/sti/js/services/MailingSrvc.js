'use strict';
//ddff

/*===========================================================================================
Группы и участники рассылки
===========================================================================================*/

servicesModule.factory('MailingSrvc', function(DALSrvc) {
	return {
        getAllGroupsForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, other){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText,
                       other: other};

            return DALSrvc.getPromise('save', StiSetting.admin + '/json/mailing/group/grid', obj);
        },
        getAllGroupItemsForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, other){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText,
                       other: other};

            return DALSrvc.getPromise('save', StiSetting.admin + '/json/mailing/group/item/grid', obj);
        },
        saveGroup: function(group){
            return DALSrvc.getPromise('save', StiSetting.admin + '/json/mailing/group', group);
        },
        saveGroupItem: function(item){
            return DALSrvc.getPromise('save', StiSetting.admin + '/json/mailing/group/item', item);
        },
        createSubscription: function(item){
            return DALSrvc.getPromise('save', StiSetting.user + '/json/mailing/subscription', item);
        },
        updateSubscription: function(item, code){
            return DALSrvc.getPromise('save', StiSetting.user + '/json/mailing/subscription/' + code, item);
        },
        removeSubscription: function(code){
            return DALSrvc.getPromise('delete', StiSetting.user + '/json/mailing/subscription/' + code, null);
        },
        confirmSubscription: function(code){
            return DALSrvc.getPromise('save', StiSetting.user + '/json/mailing/subscription/confirmation/' + code, null);
        },
        getGroupItemByAccessCode: function(code){
            return DALSrvc.getPromise('get', StiSetting.user + '/json/mailing/subscription/' + code, null);
        },
        getGroup: function(id){
            return DALSrvc.getPromise('get', StiSetting.admin + '/json/mailing/group/' + id, null);
        },
        getGroups: function(){
            return DALSrvc.getPromise('get', StiSetting.admin + '/json/mailing/group', null);
        },
        getGroupItem: function(id){
            return DALSrvc.getPromise('get', StiSetting.admin + '/json/mailing/group/item/' + id, null);
        },
        getGroupContacts: function(id){
            return DALSrvc.getPromise('get', StiSetting.admin + '/json/mailing/group/' + id + '/contact', null);
        },
        getGroupMail: function(id){
            return DALSrvc.getPromise('get', StiSetting.admin + '/json/mailing/group/' + id + '/mail', null);
        },
        removeGroup: function(id){
	   		    return DALSrvc.getPromise('delete', StiSetting.admin + '/json/mailing/group/' + id, null);
	    },
        removeGroupItem: function(id){
            return DALSrvc.getPromise('delete', StiSetting.admin + '/json/mailing/group/item/' + id, null);
        },
        sendEMail: function(data){
            return DALSrvc.getPromise('save', StiSetting.admin + '/json/mailing/mail/send', data);
        },
        changeMailingStatus: function(status){
            return DALSrvc.getPromise('save', StiSetting.admin + '/json/mailing/status/' + status, null);
        },
        getMailingStatus: function(){
            return DALSrvc.getPromise('get', StiSetting.admin + '/json/mailing/status', null);
        },
        getAllJournalPartsForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText};

            return DALSrvc.getPromise('save', StiSetting.admin + '/json/mailing/journal/parts/grid', obj);
        },
        getAllJournalItemsForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, other){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText,
                       other: other};

            return DALSrvc.getPromise('save', StiSetting.admin + '/json/mailing/journal/grid', obj);
        },
        removeJournalItem: function(id){
            return DALSrvc.getPromise('delete', StiSetting.admin + '/json/mailing/journal/' + id, null);
        },
        removeJournalPart: function(groupNumber){
            return DALSrvc.getPromise('delete', StiSetting.admin + '/json/mailing/journal/part/' + groupNumber, null);
        }

    }
});
  
