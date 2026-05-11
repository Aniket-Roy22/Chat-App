import passport from "passport";
import bcrypt from "bcrypt";
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
		  return done(null, false, { message: "USER_NOT_FOUND" });
		}
	  
		const isMatch = await bcrypt.compare(
		  password,
		  user.passwordhash
		);
	  
		if (!isMatch) {
		  return done(null, false, { message: "INVALID_PASSWORD" });
		}
	  
		return done(null, {
		  id: user.id,
		  username: user.username
		});
	  })
);

export default passport;