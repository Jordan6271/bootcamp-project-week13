const express = require("express");
const booklist = express();
const port = 3000;

booklist.get(`/test`, (req, res) => res.send(`Testing the book list!`));
booklist.get(`/`, (req, res) => res.send(`Book list will go here!`));

booklist.listen(port, () =>
	console.log(`Book list listening at http://localhost:${port}`)
);
