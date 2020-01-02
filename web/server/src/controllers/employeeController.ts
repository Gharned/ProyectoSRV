import {Request, Response} from "express";
import pool from "../database";

class EmployeeController{

    //Controlador de login y envío de datos
    public async postAuthenEmployee(req:Request, res:Response):Promise<void>{  //autentifico y obtengo los detalles del empleado junto a su nombre
        const data=req.body; //almacena rut_empleado y contrasena
        const existe=await pool.query('select e.*,ne.primer_nom,ne.apellido_pat,ne.apellido_mat from Empleado as e inner join Nombre_empleado as ne on e.rut_empleado=ne.rut_empleado where e.rut_empleado=? and e.contrasena=?',[data.rut_empleado,data.contrasena]);
        if(existe.length>0){
            existe[0].token="fake-jwt-token"; //token - se vera para que nos servira
            res.send(existe); //existe el usuario
        }else{
            res.send(Error); //no existe el usuario
        }
    }




    //CONTROLADOR PARA EL RENTADOR
    //RENTS
    public async getRentList(req:Request, res:Response):Promise<void>{ //obtengo rentas de retiro y devolucion en la suc del empleado
        const id_sucursal=req.params.id_sucursal; //sucursal del empleado
        const rents= await pool.query('select * from Renta where local_retiro=? or local_devolucion=?;',[id_sucursal,id_sucursal]);
        res.send(rents);
    }
    public async getClient(req:Request, res:Response):Promise<void>{
        res.send(); //hacer metodo para enviar cliente, vehiculos
    }

    
    public async updateRentState(req:Request, res:Response):Promise<void>{ //actualizo el estado de la renta
        const form=req.body;
        await pool.query('update Renta set estado=? where id_renta=?',[form.estado,form.id_renta]);
        res.send({message:"Exito al actualizar"});
    }
    //SINESTER
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
    /*FUTURA IMPLEMENTACION
    public async getListEmployees(req:Request, res:Response):Promise<void>{ //obtengo la lista de empleados
        const empleados=await pool.query('select * from Empleado');
        res.send(empleados);
    }
    public async getDetailsEmployee(req:Request, res:Response):Promise<void>{  //obtengo los detalles del empleado junto a su nombre y sucursal
        const rut_empleado=req.params.id_siniestro;
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
    }*/
    //VEHICLES
    public async getListVehicles(req:Request, res:Response):Promise<void>{  //obtiene la lista de vehiculos
        const vehiculos=await pool.query('select * from Vehiculos');
        res.send(vehiculos);
    }
    public async getDetailsVehicle(req:Request, res:Response):Promise<void>{ //obtengo los detalles del vehiculo junto a sucursal
        const matricula=req.params.matricula;
        const details=await pool.query('select * from Vehiculo as v where matricula=?',[matricula]);
        res.send(details);
    }
    /* FUTURA IMPLEMENTACION
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
    }*/

    //SUCURSALES
    public async getDetailsBranch(req:Request, res:Response):Promise<void>{ //obtengo datos de la sucursal del parametro
        const id_sucursal=req.params.id_sucursal; //sucursal del empleado
        const datosSucursal= await pool.query('select s.id_sucursal,email,hora_apertura,hora_cierre,calle,region,ciudad,numero from Sucursal as s inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where s.id_sucursal=?',[id_sucursal]);
        res.send(datosSucursal);
    }

    /*FURUTA IMPLEMENTACION
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

    }*/






