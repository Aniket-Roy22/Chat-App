import prisma from "../config/prisma.js";

export async function saveMessage(senderId, receiverId, message)
{
	return await prisma.messages.create({
		data: {
			sender_id: senderId,
			receiver_id: receiverId,
			message_text: message,
		},
	});
}