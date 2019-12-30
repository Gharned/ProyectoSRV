import {Router} from 'express';

import employeeController from "../controllers/employeeController";

class IndexRoutes{
    //ATTRIBUTE
    public router:Router= Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/rent-list',employeeController.getRentList); //cuando se haga get a esta ruta, se ejecuta este metodo
        //se debe agregar los otros metodos donde se enviara el empleado
    }
}

const indexRoutes=new IndexRoutes();
export default indexRoutes.router;