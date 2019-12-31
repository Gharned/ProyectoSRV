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
            //existe[0].token="fake-jwt-token";
            res.send(existe); //REVISAR
        });
    }
    //CONTROLADOR PARA EL RENTADOR
    getRentList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rents = yield database_1.default.query('select * from Renta'); //termina cuando pueda
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
    getListEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empleados = yield database_1.default.query('select * from Empleado');
            res.send(empleados);
        });
    }
    getDetailsEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rut_empleado = req.params.id_siniestro;
            //const details=await pool.query('select * fromselect e.*,ne.primer_nom,ne.apellido_pat,ne.apellido_mat,s.email,s.hora_apertura,s.hora_cierre,ds.calle,ds.region,ds.ciudad,ds.numero from Empleado as e inner join Nombre_empleado as ne on e.rut_empleado=ne.rut_empleado inner join Sucursal as s on e.id_sucursal=s.id_sucursal inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where e.rut_empleado=?',[rut_empleado]);
            const details = yield database_1.default.query('select e.*,ne.primer_nom,ne.apellido_pat,ne.apellido_mat from Empleado as e inner join Nombre_empleado as ne on e.rut_empleado=ne.rut_empleado where e.rut_empleado=?', [rut_empleado]);
            res.send(details); //REVISAR
        });
    }
    addEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = req.body;
            yield database_1.default.query('insert into Empleado(rut_empleado,id_sucursal,email,cargo,contrasena) values(?,?,?,?,?)', [form.rut_empleado, form.id_sucursal, form.email, form.cargo, form.contrasena]);
            yield database_1.default.query('insert into Nombre_empleado(rut_empleado,primer_nom,apellido_pat,apellido_mat) values (?,?,?,?)', [form.rut_empleado, form.primer_nom, form.apellido_pat, form.apellido_mat]);
            res.send({ message: "Exito al insertar" });
        });
    }
    deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rut_empleado = req.params.rut_empleado;
            yield database_1.default.query('delete from Empleado where rut_empleado=?', [rut_empleado]);
            res.send({ message: "Exito al eliminar" });
        });
    }
    getListVehicles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiculos = yield database_1.default.query('select * from Vehiculos');
            res.send(vehiculos);
        });
    }
    getDetailsVehicles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const matricula = req.params.matricula;
            const details = yield database_1.default.query('select v.*,s.email,s.hora_apertura,s.hora_cierre,ds.calle,ds.region,ds.ciudad,ds.numero from Vehiculo as v inner join Sucursal as s on v.id_sucursal=s.id_sucursal inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where matricula=?', [matricula]);
            res.send(details);
        });
    }
    updateVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = req.body; //VER BIEN COMO IMPLEMENTAR ESTA PARTE, SI ES QUE SE ALCANZA
            for (var i in form) { //actualizacion iterativa por cada elemento ingresado en el formulario
                if (("" + i) != "matricula") {
                    yield database_1.default.query('update Vehiculo set ' + i + '=' + form[i] + ' where matricula=?', [form.matricula]);
                }
            }
            res.send({ message: "Exito al actualizar" });
        });
    }
    addVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = req.body;
            yield database_1.default.query('insert into Vehiculo values(?,?,?,?,?,?,?,?,?,0,?)', [form.matricula, form.id_sucursal, form.tipo, form.marca, form.modelo, form.color, form.anio, form.kilometraje, form.precio, form.image_url]);
            res.send({ message: "Exito al insertar" });
        });
    }
    getListBranch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sucursales = yield database_1.default.query('select s.*,ds.calle,ds.region,ds.ciudad,ds.numero from Sucursal as s inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal');
            res.send(sucursales);
        });
    }
    addBranch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = req.body;
            yield database_1.default.query('insert into Sucursal values(?,?,?,?)', [form.id_sucusal, form.email, form.hora_apertura, form.hora_cierre]);
            yield database_1.default.query('insert into Direccion_sucursal values (?,?,?,?,?)', [form.id_sucursal, form.calle, form.region, form.ciudad, form.numero]);
            res.send({ message: "Exito al insertar" });
        });
    }
    updateBranch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = req.body; //VER BIEN COMO SE VA A IMPLEMENTAR ESTA PARTE SI ES QUE SE ALCANZA
        });
    }
}
const employeeController = new EmployeeController();
exports.default = employeeController;
