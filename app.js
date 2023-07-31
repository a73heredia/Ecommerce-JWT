import express, { urlencoded } from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo';
import routerProducts from './routers/indexProducts.js';
import routerCarts from './routers/indexCarts.js';
//import routerSessions from './routers/indexSessions.js';
import apiRouter from './routers/api/index.js'
import viewRouter from './routers/views/index.js'
import hbs from 'hbs';
import path from 'path';
import { fileURLToPath } from 'url';
import { init } from './db/mongodb.js';
import initPassport from './config/passport.config.js';
import dotenv from 'dotenv';
import { addLogger } from './utils/logger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


await init();
dotenv.config();
const app = express();

app.use(cors())

hbs.registerHelper('isDisabled', function (value, opts) {
    return !value ? opts.fn(this) : opts.inverse(this)
  })
  
  // app.use(express.json())
  // app.use(express.urlencoded({ extended: true }))
  app.use('/static', express.static(path.join(__dirname, 'public')))
  
  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, 'views'))
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(express.static('public'))
  app.use(cookieParser())
  app.use(expressSession({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        mongoOptions: {},
        ttl: 20000
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
}));

 initPassport()
 app.use(passport.initialize())

//  app.use(passport.initialize());
//  app.use(passport.session());


 /* app.use('/', routerProducts);
 app.use('/', routerCarts); */
 const swaggerOptions = {
  definition : {
      openapi: '3.0.1',
      info: {
          title: 'Ecommerce',
          description: 'Ecomemerce Api'
      },
  },
  apis:[path.join(__dirname,'.', 'docs','**','*.yaml')],
};

const specs = swaggerJSDoc(swaggerOptions)
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
 app.use('/api', apiRouter)
 app.use('/', viewRouter)

 //app.use('/', routerSessions);
app.use(addLogger)
 app.use((err, req, res, next) => {
  /* console.log(err) */
  res 
    .status(err.statusCode || 500)
    .json({success: false, message: err.message})
}) 

console.log(path.join(__dirname,'.', 'docs','**','*.yaml'));

 export default app;