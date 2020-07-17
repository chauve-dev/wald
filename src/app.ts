import express from "express";
import * as socketio from "socket.io";
import route from "./route";
import path from "path";
import cookieParser from 'cookie-parser';
import logger from 'morgan';


const app: express.Application = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (route.length == 0){
  app.get("/", (req, res) => {
    res.send('Le serveur existe bien mais aucune route est renseigné il faut éditer le fichier route.ts')
  });
}

route.forEach((element: any) => {
  switch (element.type) {
    case "get": {
      import("./controller/" + element.controller).then((ctrl) => {
        app.get(element.path, (req, res) => {
          new ctrl.default(req, res);
        });
      });
      break;
    }
    case "post": {
      import("./controller/" + element.controller).then((ctrl) => {
        app.post(element.path, (req, res) => {
          new ctrl.default(req, res);
        });
      });
      break;
    }
    case "put": {
      import("./controller/" + element.controller).then((ctrl) => {
        app.put(element.path, (req, res) => {
          new ctrl.default(req, res);
        });
      });
      break;
    }
    case "patch": {
      import("./controller/" + element.controller).then((ctrl) => {
        app.patch(element.path, (req, res) => {
          new ctrl.default(req, res);
        });
      });
      break;
    }
    case "delete": {
      import("./controller/" + element.controller).then((ctrl) => {
        app.delete(element.path, (req, res) => {
          new ctrl.default(req, res);
        });
      });
      break;
    }
    default: {
      import("./controller/" + element.controller).then((ctrl) => {
        app.get(element.path, (req, res) => {
          new ctrl.default(req, res);
        });
      });
      break;
    }
  }
  console.log(`Info : ${element.path} Registered`)
});

let server = require("http").createServer(app);

var io = require("socket.io")(server);

import('./socket').then((socket) => {
  socket.default(io)
  console.log('Info : Socket.io listening')
});

server.listen(5000, () => console.log("Info : Server Running"));