    //CONSULTAS DE ADMINISTRADOR
    public async query1(req:Request, res:Response):Promise<void>{ //POST: Se obtiene las ganancias financieras de algun mes
        const data=req.body;
        const year=data.fecha.substring(0,4);
        const month=data.fecha.substring(5,7);
        const result=await pool.query('select sum(v.precio) as ganacia_del_mes from Renta as r inner join Vehiculo as v on r.matricula=v.matricula where r.estado="Finalizada" and month(fecha_retiro)=? and year(fecha_retiro)=?',[month,year]);
        if(result[0].ganacia_del_mes==null){ //si no hay ganancia en ese mes, envio 0
            result[0].ganacia_del_mes=0;
            res.send(result);
        }else{
            res.send(result);
        }
    }
    public async query2(req:Request, res:Response):Promise<void>{ //POST: Numero de empleados con cargo rentador en una sucursal X
        const data=req.body;
        const result=await pool.query('select e.id_sucursal, count(e.rut_empleado) as num_empleados from (select rut_empleado, id_sucursal from Empleado where cargo="Rentador" and id_sucursal="?") as e group by e.id_sucursal',[data.id_sucursal]);
        res.send(result);
    }
    public async query3(req:Request, res:Response):Promise<void>{ //POST: Mostrar los clientes que hayan rentado un auto por mas de X meses y hayan sido autos de un precio mayor a Y por dia
        const data=req.body;
        const result= await pool.query('select * from (select r.rut_cliente, timestampdiff(month, r.fecha_retiro, r.fecha_devolucion ) as meses_rentado from Renta as r inner join Vehiculo as v on r.matricula=v.matricula where v.precio>?) as sub where sub.meses_rentado>?',[data.precio,data.meses]);
        res.send(result);
    }
    public async query4(req:Request, res:Response):Promise<void>{ //POST
        const data=req.body;
        const result= await pool.query('select c.rut_cliente,nc.primer_nom, timestampdiff(YEAR,c.fecha_nac,CURDATE()) as edad from Renta as r inner join Cliente as c on r.rut_cliente=c.rut_cliente inner join Nombre_cliente as nc on c.rut_cliente=nc.rut_cliente where r.matricula in (select matricula from Siniestro where fecha_siniestro between (?) and (?))',[data.fecha_inicio,data.fecha_final]);
        res.send(result);
    }
    public async query5(req:Request, res:Response):Promise<void>{ //POST
        const data=req.body;
        const result= await pool.query('select r.rut_cliente, count(r.rut_cliente) as veces_renta from Renta as r group by r.rut_cliente having (veces_renta)>?',[data.veces]);
        res.send(result);
    }
    public async query6(req:Request, res:Response):Promise<void>{ //POST
        const data=req.body;
        const result= await pool.query('select v.color, v.tipo from Vehiculo as v inner join Renta as r on v.matricula=r.matricula inner join ( select sub_1.rut_cliente, veces_renta from (select r.rut_cliente, count(r.rut_cliente) as veces_renta from Renta as r group by r.rut_cliente) as sub_1 inner join (select subf.rut_cliente, subf.edad from (select rut_cliente, timestampdiff(YEAR,fecha_nac,CURDATE()) as edad from Cliente) as subf where subf.edad>?) as edad_elegida on sub_1.rut_cliente=edad_elegida.rut_cliente  where sub_1.veces_renta=(select max(sub_2.veces_renta) as max_rentado from (select count(r.rut_cliente) as veces_renta from Renta as r inner join (select rut_cliente from Cliente where timestampdiff(YEAR,fecha_nac,CURDATE())>? ) as c on c.rut_cliente=r.rut_cliente group by r.rut_cliente) as sub_2) ) as mega_sub  on r.rut_cliente=mega_sub.rut_cliente',[data.edad,data.edad]);
        res.send(result);
    }
    public async query7(req:Request, res:Response):Promise<void>{ //POST 
        const data=req.body;
        const result= await pool.query('select tipo from Siniestro as s inner join Vehiculo as v on s.matricula=v.matricula group by v.tipo having count(v.matricula)=(select max(sub_1.vehiculos) from (select count(v.matricula) as vehiculos from (select * from Siniestro where fecha_siniestro=?) as s inner join Vehiculo as v on s.matricula=v.matricula group by v.tipo) as sub_1)',[data.fecha]);
        res.send(result);
    }
    public async query8(req:Request, res:Response):Promise<void>{ //POST
        const data=req.body;
        const result= await pool.query('select ds.ciudad, count(v.matricula) as cantidad_marca from (select * from Vehiculo where marca=?) as v inner join Direccion_sucursal as ds on v.id_sucursal=ds.id_sucursal group by v.id_sucursal having cantidad_marca=(select max(sub_1.cantidad_marca) from (select count(v.matricula) as cantidad_marca from (select * from Vehiculo where marca=?) as v group by v.id_sucursal) as sub_1);',[data.marca,data.marca]);
        res.send(result);
    }
    public async query9(req:Request, res:Response):Promise<void>{ //GET
        const result= await pool.query('select ds.ciudad, ds.region, count(v.id_sucursal) as vehiculos_rentados from Renta as r inner join Vehiculo as v on r.matricula=v.matricula inner join Sucursal as s on v.id_sucursal=s.id_sucursal inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal group by v.id_sucursal having vehiculos_rentados=(select max(sub_1.suc_vehiculo) from (select count(v.id_sucursal) as suc_vehiculo from Renta as r inner join Vehiculo as v on r.matricula=v.matricula group by v.id_sucursal) as sub_1)');
        res.send(result);
    }
    public async query10(req:Request, res:Response):Promise<void>{ //GET
        const result= await pool.query('select tipo, modelo, marca, precio, promedio_precio from (select tipo, modelo, marca, precio, (select avg(precio) from Vehiculo) as promedio_precio, abs(precio - (select avg(precio) from Vehiculo)) as cercano from Vehiculo) as sub_2 where sub_2.cercano=(select min(sub_1.cercano) as mas_cercano from (select abs(precio - (select avg(precio) from Vehiculo)) as cercano from Vehiculo) as sub_1)');
        res.send(result);
    }
    public async query11(req:Request, res:Response):Promise<void>{ //POST
        const data=req.body;
        const result= await pool.query('select marca from Vehiculo where id_sucursal=? and marca not in ( select marca from Vehiculo where id_sucursal=?)',[data.sucursal_N,data.sucursal_R]);
        res.send(result);
    }
    

    //HABRIA QUE CONSULTAR SI LA PERSONA QUE PIDIO LA PAGINA QUIERE ELIMINAR CLIENTES O RENTAS
}


const employeeController= new EmployeeController();
export default employeeController;