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
        this.router.get('/rents-list/:id_sucursal', employeeController_1.default.getRentList); //se obtienen las rentas de sucursales
        this.router.get('/branch/:id_sucursal', employeeController_1.default.getDetailsBranch); //obtengo datos de una sucursal
        //CONSULTAS
        this.router.post('/query1', employeeController_1.default.query1); // n1 ->Funcion agregada
        this.router.post('/query2', employeeController_1.default.query2); // n2 ->Group by
        this.router.post('/query3', employeeController_1.default.query3); // n3 ->Subconsulta
        this.router.post('/query4', employeeController_1.default.query4); // n4 ->IN
        this.router.post('/query5', employeeController_1.default.query5); // n5 ->Funcion agregada
        this.router.post('/query6', employeeController_1.default.query6); // n6 ->Group by
        this.router.post('/query7', employeeController_1.default.query7); // n7 ->Having
        this.router.post('/query8', employeeController_1.default.query8); // n8 ->Having
        this.router.get('/query9', employeeController_1.default.query9); // n9 ->Funcion agregada
        this.router.get('/query10', employeeController_1.default.query10); // n10 ->Subconsulta
        this.router.post('/query11', employeeController_1.default.query11); // n11 ->NOT IN
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
