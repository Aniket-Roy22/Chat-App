import {verifyToken} from "../utils/verifyToken.js";

export function socketAuth(socket, next)
{
	try {
		let token = socket.handshake.auth?.token;

		if (!token) {
			const authHeader = socket.handshake.headers.authorization;

			if (authHeader?.startsWith("Bearer ")) {
				token = authHeader.substring(7);
			}
		}

		if (!token) {
			return next(new Error("ACCESS_TOKEN_NOT_FOUND"));
		}

		socket.user = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);

		next();
	} catch {
		next(new Error("ACCESS_TOKEN_UNVERIFIABLE"));
	}
}