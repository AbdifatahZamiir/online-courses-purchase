const mongoose = require("mongoose");
const Joi = require("joi");

const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	}
});

const Author = new mongoose.model("Author", authorSchema);

function validateAuthor(author) {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(50)
			.required()
	};
	return Joi.validate(author, schema);
}

module.exports.Author = Author;
module.exports.authorSchema = authorSchema;
module.exports.validateAuthor = validateAuthor;
