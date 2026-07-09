import prisma from "../config/prisma.js";

export async function getContacts(req, res)
{
	const currentUserId = req.user?.id;

	try
	{
		const contacts = await prisma.contacts.findMany({
			where: {
				user_id: currentUserId,
			},
			select: {
				users_contacts_contact_idTousers: {
					select: {
						id: true,
						username: true,
					},
				},
			},
		});

		const users = contacts.map((c) => c.users_contacts_contact_idTousers);

		return res.status(200).json({
			success: true,
			data: users,
		});
	}
	catch (error)
	{
		console.error("getContacts error: ", error);

		return res.status(500).json({
			success: false,
			message: "INTERNAL_SERVER_ERROR",
		});
	}
}