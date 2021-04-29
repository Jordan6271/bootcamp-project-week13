const createError = require("http-errors");

let booklist = [];
let idno = 0;

exports.index = function (request, response) {
	response.send(booklist);
};

exports.create = function (request, response, next) {
	if (!request.body.name) {
		return next(createError(400, "Name of the book is required"));
	}
	booklist.push({ id: idno, name: request.body.name });
	response.send({ result: true });
	idno++;
};

exports.show = function (request, response, next) {
	const booklistitem = booklist.find((book) => book.id == request.params.id);
	if (!booklistitem) {
		return next(createError(404, "There is no book with that id"));
	}
	response.send(booklistitem);
};

exports.delete = function (request, response, next) {
	const booklistitem = booklist.find((book) => book.id == request.params.id);
	if (!booklistitem) {
		return next(createError(404, "There is no book with that id"));
	}
	booklist = booklist.filter((book) => book.id != request.params.id);
	response.send({ result: true });
};
