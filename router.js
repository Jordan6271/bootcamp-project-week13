const express = require(`express`);
const router = express.Router();
const books = require(`./controller`);

router.get(`/books`, books.index);

router.post(`/books/add-book`, books.create);

router.get(`/books/id=:id`, books.show);
router.get(`/books/title=:title`, books.show);
router.get(`/books/author=:author`, books.show);

router.delete(`/books/id=:id`, books.delete);
router.delete(`/books/title=:title`, books.delete);
router.delete(`/books/author=:author`, books.delete);

router.put(`/books/id=:id`, books.update);
router.put(`/books/title=:title`, books.update);
router.put(`/books/author=:author`, books.update);

module.exports = router;
