import {Request, Response} from "express";
import pool from "../database";

class EmployeeController{


    //Controlador de login y envío de datos
    public async postAuthenEmployee(req:Request, res:Response):Promise<void>{  //autentifico y obtengo los detalles del empleado junto a su nombre
        const data=req.body; //almacena rut_empleado y contrasena
        const existe=await pool.query('select e.*,ne.primer_nom,ne.apellido_pat,ne.apellido_mat from Empleado as e inner join Nombre_empleado as ne on e.rut_empleado=ne.rut_empleado where e.rut_empleado=? and e.contrasena=?',[data.rut_empleado,data.contrasena]);
        //existe[0].token="fake-jwt-token";
        res.send(existe); //REVISAR
    }

    //CONTROLADOR PARA EL RENTADOR
    public async getRentList(req:Request, res:Response):Promise<void>{ //estoy ejecutando promesa, pero no devuelve nada
        const rents= await pool.query('select * from Renta'); //termina cuando pueda
        res.send(rents);
    }
    public async getRentDetails(req:Request, res:Response):Promise<void>{ //obtengo los detalles de la renta
        const id_renta=req.params.id_renta; //obtengo id_renta
        const rentClientVeh= await pool.query('select v.*,c.*,r.id_renta,r.estado,r.fecha_retiro,r.fecha_devolucion,nc.primer_nom,nc.apellido_pat,nc.apellido_mat from Renta as r inner join Cliente as c on r.rut_cliente=c.rut_cliente inner join Vehiculo as v on v.matricula=r.matricula inner join Nombre_cliente as nc on c.rut_cliente=nc.rut_cliente where id_renta=?',[id_renta]); //obtengo datos de renta,cliente,vehiculo
        const sucRet=await pool.query('select s.*,ds.calle,ds.region,ds.ciudad,ds.numero from Renta as r inner join Sucursal as s on r.local_devolucion=s.id_sucursal inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where r.id_renta=?',[id_renta]); //obtengo los datos de la sucursal de retiro
        const sucDev=await pool.query('select s.*,ds.calle,ds.region,ds.ciudad,ds.numero from Renta as r inner join Sucursal as s on r.local_devolucion=s.id_sucursal inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where r.id_renta=?',[id_renta]); //obtengo los datos de la sucursal de devolucion
        
        const details={rentClientVeh,sucRet,sucDev};

        res.send(details);
    }
    public async updateRentState(req:Request, res:Response):Promise<void>{ //actualizo el estado de la renta
        const form=req.body;
        await pool.query('update Renta set estado=? where id_renta=?',[form.estado,form.id_renta]);
        res.send({message:"Exito al actualizar"});
    }

    public async getSinesterList(req:Request, res:Response):Promise<void>{ //obtengo la lista de los siniestros ocurridos
        const siniestros= await pool.query('select * from Siniestro');
        res.send(siniestros);
    }
    public async updateSinesterState(req:Request, res:Response):Promise<void>{ //actualiza el estado del siniestro
        const form=req.body;
        await pool.query('update Siniestro set estado=? where id_siniestro=?',[form.estado,form.id_siniestro]);
        res.send({message:"Exito al actualizar"});
    }

