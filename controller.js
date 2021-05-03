const createError = require(`http-errors`);

let booklist = [];
let idNumber = 0;

exports.index = function (_, response) {
	response.json(booklist);
};

exports.create = function (request, response, next) {
	if (!request.body.title) {
		return next(createError(400, `Title of book is required`));
	}
	if (!request.body.author) {
		return next(createError(400, `Author of book is required`));
	}
	if (typeof request.body.read !== `boolean`) {
		return next(
			createError(
				400,
				`Read status of book must exist and be a boolean value`
			)
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
	const booklistId = booklist.find((book) => book.id == request.params.id);
	const booklistTitle = booklist.find(
		(book) => book.title == request.params.title
	);
	const booklistAuthor = booklist.find(
		(book) => book.author == request.params.author
	);
	if (!booklistId && !booklistTitle && !booklistAuthor) {
		if (request.route.path == `/books/id=:id`) {
			return next(createError(404, `There is no book with that id`));
		}
		if (request.route.path == `/books/title=:title`) {
			return next(createError(404, `There is no book with that title`));
		}
		if (request.route.path == `/books/author=:author`) {
			return next(createError(404, `There is no book by that author`));
		}
		return next(createError(404, `That book does not exist`));
	}
	if (booklistTitle) {
		response.json(
			booklist.filter((book) => book.title == request.params.title)
		);
	}
	if (booklistAuthor) {
		response.json(
			booklist.filter((book) => book.author == request.params.author)
		);
	}
	response.json(booklist.filter((book) => book.id == request.params.id));
};

exports.delete = function (request, response, next) {
	const booklistId = booklist.find((book) => book.id == request.params.id);
	const booklistTitle = booklist.find(
		(book) => book.title == request.params.title
	);
	const booklistAuthor = booklist.find(
		(book) => book.author == request.params.author
	);
	if (!booklistId && !booklistTitle && !booklistAuthor) {
		if (request.route.path == `/books/id=:id`) {
			return next(createError(404, `There is no book with that id`));
		}
		if (request.route.path == `/books/title=:title`) {
			return next(createError(404, `There is no book with that title`));
		}
		if (request.route.path == `/books/author=:author`) {
			return next(createError(404, `There is no book by that author`));
		}
		return next(createError(404, `That book does not exist`));
	}
	if (booklistTitle) {
		booklist = booklist.filter(
			(book) => book.title != request.params.title
		);
	} else if (booklistAuthor) {
		booklist = booklist.filter(
			(book) => book.author != request.params.author
		);
	} else {
		booklist = booklist.filter((book) => book.id != request.params.id);
	}
	response.json({ result: true });
};

exports.update = function (request, response, next) {
	const booklistId = booklist.find((book) => book.id == request.params.id);
	const booklistTitle = booklist.find(
		(book) => book.title == request.params.title
	);
	const booklistAuthor = booklist.find(
		(book) => book.author == request.params.author
	);
	if (!booklistId && !booklistTitle && !booklistAuthor) {
		if (request.route.path == `/books/id=:id`) {
			return next(createError(404, `There is no book with that id`));
		}
		if (request.route.path == `/books/title=:title`) {
			return next(createError(404, `There is no book with that title`));
		}
		if (request.route.path == `/books/author=:author`) {
			return next(createError(404, `There is no book by that author`));
		}
		return next(createError(404, `That book does not exist`));
	}
	if (!request.body.title) {
		return next(createError(400, `Title of book is required`));
	}
	if (!request.body.author) {
		return next(createError(400, `Author of book is required`));
	}
	if (typeof request.body.read !== `boolean`) {
		return next(
			createError(400, `Read status of book must be a boolean value`)
		);
	}
	if (booklistTitle) {
		booklist = booklist.map((book) => {
			console.log(book);
			if (book.title == request.params.title) {
				book.title = request.body.title;
				book.author = request.body.author;
				book.read = request.body.read;
			}
			return book;
		});
	} else if (booklistAuthor) {
		booklist = booklist.map((book) => {
			console.log(book);
			if (book.author == request.params.author) {
				book.title = request.body.title;
				book.author = request.body.author;
				book.read = request.body.read;
			}
			return book;
		});
	} else {
		booklist = booklist.map((book) => {
			console.log(book);
			if (book.id == request.params.id) {
				book.title = request.body.title;
				book.author = request.body.author;
				book.read = request.body.read;
			}
			return book;
		});
	}
	response.json({ result: true });
};
