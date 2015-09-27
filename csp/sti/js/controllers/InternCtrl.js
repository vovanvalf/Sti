'use strict';

/*===========================================================================================
Стажёр. Изменение/Добавление
===========================================================================================*/

controllersModule.controller('InternCtrl', function($scope, $routeParams, $window,  RegionSrvc, InternSrvc, UniversitySrvc, InternshipSrvc, MarksSrvc, $filter, UtilsSrvc){
   $scope.page = {intern:{}};
	$scope.cities = [];
	
   // Инициализация данных
   $scope.page.init = function(){
      if ($routeParams.id){
          $scope.page.formCaption = $filter('localize')("Редактирование стажёра");
          $scope.page.formBtnSubmitName = $filter('localize')("Сохранить");
          $scope.page.loadIntern($routeParams.id);        
      }
      else{
          $scope.page.formCaption = $filter('localize')("Добавление стажера");
          $scope.page.formBtnSubmitName = $filter('localize')("Добавить");

          // Добавление стажера в определённый университет
          if ($routeParams.unId && $routeParams.fcId){
              $scope.page.intern = {university: {id: parseInt($routeParams.unId)}};            
          	  $scope.page.loadUniversity($routeParams.unId);
          }
          if ($routeParams.coId && $routeParams.fcId){
              $scope.page.intern = {internship: {id: parseInt($routeParams.coId)}};            
          	  $scope.page.loadInternship($routeParams.coId);
          }
      }
      
      // Загрузить университеты
      $scope.page.loadUniversity();
      $scope.page.loadInternship();
      $scope.page.loadEngMarks();
   };

   // Загрузить стажера по ИД
   $scope.page.loadIntern = function(id){
      InternSrvc.get(id).then(
          function(data){
              $scope.page.intern = data;
              $scope.page.intern.isInNewsletter=$scope.page.intern.isInNewsletter == 1;
             
          },
          function(data, status, headers, config){
              $scope.page.unalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true); 
          });       
   };

   // Загрузить все универы
  $scope.page.loadUniversity = function(id){
      UniversitySrvc.getAll().then(
          function(data){
              $scope.page.universities = data.children;
          },
          function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true); 
          });      
   };
   // Загрузить все стажировки
  $scope.page.loadInternship = function(id){
      InternshipSrvc.getAll().then(
          function(data){
              $scope.page.internships = data.children;
          },
          function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true); 
          });      
   };
	
  // Загрузить все уровни английского
  $scope.page.loadEngMarks = function(id){
      MarksSrvc.getEngAll().then(
          function(data){
              $scope.page.engmarks = data.children;
          },
          function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);  
          });      
   };
   
   
   // Сохранить/создать (отправка формы). Передаем объект на сервер
   $scope.page.submit = function(){
      InternSrvc.save($scope.page.intern).then(
          function(data){
              var msg = 'Изменения сохранены.';

              if (!$routeParams.id){
                  msg = 'Стажёр добавлен.';
                  $scope.page.intern = {};                        
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
    
    
   $scope.page.init(); 
});

