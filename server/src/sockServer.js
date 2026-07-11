import "dotenv/config";
import express from "express";
import http from "http";
import {Server} from "socket.io";
import {registerSocket} from "./socket/index.js";

const SOCK_PORT = 8000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		// origin: "http://localhost:5173",
		credentials: true,
	},
});

registerSocket(io);

server.listen(SOCK_PORT, () => {
	console.log(`Socket server listening on port ${SOCK_PORT}`);
	
})