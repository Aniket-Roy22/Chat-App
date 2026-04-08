import { generateAccessToken } from "../utils/generateToken.js";

export function regenAccessToken(req, res)
{
	const username = req.user.name;
	const user = {name: username};

	const newAccessToken = generateAccessToken(user);
	res.status(200).json({
		accessToken: newAccessToken,
	});
}