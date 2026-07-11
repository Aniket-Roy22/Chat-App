export function registerEvents(io, socket)
{
	socket.on("private-message", (data) => {
		const payload = {
			senderId: socket.user.id,
			message: data.message,
			createdAt: Date.now(),
		};

		io.to(data.receiverId).emit("new-message", payload);
		io.to(socket.user.id).emit("new-message", payload);
	});

	socket.on("disconnect", () => {
		console.log(`${socket.user.username} disconnected...`);
	});
}