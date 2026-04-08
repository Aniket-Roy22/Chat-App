import express from "express";
import {
	authenticateAccessToken,
	authenticateRefreshToken,
} from "../middleware/authenticateTokens.js";
import { userLogin } from "../controllers/loginUser.js";
import { regenAccessToken } from "../controllers/regenAccessToken.js";

const router = express.Router();
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

router.get("/posts", authenticateAccessToken, (req, res) => {
	res.status(200).json(
		posts.filter((post) => post.username === req.user.name),
	);
});

router.post("/login", userLogin);

router.post("/token", authenticateRefreshToken, regenAccessToken);

export default router;