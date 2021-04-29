const express = require("express");
const router = express.Router();
const books = require("./controller");

router.get("/books", books.index);

module.exports = router;
