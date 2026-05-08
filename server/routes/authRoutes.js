import express from "express";
import {
	authenticateAccessToken,
	authenticateRefreshToken,
} from "../middleware/authenticateTokens.js";
import {localAuth} from "../middleware/localAuth.js";
import {registerUser} from "../middleware/registerUser.js";
import {issueTokens} from "../controllers/issueTokens.js";
import {regenAccessToken} from "../controllers/regenAccessToken.js";

const router = express.Router();
const posts = [
	{
		username: "Ani",
		title: "Post 1",
	},
	{
		username: "Ash",
		title: "Post 2",
	},
];

router.get("/posts", authenticateAccessToken, (req, res) => {
	res.status(200).json(
		posts.filter((post) => post.username === req.user.username),
	);
});
router.post("/login", localAuth, issueTokens);
router.post("/register", registerUser, issueTokens);
router.post("/token", authenticateRefreshToken, regenAccessToken);

export default router;