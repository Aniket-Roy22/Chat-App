import bcrypt from "bcrypt";
import prisma from "../config/prisma.js"

export async function registerUser(req, res, next)
{
	const { username, password } = req.body;

	if(!username || !password)
	{
		return res.status(400).json({
			message: "MISSING_CREDENTIALS"
		});
	}

	const existingUser = await prisma.users.findUnique({
		where: {
			username: username
		}
	});

	if(existingUser)
	{
		return res.status(409).json({
			message: "USERNAME_ALREADY_EXISTS"
		});
	}

	const passwordHash = await bcrypt.hash(password, 10);
	const newUser = await prisma.users.create({
		data: {
			username: username,
			passwordhash: passwordHash
		},
		select: {
			id: true,
			username: true
		}
	});

	req.user = newUser;
	next();
}