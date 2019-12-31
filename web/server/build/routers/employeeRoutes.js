"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = __importDefault(require("../controllers/employeeController"));
class IndexRoutes {
    constructor() {
        //ATTRIBUTE
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/authentication', employeeController_1.default.postAuthenEmployee); //cuando se haga get a esta ruta, se ejecuta este metodo
        //se debe agregar los otros metodos donde se enviara el empleado
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
