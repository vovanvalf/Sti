/*===========================================================================================
Settings service for mail
===========================================================================================*/

servicesModule.factory('SettingsSrvc', function(DALSrvc) {
	return {
        getMail: function(type){
            return DALSrvc.getPromise('get', StiSetting.admin + '/json/settings/mail/' + type, null);
        },
        getMailPreview: function(type){
            return DALSrvc.getPromise('get', StiSetting.admin + '/json/settings/mail/preview/' + type, null);
        },
        saveMail: function(obj, type){
            return DALSrvc.getPromise('save', StiSetting.admin + '/json/settings/mail/' + type, obj);
        }
    }
});