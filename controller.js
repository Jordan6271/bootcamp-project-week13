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
