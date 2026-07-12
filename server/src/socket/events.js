import {saveMessage} from "../controllers/saveMessage.js";

export function registerEvents(io, socket)
{
	socket.on("private-message", async ({receiverId, message}) => {

		try
		{
			const payload = await saveMessage(socket.user.id, receiverId, message);

			io.to(receiverId).emit("new-message", payload);
			io.to(socket.user.id).emit("new-message", payload);
		}
		catch (error)
		{
			console.error("private-message event error:", error);
			
			socket.emit("error-message", {
				message: "FAILED_TO_SEND_MESSAGE",
			})
		}
	});

	socket.on("disconnect", () => {
		console.log(`${socket.user.username} disconnected...`);
	});
}