"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class EmployeeController {
    //Controlador de login y envío de datos
    postAuthenEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body; //almacena rut_empleado y contrasena
            const existe = yield database_1.default.query('select e.*,ne.primer_nom,ne.apellido_pat,ne.apellido_mat from Empleado as e inner join Nombre_empleado as ne on e.rut_empleado=ne.rut_empleado where e.rut_empleado=? and e.contrasena=?', [data.rut_empleado, data.contrasena]);
            if (existe.length > 0) {
                existe[0].token = "fake-jwt-token"; //token - se vera para que nos servira
                res.send(existe); //existe el usuario
            }
            else {
                res.send(Error); //no existe el usuario
            }
        });
    }
    //CONTROLADOR PARA EL RENTADOR
    //RENTS
    getRentList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_sucursal = req.params.id_sucursal; //sucursal del empleado
            const rents = yield database_1.default.query('select * from Renta where local_retiro=? or local_devolucion=?;', [id_sucursal, id_sucursal]);
            res.send(rents);
        });
    }
    getRentDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_renta = req.params.id_renta; //obtengo id_renta
            const rentClientVeh = yield database_1.default.query('select v.*,c.*,r.id_renta,r.estado,r.fecha_retiro,r.fecha_devolucion,nc.primer_nom,nc.apellido_pat,nc.apellido_mat from Renta as r inner join Cliente as c on r.rut_cliente=c.rut_cliente inner join Vehiculo as v on v.matricula=r.matricula inner join Nombre_cliente as nc on c.rut_cliente=nc.rut_cliente where id_renta=?', [id_renta]); //obtengo datos de renta,cliente,vehiculo
            const sucRet = yield database_1.default.query('select s.*,ds.calle,ds.region,ds.ciudad,ds.numero from Renta as r inner join Sucursal as s on r.local_devolucion=s.id_sucursal inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where r.id_renta=?', [id_renta]); //obtengo los datos de la sucursal de retiro
            const sucDev = yield database_1.default.query('select s.*,ds.calle,ds.region,ds.ciudad,ds.numero from Renta as r inner join Sucursal as s on r.local_devolucion=s.id_sucursal inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where r.id_renta=?', [id_renta]); //obtengo los datos de la sucursal de devolucion
            const details = { rentClientVeh, sucRet, sucDev };
            res.send(details);
        });
    }
    updateRentState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = req.body;
            yield database_1.default.query('update Renta set estado=? where id_renta=?', [form.estado, form.id_renta]);
            res.send({ message: "Exito al actualizar" });
        });
    }
    //SINESTER
    getSinesterList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const siniestros = yield database_1.default.query('select * from Siniestro');
            res.send(siniestros);
        });
    }
    updateSinesterState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = req.body;
            yield database_1.default.query('update Siniestro set estado=? where id_siniestro=?', [form.estado, form.id_siniestro]);
            res.send({ message: "Exito al actualizar" });
        });
    }
    //CONTROLADOR PARA EL ADMINISTRADOR
    /*
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
    getListVehicles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiculos = yield database_1.default.query('select * from Vehiculos');
            res.send(vehiculos);
        });
    }
    getDetailsVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const matricula = req.params.matricula;
            const details = yield database_1.default.query('select * from Vehiculo as v where matricula=?', [matricula]);
            res.send(details);
        });
    }
    /*
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
    getDetailsBranch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_sucursal = req.params.id_sucursal; //sucursal del empleado
            const datosSucursal = yield database_1.default.query('select s.id_sucursal,email,hora_apertura,hora_cierre,calle,region,ciudad,numero from Sucursal as s inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where s.id_sucursal=?', [id_sucursal]);
            res.send(datosSucursal);
        });
    }
    /*
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
    query1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const year = data.fecha.substring(0, 4);
            const month = data.fecha.substring(5, 7);
            const result = yield database_1.default.query('select sum(v.precio) as ganacia_del_mes from Renta as r inner join Vehiculo as v on r.matricula=v.matricula where r.estado="Finalizada" and month(fecha_retiro)=? and year(fecha_retiro)=?', [month, year]);
            if (result[0].ganacia_del_mes == null) { //si no hay ganancia en ese mes, envio 0
                result[0].ganacia_del_mes = 0;
                res.send(result);
            }
            else {
                res.send(result);
            }
        });
    }
    query2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield database_1.default.query('select e.id_sucursal, count(e.rut_empleado) as num_empleados from (select rut_empleado, id_sucursal from Empleado where cargo="Rentador" and id_sucursal="?") as e group by e.id_sucursal', [data.id_sucursal]);
            res.send(result);
        });
    }
    query3(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield database_1.default.query('select * from (select r.rut_cliente, timestampdiff(month, r.fecha_retiro, r.fecha_devolucion ) as meses_rentado from Renta as r inner join Vehiculo as v on r.matricula=v.matricula where v.precio>?) as sub where sub.meses_rentado>?', [data.precio, data.meses]);
            res.send(result);
        });
    }
    query4(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield database_1.default.query('select c.rut_cliente,nc.primer_nom, timestampdiff(YEAR,c.fecha_nac,CURDATE()) as edad from Renta as r inner join Cliente as c on r.rut_cliente=c.rut_cliente inner join Nombre_cliente as nc on c.rut_cliente=nc.rut_cliente where r.matricula in (select matricula from Siniestro where fecha_siniestro between (?) and (?))', [data.fecha_inicio, data.fecha_final]);
            res.send(result);
        });
    }
    query5(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield database_1.default.query('select r.rut_cliente, count(r.rut_cliente) as veces_renta from Renta as r group by r.rut_cliente having (veces_renta)>?', [data.veces]);
            res.send(result);
        });
    }
    query6(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield database_1.default.query('select v.color, v.tipo from Vehiculo as v inner join Renta as r on v.matricula=r.matricula inner join ( select sub_1.rut_cliente, veces_renta from (select r.rut_cliente, count(r.rut_cliente) as veces_renta from Renta as r group by r.rut_cliente) as sub_1 inner join (select subf.rut_cliente, subf.edad from (select rut_cliente, timestampdiff(YEAR,fecha_nac,CURDATE()) as edad from Cliente) as subf where subf.edad>?) as edad_elegida on sub_1.rut_cliente=edad_elegida.rut_cliente  where sub_1.veces_renta=(select max(sub_2.veces_renta) as max_rentado from (select count(r.rut_cliente) as veces_renta from Renta as r inner join (select rut_cliente from Cliente where timestampdiff(YEAR,fecha_nac,CURDATE())>? ) as c on c.rut_cliente=r.rut_cliente group by r.rut_cliente) as sub_2) ) as mega_sub  on r.rut_cliente=mega_sub.rut_cliente', [data.edad, data.edad]);
            res.send(result);
        });
    }
    query7(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield database_1.default.query('select tipo from Siniestro as s inner join Vehiculo as v on s.matricula=v.matricula group by v.tipo having count(v.matricula)=(select max(sub_1.vehiculos) from (select count(v.matricula) as vehiculos from (select * from Siniestro where fecha_siniestro=?) as s inner join Vehiculo as v on s.matricula=v.matricula group by v.tipo) as sub_1)', [data.fecha]);
            res.send(result);
        });
    }
    query8(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield database_1.default.query('select v.id_sucursal, count(v.matricula) as cantidad_marca from (select * from Vehiculo where marca="Toyota") as v group by v.id_sucursal having cantidad_marca=(select max(sub_1.cantidad_marca) from (select count(v.matricula) as cantidad_marca from (select * from Vehiculo where marca=?) as v group by v.id_sucursal) as sub_1)', [data.marca]);
            res.send(result);
        });
    }
    query9(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('select ds.ciudad, ds.region, count(v.id_sucursal) as vehiculos_rentados from Renta as r inner join Vehiculo as v on r.matricula=v.matricula inner join Sucursal as s on v.id_sucursal=s.id_sucursal inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal group by v.id_sucursal having vehiculos_rentados=(select max(sub_1.suc_vehiculo) from (select count(v.id_sucursal) as suc_vehiculo from Renta as r inner join Vehiculo as v on r.matricula=v.matricula group by v.id_sucursal) as sub_1)');
            res.send(result);
        });
    }
    query10(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('select tipo, modelo, marca, precio, promedio_precio from (select tipo, modelo, marca, precio, (select avg(precio) from Vehiculo) as promedio_precio, abs(precio - (select avg(precio) from Vehiculo)) as cercano from Vehiculo) as sub_2 where sub_2.cercano=(select min(sub_1.cercano) as mas_cercano from (select abs(precio - (select avg(precio) from Vehiculo)) as cercano from Vehiculo) as sub_1)');
            res.send(result);
        });
    }
    query11(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield database_1.default.query('select marca from Vehiculo where id_sucursal=? and marca not in ( select marca from Vehiculo where id_sucursal=?)', [data.sucursal_N, data.sucursal_R]);
            res.send(result);
        });
    }
}
const employeeController = new EmployeeController();
exports.default = employeeController;
