const mongoose = require("mongoose");
const Joi = require("joi");

const Purchase = mongoose.model(
	"Purchase",
	new mongoose.Schema({
		customer: {
			type: new mongoose.Schema({
				name: {
					type: String,
					required: true,
					minlength: 3,
					maxlength: 50
				},
				phone: {
					type: String,
					required: true
				}
			}),
			required: true
		},
		course: {
			type: new mongoose.Schema({
				name: {
					type: String,
					required: true,
					maxlength: 50,
					minlength: 3
				}
			}),
			required: true
		},
		dateRegister: {
			type: Date,
			required: true,
			default: Date.now
		},
		courseFee: {
			type: Number,
			min: 0
		}
	})
);

function validatePurchase(purchase) {
	const schema = {
		customerId: Joi.objectId().required(),
		courseId: Joi.objectId().required()
	};
	return Joi.validate(purchase, schema);
}

module.exports.Purchase = Purchase;
module.exports.validatePurchase = validatePurchase;
