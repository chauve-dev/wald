"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./route"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express_1.default();
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
route_1.default.forEach((element) => {
    switch (element.type) {
        case "get": {
            Promise.resolve().then(() => __importStar(require("./controller/" + element.controller))).then((ctrl) => {
                app.get(element.path, (req, res) => {
                    new ctrl.default(req, res);
                });
            });
            break;
        }
        case "post": {
            Promise.resolve().then(() => __importStar(require("./controller/" + element.controller))).then((ctrl) => {
                app.post(element.path, (req, res) => {
                    new ctrl.default(req, res);
                });
            });
            break;
        }
        case "put": {
            Promise.resolve().then(() => __importStar(require("./controller/" + element.controller))).then((ctrl) => {
                app.put(element.path, (req, res) => {
                    new ctrl.default(req, res);
                });
            });
            break;
        }
        case "patch": {
            Promise.resolve().then(() => __importStar(require("./controller/" + element.controller))).then((ctrl) => {
                app.patch(element.path, (req, res) => {
                    new ctrl.default(req, res);
                });
            });
            break;
        }
        case "delete": {
            Promise.resolve().then(() => __importStar(require("./controller/" + element.controller))).then((ctrl) => {
                app.delete(element.path, (req, res) => {
                    new ctrl.default(req, res);
                });
            });
            break;
        }
        default: {
            Promise.resolve().then(() => __importStar(require("./controller/" + element.controller))).then((ctrl) => {
                app.get(element.path, (req, res) => {
                    new ctrl.default(req, res);
                });
            });
            break;
        }
    }
    console.log(`Info : ${element.path} Registered`);
});
const server = app.listen(5000, () => console.log("Info : Server Running"));
