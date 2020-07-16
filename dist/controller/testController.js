"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../app/controller"));
class testController extends controller_1.default {
    index() {
        this.response.send('testController');
    }
}
exports.default = testController;
