import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import jwt from "jsonwebtoken";
import {
	authenticateAccessToken,
	authenticateRefreshToken,
} from "./middleware/authenticateTokens.js";
import {
	generateAccessToken,
	generateRefreshToken,
} from "./utils/generateToken.js";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());

app.get("/posts", authenticateAccessToken, (req, res) => {
	res.status(200).json(posts.filter(post => post.username === req.user.name));
});

app.post("/login", (req, res) => {
	// Authenticate

	const username = req.body.username;
	const user = { name: username };

	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
		maxAge: 1 * 60 * 1000
	});
	res.status(200).json({
		accessToken: accessToken
	});
});

app.post("/token", authenticateRefreshToken, (req, res) => {
	const username = req.user.name;
	const user = {name: username};

	const newAccessToken = generateAccessToken(user);
	res.status(200).json({
		accessToken: newAccessToken,
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});