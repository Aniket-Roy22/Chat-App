import {
	generateAccessToken,
	generateRefreshToken,
} from "../utils/generateToken.js";

export function userLogin(req, res)
{
	const username = req.body.username;
		const user = { name: username };
	
		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);
	
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			path: "/auth",
			sameSite: "lax",
			maxAge: 1 * 60 * 1000
		});
		res.status(200).json({
			accessToken: accessToken
		});
}