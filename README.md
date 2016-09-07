# express-databases-oh-un-grupo-js
Persistencia y Bases de Datos en Express

A la ora de  crear una aplicaci�n web, una de las piezas m�s importantes de esta son los datos que se manejar�ny como se pretender� poseer un registro de ellos.
Existen m�ltiples t�cnicas para guardar datos en una aplicaci�n, desde guardarlos en memoria si no nos interesa que sean vol�tiles, simples entradas en un archivo de textos, informaci�n separada y ordenada tambi�n en diferentes archivos y directorios, o quiz� la t�cnica m�s utilizada en los �ltimos tiempos. Las bases de datos.

Bien se sabe que las bases de datos, unas m�s complejas que otras, cada una con un enfoque y estilo de archivo distinto, son eficientes y muy �tiles a la hora de guardar un gran flujo de informaci�n, tenerlo ordenado, y lo m�s importante, es f�cil recuperar los datos a la hora de ir a buscarlos. Por eso, node JS y express, al igual que muchos otros lenguajes y frameworks poseen la habilidad de conectarse con una base de datos para poder manejar esta informaci�n.

##Tipos de base de datos conectables con express

Si la interrogante es qu� tipos de bases de datos son conectables a nodeJS y express, la respuesta m�s f�cil de dar a esto, es que probablemente todas. O si no, la gran mayor�a de las m�s conocidas.

Es posible integrar  tanto cl�sicas bases de datos SQL como mySQL, posgreSQL, etc, o bases no SQL como bases orientadas a documentos como mongoDB, bases orientadas a columnas como Cassandra, etc, y muchas otras m�s.
La caracter�stica modular de express, lo hace conectable con cualquier base de datos que tenga alg�n controlador (driber) escrito en JS y  compatible con nodeJS, es cuesti�n de tan s�lo buscar a trav�s de NPM.

##Ejemplos de conecciones b�sicas a bases de datos conocidas

A continuaci�n, mostramos r�pidamente como integrar con express mongoDB y mySQL:


Para conectar express directamente con mongoDB, podemos utilizar el driber llamado mongodb (daaa, se�or obvio) el cual nos permitir� conectar nuestra aplicaci�n directamente con mongoDB, y nos permitir� optener documentos empleando una consulta, o insertarlos. Recordar que mongo, no es SQL.

A continuasi�n un simple ejemplo:

Asumamos que ya existe el modelo de documento animals en nuestra base de datos.

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
  if (err) {
    throw err;
  }
  db.collection('mammals').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
});

Lo que hace esta consulta, simplemente es  consultar por documentos "mamals" dentro de los animales.

Ahora, un ejemplo con mysql, para ello se requiere el driver llamado mysql (amo la obviedad de esto)

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 's3kreee7'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();

Bueno, nuestra gran consulta es preguntar qu� es 1+1, pero... uno se hace a la idea.


#�Qu� son los ORM y/o ODM? �Nos facilitan el trabajo con base de datos?

Tal como se puede notar en el ejemplo anterior, la conecci�n que se logra con las bases de datos es una directa, plana, y digamos que sin mucha az�car.
En esa situaci�n. cualquier cosa que uno quisiera hacer, tiene que escribir la consulta que desea hacer de manera manual, y el resultado optenido, es necesario desglozarlo trozo a trozo seg�n lo que a uno le interese. O a la hora de insertar algo, tiene que de nueva cuenta indicar la consulta, y parsear cada uno de los valores a lo que corresponda en la base de datos.

Para eso, viene a facilitarnos la vida los object relational maping (o object document maping)
Librer�as, que permiten relacionar y comunicar de manera mucho m�s transparente cada entidad guardada en una base de datos (ya sea documento o tabla) y relacionarla de manera autom�tica para el programador, con objetos que se crean en base a modelos que son necesarios definir.

Con esto, consultar a la base de datos por un objeto con ciertas caracter�sticas es mucho m�s sensillo, r�pido, y no tienes que estar escribiendo directamente la consulta, ni tampoco es necesario preprocesar el resultado para transformarlo en un objeto con la apariencia quedeseas.

Esto, es muy conocido y usado en otros frameworks de otros lenguajes como rails, pero express no se queda atr�s... O m�s bien node JS.

En node,  existen varios ORM y ODM para varias de las bases de datos mencionadas arriba, y por su puesto, son compatibles con express.
A continuaci�n analizaremos mongoose, que funciona con el driver de mongoDB, y sequelise, un ORM amplio, que trabaja con las bases de datos SQL m�s cl�sicas como postgresql, mysql mariaDB y sqlite.

En nuestro caso, como un buen punto de inicio para ambos ORM, podemos mostrar http://mongoosejs.com/docs/index.html  esta p�gina para mongoose, que es el ODM que funciona junto a mongoDB, y esta otra http://docs.sequelizejs.com/en/1.7.0/articles/express/  para sequelize, el ORM que funciona con bases de datos sql.

Por nuestra parte, para hacerlo m�s entretenido, mostraremos a continuaci�n, utilizando express, dos versiones de una peque�a aplicasi�n api rest, que emplear� cada una de los dos ORM. Para que noten las diferencias de ambos sistemas, pero c�mo al final ambos logran ser mucho m�s �tiles y c�modos que una conecci�n plana con las bases de datos.

## tutorial con mongoose 

##tutorial con sequelize


#Conclusi�n

Es claro que express al ser modular, y tan libre como fue hecho, que es compatible con cualquier base de datos y medio de conecci�n.
No obstante, a la hora de trabajar en un producto m�s grande, se nota que trabajar con un ORM es mucho m�s c�modo.

A conclusi�n personal, es posible que mongoose sea algo m�s... c�modo que sequelize porque requiere algo de menos parafernalia, y la comunicaci�n para un lenguaje como javascript es m�s directa, pero... Al final todo depende de las nececidades del proyecto que se est� generando.



#Referencias:

doctrine 2La era de los ODM: http://www.analyticaweb.com/desarrollo-web/doctrine2-la-era-de-los-odm

what is a odm: https://www.quora.com/What-is-Object-Document-Mapping
ORM: https://es.wikipedia.org/wiki/Mapeo_objeto-relacional

Express y bases de datos: https://expressjs.com/en/guide/database-integration.html

Tutorial de integraci�n de mongoose: https://carlosazaustre.es/blog/como-crear-una-api-rest-usando-node-js/

Integration sequelise with express: http://docs.sequelizejs.com/en/1.7.0/articles/express/
