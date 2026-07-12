import prisma from "../config/prisma.js";

export async function addContact(req, res)
{
	const otherUsername = req.body.username?.trim();
	if(!otherUsername) return res.status(400).json({message: "USERNAME_REQUIRED"});

	const currentUserId = req.user.id;

	const otherUser = await prisma.users.findUnique({
		where: {
			username: otherUsername,
		},
		select: {
			id: true,
		},
	});
	if(!otherUser) return res.status(404).json({message: "USER_NOT_FOUND"});
	const otherUserId = otherUser.id;

	if(otherUserId === currentUserId) return res.status(400).json({message: "SELF_ADDITION_RESTRICTED"});

	const existing = await prisma.contacts.findUnique({
		where: {
			user_id_contact_id: {
				user_id: currentUserId,
				contact_id: otherUserId,
			},
		},
	});
	if(existing) return res.status(409).json({message: "CONTACT_ALREADY_EXISTS"});

	await prisma.$transaction([
		prisma.contacts.create({
			data: {
				user_id: currentUserId,
				contact_id: otherUserId,
			},
		}),

		prisma.contacts.create({
			data: {
				user_id: otherUserId,
				contact_id: currentUserId,
			},
		})
	]);
	res.status(201).json({
		id: otherUserId,
		username: otherUsername,
	});
}