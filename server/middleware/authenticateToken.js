import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next)
{
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null)
	{
		return next(new Error("Token not found"));
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({"message": "Token cannot be verified"});
		}

		req.user = user;
		next();
	});
}