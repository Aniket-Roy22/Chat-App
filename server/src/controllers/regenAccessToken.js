import { generateAccessToken } from "../utils/generateToken.js";

export function regenAccessToken(req, res)
{
	const { id, username } = req.user;
	const payload = {
		id: id,
		username: username
	};

	const newAccessToken = generateAccessToken(payload);
	res.status(200).json({
		accessToken: newAccessToken,
	});
}