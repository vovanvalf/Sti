'use strict';
/*===========================================================================================
Все стажеры
===========================================================================================*/

controllersModule.controller('AllInternCtrl', function($scope,$dialog, $location, $filter, InternSrvc, UtilsSrvc){
$scope.menu.selectMenu($scope.menu.pages.interns);
$scope.internsTable = {state: {}};

$scope.init = function(){
 
        $scope.internsTable.columns = [
                          {name: 'Фамилия', sqlName: 'LastName->Value', isSorted: true, isSortable: true, isDown: true, isSearched: true, isSearchable: true},
                          {name: 'Имя', sqlName: 'FirstName->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Отчество', sqlName: 'MiddleName->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Дата рождения', sqlName: 'BirthDate', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: false, filter: 'date'},
                          {name: 'Университет', sqlName: 'University->FullName->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Город', sqlName: 'City->Name->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
        				  {name: 'Стажировка', sqlName: 'Internship->Name->Value', isSorted: false, isSortable: false, isDown: true, isSearched: false, isSearchable: true}];
        $scope.internsTable.properties = [
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
	        				  	name: 'university.fullName',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        				  	getCssClass: function(item){ 
                                    return '';
                                }
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

        $scope.internsTable.pageSize = 7;
        $scope.internsTable.pageCurr = 1;
        $scope.internsTable.itemsTotal = 0;
        $scope.internsTable.selectedItems = [];
        $scope.internsTable.multiSelectMode = false;
        $scope.internsTable.forciblyUpdate = 0;
        $scope.internsTable.refresh();
    };

 
    $scope.internsTable.loadItems = function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText){
        InternSrvc.getAllForGrid(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, {}).then(
            function(data){
	            data = data.children;
                $scope.internsTable.pageTotal = Math.ceil(data.itemsTotal / pageSize);
                $scope.internsTable.itemsTotal = data.itemsTotal;
                $scope.internsTable.items = data.items;
                
                
            },
            function(data){
                console.log('Ошибка!!!!', data);
            });
    };

	$scope.internsTable.refresh = function(){ 
        $scope.internsTable.forciblyUpdate++; 
    };
    
    $scope.internsTable.add = function(){
        $location.path('/intern/'); 
    };

    $scope.internsTable.edit = function(item){
        $location.path('/intern/' + item.id);
    };

    $scope.internsTable.remove = function(item){    
		var msg = 'Удалить данную запись?';
		var btns= [{result: '1', label: $filter('localize')('Удалить'),  cssClass: 'btn-small', func:null},{result: '0', label: $filter('localize')('Отмена'),  cssClass: 'btn-small', func:null}];
		$dialog.messageBox($filter('localize')('Внимание!'), $filter('localize')(msg), btns).open().then(function(result){
		if(result==1)	
		{
			InternSrvc.remove(item.id).then(
                function(data){
                    $scope.internsTable.selectedItems = [];
                    $scope.internsTable.refresh();
                    $scope.inalert = UtilsSrvc.getAlert('Готово!', 'Стажёр удален.', 'success', true);
                },
                function(data, status, headers, config){
                    $scope.inalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);
                });
		}});         
    };
    
    $scope.internsTable.onSelectCell = function(item, property){
        if (!item) return;
        property.onClickCell(item);
    };

 $scope.init();
	  if (!$scope.menu.admin){
    	$scope.menu.login();
	};
});

