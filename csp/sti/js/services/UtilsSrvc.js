'use strict';

/*===========================================================================================
Utils
===========================================================================================*/

servicesModule.factory('UtilsSrvc', function( $filter, DALSrvc, $dialog) {
	
	return {

        getValidDate: function(str){
	        var date = new Date(str);
	        if (isNaN(date))
	        	return "";
	        	
	        return $filter('date')(date, 'dd-MM-y');
	    },
        getIndexes: function(array, objField, valueField){
            var indexes = [];
            
            if (!array) return indexes;
            
            for (var i = 0; i < array.length; i++) {
                if (array[i][objField] == valueField)
                    indexes.push(i);
            };
            return indexes;
        },
        getValidDate: function(str){
	        var date = new Date(str);
	        if (isNaN(date))
	        	return "";
	        	
	        return $filter('date')(date, 'yyyy-MM-dd');
	    },
	    getAlert: function(title, msg, eventType, visible){
        	return {title: $filter('localize')(title),
                    msg: $filter('localize')(msg),
                    cssClass: 'alert alert-' + eventType,
                    visible: visible};
    	},
    	getAlertLabel: function(msg, eventType){
            return {msg: $filter('localize')(msg),
                    cssClass: eventType,
                    visible: true};
        },
        getPropertyValue: function (item, propertyStr, defaultValue){
            var value;
            defaultValue = defaultValue ? defaultValue : '';

            try{
                var properties = propertyStr.split('.');
                
                switch(properties.length){
                    case 1:
                        value = item[properties[0]];
                        break;
                    case 2:
                        value = item[properties[0]][properties[1]];
                        break;
                    case 3:
                        value = item[properties[0]][properties[1]][properties[2]];
                        break;
                    case 4:
                        value = item[properties[0]][properties[1]][properties[2]][properties[3]];
                        break;
                    case 5:
                        value = item[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]];
                        break;
                }
            }
            catch(ex){
                //console.log('C????? ??????' + propertyStr);
            }

            return value == undefined ? defaultValue : value;
        },
        base64Encode: function(s) {
    		return btoa(unescape(encodeURIComponent(s)));
  		},
  		base64Decode: function(s) {
    		return decodeURIComponent(escape(atob(s)));
  		},
  		openCustomMessageBox: function(title, msg, btns){
            $dialog.messageBox($filter('localize')(title), $filter('localize')(msg), btns).open().then(function(result){
                for (var i=0; i < btns.length; i++){
                    if (result == btns[i].result && btns[i].func)
                        btns[i].func();
                }
             });
        },
        getAllLogsForGrid: function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText){
            var first = pageSize * (pageCurr - 1) + 1;
            var obj = {sqlName: sqlName, 
                       isDown: isDown, 
                       first: first, 
                       last: first + pageSize - 1,
                       searchSqlName: searchSqlName, 
                       searchText: searchText};

            return DALSrvc.getPromise('save', StiSetting.admin + '/json/log/grid', obj);
        },
    }
});
  
