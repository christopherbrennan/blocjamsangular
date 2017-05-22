 (function() {
     function config($stateProvider, $locationProvider) {
          $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
         
         $stateProvider
         .state('landing', {
             url: '/',
             templateUrl: '/templates/landing.html'
         })
         .state('album', {
             url: '/album',
             controller: 'LandingCtrl as landing',
             templateUrl: '/templates/album.html'
         })
         .state('collection', {
             url: '/collection',
             controller: 'CollectionCtrl as collection',
             templateUrl: '/templates/collection.html'
         });
     }

     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();