import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils/hasPassword.js";
import google from "passport-google-oauth20"
import jwt from "passport-jwt";
import envs from "./env.config.js"
import UserRepository from "../persistences/mongo/repositories/user.repository.js";
import CartsRepository from "../persistences/mongo/repositories/carts.repository.js";


const localStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies.token;
    }

    return token;
};

const initializePassport = () => {
    passport.use(
        "register",
        new localStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                try {

                    const { first_name, last_name, email, age, role } = req.body;
                    const user = await UserRepository.getByEmail(username);
                    if (user) return done(null, false, { message: "El usuario ya existe" });

                    const cart = await CartsRepository.create();

                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        role,
                        cart: cart._id
                    }
                    const createUser = await UserRepository.create(newUser);
                    return done(null, createUser)

                } catch (error) {
                    return done(error)
                }
            }
        ));

    passport.use(
        "login",
        new localStrategy({ usernameField: "email" }, async (username, password, done) => {
            try {
                const user = await UserRepository.getByEmail(username);
                if (!user || !isValidPassword(user, password)) return done(null, false, { message: "Email o Password inválidos" });

                // Si están bien los datos del usuario
                return done(null, user);
            } catch (error) {
                done(error);
            }
        })
    );

    passport.use(
        "google",
        new GoogleStrategy({
            clientID: envs.GOOGLE_CLIENT_ID,
            clientSecret: envs.GOOGLE_CLIENT_SECRET, 
            callbackURL: "http://localhost:8088/api/session/login"

        },
            async (accesToken, refreshToken, profile, cb) => {
                try {
                    const { name, emails } = profile;
                    const user = {
                        first_name: name.givenName,
                        last_name: name.familyName,
                        email: emails[0].value
                    };

                    const existUser = await userDao.getByEmail(emails[0].value);
                    if (existUser) return cd(null, existUser);

                    const newUser = await userDao.create(user);
                    cb(null, newUser)

                } catch (error) {
                    return cb(error)
                }

            }
        )
    )


    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: envs.CODE_SECRET
    },
        async (jwt_payload, done) => {
            try {

                return done(null, jwt_payload);

            } catch (error) {
                return done(error)
            }
        }
    ))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UserRepository.getById(id);
        done(null, user);
    })
};

export default initializePassport