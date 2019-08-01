app.controller('NavController', function($scope, $location) {
    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
            return true;
        } else {
            return false;
        }
    };

    $scope.doSomething = function() {
        console.log('doSomething func()');
    };
});

app.controller('LocationController', function($scope, $location) {
    $scope.$location = $location;
});

app.controller('ModalController', function() {
});

function ModalController($scope, $mdDialog, bookService) {
    $scope.currentBook = bookService.getCurrentEditedBook();

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}

app.controller('BookController', function(
    $scope,
    $http,
    $timeout,
    $q,
    $mdDialog,
    $rootScope,
    bookService,
    CONFIG
) {
    $http.get('/api/books').then(function(data) {
        $scope.storage = data.data;
        // console.log($scope.storage);
    });

    $scope.init = async function() {
        // console.log('init func');
        $scope.books = await bookService.getBooks();
        // $scope.$apply();
        // Alternative (old) way
        // bookService.getBooks().then((resolve) => {
        //     $scope.books = resolve;
        // });
    };

    // $scope.init();

    async function updateBookList() {
        $scope.books = await bookService.getBooks();
        $scope.$apply();
    }

    async function addBook() {
        let newBook = {
            title: $scope.inputData.title,
            author: $scope.inputData.author,
            year: $scope.inputData.year,
            page_count: $scope.inputData.pageCount
        };

        let x = await bookService.insertBook(newBook);
        if (x.data.status && x.data.status === CONFIG.SERVER_SUCCESS_RESPONSE) {
            $rootScope.message = 'Successfully add book';
            $scope.inputData.author = '';
            $scope.inputData.year = '';
        } else {
            $rootScope.message = 'Failed add book';
        }
    }

    async function removeBook(bookID) {
        let res = await bookService.deleteBook(bookID);
        if (res.data.status === CONFIG.SERVER_SUCCESS_RESPONSE) {
            updateBookList();
            console.log('delete book success');
        } else {
            console.log('delete book FAILED');
        }
    }

    function editBook(ev, book) {
        bookService.setCurrentEditedBook(book);

        $mdDialog
            .show({
                controller: ModalController,
                templateUrl: '/partials/dialog1.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(
                async function(answer) {
                    if (answer.action === 'save') {
                        let res = await bookService.updateBook(answer.data);
                        if (res.data) {
                            updateBookList();
                            $rootScope.message = 'Successfully saved book';
                        } else {
                            $rootScope.message = 'Error when save book';
                        }
                    }
                },
                function() {
                    $rootScope.message = 'You cancelled the dialog.';
                }
            );
    }

    $scope.addBook = addBook;
    $scope.removeBook = removeBook;
    $scope.editBook = editBook;
});
