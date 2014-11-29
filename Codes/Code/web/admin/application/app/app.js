// JavaScript Document
var App = angular.module('QatartOne',['ngRoute','ngResource'])

App.config(function($routeProvider, $httpProvider){
	
	$httpProvider.defaults.headers.common.Authorization = getUser();
	
	$routeProvider
	.when('/',
		{
			//controller:'controllers.dashController',
			templateUrl:'app/partials/dashboard.html'
		}
	)
	.when('/users',
		{
			controller:'controllers.userController',
			templateUrl:'app/partials/user/usersList.html'	
		}
	)
	.when('/addUser',
		{
			controller:'controllers.userAddController',
			templateUrl:'app/partials/user/addUser.html'	
		}
	)
	.when('/editUser/:id',
		{
			controller:'controllers.userDetailsController',
			templateUrl:'app/partials/user/editUser.html'	
		}
	)
	.when('/addNews',
		{
			controller:'controllers.newsController',
			templateUrl:'app/partials/addNews.html'	
		}
	)
	
	.otherwise({
		redirectTo:'/'
	});
	
})

.run( function($rootScope, $location, User) {
    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ( $rootScope.accessToken == null ) {
          window.location.replace('../')
      }
	  //console.log(event)
	  //console.log(next)
	  //console.log(current)  
	  //console.log($rootScope.accessToken)
    });
 })
 
 var getUser = function(){
	var ArrayCookies = document.cookie.split(';')
	for(i=0; i<ArrayCookies.length; i++){
		if(ArrayCookies[i].indexOf('accessKey')!=-1){
			return ArrayCookies[i].substr(ArrayCookies[i].indexOf('=')+1)
		}
	}
}