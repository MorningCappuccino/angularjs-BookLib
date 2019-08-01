
var app = angular.module('bookApp', ['ngRoute', 'ngMaterial']);

app.config(['$routeProvider', function config($routeProvider) {
    $routeProvider
        .when('/books',
            {
                controller: 'BookController',
                templateUrl: '/partials/books.html'
            })
        .when('/book/add',
            {
                controller: 'BookController',
                templateUrl: '/partials/book-add.html'
            })
        .when('/book/:bookID',
            {
                controller: 'BookController',
                templateUrl: '/partials/book-details.html'
            })
        .otherwise({ redirectTo: '/books' });
}]).run(function($rootScope) {
    $rootScope.message = '';
});

// app.service('bookService', function($http) {});
