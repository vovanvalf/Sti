'use strict';

/*===========================================================================================
Заявка. Изменение/Добавление
===========================================================================================*/

controllersModule.controller('OrderCtrl', function($scope, $routeParams,$location, $dialog, RegionSrvc, OrderSrvc, UniversitySrvc, InternshipSrvc, MarksSrvc, $filter, UtilsSrvc){
    $scope.menu.selectMenu($scope.menu.pages.order);
    $scope.page = {order:{university:{id:{}}, newUniversity: {}}};
	$scope.cities = [];
	$scope.page.order.isAgree=false;
	$scope.searchForm = {visible: true, persons: [], person:''};
   // Инициализация данных
   $scope.page.init = function(){
      if ($routeParams.id){
          $scope.page.formCaption = $filter('localize')("Редактирование заявки");
          $scope.page.formBtnSubmitName = $filter('localize')("Сохранить");
          $scope.page.loadOrder($routeParams.id);        
      }
      else{
          $scope.page.formCaption = $filter('localize')("Создание заявки");
          $scope.page.formBtnSubmitName = $filter('localize')("Создать заявку");


      }
      
      // Загрузить университеты
      $scope.page.loadUniversity();
      $scope.page.loadInternship();
      $scope.page.loadEngMarks();
      $scope.page.loadPetMarks();
   };

   // Загрузить заявки по ИД
   $scope.page.loadOrder = function(id){
      OrderSrvc.get(id).then(
          function(data){
              $scope.page.order = data;
              $scope.page.order.isInNewsletter=$scope.page.order.isInNewsletter == 1;
             
          },
          function(data, status, headers, config){
              $scope.page.unalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true); 
          });       
   };

   // Загрузить все университеты
  $scope.page.loadUniversity = function(id){
      UniversitySrvc.getAll().then(
          function(data){
              $scope.page.universities = data.children;
          },
          function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true); 
          });      
   };
   
       $scope.page.formatData = function(){
	    $scope.page.order.birthDate = UtilsSrvc.getValidDate($scope.page.order.birthDate);
        if ($scope.page.order.birthDate == ""){
        	$scope.page.order.birthDate = "";}

        if (!$scope.page.order.city.id){
             $scope.page.order.city = '';
   
        }
    };
    
   //Очистить форму
   $scope.page.clear = function(){
        $scope.pageForm.$setPristine();
 		$scope.page.order={university:{id:{}}, newUniversity: {}};
        $scope.searchForm.person='';
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
   
  // Загрузить все оценки pet
  $scope.page.loadPetMarks = function(id){
      MarksSrvc.getPetAll().then(
          function(data){
              $scope.page.petmarks = data.children;
          },
          function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);  
          });      
   };
   
   // Сохранить/создать (отправка формы). Передаем объект на сервер
   $scope.page.submit = function(){
	    
	     if($scope.searchForm.person.id){
		 	$scope.page.order.university.id=$scope.searchForm.person.id;
		 	       //page.order.university.id
		 }
		 else
		 	$scope.page.order.newUniversity=$scope.searchForm.person;
		 	

      OrderSrvc.save($scope.page.order).then(
          function(data){
              var msg = 'Изменения сохранены.';

              if (!$routeParams.id){
                  msg = 'Заявка принята';
                  $scope.page.order = {};                        
              }
			  	    var msg = 'Ваша заявка принята. В ближайшее время с вами свяжутся.';
				    var btns= [{result: '0', label: $filter('localize')('Ok'),  cssClass: 'btn-small', func:null}];
	    		 	$dialog.messageBox($filter('localize')('Внимание!'), $filter('localize')(msg), btns).open();  
			  	
              $scope.page.alert = UtilsSrvc.getAlert('Готово!', msg, 'success', true);
              // Сделать форму "чистой" (блокируется кнопка)
              $scope.page.clear();
               
          },
          function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);  
          });
   };
    $scope.checkAgree=function()
    {
	    if($scope.page.order.isAgree)
	    {
		   $scope.page.order.isAgree=true; 
		    }
		    else
		     $scope.page.order.isAgree=false;
    }
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
    
    // Поиск университета
    $scope.searchForm.search = function(startsWith){
        if(!startsWith || startsWith.length == 0){
            $scope.searchForm.persons = [];
            startsWith = '';
        }
        
        if (startsWith.length != 2)
            return;  
        
        UniversitySrvc.getBySearchParameters(startsWith).then(
            function(data){
                $scope.searchForm.persons = data.children;
            },
            function(response){
                $scope.page.alert= UtilsSrvc.getAlert('Внимание!', response.data, 'error', true);
            }); 
    };
    
   $scope.page.init(); 
});

