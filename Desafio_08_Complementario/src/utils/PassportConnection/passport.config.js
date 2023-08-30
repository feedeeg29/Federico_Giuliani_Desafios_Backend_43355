import passport from "passport";
import { clientID, clientSecret, clientGitURL, persistence } from '../dotenv/dotenv.config.js'

// import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userManager from "../../DAOs/mongo/manager/manager.user.mongo.js";
import { createHash, isValidPassword } from "../utils.js";

// const localStrategy = local.Strategy;

const initializePassport = () => {
    if (persistence == 'mongo') {
        passport.use(
            "github",
            new GitHubStrategy(
                {
                    clientID: clientID,
                    clientSecret: clientSecret,
                    callbackURL: clientGitURL,
                },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        const user = await userManager.getUserByEmail(profile._json.email);
                        console.log(profile)
                        if (user) { console.log(user) } else { console.log("no hay usuario") }
                        if (!user) {
                            const newUser = {
                                first_name: profile._json.name.split(" ")[0],
                                last_name: profile._json.name.split(" ")[2],
                                email: profile._json.email,
                                password: createHash(password)
                            };
                            const result = await userManager.createUser(newUser);
                            return done(null, result);
                        } else {
                            return done(null, user);
                        }
                    } catch (error) {
                        return done("Error al obtener el usuario" + error);
                    }
                }
            )
        );

        passport.serializeUser((user, done) => {
            done(null, user._id);
        });

        passport.deserializeUser(async (id, done) => {
            const user = await userManager.getUserById(id);
            done(null, user);
        });
    } else { console.log("no hay session") }
}

export default initializePassport;
