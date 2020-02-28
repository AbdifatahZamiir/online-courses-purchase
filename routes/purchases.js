const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");
const { Purchase, validatePurchase } = require("../models/purchase");
const { Customer } = require("../models/customer");
const { Course } = require("../models/course");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
	const purchases = await Purchase.find();
	res.send(purchases);
});

router.post("/", async (req, res) => {
	const { error } = validatePurchase(req.body);
	if (error) return res.status(404).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send("Invalid customer");

	const course = await Course.findById(req.body.courseId);
	if (!course) return res.status(400).send("Invalid course");

	const purchase = new Purchase({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone
		},
		course: {
			_id: course._id,
			name: course.name
		}
	});
	try {
		new Fawn.Task().save("purchases", purchase).run();
		res.send(purchase);
	} catch (ex) {
		console.log("Something failed", ex);
	}
});

router.get("/:id", async (req, res) => {
	const purchase = await Purchase.findById(req.params.id);
	if (!purchase)
		return res.status(404).send("Purchase with the given id was not found");
	res.send(purchase);
});

module.exports = router;
