let booklist = [];

exports.index = function (request, response) {
	response.send(booklist);
};

exports.create = function (request, response) {
	booklist.push(request.body);
	response.send({ result: true });
};
