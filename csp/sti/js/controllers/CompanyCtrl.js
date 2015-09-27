'use strict';


/*===========================================================================================
Компания. Изменение/Добавление
===========================================================================================*/

controllersModule.controller('CompanyCtrl', function($scope, $location, $routeParams, CompanySrvc, $window, $filter, UtilsSrvc, EmployeeSrvc){
   $scope.page = {company:{}};
	$scope.searchForm = {visible: true, persons: [], person:''};
   // Инициализация данных
   $scope.page.init = function(){
      if ($routeParams.id){
          $scope.page.formCaption = $filter('localize')("Редактирование компании");
          $scope.page.formBtnSubmitName = $filter('localize')("Сохранить");
          $scope.page.loadCompany($routeParams.id);        
      }
      else if (($routeParams.cmpId) &&($routeParams.empId)){
	      $scope.page.loadCompany($routeParams.cmpId);
	      $scope.page.formCaption = $filter('localize')("Редактирование компании");
          $scope.page.formBtnSubmitName = $filter('localize')("Сохранить");
      }
      else{
          $scope.page.formCaption = $filter('localize')("Добавление компании");
          $scope.page.formBtnSubmitName = $filter('localize')("Добавить");
		  
		
      }
   };
   // Загрузить компанию по ИД
   $scope.page.loadCompany = function(id){
      CompanySrvc.get(id).then(
          function(data){
              $scope.page.company = data;
              if(!$scope.page.company.contact)
              {
	            $scope.page.company.contact={id:''}
				if($routeParams.cmpId)
				{
					$scope.page.company.contact.id=$routeParams.empId;
	      			$scope.page.submit();
	      			$location.path('/company/' + $routeParams.cmpId);
				}
	          };
          },
          function(data, status, headers, config){
              $scope.page.coalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);
          });       
   };
   
    $scope.page.editContact = function(){
	    if($scope.page.company.contact.id)
	       {$location.path('/employee/' + $scope.page.company.contact.id);}
	    else
          {
	         $scope.page.submit(1); 
	         $location.path('/employee/'+$scope.page.company.id+'/company');
          }; 
    };

   
    $scope.page.changeContact = function()
	 {
		 if($scope.searchForm.person.id){
		 $scope.page.company.contact.id=$scope.searchForm.person.id
		 $scope.page.submit()
		 }
	 }   
   // Сохранить/создать (отправка формы). Передаем объект на сервер
   $scope.page.submit = function(edit){
	   CompanySrvc.save($scope.page.company).then(
          function(data){
              var msg = 'Изменения сохранены.';

              if (!$routeParams.id){
                  msg = 'Компания добавлена.';
                  $scope.page.company = {};
                  if(edit!=1)
                  {
                    $location.path('/company/'+data.id);};                         
                  }
              $scope.page.alert = UtilsSrvc.getAlert('Готово!', msg, 'success', true);
              // Сделать форму "чистой" (блокируется кнопка)
              $scope.pageForm.$setPristine();
          },
          function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true); 
          });
   };
	
	// Поиск работника
    $scope.searchForm.search = function(startsWith){
        if(!startsWith || startsWith.length == 0){
            $scope.searchForm.persons = [];
            startsWith = '';
        }
        
        if (startsWith.length != 2)
            return;  
        
        EmployeeSrvc.getBySearchParameters(startsWith).then(
            function(data){
                $scope.searchForm.persons = data.children;
                
            },
            function(response){
                $scope.page.alert= UtilsSrvc.getAlert('Внимание!', response.data, 'error', true);
            }); 
    };
    
    
	 /// Отмена - возврат на предыдущую страницу
    $scope.page.cancel = function(){
        $window.history.back();
    };
    
    
   $scope.page.init(); 
});


