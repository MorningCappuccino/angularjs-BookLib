app.service('bookService', function($http) {

    this.insertBook = function(book) {
        return $http.post('/api/book2', book).catch(err => {
            return err;
        });
    };

    this.deleteBook = function(bookID) {
        return new Promise((resolve, reject) => {
            $http
                .delete(`/api/book/${bookID}`)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    this.updateBook = function(bookInfo) {
        return new Promise((resolve, reject) => {
            $http
                .patch(`/api/book/${bookInfo._id}`, bookInfo)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    this.currentEditedBook = null;

    this.setCurrentEditedBook = function(book) {
        this.currentEditedBook = Object.assign({}, book);
    };

    this.getCurrentEditedBook = function() {
        return this.currentEditedBook;
    };

    this.getBooks = function() {
        console.log('getBooks func');
        return new Promise((resolve, reject) => {
            $http({
                method: 'GET',
                url: '/api/books'
            }).then((success) => {
                console.log('response for getBooks');
                resolve(success.data);
            }).catch((error) => {
                reject(error);
            });
        });
    };
});
