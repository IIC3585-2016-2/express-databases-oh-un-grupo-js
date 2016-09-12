# Persistencia y Bases de Datos en Express

A la hora de  crear una aplicación web, una de las piezas más importantes de ésta son los datos que se manejarán y cómo se pretenderá poseer un registro de ellos. Existen múltiples técnicas para guardar datos en una aplicación como guardarlos en memoria si no nos interesa que sean volátiles, simples entradas en un archivo de textos, información separada y ordenada en diferentes archivos y directorios, o quizá la técnica más utilizada en los últimos tiempos: las bases de datos.

Bien se sabe que las bases de datos, unas más complejas que otras, cada una con un enfoque y estilo de archivo distinto, son eficientes y muy útiles a la hora de guardar un gran flujo de información, tenerlo ordenado y, lo más importante, fácil de recuperar los datos a la hora de ir a buscarlos. Por eso, Node.js y Express, al igual que muchos otros lenguajes y frameworks, poseen la habilidad de conectarse con una base de datos para poder manejar esta información.

<!-- ## Integración de base de datos con Express -->

<!-- Si la interrogante es qué tipos de bases de datos son conectables a Node.js y Express, la respuesta más fácil de dar a esto es que probablemente todas, o si no, la gran mayoría de las más conocidas. -->

<!-- Es posible integrar  tanto clásicas bases de datos SQL como mySQL, posgreSQL, etc, o bases no SQL como bases orientadas a documentos como mongoDB, bases orientadas a columnas como Cassandra, etc, y muchas otras más. -->
<!-- La característica modular de Express lo hace conectable con cualquier base de datos que tenga algún driver para Node.js -->

## Ejemplos de conecciones básicas 
<!-- a bases de datos conocidas-->

<!-- A continuación, mostramos rápidamente como integrar con express mongoDB y mySQL: -->


Para conectar Express directamente con MongoDB podemos utilizar el driver nativo de Node llamado `mongodb` que nos permitirá obtener documentos empleando una consulta o insertarlos. Para buscar por una colección dentro de la base de datos se puede hacer:
<!-- A continuasión un simple ejemplo: Asumamos que ya existe el modelo de documento animals en nuestra base de datos. -->
```Javascript
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
```

Ahora un ejemplo con MySQL el cual requiere el módulo `mysql`.:
```Javascript
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
```
<!-- Bueno, nuestra gran consulta es preguntar qué es 1+1, pero... uno se hace a la idea. -->


## ¿Qué son los ORM y/o ODM? ¿Nos facilitan el trabajo con base de datos?

Tal como se puede notar en el ejemplo anterior, la conexión que se logra con las bases de datos es una directa y plana. En esa situación cualquier cosa que uno quisiera hacer tiene que escribir la consulta que desea hacer de manera manual. Con el resultado obtenido, es necesario desglozarlo trozo a trozo según lo que a uno le interese. A la hora de insertar se tiene que nuevamente indicar la consulta y parsear cada uno de los valores a lo que corresponda en la base de datos. Para facilitar esta tarea existen los Object Relational Maping (o object document maping)
Librerías, que permiten relacionar y comunicar de manera mucho más transparente cada entidad guardada en una base de datos (ya sea documento o tabla) y relacionarla de manera automática para el programador, con objetos que se crean en base a modelos que son necesarios definir.

Con esto, consultar a la base de datos por un objeto con ciertas características es mucho más sensillo, rápido, y no tienes que estar escribiendo directamente la consulta, ni tampoco es necesario preprocesar el resultado para transformarlo en un objeto con la apariencia quedeseas.

Esto, es muy conocido y usado en otros frameworks de otros lenguajes como rails, pero express no se queda atrás... O más bien node JS.

En node,  existen varios ORM y ODM para varias de las bases de datos mencionadas arriba, y por su puesto, son compatibles con express.
A continuación analizaremos mongoose, que funciona con el driver de mongoDB, y sequelise, un ORM amplio, que trabaja con las bases de datos SQL más clásicas como postgresql, mysql mariaDB y sqlite.

