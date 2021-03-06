'use strict';
/*
Рекомендации:
Модуль сервисов для описания сервисов.
Модуль контроллеров для описания котнроллеров.
Модуль директив для описания директив.
И модуль всего приложения, который зависит от вышеуказанных модулей и содержит код инициализации. (имя модуля указывается в ng-app на странице index.csp)



Добавление маршрутов(when).
[как называется маршрут], [путь до шаблона, который будет подгружен в блок ng-view], [контроллер, который будет связан с область видимости шаблона]

otherwise
Устанавливает определение маршрута, которое будет использоваться при изменении маршрута, когда никаких других совпадений не найдено.

Можно сразу прописать параметр для страницы, т.е. совершив переход /intern/1 - мы в контроллере InternCtrl сможем получить доступ к этому параметру.
$routeParams.id - параметр :id
*/


var servicesModule     = angular.module('servicesModule', ['ngCookies', 'ui.bootstrap']);
var controllersModule  = angular.module('controllersModule', ['servicesModule']);
var directivesModule   = angular.module('directivesModule', []);
var localizationModule = angular.module('localizationModule', []);
var filterModule       = angular.module('filterModule', []);
var mainModule         = angular.module('mainModule', ['localizationModule',  'filterModule', 'servicesModule', 'controllersModule', 'directivesModule']);


mainModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/universities',      {templateUrl: 'partials/universities.csp',   controller: 'AllUniversityCtrl'});
    $routeProvider.when('/university/:id',   {templateUrl: 'partials/university.csp',    controller: 'UniversityCtrl'});
    $routeProvider.when('/university/:unId/employee/:empId',   {templateUrl: 'partials/university.csp',    controller: 'UniversityCtrl'});
    $routeProvider.when('/university',   {templateUrl: 'partials/university.csp',    controller: 'UniversityCtrl'});
    $routeProvider.when('/university/:newUniversity/order/:orId',   {templateUrl: 'partials/university.csp',    controller: 'UniversityCtrl'});
      
    $routeProvider.when('/orders',    {templateUrl: 'partials/orders.csp', controller: 'AllOrderCtrl'});
    $routeProvider.when('/order/:id', {templateUrl: 'partials/order.csp',  controller: 'OrderCtrl'});
    $routeProvider.when('/orderaccept/:id', {templateUrl: 'partials/orderaccept.csp',  controller: 'OrderAcceptCtrl'});
    $routeProvider.when('/orderaccept/:orId/university/:unId', {templateUrl: 'partials/orderaccept.csp',  controller: 'OrderAcceptCtrl'});
    $routeProvider.when('/order', {templateUrl: 'partials/order.csp',  controller: 'OrderCtrl'});
    
    $routeProvider.when('/interns',    {templateUrl: 'partials/interns.csp', controller: 'AllInternCtrl'});
    $routeProvider.when('/intern/:id', {templateUrl: 'partials/intern.csp',  controller: 'InternCtrl'});
    $routeProvider.when('/intern', {templateUrl: 'partials/intern.csp',  controller: 'InternCtrl'});
    
    $routeProvider.when('/employees',    {templateUrl: 'partials/employees.csp', controller: 'AllEmployeeCtrl'});
    $routeProvider.when('/employee/:id', {templateUrl: 'partials/employee.csp',  controller: 'EmployeeCtrl'});
    $routeProvider.when('/employee', {templateUrl: 'partials/employee.csp',  controller: 'EmployeeCtrl'});
    $routeProvider.when('/employee/:cmpId/company',   {templateUrl: 'partials/employee.csp',    controller: 'EmployeeCtrl'});
    $routeProvider.when('/employee/:unId/university',   {templateUrl: 'partials/employee.csp',    controller: 'EmployeeCtrl'});
    $routeProvider.when('/employee/:ishId/internship',   {templateUrl: 'partials/employee.csp',    controller: 'EmployeeCtrl'});
    
    $routeProvider.when('/internships',    {templateUrl: 'partials/internships.csp', controller: 'AllInternshipCtrl'});
    $routeProvider.when('/internship/:id', {templateUrl: 'partials/internship.csp',  controller: 'InternshipCtrl'});
    $routeProvider.when('/internship/:ishId/employee/:empId',   {templateUrl: 'partials/internship.csp',  controller: 'InternshipCtrl'});
    $routeProvider.when('/internship', {templateUrl: 'partials/internship.csp',  controller: 'InternshipCtrl'});
   
   	$routeProvider.when('/companies',      {templateUrl: 'partials/companies.csp',   controller: 'AllCompanyCtrl'});
    $routeProvider.when('/company/:id',   {templateUrl: 'partials/company.csp',    controller: 'CompanyCtrl'});
     $routeProvider.when('/company/:cmpId/employee/:empId',   {templateUrl: 'partials/company.csp',    controller: 'CompanyCtrl'});
    $routeProvider.when('/company',   {templateUrl: 'partials/company.csp',    controller: 'CompanyCtrl'});
    
    $routeProvider.when('/mailing/groups', {templateUrl: 'partials/mailinggroups.csp', controller: 'AllMailingGroupsCtrl'});
    $routeProvider.when('/mailing/group', {templateUrl: 'partials/mailinggroup.csp', controller: 'MailingGroupCtrl'});
    $routeProvider.when('/mailing/group/:id', {templateUrl: 'partials/mailinggroup.csp', controller: 'MailingGroupCtrl'});
    $routeProvider.when('/mailing/group/:id/mail', {templateUrl: 'partials/mailinggroupmail.csp', controller: 'MailingGroupMailCtrl'});
    $routeProvider.when('/mailing/group/:gId/item', {templateUrl: 'partials/mailingitem.csp', controller: 'MailingItemCtrl'});
    $routeProvider.when('/mailing/group/:gId/item/:iId', {templateUrl: 'partials/mailingitem.csp', controller: 'MailingItemCtrl'});
    
    $routeProvider.when('/mailing/subscription', {templateUrl: 'partials/mailingsubscription.csp', controller: 'MailingSubscriptionCtrl'});
    $routeProvider.when('/mailing/subscription/:accessCode', {templateUrl: 'partials/mailingsubscription.csp', controller: 'MailingSubscriptionCtrl'});
    $routeProvider.when('/mailing/subscription/confirmation/:confirmCode', {templateUrl: 'partials/mailingsubscription.csp', controller: 'MailingSubscriptionCtrl'});
    
    $routeProvider.when('/logs', {templateUrl: 'partials/logs.csp', controller: 'AllLogsCtrl'});
    $routeProvider.when('/mailing/journal', {templateUrl: 'partials/mailingjournal.csp', controller: 'MailingJournalCtrl'});
    $routeProvider.when('/settings',   {templateUrl: 'partials/settings.csp',    controller: 'SettingsCtrl'});

    $routeProvider.otherwise({redirectTo: '/order'});
  }]);
