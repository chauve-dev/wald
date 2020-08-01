import express from "express";
import session from 'express-session';
import route from "./route";
import middleWare from "./middlewares"
import path from "path";
import cookieParser from 'cookie-parser';
var sitemap = require('express-sitemap')();
const sassMiddleware = require('node-sass-middleware');
require('dotenv').config()
import logger from 'morgan';
import SocketIO from "socket.io";


const app: any = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: process.env.INDENTED_SYNTAX||true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


//Session declaration
var sess: any = {
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  name: 'waldSession',
  cookie: {}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
var sessionMiddleware = session(sess)
//Session declaration


//Check if routes exists
if (route.length == 0){
  app.get("/", (req: express.Request, res: express.Response) => {
    res.send('Le serveur existe bien mais aucune route est renseigné il faut éditer le fichier route.ts');
  });
}

function registerMiddleware(element: any){
  app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    if(element.path == '*'){
      import("./controller/middleware/" + element.controller).then((ctrl) => {
        new ctrl.default(req, res, next);
      });
    }else{
      if(element.path.endsWith('*')){
        if((element.type.includes(req.method.toLowerCase()) || element.type.includes(req.method.toUpperCase())) && req.url.toLowerCase().startsWith(element.path.replace('/*', ''))){
          import("./controller/middleware/" + element.controller).then((ctrl) => {
              new ctrl.default(req, res, next);
          });
        }else{
          next();
        }
      }else{
        if((element.type.includes(req.method.toLowerCase()) || element.type.includes(req.method.toUpperCase())) && element.path == req.url.toLowerCase()){
          import("./controller/middleware/" + element.controller).then((ctrl) => {
              new ctrl.default(req, res, next);
          });
        }else{
          next();
        }
      }
    }
  });
}

async function registerRoute(element: any){
  var type: string = element.type.toLowerCase() || 'get';
  if(['get', 'post', 'put', 'delete'].includes(type)){
    await import("./controller/routes/" + element.controller).then((ctrl) => {
      app[type](element.path, (req: express.Request, res: express.Response) => {
        new ctrl.default(req, res);
      });
    });
    console.log(`\x1b[33m[Info] > ${element.path} Registered`,'\x1b[0m')
  }else{
    console.log(`\x1b[31m[Error] > ${element.path} not registered method ${type} do not exists`,'\x1b[0m')
  }
}

function registerErrorMiddleWare(){
  app.use(function(req: express.Request, res: express.Response, next: express.NextFunction){
    import("./controller/errorController").then((ctrl)=>{
      new ctrl.default(req, res, next);
    });
  })
}

function importMiddlewares(){
  for (let element of middleWare){
    registerMiddleware(element);
  }
  console.log('\x1b[36m[Info] > Tous les middlewares sont enregistré.','\x1b[0m');
}

async function importRoutes(){
  for(let element of route){
    await registerRoute(element);
  }
  console.log('\x1b[36m[Info] > Toutes les routes sont enregistré.','\x1b[0m');
}

function generateSiteMap(){
  sitemap.generate(app); // generate sitemap from express route, you can set generate inside sitemap({})
  sitemap.XMLtoFile(__dirname+'/public/sitemap.xml'); // write this map to file
}

function startServer(server: any) {
  server.listen(process.env.APP_PORT || 3000, () => console.log("\x1b[32m[Info] > Server Running",'\x1b[0m'));
}

async function init() {
  app.use(sessionMiddleware); //Register session middleware
  importMiddlewares(); //import all middlewares
  await importRoutes(); // import all routes synchronously
  registerErrorMiddleWare(); // register the last middleware (404)
  generateSiteMap(); // generate the site map

  var server = require("http").createServer(app); // create the http server with express app
  var io: SocketIO.Server = require("socket.io")(server); // declare socket.io server

  // register the session middleware for socket io (to get access to session in socket.io)
  io.use(function(socket: SocketIO.Socket, next: any) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  });

  // register the socket IO file (maybe this will change in future to setup socket channel controllers)
  await import('./socket').then((socket) => {
    socket.default(io)
    console.log('\x1b[36m[Info] > Socket.io listening','\x1b[0m')
  });

  // start the final server
  startServer(server);
  return io;
}
var io = init()

export default io