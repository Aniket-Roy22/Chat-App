import passport from "passport";
import prisma from "./prisma.js"
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
	new LocalStrategy(async (username, password, done) => {
		const user = await prisma.users.findUnique({
			where: {
				username: username
			},
			select: {
				id: true,
				username: true,
				passwordhash: true
			}
		});
		
		if (!user) {
		  return done(null, false, { message: "User not found" });
		}
	  
		// const isMatch = await bcrypt.compare(
		//   password,
		//   user.password_hash
		// );
	  
		if (user.passwordhash != password) {
		  return done(null, false, { message: "Invalid credentials" });
		}
	  
		return done(null, {
		  id: user.id,
		  username: user.username
		});
	  })
);

export default passport;