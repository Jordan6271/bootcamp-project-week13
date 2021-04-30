const createError = require("http-errors");

let booklist = [];
let idno = 0;

exports.index = function (_, res) {
	res.send(booklist);
};

exports.create = function (req, res, next) {
	console.log(req.body);
	if (!req.body.name) {
		return next(createError(400, `Name of book is required`));
	}
	booklist.push({ id: idno, name: req.body.name });
	res.send({ result: true });
	idno++;
};

exports.show = function (req, res, next) {
	const booklistitem = booklist.find((book) => book.id == req.params.id);
	if (!booklistitem) {
		return next(createError(404, `There is no book with that id`));
	}
	res.send(booklistitem);
};

exports.delete = function (req, res, next) {
	const booklistitem = booklist.find((book) => book.id == req.params.id);
	if (!booklistitem) {
		return next(createError(404, `There is no book with that id`));
	}
	booklist = booklist.filter((book) => book.id != req.params.id);
	res.send({ result: true });
};

exports.update = function (req, res, next) {
	const booklistitem = booklist.find((book) => book.id == req.params.id);
	if (!req.body.name) {
		return next(createError(400, `Name of book is required`));
	}
	if (!booklistitem) {
		return next(createError(404, `There is no book with that id`));
	}
	booklist = booklist.map((book) => {
		if (book.id == req.params.id) {
			book.name = req.body.name;
		}
		return book;
	});
	res.send({ result: true });
};
