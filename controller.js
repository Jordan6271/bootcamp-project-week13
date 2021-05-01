const createError = require("http-errors");

let booklist = [];
let idNumber = 0;

exports.index = function (_, response) {
	response.json(booklist);
};

exports.create = function (request, response, next) {
	if (!request.body.title) {
		return next(
			createError(400, `Title of book is required`, { expose: true })
		);
	}
	if (!request.body.author) {
		return next(createError(400, `Author of book is required`));
	}
	if (typeof request.body.read !== "boolean") {
		return next(
			createError(400, `Read status of book must be a boolean value`)
		);
	}
	booklist.push({
		id: idNumber,
		title: request.body.title,
		author: request.body.author,
		read: request.body.read,
	});
	response.json({ result: true });
	idNumber++;
};

exports.show = function (request, response, next) {
	const booklistitem = booklist.find((book) => book.id == request.params.id);
	if (!booklistitem) {
		return next(createError(404, `There is no book with that id`));
	}
	response.json(booklistitem);
};

exports.delete = function (request, response, next) {
	const booklistitem = booklist.find((book) => book.id == request.params.id);
	if (!booklistitem) {
		return next(createError(404, `There is no book with that id`));
	}
	booklist = booklist.filter((book) => book.id != request.params.id);
	response.json({ result: true });
};

exports.update = function (request, response, next) {
	const booklistitem = booklist.find((book) => book.id == request.params.id);
	if (!request.body.title) {
		return next(createError(400, `Title of book is required`));
	}
	if (!request.body.author) {
		return next(createError(400, `Author of book is required`));
	}
	if (typeof request.body.read !== "boolean") {
		return next(
			createError(400, `Read status of book must be a boolean value`)
		);
	}
	if (!booklistitem) {
		return next(createError(404, `There is no book with that id`));
	}
	booklist = booklist.map((book) => {
		if (book.id == request.params.id) {
			(book.title = request.body.title),
				(book.author = request.body.author),
				(book.read = request.body.read);
		}
		return book;
	});
	response.json({ result: true });
};
