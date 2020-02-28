const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const config = require("config");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	email: {
		type: String,
		unique: true,
		minlength: 5,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{ _id: this._id, isAdmin: this.isAdmin },
		config.get("jwtPrivateKey")
	);
	return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(50)
			.required(),
		email: Joi.string().required(),
		password: Joi.string().required()
	};
	return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
