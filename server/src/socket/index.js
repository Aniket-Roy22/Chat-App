import {socketAuth} from "../middleware/socketAuth.js";
import {registerEvents} from "../socket/events.js";

export function registerSocket(io)
{
	io.use(socketAuth);

	io.on("connection", (socket) => {
		console.log(`${socket.user.username} connected...`);

		console.log(`Joining room: ${socket.user.id}`);
		socket.join(socket.user.id);

		registerEvents(io, socket);
	});
}