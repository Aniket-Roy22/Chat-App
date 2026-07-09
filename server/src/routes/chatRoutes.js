import express from "express";
import {authenticateAccessToken} from "../middleware/authenticateTokens.js";
import {getConversation} from "../controllers/getConversation.js";
import {getContacts} from "../controllers/getContacts.js";

const router = express.Router();

router.use(authenticateAccessToken);

router.get("/user/contacts", getContacts);
router.get("/user/:contactID", getConversation);

export default router;