import {Router} from 'express';

import employeeController from "../controllers/employeeController";
import e = require('express');

class IndexRoutes{
    //ATTRIBUTE
    public router:Router= Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/authentication',employeeController.postAuthenEmployee); //cuando se haga get a esta ruta, se ejecuta este metodo
        this.router.get('/rents-list/:id_sucursal',employeeController.getRentList); //se obtienen las rentas de sucursales
        this.router.get('/branch/:id_sucursal',employeeController.getDetailsBranch); //obtengo datos de una sucursal
        
        //CONSULTAS
        this.router.post('/query1',employeeController.query1); // n1 ->Funcion agregada
        this.router.post('/query2',employeeController.query2); // n2 ->Group by
        this.router.post('/query3',employeeController.query3); // n3 ->Subconsulta
        this.router.post('/query4',employeeController.query4); // n4 ->IN
        this.router.post('/query5',employeeController.query5); // n5 ->Funcion agregada
        this.router.post('/query6',employeeController.query6); // n6 ->Group by
        this.router.post('/query7',employeeController.query7); // n7 ->Having
        this.router.post('/query8',employeeController.query8); // n8 ->Having
        this.router.get('/query9',employeeController.query9); // n9 ->Funcion agregada
        this.router.get('/query10',employeeController.query10); // n10 ->Subconsulta
        this.router.post('/query11',employeeController.query11); // n11 ->NOT IN
    }
}

const indexRoutes=new IndexRoutes();
export default indexRoutes.router;