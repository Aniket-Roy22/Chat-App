import jwt from "jsonwebtoken";

export function verifyToken(token, secret)
{
	return jwt.verify(token, secret);
}