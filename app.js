const express = require("express");
const Joi = require("joi");
const debug = require("debug")("db:debug");
const config = require("config");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const app = express();
const courses = require("./routes/courses");
const authors = require("./routes/authors");
const customers = require("./routes/customers");
const purchases = require("./routes/purchases");
const users = require("./routes/users");
const auth = require("./routes/auth");

if (!config.get("database")) {
	console.log("FATAL ERROR: database is not defined");
	process.exit(1);
}

mongoose
	.connect(config.get("database"), {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => debug("Connected to the database"))
	.catch(err => debug("Not connected", err));

app.use(express.json());
app.use("/api/courses", courses);
app.use("/api/authors", authors);
app.use("/api/customers", customers);
app.use("/api/purchases", purchases);
app.use("/api/users", users);
app.use("/api/auth", auth);

port = process.env.PORT || 1200;

// 🔥
app.listen(port, () =>
	console.log(`App is running at https//localhost/${port}`)
);
