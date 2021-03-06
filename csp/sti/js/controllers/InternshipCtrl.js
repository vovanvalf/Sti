'use strict';

/*===========================================================================================
Стажировка. Изменение/Добавление
===========================================================================================*/

controllersModule.controller('InternshipCtrl', function($scope, $window, $location, $routeParams, InternshipSrvc, CompanySrvc, RegionSrvc, $filter, UtilsSrvc, EmployeeSrvc){
   $scope.page = {internship:{}};
	$scope.cities = [];
	$scope.searchForm = {visible: true, persons: [], person:''};
   // Инициализация данных
   $scope.page.init = function(){
      if ($routeParams.id){
          $scope.page.formCaption = $filter('localize')("Редактирование стажировки");
          $scope.page.formBtnSubmitName = $filter('localize')("Сохранить");
          $scope.page.loadInternship($routeParams.id);        
      }
      else if (($routeParams.ishId) &&($routeParams.empId)){
	      $scope.page.loadInternship($routeParams.ishId);
	      $scope.page.formCaption = $filter('localize')("Редактирование университета");
          $scope.page.formBtnSubmitName = $filter('localize')("Сохранить");
      }
      else{
          $scope.page.formCaption = $filter('localize')("Добавление стажировки");
          $scope.page.formBtnSubmitName = $filter('localize')("Добавить");

          // Добавление стажировки в определённую компанию
          if ($routeParams.coId && $routeParams.fcId){
              $scope.page.internship = {company: {id: parseInt($routeParams.coId)}};            
          	  $scope.page.loadCompany($routeParams.coId);
          }
      }
      
      // Загрузить компании
      $scope.page.loadCompany();
   };

   // Загрузить стажировку по ИД
   $scope.page.loadInternship = function(id){
      InternshipSrvc.get(id).then(
          function(data){
              $scope.page.internship = data;
              if(!$scope.page.internship.curator)
              {
	            $scope.page.internship.curator={id:''}
	            if($routeParams.ishId)
				{
					$scope.page.internship.curator.id=$routeParams.empId;
	      			$scope.page.submit();
	      			$location.path('/internship/' + $routeParams.ishId);
				}
              };
              $scope.page.internship.isInUse=$scope.page.internship.isInUse == 1;
         
          },
          function(data, status, headers, config){
              $scope.page.coalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true); 
          });       
   };

   // Загрузить все компании
  $scope.page.loadCompany = function(id){
      CompanySrvc.getAll().then(
          function(data){
              $scope.page.companies = data.children;
          },
          function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);  
          });      
   };

   // Сохранить/создать (отправка формы). Передаем объект на сервер
   $scope.page.submit = function(edit){
      InternshipSrvc.save($scope.page.internship).then(
          function(data){
              var msg = 'Изменения сохранены.';

              if (!$routeParams.id){
                  msg = 'Стажировка добавлена.';
                  $scope.page.internship = {};   
                  if(edit!=1)
                  {
                    $location.path('/internship/'+data.id);                     
                  };                        
              }

              $scope.page.alert = UtilsSrvc.getAlert('Готово!', msg, 'success', true);
              // Сделать форму "чистой" (блокируется кнопка)
              $scope.pageForm.$setPristine();
          },
          function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);  
          });
   };
   
    // Загрузить города
	$scope.loadCities = function(startsWith){       
        if(!startsWith || startsWith.length == 0)
            $scope.cities = [];
        
        if (!startsWith || startsWith.length != 2)
            return;  

        RegionSrvc.getAllCitiesStartsWith(startsWith).then(
            function(data){
                $scope.cities = data.children;
            },
            function(response){
                $scope.alert = UtilsSrvc.getAlert('Ошибка !', response.data, 'error', true);
            }); 
    };
    
    /// Отмена - возврат на предыдущую страницу
    $scope.page.cancel = function(){
        $window.history.back();
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
    
     $scope.page.changeContact = function()
	 {
		 if($scope.searchForm.person.id){
		 $scope.page.internship.curator.id=$scope.searchForm.person.id
		 $scope.page.submit()
		 }
	 }  
	 
	 $scope.page.editContact = function(){
	    if($scope.page.internship.curator.id){
		    $location.path('/employee/' + $scope.page.internship.curator.id);}
	    else
          {
	         $scope.page.submit(1); 
	         $location.path('/employee/'+$scope.page.internship.id+'/internship');
          }; 
    };
    
   $scope.page.init(); 
});

