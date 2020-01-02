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
        this.router.post('/query1',employeeController.query1); // n1
        this.router.post('/query2',employeeController.query2); // n2
        this.router.post('/query3',employeeController.query3); // n3
        this.router.post('/query4',employeeController.query4); // n4
        this.router.post('/query5',employeeController.query5); // n5
        this.router.post('/query6',employeeController.query5); // n6
        this.router.post('/query7',employeeController.query5); // n7
        this.router.post('/query8',employeeController.query5); // n8
        this.router.get('/query9',employeeController.query5); // n9
        this.router.get('/query10',employeeController.query5); // n10
        this.router.post('/query11',employeeController.query5); // n11
        
    }
}

const indexRoutes=new IndexRoutes();
export default indexRoutes.router;