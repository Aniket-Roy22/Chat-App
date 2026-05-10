import express from "express";
import {
	authenticateAccessToken,
	authenticateRefreshToken,
} from "../middleware/authenticateTokens.js";
import {localAuth} from "../middleware/localAuth.js";
import {registerUser} from "../middleware/registerUser.js";
import {issueTokens} from "../controllers/issueTokens.js";
import {regenAccessToken} from "../controllers/regenAccessToken.js";
import {getConversation} from "../controllers/getConversation.js";

const router = express.Router();

router.get("/chat/:otherUsername", authenticateAccessToken, getConversation);
router.post("/login", localAuth, issueTokens);
router.post("/register", registerUser, issueTokens);
router.post("/token", authenticateRefreshToken, regenAccessToken);

export default router;