const mongoose = require('mongoose');
const Book = require('../models/book');

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => {
            res.status(200).json(books);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.bookAdd = (req, res, next) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        page_count: req.body.page_count,
        year: req.body.year
    });
    book.save()
        .then(results => 
            res.status(201).json({
                status: 'success',
                book: book
            })
        )
        .catch(err => console.log(err));
    
};

exports.getBookByID = (req, res, next) => {
    const bookID = req.params.id;
    Book.findById(bookID)
        .exec()
        .then(book => {
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: 'No entry found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.editBook = (req, res, next) => {
    const bookID = req.params.id;
    const updateOps = req.body;
    Book.update({ _id: bookID }, { $set: updateOps })
        .exec()
        .then(results => {
            res.status(200).json({
                message: 'Book updated',
                response: {
                    results: results
                },
                editedBook: {
                    _id: bookID,
                    ...updateOps
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.bookDelete = (req, res, next) => {
    const bookID = req.params.id;
    Book.remove({ _id: bookID })
        .then(results => {
            // let newBooks = Book.find().then(res => res);

            res.status(200).json({
                status: 'success',
                message: 'Book deleted',
                _id: bookID,
                results: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.searchBookByName = (req, res, next) => {
    const searchQuery = req.query.search;
    Book.find()
        .where({ title: { $regex: '' + searchQuery, $options: 'i' } })
        .then(books => {
            res.status(200).json(books);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};
