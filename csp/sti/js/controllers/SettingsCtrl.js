'use strict';
//=    

/*===========================================================================================
SettingsCtrl - all settings for mail
===========================================================================================*/

controllersModule.controller('SettingsCtrl', function($scope, $filter, SettingsSrvc, UtilsSrvc){
    $scope.menu.selectMenu('settings');
    $scope.page = { 
                   mail:{
                      settings: {},
                      operators: {items:[{email:{}}]},
                      reminder: {},
                      feedback: {},
                      listOfFeedbacks: {},
                      teacher: {},
                      curator: {},
                      registration: {},
                      orders: {},
                      orderapply: {},
                      mailinggroup: {},
                      mailingsubscriber:{},
                      confirmsubscription:{}
                   }
                 };
    
    //================================================================================================================================================================
    // MAIL                                                                                                                                                       MAIL
    //================================================================================================================================================================
    // Load settings for mail tab by type (reminder, feedback and etc.)
    $scope.page.mail.load = function(type){
        SettingsSrvc.getMail(type).then(
                function(data){
                    $scope.page.mail[data.type] = data.data;
                    if ($scope.page.mail[data.type].message){
                        $scope.page.mail[data.type].message = $scope.page.mail[data.type].message.replace(/<br>/g, "\n")
                    }
                },
                function(response){      
                    $scope.page.alert = UtilsSrvc.getAlert('Внимание!', response.data, 'error', true);
                });
    };
    
    // Save settings for mail tab by type (reminder, feedback and etc.)
    $scope.page.mail.save = function(type, form){
        var mailData = angular.copy($scope.page.mail[type]);
        
        if (mailData.message){
            mailData.message = mailData.message.replace(/\n/g, "<br>");
        }
        
        SettingsSrvc.saveMail(mailData, type).then(
                function(data){
                    form.$setPristine(); 
                    $scope.page.mail[type].alertLabel = UtilsSrvc.getAlertLabel('Сохранение завершено', 'success');
                },
                function(response){      
                    $scope.page.alert = UtilsSrvc.getAlert('Внимание!', response.data, 'error', true);
                });
    };

    // Load settings for mail tab by type (reminder, feedback and etc.)
    $scope.page.mail.cancel = function(type, form){
        $scope.page.mail.load(type);
        form.$setPristine();
    };

    $scope.page.mail.removeOperator = function(idx, form){
        $scope.page.mail.operators.items.splice(idx, 1);
        form.$setDirty();
    };
    
    // Show help dialog window 
    $scope.page.mail.showHelp = function(type){
        var getLocValue = function(key){
            return $filter('localize')(key)
        };
        
        
        var msg = getLocValue('В содержании письма можно использовать переменные(%Variable), которые впоследствии будут заменены на соответствующие значения. Список доступных переменных для данного шаблона:<br>');
        
        var trainingVariables = 
              '%DateStart, %DateEnd - ' + getLocValue('дата начала / окончания стажировки') + ';<br>' +
              '%TimeStart, %TimeEnd - ' + getLocValue('время начала / окончание стажировки') + ';<br>' +
              '%Internship.Name - ' + getLocValue('название стажировки') + ';<br>' +
              '%City.Name, %Region.Name, %Country.Name - ' + getLocValue('город, регион, страна') + ';<br>' +
              '%Street, %Room - ' + getLocValue('улица и аудитория') + ';<br>' +
              '%Curator.FullName - ' + getLocValue('фамилия и имя куратора') + ';<br>' + 
              '%Curator.Email, %Curator.PhoneSecret, %Curator.PhonePublic - ' + getLocValue('email, личный | публичный телефон') + ';<br>' +
              '%OtherInfo - '  + getLocValue('дополнительная информация об обучении') + ';';
        
        switch(type){
            case 'registration':{
              msg += trainingVariables;
              break;
            }
            case 'reminder':{
              msg += trainingVariables;
              break;
            }
            case 'feedback':{
              msg += '%Internship.Name - ' + getLocValue('название стажировки') + ';<br>' + 
                    '%SurveyUrl - ' + getLocValue('ссылка на страницу для анкетирования') + '.';
              break;
            }
            case 'teacher':{
              msg += trainingVariables + '<br>' +
                    '%ListOfAttendeesUrl - ' + getLocValue('ссылка на страницу со списком слушателей') + '.';
              break;
            }
            case 'curator':{
              msg += trainingVariables + '<br>' +
                    '%ListOfAttendeesUrl - ' + getLocValue('ссылка на страницу со списком слушателей') + '.';
              break;
            }
            case 'orders':{
              msg += trainingVariables + '<br>' +
                    '%JoinUrl - ' + getLocValue('ссылка на страницу регистрации')  + '.';
              break;
            }
            case 'orderapply':{
              msg += '%Internship.Name - ' + getLocValue('название курса') + '.';
              break;
            } 
            case 'confirmsubscription':{
              msg += '%ActivationUrl - ' + getLocValue('ссылка для активации подписки') + '.';
              break;
            }
            case 'listOfFeedbacks':{
              msg += trainingVariables + '<br>' + 
                     '%NumberOfNewestSurveys - ' + getLocValue('количество новых отзывов') + ';<br>' +
                     '%ListOfSurveysUrl - ' + getLocValue('ссылка на страницу с отзывами') + '.';
              break;
            } 
        }
        
        UtilsSrvc.openCustomMessageBox('Справка', msg, [{result: '1', label: $filter('localize')('Закрыть'),  cssClass: 'btn-small', func: null}]);    
    };

    // Show preview for mail tab as html
    $scope.page.mail.showPreview = function(type){
        SettingsSrvc.getMailPreview(type).then(
                function(data){
                    $scope.page.mail[type].preview = data.preview;
                    $scope.page.mail[type].previewIsVisible = true;
                },
                function(response){      
                    $scope.page.alert = UtilsSrvc.getAlert('Внимание!', response.data, 'error', true);
                });  
    };

    
    // Load all settings
    $scope.page.mail.load('settings');
    $scope.page.mail.load('operators');
    $scope.page.mail.load('reminder');
    $scope.page.mail.load('registration');
    $scope.page.mail.load('feedback');
    $scope.page.mail.load('teacher');
    $scope.page.mail.load('curator');
    $scope.page.mail.load('orders');
    $scope.page.mail.load('orderapply');
    $scope.page.mail.load('confirmsubscription');
    $scope.page.mail.load('listOfFeedbacks'); 
});