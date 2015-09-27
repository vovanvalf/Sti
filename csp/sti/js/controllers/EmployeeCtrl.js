'use strict';

/*===========================================================================================
Сотрудник. Изменение/Добавление
===========================================================================================*/

controllersModule.controller('EmployeeCtrl', function($scope,$location, $dialog, $routeParams, EmployeeSrvc, $window, $filter, UtilsSrvc){
   $scope.page = {employee:{}};
   
   // Инициализация данных
   $scope.page.init = function(){
      if ($routeParams.id){
          $scope.page.formCaption = $filter('localize')("Редактирование сотрудника");
          $scope.page.formBtnSubmitName = $filter('localize')("Сохранить");
          $scope.page.loadEmployee($routeParams.id);        
      }
      else if (($routeParams.cmpId) || ($routeParams.unId) ||  ($routeParams.ishId))
      {
	      $scope.page.formCaption = $filter('localize')("Добавление сотрудника");
          $scope.page.formBtnSubmitName = $filter('localize')("Добавить");
      }
      else{
          $scope.page.formCaption = $filter('localize')("Добавление сотрудника");
          $scope.page.formBtnSubmitName = $filter('localize')("Добавить");


      }
   };
   // Загрузить компанию по ИД
   $scope.page.loadEmployee = function(id){
      EmployeeSrvc.get(id).then(
          function(data){
              $scope.page.employee = data;
         
          },
          function(data, status, headers, config){
              $scope.page.coalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);
          });       
   };
   
   
   $scope.page.saveEmployee= function(msg)
    {
 		  EmployeeSrvc.save($scope.page.employee).then(
          function(data){
              $scope.page.alert = UtilsSrvc.getAlert('Готово!', msg, 'success', true);
              if($routeParams.cmpId){
	              $location.path('/company/'+$routeParams.cmpId+'/employee/'+data.id);
	          }
              else if($routeParams.unId){
	              $location.path('/university/'+$routeParams.unId+'/employee/'+data.id);}
	          else if($routeParams.ishId){
	              $location.path('/internship/'+$routeParams.ishId+'/employee/'+data.id);}; 
               
               $scope.page.employee = {}; 
              // Сделать форму "чистой" (блокируется кнопка)
              $scope.pageForm.$setPristine();
          },
          function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!', data, 'error', true); 
          });	 
    };
    
    // Сохранить/создать (отправка формы). Передаем объект на сервер
   $scope.page.submit = function(){
	if($scope.page.employee.id)
		{$scope.page.saveEmployee('Изменения сохранены.');}
   else
   {	 
   EmployeeSrvc.findSimmilarEmployee($scope.page.employee.lastName,$scope.page.employee.firstName,$scope.page.employee.email).then(
	  function(data){
		  if(data.status!=0)
		  {
			  		var msg = 'Сотрудник с таким именем/фамилией/email есть! Изменить старую запись или добавить нового сотрудника?';
				    var btns= [{result: '0', label: $filter('localize')('Добавить'),  cssClass: 'btn-small', func:null},{result: '1', label: $filter('localize')('Изменить'),  cssClass: 'btn-small', func:null}];
	    		 	$dialog.messageBox($filter('localize')('Внимание!'), $filter('localize')(msg), btns).open().then(function(result){
		    		 if(result==1)	
		    		 {
		    		  	 $scope.page.employee.id = data.result.id; 
		    		  	 $scope.page.saveEmployee('Изменения сохранены.');
		    		 }
		    		 else if(result==0)
		    		 	$scope.page.saveEmployee('Сотрудник добавлен.');
		    	    })  	    
		  }
		  else
		   $scope.page.saveEmployee('Сотрудник добавлен.');
		     	    
	  },
   	  function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!!', data, 'error', true);   
      });
   }  
 	};
   
  

	 /// Отмена - возврат на предыдущую страницу
    $scope.page.cancel = function(){
        $window.history.back();
    };
    
    
   $scope.page.init(); 
});

