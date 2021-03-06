'use strict';

/*===========================================================================================
Все компании
===========================================================================================*/

controllersModule.controller('AllCompanyCtrl', function($scope, $dialog, $location, CompanySrvc, InternshipSrvc, $filter, UtilsSrvc){
	
       $scope.menu.selectMenu($scope.menu.pages.companies);
       $scope.companiesTable = {state: {}};

		$scope.init = function(){
 
        $scope.companiesTable.columns = [
                          {name: 'Компания', sqlName: 'FullName->Value', isSorted: true, isSortable: true, isDown: true, isSearched: true, isSearchable: true},
                          {name: 'Адрес', sqlName: 'LegalAddress', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true},
                          {name: 'Web-страница', sqlName: 'WebSite', isSorted: false, isSortable: true, isDown: true, isSearched: false, isSearchable: true}
                           ];
        $scope.companiesTable.properties = [
        				  	{
	        				  	name: 'fullName',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        					getCssClass: function(item){ 
                                    return '';
                                },
	        				},
	        				{
	        				  	name: 'legalAddress',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        					getCssClass: function(item){ 
                                    return '';
                                },
	        				},
	        				{
	        				  	name: 'webSite',
	        				  	cellStyle: {textAlign: 'left'},
	        				  	cellSelectable: false,
	        					getCssClass: function(item){ 
                                    return '';
                                },
	        				}]; 
	        				
        $scope.companiesTable.pageSize = 7;
        $scope.companiesTable.pageCurr = 1;
        $scope.companiesTable.itemsTotal = 0;
        $scope.companiesTable.selectedItems = [];
        $scope.companiesTable.multiSelectMode = false;
        $scope.companiesTable.forciblyUpdate = 0;
        $scope.companiesTable.refresh();
    };

  
    $scope.companiesTable.loadItems = function(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText){
        CompanySrvc.getAllForGrid(pageCurr, pageSize, sqlName, isDown, searchSqlName, searchText, {}).then(
            function(data){
	            data = data.children;
                $scope.companiesTable.pageTotal = Math.ceil(data.itemsTotal / pageSize);
                $scope.companiesTable.itemsTotal = data.itemsTotal;
                $scope.companiesTable.items = data.items;
            },
            function(data){
                console.log('Ошибка!!!!', data);
            });
    };

	$scope.companiesTable.refresh = function(){ 
        $scope.companiesTable.forciblyUpdate++; 
    };
    
    $scope.companiesTable.add = function(){
        $location.path('/company/'); 
    };

    $scope.companiesTable.edit = function(item){
	   $location.path('/company/' + item.id);
    };

    $scope.companiesTable.remove = function(item){
	    var msg = 'Удалить данную запись?';
		var btns= [{result: '1', label: $filter('localize')('Удалить'),  cssClass: 'btn-small', func:null},{result: '0', label: $filter('localize')('Отмена'),  cssClass: 'btn-small', func:null}];
		$dialog.messageBox($filter('localize')('Внимание!'), $filter('localize')(msg), btns).open().then(function(result){
		if(result==1)	
		{
			 CompanySrvc.remove(item.id).then(
			 function(data){
			 $scope.companiesTable.selectedItems = [];
			 $scope.companiesTable.refresh();
			 $scope.page.coalert = UtilsSrvc.getAlert('Готово!', 'Компания удалена.', 'success', true);
			 },
			 function(data, status, headers, config){
			         $scope.page.coalert = UtilsSrvc.getAlert('Внимание!', data, 'error', true);
			 });
		}});    
    };
	$scope.init();
	  if (!$scope.menu.admin){
    	$scope.menu.login();
	};
});