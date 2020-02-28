const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid email");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send("Invalid password");
	const token = user.generateAuthToken();
	res.send(token);
});

function validate(req) {
	const schema = {
		email: Joi.string().required(),
		password: Joi.string().required()
	};
	return Joi.validate(req, schema);
}

module.exports = router;
