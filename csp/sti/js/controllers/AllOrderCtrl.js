'use strict';
/*===========================================================================================
Все заявки
===========================================================================================*/

controllersModule.controller('AllOrderCtrl', function($scope, $location, $dialog, $filter, OrderSrvc,UniversitySrvc, UtilsSrvc){
$scope.menu.selectMenu($scope.menu.pages.orders);
$scope.ordersTable = {state: {}};

$scope.init = function(){
 
        $scope.ordersTable.columns = [
                          {name: 'Фамилия', sqlName: 'LastName->Value', isSorted: true, isSortable: true, isDown: true, isSearched: true, isSearchable: true},
                          {name: 'Имя', sqlName: 'FirstName->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Отчество', sqlName: 'MiddleName->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Дата рождения', sqlName: 'BirthDate', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: false, filter: 'date'},
                          {name: 'Университет', sqlName: 'FullNameUniversity', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Город', sqlName: 'City->Name->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
        				  {name: 'Стажировка', sqlName: 'Internship->Name->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true}];
        $scope.ordersTable.properties = [
        				  	{
	        				  	name: 'lastName',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        					getCssClass: function(item){ 
                                    return '';
                                },
	        				},
	        				{
	        				  	name: 'firstName',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        				  	getCssClass: function(item){ 
                                    return '';
                                }
	        				},
	        				{
	        				  	name: 'middleName',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        				  	getCssClass: function(item){ 
                                    return '';
                                }
	        				},
	        				{
	        				  	name: 'birthDate',  filter: 'date', filterParam: $filter('localize')('d MMMM y'),
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        				  	getCssClass: function(item){ 
                                    return '';
                                }
	        				},
	        				{
	        				  	name: 'fullNameUniversity',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        				},
	        				{
	        				  	name: 'city.name',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        				  	getCssClass: function(item){ 
                                    return '';
                                }
	        				},
	        				{
	        				  	name: 'internship.name',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        				  	getCssClass: function(item){ 
                                    return '';
                                }
	        				}	        				
	        				]; 

        $scope.ordersTable.pageSize = 7;
        $scope.ordersTable.pageCurr = 1;
        $scope.ordersTable.itemsTotal = 0;
        $scope.ordersTable.selectedItems = [];
        $scope.ordersTable.multiSelectMode = false;
        $scope.ordersTable.forciblyUpdate = 0;
        $scope.ordersTable.refresh();
    };

     
    $scope.ordersTable.loadItems = function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText){
        OrderSrvc.getAllForGrid(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, {}).then(
            function(data){
	            data = data.children;
                $scope.ordersTable.pageTotal = Math.ceil(data.itemsTotal / pageSize);
                $scope.ordersTable.itemsTotal = data.itemsTotal;
                $scope.ordersTable.items = data.items;
                
                
            },
            function(data){
                console.log('Ошибка!!!!', data);
            });
    };

	$scope.ordersTable.refresh = function(){ 
        $scope.ordersTable.forciblyUpdate++; 
    };
    
    $scope.ordersTable.add = function(){
        $location.path('/order/'); 
    };

    $scope.ordersTable.edit = function(item){
	    if(item.university)
	    	$location.path('/orderaccept/' + item.id);
	    else if(item.newUniversity)
	    {
		UniversitySrvc.findSimmilarUniversity(item.newUniversity).then(
	  	function(data){	
		  if((data.status=='0') )
		  {
			        var msg = 'Университета, указанного в заявке, нет в базе данных! Добавить его или выбрать другой университет из списка?';
				    var btns= [{result: '0', label: $filter('localize')('Добавить'),  cssClass: 'btn-small', func:null},{result: '1', label: $filter('localize')('Выбрать'),  cssClass: 'btn-small', func:null}];
	    		 	$dialog.messageBox($filter('localize')('Внимание!'), $filter('localize')(msg), btns).open().then(function(result){
		    		 if(result==1)	
		    		 {
			    		 $location.path('/orderaccept/' + item.id);
			    		 //$location.path('/orderaccept/'+item.id+'/university/'+data.result.id); 
		    		  	 //$scope.page.intern.id = data.result.id; 
		    		  	// $scope.page.saveIntern('Изменения сохранены.');
		    		 }
		    		else if(result==0)
		    			$location.path('/university/' + item.newUniversity+'/order/'+item.id);
		    		 	//
		    		 	//$scope.page.saveIntern('Стажёр добавлен.');
		    	    })  	
		
			  		
		  }
		  else
		  	$location.path('/orderaccept/'+item.id+'/university/'+data.result.id);
		 	
		  
		     	    
	  },
   	  function(data, status, headers, config){
              $scope.page.alert = UtilsSrvc.getAlert('Внимание!!', data, 'error', true);   
      });  
		    
	    }
        
    };

    $scope.ordersTable.remove = function(item){           
    	var msg = 'Удалить данную запись?';
		var btns= [{result: '1', label: $filter('localize')('Удалить'),  cssClass: 'btn-small', func:null},{result: '0', label: $filter('localize')('Отмена'),  cssClass: 'btn-small', func:null}];
		$dialog.messageBox($filter('localize')('Внимание!'), $filter('localize')(msg), btns).open().then(function(result){
		if(result==1)	
		{
			OrderSrvc.remove(item.id).then(
                function(data){
                    $scope.ordersTable.selectedItems = [];
                    $scope.ordersTable.refresh();
                    $scope.oralert = UtilsSrvc.getAlert('Готово!', 'Заявка удалена.', 'success', true);
                },
                function(data, status, headers, config){
                    $scope.oralert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);
                });
		}});
    };
    
	$scope.init();
	  if (!$scope.menu.admin){
    	$scope.menu.login();
	};
});

