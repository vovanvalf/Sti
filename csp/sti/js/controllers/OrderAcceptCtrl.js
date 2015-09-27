'use strict';


/*===========================================================================================
Создание стажера из заявки. Изменение/Добавление
===========================================================================================*/

controllersModule.controller('OrderAcceptCtrl', function($scope, $location, $dialog, $window, $routeParams, RegionSrvc, InternSrvc, UniversitySrvc, InternshipSrvc, MarksSrvc,OrderSrvc, $filter, UtilsSrvc){
   $scope.page = {intern:{}};
	$scope.cities = [];
	$scope.idorder='';
	$scope.filter=[];
	
   // Инициализация данных
   $scope.init = function(){
      if ($routeParams.id){
          $scope.formCaption = $filter('localize')("Добавление стажера");
          $scope.formBtnSubmitName = $filter('localize')("Принять стажера");
          $scope.loadOrder($routeParams.id);        
      }
       else if(($routeParams.orId)&&($routeParams.unId))
      {
	      $scope.loadOrder($routeParams.orId);
	      //$scope.loadUniversity();
	      
	      
	      $scope.formCaption = $filter('localize')("Добавление стажера");
          $scope.formBtnSubmitName = $filter('localize')("Добавить");
      }
      else{
          $scope.formCaption = $filter('localize')("Добавление стажера");
          $scope.formBtnSubmitName = $filter('localize')("Добавить");

      }
      
      $scope.loadUniversity();
      $scope.loadInternship();
      $scope.loadEngMarks();
   };

   // Загрузить заявку по ИД
  $scope.loadOrder = function(id){
      OrderSrvc.get(id).then(
         
          function(data){
	          $scope.intern = data;
	          
	         if(!$scope.intern.university)
              {
	            $scope.intern.university={id:''} 
	         	if($routeParams.unId)
	         	{
             		$scope.intern.university.id=$routeParams.unId;
             		OrderSrvc.save($scope.intern);
             		$location.path('/orderaccept/' + $routeParams.orId);
             	    
	         	}
              }
             
             
             $scope.intern.isInNewsletter=$scope.intern.isInNewsletter == 1;
             $scope.idorder=id;
          },
          function(data, status, headers, config){
              $scope.unalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);   
          });       
   };

   // Загрузить все универы
  $scope.loadUniversity = function(id){
      UniversitySrvc.getAll().then(
          function(data){
              $scope.universities = data.children;
          },
          function(data, status, headers, config){
              $scope.alert =UtilsSrvc.getAlert('Внимание!', data, 'error', true);   
          });      
   };
   
   // Загрузить все стажировки
  $scope.loadInternship = function(id){
      InternshipSrvc.getAll().then(
          function(data){
              $scope.internships = data.children;
          },
          function(data, status, headers, config){
              $scope.alert =UtilsSrvc.getAlert('Внимание!', data, 'error', true); 
          });      
   };
	
  // Загрузить все уровни английского
  $scope.loadEngMarks = function(id){
      MarksSrvc.getEngAll().then(
          function(data){
              $scope.engmarks = data.children;
          },
          function(data, status, headers, config){
              $scope.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);   
          });      
   };
    $scope.saveIntern= function(msg)
    {
	    $scope.intern.id="";
	    InternSrvc.save($scope.intern).then(
      	  function(data){
             
             $scope.intern = {};                        
             OrderSrvc.remove($scope.idorder);
			 $scope.alert = UtilsSrvc.getAlert('Готово!', msg, 'success', true);
             // Сделать форму "чистой" (блокируется кнопка)
             		$scope.pageForm.$setPristine();
           
          	 },
          	 function(data, status, headers, config){
              		$scope.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);   
   			});		 
    };

   
   // Сохранить/создать (отправка формы). Передаем объект на сервер
   $scope.submit = function(){
   InternSrvc.findSimmilarIntern($scope.intern.lastName,$scope.intern.firstName,$scope.intern.birthDate).then(
	  function(data){
		  if(data.status!=0)
		  {
			  		var msg = 'Стажёр с таким именем/фамилией/датой рождения есть! Изменить старую запись или добавить нового стажёра?';
				    var btns= [{result: '0', label: $filter('localize')('Добавить'),  cssClass: 'btn-small', func:null},{result: '1', label: $filter('localize')('Изменить'),  cssClass: 'btn-small', func:null}];
	    		 	$dialog.messageBox($filter('localize')('Внимание!'), $filter('localize')(msg), btns).open().then(function(result){
		    		 if(result==1)	
		    		 {
		    		  	 $scope.intern.id = data.result.id; 
		    		  	 $scope.saveIntern('Изменения сохранены.');
		    		 }
		    		 else if(result==0)
		    		 	$scope.saveIntern('Стажёр добавлен.');
		    	    })  	    
		  }
		  else
		   $scope.saveIntern('Стажёр добавлен.');
		     	    
	  },
   	  function(data, status, headers, config){
              $scope.alert = UtilsSrvc.getAlert('Внимание!!', data, 'error', true);   
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
    
     /* Проверка данных на корректность */
    $scope.formatData = function(){
	    $scope.intern.birthDate = UtilsSrvc.getValidDate($scope.intern.birthDate);
        if ($scope.intern.birthDate == ""){
        	$scope.intern.birthDate = "";}
    };
    
    
    /// Отмена - возврат на предыдущую страницу
    $scope.cancel = function(){
        $window.history.back();
    };
    
    
   $scope.init(); 
});

