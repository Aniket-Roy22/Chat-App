import { generateAccessToken } from "../utils/generateToken.js";

export function regenAccessToken(req, res)
{
	const payload = req.user;

	const newAccessToken = generateAccessToken(payload);
	res.status(200).json({
		accessToken: newAccessToken,
	});
}