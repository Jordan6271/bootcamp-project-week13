const express = require("express");
const booklist = express();
const port = 3000;
const router = require("./router");

booklist.use(express.json());
booklist.use(router);

booklist.listen(port, () =>
	console.log(`Book list listening at http://localhost:${port}`)
);
