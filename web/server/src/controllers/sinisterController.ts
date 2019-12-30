
import {Request, Response} from "express";
import pool from "../database";

class SinisterController{

    public showSinister(req:Request, res:Response){ //visualiza la pagina siniestro
        res.send("Estoy en la vista siniestro");
    }

    public async getMatriculaVehiculo(req:Request, res:Response){ //obtengo las matriculas de los vehiculos para comprobar si es que existe
        const matriculas=await pool.query('select matricula from Vehiculo');
        res.send(matriculas);
    }

    public async sendSiniestro(req:Request, res:Response){  //envia el formulario rellenado
        var formulario=req.body;
        const result=await pool.query('insert into Siniestro (matricula,fecha_siniestro,descripcion,nombre_respon,email,estado) values (?,?,?,?,?,"En Espera")',[formulario.matricula,formulario.fecha_siniestro,formulario.descripcion,formulario.nombre_respon,formulario.email]);
        res.send(result);
    }
}


const sinisterController= new SinisterController();
export default sinisterController;