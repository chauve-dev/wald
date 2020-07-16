"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class controller {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.index();
    }
    index() {
        this.response.send('La route fonctionne mais nécessite la methode index() pour fonctionner');
    }
}
exports.default = controller;
