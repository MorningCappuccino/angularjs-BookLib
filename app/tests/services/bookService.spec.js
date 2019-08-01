'use strict';

xdescribe('bookService', function() {
    let bookService, backend;

    beforeEach(module('bookApp'));

    beforeEach(inject(function($httpBackend) {
        backend = $httpBackend;

        // backend.expectGET('/partials/books.html').respond();

        // backend.expectGET('/api/books').respond(200,
        //     [
        //         {"title": 'Robinzon Kruzo', "year": 1719},
        //         {"title": 'Womans', "year": 1978}
        //     ]
        // );

        backend.when('GET', '/partials/books.html').respond(200);

        backend
            .when('GET', '/api/books')
            .respond([
                { title: 'Robinzon Kruzo', year: 1719 },
                { title: 'Womans', year: 1978 }
            ]);
    }));

    beforeEach(inject(function(_bookService_) {
        bookService = _bookService_;
        // console.log('####', bookService);
        backend.expectGET('/partials/books.html');
        backend.flush();
    }));

    it('Ajax request', function() {
        backend.verifyNoOutstandingExpectation();
        backend.verifyNoOutstandingRequest();
    });

    it('should set currentEditedBook to null', function() {
        // expect(1 + 1).toEqual(2);
        // backend.expectGET('/api/books');
        // backend.flush();
        // console.log(bookService.getBooks());
    });
});
