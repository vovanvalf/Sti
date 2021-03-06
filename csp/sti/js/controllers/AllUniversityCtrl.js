'use strict';
/*===========================================================================================
Все университеты
===========================================================================================*/

controllersModule.controller('AllUniversityCtrl', function($scope, $location,$dialog, UniversitySrvc, InternSrvc, $filter, UtilsSrvc){
       $scope.menu.selectMenu($scope.menu.pages.universities);
		$scope.universitiesTable = {state: {}};

		$scope.init = function(){
 
        $scope.universitiesTable.columns = [
                          {name: 'Университет', sqlName: 'FullName->Value', isSorted: true, isSortable: true, isDown: true, isSearched: true, isSearchable: true},
                          {name: 'Регион', sqlName: 'City->ParentRegion->Name->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Город', sqlName: 'City->Name->Value', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                           ];
        $scope.universitiesTable.properties = [
        				  	{
	        				  	name: 'fullName',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        					getCssClass: function(item){ 
                                    return '';
                                },
	        				},
	        				{
	        				  	name: 'city.parentName',
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
	        				}]; 
	        				
        $scope.universitiesTable.pageSize = 7;
        $scope.universitiesTable.pageCurr = 1;
        $scope.universitiesTable.itemsTotal = 0;
        $scope.universitiesTable.selectedItems = [];
        $scope.universitiesTable.multiSelectMode = false;
        $scope.universitiesTable.forciblyUpdate = 0;
        $scope.universitiesTable.refresh();
    };

    // 
    $scope.universitiesTable.loadItems = function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText){
        UniversitySrvc.getAllForGrid(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, {}).then(
            function(data){
	            data = data.children;
                $scope.universitiesTable.pageTotal = Math.ceil(data.itemsTotal / pageSize);
                $scope.universitiesTable.itemsTotal = data.itemsTotal;
                $scope.universitiesTable.items = data.items;
            },
            function(data){
                console.log('Ошибка!!!!', data);
            });
    };

	$scope.universitiesTable.refresh = function(){ 
        $scope.universitiesTable.forciblyUpdate++; 
    };
    
    $scope.universitiesTable.add = function(){
        $location.path('/university/'); 
    };

    $scope.universitiesTable.edit = function(item){
        $location.path('/university/' + item.id);
    };

    $scope.universitiesTable.remove = function(item){
	    var msg = 'Удалить данную запись?';
		var btns= [{result: '1', label: $filter('localize')('Удалить'),  cssClass: 'btn-small', func:null},{result: '0', label: $filter('localize')('Отмена'),  cssClass: 'btn-small', func:null}];
		$dialog.messageBox($filter('localize')('Внимание!'), $filter('localize')(msg), btns).open().then(function(result){
		if(result==1)	
		{
			UniversitySrvc.remove(item.id).then(
                function(data){
                    $scope.universitiesTable.selectedItems = [];
                    $scope.universitiesTable.refresh();
                    $scope.page.unalert = UtilsSrvc.getAlert('Готово!', 'Университет удален.', 'success', true);
                },
                function(data, status, headers, config){
                    $scope.page.unalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);
                });
		}});              
    };
    
	$scope.init();
	
	  if (!$scope.menu.admin){
    	$scope.menu.login();
	};
});

