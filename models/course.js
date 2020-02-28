const mongoose = require("mongoose");
const Joi = require("joi");
const { authorSchema } = require("../models/author");

const Course = mongoose.model(
	"Course",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			maxlength: 50,
			minlength: 3
		},
		tags: [String],
		author: {
			type: authorSchema,
			required: true
		},
		isPublished: Boolean
	})
);

function validateCourse(course) {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(50)
			.required(),
		tags: Joi.array().required(),
		isPublished: Joi.boolean().required(),
		authorId: Joi.objectId().required()
	};

	return Joi.validate(course, schema);
}

module.exports.Course = Course;
module.exports.validateCourse = validateCourse;
