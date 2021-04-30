const express = require(`express`);
const router = express.Router();
const books = require(`./controller`);

router.get(`/books`, books.index);
router.post(`/books/add-book`, books.create);
router.get(`/books/:id`, books.show);
router.delete(`/books/:id`, books.delete);
router.put(`/books/:id`, books.update);

module.exports = router;
