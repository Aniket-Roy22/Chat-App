import express from "express";
import {authenticateAccessToken} from "../middleware/authenticateTokens.js";
import {getConversation} from "../controllers/getConversation.js";

const router = express.Router();

router.get("/user/:otherUsername", authenticateAccessToken, getConversation);

export default router;