En nuestro caso, como un buen punto de inicio para ambos ORM, podemos mostrar http://mongoosejs.com/docs/index.html  esta página para mongoose, que es el ODM que funciona junto a mongoDB, y esta otra http://docs.sequelizejs.com/en/1.7.0/articles/express/  para sequelize, el ORM que funciona con bases de datos sql.

Por nuestra parte, para hacerlo más entretenido, mostraremos a continuación, utilizando express, dos versiones de una pequeña aplicasión api rest, que empleará cada una de los dos ORM. Para que noten las diferencias de ambos sistemas, pero cómo al final ambos logran ser mucho más útiles y cómodos que una conección plana con las bases de datos.

## Levantamiento de aplicaciones
A continuación se muestran dos ejemplos que crean aplicaciones sencillas en Express. La primera se conecta a una base de datos orientada a documentos y la segunda a una relacional. 

Ambas demostraciones se crean con el generador de aplicaciones Express. Para instalar en el sistema `express-generator`, ingresar:
```
$ npm install express-generator -g
```
Para mostrar las opciones de comando se puede hacer:
```
$ express -h
```

### Node.js + Express + MongoDB (monk)
Creamos primero el scaffold de la aplicación:
```
$ express mongo-ex-ap
$ cd mongo-ex-ap
```
Instalamos las dependencias que vienen con la creación del esqueleto:
```
$ cat package.json
[...]
  "dependencies": {
    "body-parser": "~1.15.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.2.0",
    "express": "~4.13.4",
    "jade": "~1.11.0",
    "morgan": "~1.7.0",
    "serve-favicon": "~2.3.0"
  }
[...]
$ npm install
```
Agregamos a la aplicación los módulos `monk` y su dependencia `mongodb`. Lo podemos hacer ingresándolos explícitamente en el objeto `"dependencies"` y luego `npm install`  o usando la CLI:
```
$ npm install --save mongodb monk
$ cat package.json
[...]
  "dependencies": {
    "body-parser": "~1.15.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.2.0",
    "express": "~4.13.4",
    "jade": "~1.11.0",
    --> "mongodb": "^2.2.9",
    --> "monk": "^3.1.2",
    "morgan": "~1.7.0",
    "serve-favicon": "~2.3.0"
  }
[...]
```
Podemos crear un directorio donde queremos guardar la data de MongoDB:
```
$ mkdir data
```
Nos aseguramos que mongo esté arrancando y le decimos a mongo el path de la base de datos:
```
$ sudo service mongod start
$ mongod --dbpath data/
```
Ingresamos a mongo para crear una base de datos de ejmplo en la que creamos una colección `ejcollection`: 
```
$ mongo
> use ejemplodb # Usamos una nueva base de datos. Se crea cuando le metemos colecciones.
> show dbs
test 3.952GB
> db.ejcollection.insert({ 
                           "username": "us1",
                           "email": "us1@uc.cl" 
                         })
> show dbs
ejemplodb   0.078GB
test        3.952GB
> show collections
ejcollection
> db.ejcollection.find().pretty()
{
	"_id" : ObjectId("57d0323b65e772a05b69e40f"),
	"username" : "us1",
	"email" : "us1@uc.cl"
}
```

En el archivo principal de la aplicación, app.js, debemos agregar los módulos:
```Javascript
var mongo = require('mongodb');
var monk = require('monk');
```
Definimos la variable para conectarnos a la base de datos usando monk. Por defecto, MondoDB escucha al puerto 27017:
```
var db = monk('localhost:27017/ejemplodb');
```
La conexión debe ir antes de la definición de rutas para que ellas puedan hacer uso de la DB:
```Javascript
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Establecemos conexión a la base de datos en la cadena de middlewares
app.use(function (req, res, next) {
  req.db = db;
  next();
})

app.use('/', routes);
app.use('/users', users);
```

