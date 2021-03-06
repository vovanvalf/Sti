'use strict';
/*===========================================================================================
Все сотрудники
===========================================================================================*/

controllersModule.controller('AllEmployeeCtrl', function($scope,$dialog, $location, $filter, EmployeeSrvc, UtilsSrvc){
$scope.menu.selectMenu($scope.menu.pages.employees);
$scope.employeeTable = {state: {}};

$scope.init = function(){
 
        $scope.employeeTable.columns = [
                          {name: 'Фамилия', sqlName: 'LastName->Value', isSorted: true, isSortable: true, isDown: true, isSearched: true, isSearchable: true},
                          {name: 'Имя', sqlName: 'FirstName->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Отчество', sqlName: 'MiddleName->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Email', sqlName: 'Email', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Телефон', sqlName: 'Phone', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true}];
         $scope.employeeTable.properties = [
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
	        				  	name: 'email',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        				  	getCssClass: function(item){ 
                                    return '';
                                }
	        				},
	        				{
	        				  	name: 'phone',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        				  	getCssClass: function(item){ 
                                    return '';
                                }
	        				}	        				
	        				]; 

        $scope.employeeTable.pageSize = 7;
        $scope.employeeTable.pageCurr = 1;
        $scope.employeeTable.itemsTotal = 0;
        $scope.employeeTable.selectedItems = [];
        $scope.employeeTable.multiSelectMode = false;
        $scope.employeeTable.forciblyUpdate = 0;
        $scope.employeeTable.refresh();
    };

 
    $scope.employeeTable.loadItems = function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText){
        EmployeeSrvc.getAllForGrid(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, {}).then(
            function(data){
	            data = data.children;
                $scope.employeeTable.pageTotal = Math.ceil(data.itemsTotal / pageSize);
                $scope.employeeTable.itemsTotal = data.itemsTotal;
                $scope.employeeTable.items = data.items;
            },
            function(data){
                console.log('Ошибка!!!!', data);
            });
    };

	$scope.employeeTable.refresh = function(){ 
        $scope.employeeTable.forciblyUpdate++; 
    };
    
    $scope.employeeTable.add = function(){
        $location.path('/employee/'); 
    };

    $scope.employeeTable.edit = function(item){
        $location.path('/employee/' + item.id);
    };

    $scope.employeeTable.remove = function(item){    
		var msg = 'Удалить данную запись?';
		var btns= [{result: '1', label: $filter('localize')('Удалить'),  cssClass: 'btn-small', func:null},{result: '0', label: $filter('localize')('Отмена'),  cssClass: 'btn-small', func:null}];
		$dialog.messageBox($filter('localize')('Внимание!'), $filter('localize')(msg), btns).open().then(function(result){
		if(result==1)	
		{
			EmployeeSrvc.remove(item.id).then(
                function(data){
                    $scope.employeeTable.selectedItems = [];
                    $scope.employeeTable.refresh();
                    $scope.inalert = UtilsSrvc.getAlert('Готово!', 'Стажёр удален.', 'success', true);
                },
                function(data, status, headers, config){
                    $scope.inalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);
                });
		}});         
    };
    
    $scope.employeeTable.onSelectCell = function(item, property){
        if (!item) return;
        property.onClickCell(item);
    };

 $scope.init();
	  if (!$scope.menu.admin){
    	$scope.menu.login();
	};
});

