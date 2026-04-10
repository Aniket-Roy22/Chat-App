import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const userList = [
	{
		username: "Ani",
		password: "2212"
	},
	{
		username: "Ash",
		password: "1908"
	}
];

passport.use(
	new LocalStrategy((username, password, done) => {
		const user = userList.find(user => user.username === username);

		if (!user) return done(null, false, { message: "User not found" });

		if(password === user.password)
		{
			return done(null, user);
		}
		else
		{
			return done(null, false, { message: "Invalid credentials" });
		}
	})
);

export default passport;