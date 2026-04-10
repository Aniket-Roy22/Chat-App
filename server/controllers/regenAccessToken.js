import { generateAccessToken } from "../utils/generateToken.js";

export function regenAccessToken(req, res)
{
	const user = req.user;
	const payload = { username: user.username };

	const newAccessToken = generateAccessToken(payload);
	res.status(200).json({
		accessToken: newAccessToken,
	});
}