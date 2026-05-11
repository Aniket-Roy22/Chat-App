import "dotenv/config";
import express from "express";
import chatRoutes from "./routes/chatRoutes.js";

const PORT = 5000;
const app = express();

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));

app.use("/chat", chatRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});