module.exports = (app, Book) => {
    // GET ALL BOOKS
    app.get('/api/books', (req, res) => {
        Book.find((err, books) => {
            if (err) return res.status(500).send({ error: 'database failure'});
            res.json(books);
        });
    });

    // GET SINGLE BOOK
    app.get('/api/books/:book_id', (req, res) => {
        Book.findOne({_id: req.params.book_id}, (err, book) => {
            if (err) return res.status(500).json({ error: err });
            if (!book) return res.status(404).json({ error: 'book not found'});
            res.json(book);
        })
    });

    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', (req, res) => {
        Book.find({ author: req.params.author}, {_id: 0, title: 1, published_date: 1}, (err, books) => {
            if (err) return res.status(500).json({ error: err });
            if (books.length === 0) return res.status(404).json({ error: 'book not found'});
            res.json(books);
        })
    });

    // CREATE BOOK
    app.post('/api/books', (req, res) => {
        const book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);
        book.save(err => {
            if (err) {
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        })
    });

    // UPDATE THE BOOK
    app.put('/api/books/:book_id', (req, res) => {
        // Book.findById(req.params.book_id, (err, book) => {
        //     if (err) return res.status(500).json({ error: 'database failure' });
        //     if (!book) return res.status(404).json({ error: 'book not fount'});
        //     const changeBook = {
        //         ...book,
        //         ...req.body,
        //     };

        //     // if (req.body.title) book.title = req.body.title;
        //     // if (req.body.author) book.author = req.body.author;
        //     // if (req.body.published_date) book.published_date = req.body.published_date;

        //     book.save((err) => {
        //         if (err) res.status(500).json({ error: 'failed to update'});
        //         res.json({ message: 'book updated'});
        //     });
        // });

        Book.update({ _id: req.params.book_id }, { $set: req.body }, (err, output) => {
            if (err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if (!output.n) return res.status(404).json({ error: 'book not found' });
            res.json({ message: 'book update' });
        });
    });

    // DELETE BOOK
    app.delete('/api/books/:book_id', (req, res) => {
        Book.remove({ _id: req.params.book_id }, (err, output) => {
            if (err) return res.status(500).json({ error: 'database failure'});
            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */
           res.status(204).end();
        });
    });
}