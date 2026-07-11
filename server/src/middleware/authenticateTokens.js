import {verifyToken} from "../utils/verifyToken.js";

export function authenticateAccessToken(req, res, next)
{
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).send("ACCESS_TOKEN_NOT_FOUND");
	}

	try
	{
		req.user = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
		next();
	}
	catch
	{
		return res.status(403).send("ACCESS_TOKEN_UNVERIFIABLE");
	}
}

export function authenticateRefreshToken(req, res, next)
{
	const token = req.cookies?.refreshToken;

	if (!token) {
		return res.status(401).send("REFRESH_TOKEN_NOT_FOUND");
	}

	try
	{
		req.user = verifyToken(token, process.env.REFRESH_TOKEN_SECRET);
		next();
	}
	catch
	{
		return res.status(403).send("REFRESH_TOKEN_UNVERIFIABLE");
	}
}