import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import dotenv from 'dotenv';
import UserModel from '../models/user.js';
import { createHash, validatePassword } from '../utils/hashFunctions.js';

dotenv.config();

/* const initPassport = () => {
    const options = {
        usernameField: 'email',
        passReqToCallback: true
    };

    passport.use('register', new LocalStrategy(options, async (req, email, password, done) => {
        const {
          body: {
            first_name,
            last_name,
            age,
          }
        } = req
      
        if (
          !first_name ||
          !last_name ||
          !age
        ) {
          return done(new Error('Todo los campos debe venir en la solicitud.'))
        }
    
        try {
          let user = await UserModel.findOne({ email })
    
          if (user) {
            console.log('User already register.')
            return done(null, false)
          }
    
          user = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          })
          
          done(null, user)
      
        } catch (error) {
          return done(new Error('Error al obtener el usuario:', error.message))
        }
      }))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {

        try {
          const user = await UserModel.findOne({ email })
      
          if (!user) {
            return done(null, false)
          }
        
          if (!validatePassword(password, user)) {
            return done(null, false)
          }
        
          done(null, user)
        } catch (error) {
          return done(new Error('Error al obtener el usuario:', error.message))
        }
      }));

    const githubOptions = {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }; */

    const githubOptions = {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
  };

    const cookieExtractor = (req) => {
      let token = null
  
      if(req && req.cookies){
          token = req.cookies.token
      }
      return token
  }
  
  export const initPassport = () => {
      passport.use('jwt', new JWTStrategy({
          jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
          secretOrKey: process.env.JWT_SECRET
      },(payload, done) => {
          return done(null, payload)
      }))
  }

    // s

    passport.serializeUser((user, done) => {
        done(null, user._id)
      })
    
    passport.deserializeUser( async (id, done) => {
        let user = await UserModel.findById(id)
        done(null, user)
      })



export default initPassport;