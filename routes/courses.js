const express = require("express");
const router = express.Router();
const { Course, validateCourse } = require("../models/course");
const { Author } = require("../models/author");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
	const courses = await Course.find();
	res.send(courses);
});

router.post("/", auth, async (req, res) => {
	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const author = await Author.findById(req.body.authorId);
	if (!author) return res.status(400).send("Invalid authorId");

	const course = new Course({
		name: req.body.name,
		tags: req.body.tags,
		author: {
			_id: author._id,
			name: author.name
		},
		isPublished: req.body.isPublished
	});
	await course.save();

	res.send(course);
});

router.put("/:id", auth, async (req, res) => {
	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const author = await Author.findById(req.body.authorId);
	if (!author) return res.status(400).send("Invalid authorId");

	const course = await Course.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			tags: req.body.tags,
			author: {
				_id: author._id,
				name: author.name
			},
			isPublished: req.body.isPublished
		},
		{ new: true }
	);
	if (!course)
		return res.status(404).send("Course with the given id not found");
	res.send(course);
});

router.delete("/:id", auth, async (req, res) => {
	const course = await Course.findByIdAndRemove(req.params.id);

	if (!course)
		return res.status(404).send("Course with the given id not found");

	res.send(course);
});

router.get("/:id", async (req, res) => {
	const course = await Course.findById(req.params.id);

	if (!course)
		return res.status(404).send("Course with the given id not found");

	res.send(course);
});

module.exports = router;
