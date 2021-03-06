'use strict';
//

/*===========================================================================================
Группа рассылки, создание и изменение
===========================================================================================*/

controllersModule.controller('MailingGroupCtrl', function($scope, $filter, $routeParams, $location, MailingSrvc, UtilsSrvc){
    $scope.groupForm = {};
    
    $scope.groupForm.init = function(){
        if (!isNaN(parseInt($routeParams.id))){
            $scope.groupForm.caption = 'Редактирование группы';
            $scope.groupForm.actionName = 'Сохранить';
            $scope.groupForm.loadData();    
        }
        else{
            $scope.groupForm.caption = 'Добавление группы';
            $scope.groupForm.actionName = 'Добавить';
        }
    };

    // Загрузить курс
    $scope.groupForm.loadData = function(){
        MailingSrvc.getGroup($routeParams.id).then(
            function(data){
	            data.mailMessage = data.mailMessage.replace(/<br>/g, "\n");
                $scope.groupForm.group = data;
            },
            function(response){
                 $scope.groupForm.alert = UtilsSrvc.getAlert('Внимание!', response.data, 'error', true);
            }); 
    };

    // Сохранить / создать курс
    $scope.groupForm.submit = function(){
	    var group = angular.copy($scope.groupForm.group);
	    group.mailMessage = group.mailMessage.replace(/\n/g, "<br>");
        
        MailingSrvc.saveGroup(group).then(
            function(data){
	            if (!$scope.groupForm.group.id){
                	$scope.groupForm.alert = UtilsSrvc.getAlert('Готово!', 'Группа создана.', 'success', true);
                	$scope.groupForm.group = {};
	            }
                else{
                	$scope.groupForm.alert = UtilsSrvc.getAlert('Готово!', 'Изменения сохранены.', 'success', true);
                }
                
                $scope.form.$setPristine();
            },
            function(response){
                $scope.groupForm.alert = UtilsSrvc.getAlert('Внимание!', response.data, 'error', true);
            }); 
    };


    // Загрузить превью
    $scope.groupForm.loadPreview = function(){
        MailingSrvc.getGroupMail($scope.groupForm.group.id).then(
            function(data){
	            $scope.groupForm.previewVisible = true;
	            $scope.groupForm.preview = data.subject + '<br><br>' + data.message;
            },
            function(response){
                $scope.groupForm.alert = UtilsSrvc.getAlert('Внимание!', response.data, 'error', true);
            }); 
    };

    // Отмена - возврат на страницу курсов
    $scope.groupForm.cancel = function(){
        $location.path('/mailing/groups');
    };
    
    // Show help dialog window 
    $scope.groupForm.showHelp = function(type){
        var msg = 'В содержании письма можно использовать переменные(%Variable), которые впоследствии будут заменены на соответствующие значения. Список доступных переменных для данного шаблона:<br>';
        msg += 
              '%DateStart, %DateEnd - дата начала / окончания стажировки;<br>' +
              '%TimeStart, %TimeEnd - время начала / окончание стажировки;<br>' +
              '%Internship.Name - название стажировки;<br>' +
              '%City.Name, %Region.Name, %Country.Name - город, регион, страна;<br>' +
              '%Street, %Room - улица и аудитория;<br>' +
              '%Curator.FullName - фамилия и имя куратора;<br>' + 
              '%Curator.Email, %Curator.PhoneSecret, %Curator.PhonePublic - email, личный|публичный телефон;<br>' +
              '%OtherInfo - дополнительная информация об обучении;<br>' + 
              '%JoinUrl - ссылка на страницу для регистрации;<br>'+
              '%ListOfStudentsUrl - ссылка на страницу со списком слушателей;<br>' +
              '%UnsubscribeUrl - ссылка на отмену подписки.<br>';
         
		UtilsSrvc.openCustomMessageBox('Справка', msg, [{result: '1', label: $filter('localize')('Закрыть'),  cssClass: 'btn-small', func: null}]);    
    };
    
    $scope.groupForm.init();
});
    