    //CONTROLADOR PARA EL ADMINISTRADOR
    public async getListEmployees(req:Request, res:Response):Promise<void>{ //obtengo la lista de empleados
        const empleados=await pool.query('select * from Empleado');
        res.send(empleados);
    }
    public async getDetailsEmployee(req:Request, res:Response):Promise<void>{  //obtengo los detalles del empleado junto a su nombre y sucursal
        const rut_empleado=req.params.id_siniestro;
        //const details=await pool.query('select * fromselect e.*,ne.primer_nom,ne.apellido_pat,ne.apellido_mat,s.email,s.hora_apertura,s.hora_cierre,ds.calle,ds.region,ds.ciudad,ds.numero from Empleado as e inner join Nombre_empleado as ne on e.rut_empleado=ne.rut_empleado inner join Sucursal as s on e.id_sucursal=s.id_sucursal inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where e.rut_empleado=?',[rut_empleado]);
        const details=await pool.query('select e.*,ne.primer_nom,ne.apellido_pat,ne.apellido_mat from Empleado as e inner join Nombre_empleado as ne on e.rut_empleado=ne.rut_empleado where e.rut_empleado=?',[rut_empleado]);
        res.send(details); //REVISAR
    }
    public async addEmployee(req:Request, res:Response):Promise<void>{ //agrega un empleado
        const form=req.body;
        await pool.query('insert into Empleado(rut_empleado,id_sucursal,email,cargo,contrasena) values(?,?,?,?,?)',[form.rut_empleado,form.id_sucursal,form.email,form.cargo,form.contrasena]);
        await pool.query('insert into Nombre_empleado(rut_empleado,primer_nom,apellido_pat,apellido_mat) values (?,?,?,?)',[form.rut_empleado,form.primer_nom,form.apellido_pat,form.apellido_mat]);
        res.send({message:"Exito al insertar"});
    }
    public async deleteEmployee(req:Request, res:Response):Promise<void>{ //elimina a un empleado (cuando lo despide)
        const rut_empleado=req.params.rut_empleado;
        await pool.query('delete from Empleado where rut_empleado=?',[rut_empleado]);
        res.send({message:"Exito al eliminar"});
    }
    public async getListVehicles(req:Request, res:Response):Promise<void>{  //obtiene la lista de vehiculos
        const vehiculos=await pool.query('select * from Vehiculos');
        res.send(vehiculos);
    }
    public async getDetailsVehicles(req:Request, res:Response):Promise<void>{ //obtengo los detalles del vehiculo junto a sucursal
        const matricula=req.params.matricula;
        const details=await pool.query('select v.*,s.email,s.hora_apertura,s.hora_cierre,ds.calle,ds.region,ds.ciudad,ds.numero from Vehiculo as v inner join Sucursal as s on v.id_sucursal=s.id_sucursal inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where matricula=?',[matricula]);
        res.send(details);
    }
    public async updateVehicle(req:Request, res:Response):Promise<void>{ //actuliza datos de un vehiculo
        const form=req.body; //VER BIEN COMO IMPLEMENTAR ESTA PARTE, SI ES QUE SE ALCANZA
        for(var i in form){ //actualizacion iterativa por cada elemento ingresado en el formulario
            if((""+i)!="matricula"){
                await pool.query('update Vehiculo set '+i+'='+form[i]+' where matricula=?',[form.matricula]);
            }
        }
        res.send({message:"Exito al actualizar"});
    }
    public async addVehicle(req:Request, res:Response):Promise<void>{ //agrega un vehiculo
        const form=req.body;
        await pool.query('insert into Vehiculo values(?,?,?,?,?,?,?,?,?,0,?)',[form.matricula,form.id_sucursal,form.tipo,form.marca,form.modelo,form.color,form.anio,form.kilometraje,form.precio,form.image_url]);
        res.send({message:"Exito al insertar"});
    }
    public async getListBranch(req:Request, res:Response):Promise<void>{ //obtengo informacion de las sucursales con sus direcciones
        const sucursales=await pool.query('select s.*,ds.calle,ds.region,ds.ciudad,ds.numero from Sucursal as s inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal');
        res.send(sucursales);
    }
    public async addBranch(req:Request, res:Response):Promise<void>{ //agrega una sucursal
        const form=req.body;
        await pool.query('insert into Sucursal values(?,?,?,?)',[form.id_sucusal,form.email,form.hora_apertura,form.hora_cierre]);
        await pool.query('insert into Direccion_sucursal values (?,?,?,?,?)',[form.id_sucursal,form.calle,form.region,form.ciudad,form.numero]);
        res.send({message:"Exito al insertar"});
    }
    public async updateBranch(req:Request, res:Response):Promise<void>{ //actualiza datos de una sucursal
        const form=req.body;  //VER BIEN COMO SE VA A IMPLEMENTAR ESTA PARTE SI ES QUE SE ALCANZA

    }

    //HABRIA QUE CONSULTAR SI LA PERSONA QUE PIDIO LA PAGINA QUIERE ELIMINAR CLIENTES O RENTAS

}


const employeeController= new EmployeeController();
export default employeeController;