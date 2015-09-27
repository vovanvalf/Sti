'use strict';

/*===========================================================================================
Главный контроллер, работа с языком и меню
===========================================================================================*/

controllersModule.controller('MainCtrl', function($scope, $cookies, $filter, $window, $location, OtherSrvc, UtilsSrvc){
    $scope.pageStore = {};
   
    
    $scope.menu = {user: $cookies.user,
	    		   devModeIsRelease: false,
	    		   admin: ($cookies.admin === 'true'),
                   readOnlyMode: ($cookies.readOnlyMode === 'true'),
                   loginCaption: ($cookies.admin === 'true' ? 'Выход' : 'Вход')};
    
    $scope.menu.pages = {selected: {},
                         order: {id: 'order', url: '#/order', name: $filter('localize')('Создать заявку')},
    					 orders: {id: 'orders', url: '#/orders', name: $filter('localize')('Заявки')},
	    				 internships: {id: 'internships', url: '#/internships', name: $filter('localize')('Стажировки')},
                         interns: {id: 'interns', url: '#/interns', name: $filter('localize')('Стажёры')},
                         companies: {id: 'companies', url: '#/companies', name: $filter('localize')('Компании')},
                         universities: {id: 'universities', url: '#/universities', name: $filter('localize')('Университеты')},
                         employees: {id: 'employees', url: '#/employees', name: $filter('localize')('Сотрудники')},
                         mailingGroups: {id: 'mailingGroups', url: '#/mailing/groups', name: $filter('localize')('Группы рассылки')},
                         mailingJournal: {id: 'mailingJournal', url: '#/mailing/journal', name: $filter('localize')('Журнал рассылки')},
                         settings: {id: 'settings', url: '#/settings', name: $filter('localize')('Настройки')},
                        }; 
  
    $scope.menu.selectMenu = function(menuItem){
        $scope.menu.pages.selected = menuItem;
        $scope.menu.shortMenu = false;
    };

    $scope.menu.loadLanguages = function(){
        OtherSrvc.getLanguages().then(
                function(data, status, headers, config){
                    $scope.menu.languages = data.children;
                    var idx = UtilsSrvc.getIndexes($scope.menu.languages, 'code', StiSetting.lang ? StiSetting.lang : 'ru');
                    if (idx.length != 0) 
                        $scope.menu.lang = $scope.menu.languages[idx[0]];
                    
                },
                function(data, status, headers, config){
                    //$scope.page.alert = UtilsSrvc.getAlert('Внимание!', response.data, 'error', true);
                });
    };

    // Сменить язык - перезагрузить приложение
    $scope.menu.switchLang = function(lang){
        if ($cookies.lang == lang)
        	return;
        	
        $cookies['lang'] = lang;
        $window.location.reload();
    };
    
    // Вход - выход
    $scope.menu.login = function(){
        $scope.menu.admin = ($cookies.admin === 'true');
        
        OtherSrvc.checkAdmin($scope.menu.admin === true ? 0: 1).then(
           function(data){
	            if (data.privileges=='read'){
	            	$cookies['readOnlyMode'] = 'true';
	            	$scope.menu.readOnlyMode = true;
	            }
	            else{
	            	$cookies['readOnlyMode'] = 'false';
	            	$scope.menu.readOnlyMode = false;
	            }
	            
	            $scope.menu.user = data.user;
	            $scope.menu.admin = true;
                $scope.menu.loginCaption = 'Выход';
                $cookies['user'] = data.user;
                $cookies['admin'] = 'true';
            },
            function(response){
	            $location.path('#/order');
                $scope.menu.user = "";
                $scope.menu.admin = false;
                $cookies['user'] = '';
                $cookies['admin'] = 'false';
	            $cookies['readOnlyMode'] = 'false';
	            $scope.menu.readOnlyMode = false;
                $scope.menu.loginCaption = 'Вход';
            });
            
    };

    $scope.menu.loadLanguages();
    //$scope.menu.admin = true;
    //$scope.menu.readOnlyMode = true;

});

