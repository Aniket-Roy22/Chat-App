import prisma from "../config/prisma.js";

export async function getConversation(req, res)
{
	try
	{
		const currentUserId = req.user.id;
		const {contactID} = req.params;
		const otherUser = await prisma.users.findUnique({
			where: {
				id: contactID,
			}
		});
		
		if (!otherUser) {
			return res.status(404).json({
				message: "USER_NOT_FOUND",
			});
		}

		const messages = await prisma.messages.findMany({
			where: {
				OR: [
					{
						sender_id: currentUserId,
						receiver_id: contactID,
					},
					{
						sender_id: contactID,
						receiver_id: currentUserId,
					},
				],
			},
			select: {
				sender_id: true,
				receiver_id: true,
				message_text: true,
				created_at: true,
			},
			orderBy: {
				created_at: "asc",
			},
		});

		return res.status(200).json({
			success: true,
			data: messages,
		});
	}
	catch (error)
	{
		console.error("getConversations error: ", error);
		
		return res.status(500).json({
			success: false,
			message: "INTERNAL_SERVER_ERROR",
		});
	}
}