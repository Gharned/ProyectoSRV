-Para correr el codigo los primeros pasos de debe hacer, son los siguientes:
1.- Debe cambiar la password del archivo typescript de configuracion para la conexion a la base de datos a su password. El archivo se encuentra en la carpeta web/server/src/keys.ts.

2.- Debe instalar todas las dependencias tanto del Backend como del Frontend.
-Para el Backend debe ir a la ruta web/server de la terminal, desde alli ejecutar el comando: npm install package.json
-Para el Frontend debe ir a la ruta web/client de la terminal, desde alli ejecutar el comando: npm install package.json

3.- Compilar los archivos typescript a javascript y hacer correr el servidor del Backend 
-Para compilar los archivos typescript debe estar en la ruta web/server en la terminal, desde alli ejecutar el comando: npm run build
-Para correr el servidor Backend debe estar en la ruta web/server en la terminal, desde alli ejecutar el comando: npm run dev

4.- Correr el servidor del Frontend para visulizar las vistas de angular
-Para correr el servidor Frontend debe estar en la ruta web/client en la terminal, desde alli ejecutar el comando: ng serve

5.- Para finalizar ir al browser y colocar en el URL: localhost:4200, que es el puerto por defecto en el cual se ejecutar angular
 

