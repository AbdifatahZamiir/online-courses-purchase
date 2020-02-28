const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
	"Customer",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 50
		},
		phone: {
			type: String,
			required: true
		},
		level: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 50
		}
	})
);

function validateCustomer(customer) {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(50)
			.required(),
		level: Joi.string()
			.min(3)
			.max(50)
			.required(),
		phone: Joi.string().required()
	};
	return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
