const express = require("express");
const app = express();
app.use(express.json());
const path = require('path');
require('dotenv').config({
	path: path.resolve(__dirname, '../.env'),
});
// db.sequelize.sync({ alter: true });
const { authRouter, blogRouter, profileRouter } = require("./routes");

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/profile", profileRouter);

app.use('/', express.static(path.resolve(__dirname, './')))

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
