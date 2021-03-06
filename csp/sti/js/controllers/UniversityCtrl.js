'use strict';

/*===========================================================================================
Университет. Изменение/Добавление
===========================================================================================*/

controllersModule.controller('UniversityCtrl', function($scope, $location, $routeParams, RegionSrvc, UniversitySrvc, $window,  $filter, UtilsSrvc, EmployeeSrvc ){
   $scope.page = {university:{}};
   $scope.cities = [];
   $scope.searchForm = {visible: true, persons: [], person:''};
   // Инициализация данных
   $scope.page.init = function(){
      if ($routeParams.id){
          $scope.page.formCaption = $filter('localize')("Редактирование университета");
          $scope.page.formBtnSubmitName = $filter('localize')("Сохранить");
          $scope.page.loadUniversity($routeParams.id);        
      }
      else if (($routeParams.unId) &&($routeParams.empId)){
	      $scope.page.loadUniversity($routeParams.unId);
	      $scope.page.formCaption = $filter('localize')("Редактирование университета");
          $scope.page.formBtnSubmitName = $filter('localize')("Сохранить");
      }
      else if(($routeParams.newUniversity)&&($routeParams.orId))
      {
	      $scope.page.formCaption = $filter('localize')("Добавление университета");
          $scope.page.formBtnSubmitName = $filter('localize')("Добавить");
          $scope.page.university.fullName=$routeParams.newUniversity;
          
      }
      else{
          $scope.page.formCaption = $filter('localize')("Добавление университета");
          $scope.page.formBtnSubmitName = $filter('localize')("Добавить");


      }
   };
   // Загрузить стажера по ИД
   $scope.page.loadUniversity = function(id){
      UniversitySrvc.get(id).then(
          function(data){
              $scope.page.university = data;
              if(!$scope.page.university.curator)
              {
	            $scope.page.university.curator={id:''}
	            if($routeParams.unId)
				{
					$scope.page.university.curator.id=$routeParams.empId;
	      			$scope.page.submit();
	      			$location.path('/university/' + $routeParams.unId);
				}
              };
         
          },
          function(data, status, headers, config){
              $scope.page.unalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);
          });       
   };
   
   // Сохранить/создать (отправка формы). Передаем объект на сервер
   $scope.page.submit = function(edit){
      UniversitySrvc.save($scope.page.university).then(
          function(data){
              var msg = 'Изменения сохранены.';
			  if(($routeParams.newUniversity)&&($routeParams.orId))
      			{
	      			 $location.path('/orderaccept/'+$routeParams.orId+'/university/'+data.id);
      			}
              else if (!$routeParams.id){
                  msg = 'Университет добавлен.';
                  $scope.page.university = {}; 
                  if(edit!=1)
                  {
                    $location.path('/university/'+data.id);                     
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
		 $scope.page.university.curator.id=$scope.searchForm.person.id
		 $scope.page.submit()
		 }
	 }  
	 
	 $scope.page.editContact = function(){
	    if($scope.page.university.curator.id){
		    $location.path('/employee/' + $scope.page.university.curator.id);}
	    else
          {
	         $scope.page.submit(1); 
	         $location.path('/employee/'+$scope.page.university.id+'/university');
          }; 
    };
   $scope.page.init(); 
});



