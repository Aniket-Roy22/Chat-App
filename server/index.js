import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import authenticateToken from "./middleware/authenticateToken.js";

const PORT = 3000;
const app = express();
const posts = [
	{
		username: "Ani",
		title: "Post 1"
	},
	{
		username: "Ash",
		title: "Post 2"
	}
];

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));

app.get("/posts", authenticateToken, (req, res) => {
	res.status(200).json(posts.filter(post => post.username === req.user.name));
});

app.post("/login", (req, res) => {
	// Authenticate

	const username = req.body.username;
	const user = { name: username };

	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
	res.json({ accessToken: accessToken });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});