Modificamos los archivos de ruta para desplegar en la aplicación nuestras consultas. En routes/index.js modificamos la respuesta al HTTP request para que muestre la lista de usuarios de nuestra base de datos. Para esto capturamos el objeto `db` contenido en `req` como lo definimos en app.js, extraemos la colección que creamos en mongo, escribimos la consulta de encontrar los datos de ésta y se la pasamos a un callback. Éste callback guarda en `"userlist"` los resultados de la consulta. El objeto en el que se guarda se pasa a la vista views/index.jade (primer argumento de `res.render()`):
```Javascript
router.get('/', function (req, res) {
	var db = req.db;
	var collection = db.get('ejcollection');
	collection.find({}, {}, function (err, docs){
		res.render('index', {
			"userlist": docs
		});
	});
});
```
En views/index.jade (teniendo *mucho* cuidado con la indentación) mostramos la lista se usuarios que tenemos en la colección `ejcollection`: 
```
extends layout

block content
	h1.
  	User List
  ul
  	each user in userlist
    	li
				a(href="mailto:#{user.email}")= user.username
```

Para agregar la funcionalidad de añadir nuevos usuarios vamos nuevamente a routes/index.js y creamos una ruta que reciba un request POST. Creamos una nueva ruta que muestre el formulario para agregar nuevos usuarios:
```Javascript
router.get('/newuser', function (req, res) {
	res.render('newuser', { title: 'Agrega Nuevo Usuario' });
});
```
Necesitamos el template newuser. Creamos un nuevo archivo views/newuser.jade con el siguiente formulario con id `formAddUser`:
```
extends layout

block content
	h1= title
		form#formAddUser(name="adduser",method="post",action="/adduser")
			input#inputUserName(type="text", placeholder="username", name="username")
			br
			input#inputUserEmail(type="text", placeholder="email", name="useremail") 
			br
			button#btnSubmit(type="submit") submit
```
Recordando que encapsulamos el objeto de base de datos en cada request, podemos acceder a éste en cualquier ruta nueva que definamos, en particular, en routes/index.js podemos hacer: 
```Javascript
router.post('/adduser', function(req, res) {

    var db = req.db;
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var collection = db.get('ejcollection');

    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            res.send("Error al ingresar info. a la db.");
        }
        else {
            res.redirect("/");
        }
    });
});
```
Esto primero guarda en `userName` y `userEmail` los datos ingresados en los campos username y useremail del form de views/newuser.jade. Luego se hace una consulta de inserción de estos datos en la colección en cuestión. Luego de la inserción de llama a un callback. Si esta consulta fue exitosa redirije al `"/"` de la ruta, que en este caso como estamos en routes/index.js será views/index.jade.
Para correr la aplicación:
```
$ npm start
```
Para correr la aplicación y ver todos los logs internos de Express:
```
En MacOS o Linux
$ DEBUG=myapp:* npm start

En Wandows
> set DEBUG=myapp:* & npm start
```


### Node.js + Express + SQL (sequelize)


<!-- #Conclusión

Es claro que express al ser modular, y tan libre como fue hecho, que es compatible con cualquier base de datos y medio de conección.
No obstante, a la hora de trabajar en un producto más grande, se nota que trabajar con un ORM es mucho más cómodo.

A conclusión personal, es posible que mongoose sea algo más... cómodo que sequelize porque requiere algo de menos parafernalia, y la comunicación para un lenguaje como javascript es más directa, pero... Al final todo depende de las nececidades del proyecto que se esté generando. -->



#Referencias:

doctrine 2La era de los ODM: http://www.analyticaweb.com/desarrollo-web/doctrine2-la-era-de-los-odm

what is a odm: https://www.quora.com/What-is-Object-Document-Mapping
ORM: https://es.wikipedia.org/wiki/Mapeo_objeto-relacional

Express y bases de datos: https://expressjs.com/en/guide/database-integration.html

Tutorial de integración de mongoose: https://carlosazaustre.es/blog/como-crear-una-api-rest-usando-node-js/

Integration sequelise with express: http://docs.sequelizejs.com/en/1.7.0/articles/express/
