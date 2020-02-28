const express = require("express");
const router = express.Router();
const { Author, validateAuthor } = require("../models/author");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
	const authors = await Author.find();
	res.send(authors);
});

router.post("/", auth, async (req, res) => {
	const { error } = validateAuthor(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const author = new Author({
		name: req.body.name
	});
	await author.save();

	res.send(author);
});

router.put("/:id", auth, async (req, res) => {
	const { error } = validateAuthor(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const author = await Author.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name
		},
		{ new: true }
	);

	if (!author)
		return res.status(404).send("Author with the given id not found");

	res.send(author);
});

router.delete("/:id", auth, async (req, res) => {
	const author = await Author.findByIdAndRemove(req.params.id);

	if (!author)
		return res.status(404).send("Author with the given id not found");

	res.send(author);
});

router.get("/:id", async (req, res) => {
	const author = await Author.findById(req.params.id);

	if (!author)
		return res.status(404).send("Author with the given id not found");

	res.send(author);
});

module.exports = router;
