'use strict';

xdescribe('BookController', function() {

    // Arrange
    let mockScope, controller, backend, bookServiceMock;

    // angular.mock.module used for load bookApp module
    beforeEach(module('bookApp'));


    beforeEach(inject(function($httpBackend) {
        // сервис #httpBackend используется для реализации низкоуровнего API по работе с AJAX запросами
        // для тестирования приложений, которые используют сервис $http, с помощью этого сервиса можно
        // иммитировать ответы от сервера (сервис находится в ngMock)
        backend = $httpBackend;

        // При GET запросе по адресу '/api/books' вернуть объект передаваемый в метод respond
        // expect(method, url, data, headers) определяет ожидаемый запрос (параметы опционально)

        // backend.expect('GET', '/api/books').respond(
        // THIS REQUEST SHOULD BE EXPECT FIRST
        backend.expectGET('/api/books').respond(
            [
                {"title": 'Robinzon Kruzo', "year": 1719},
                {"title": 'Womans', "year": 1978}
            ]
        );

        // backend.expect('GET', '/partials/books.html').respond();
        backend.expectGET('/partials/books.html').respond();

    }));

    beforeEach(function() {
        bookServiceMock = {
            getBooks: function() {}
        }
    });

    // angular.mock.inject provide Dependency Injection in tests
    beforeEach(inject(function($rootScope, $controller) {
        // create new scope
        mockScope = $rootScope.$new();

        // service $controller instantiniate Controller Object
        // method recieve 2 args: controller name and properties
        controller = $controller('BookController', {
            $scope: mockScope,
            // $http: $http,
            bookService: bookServiceMock
        });
        // console.log(controller);

        //flush() / flush(count) отправляет результат или указанное количество ответов,
        // пока этот метод не будет вызван, ответ с "сервера" не вернётся
        backend.flush();
    }));

    // Act and Assess
    it('should not pending response (Ajax request)', function() {
        backend.verifyNoOutstandingExpectation();
    });

    it('should $scope.storage has data', function() {
        expect(mockScope.storage).toBeDefined();
        expect(mockScope.storage.length).toEqual(2);
        expect(mockScope.storage[0].title).toEqual('Robinzon Kruzo');
        // mockScope.init();
    });

    it('should $scope.books equals undefined', function() {
        expect(mockScope.book).toBeUndefined();
        spyOn(bookServiceMock, 'getBooks').and.callThrough();
        // spyOn(bookServiceMock, 'getBooks'); <-- works fine too
        // bookServiceMock.getBooks = jasmine.createSpy("getBooks"); <-- works fine too

        mockScope.init();
        expect(bookServiceMock.getBooks).toHaveBeenCalled();
    });

    it('should $scope.books equals Array', function() {
        // console.log(controller);
        // mockScope.init();
        // expect(mockScope.books).toBeDefined();
    });
});
