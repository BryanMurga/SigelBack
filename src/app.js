const { json } = require('express');
const express = require ('express');
const morgan = require('morgan');
const cors = require('cors');

//ininicializaciones
const app = express();

app.use(cors());

//settings
app.set('port', process.env.PORT || 4000);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    console.log('Recibida solicitud:', req.method, req.url);

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.on('finish', () => {
        console.log('Enviada respuesta:', res.statusCode);
    });
    next();
});


//routes
app.use ('/campanas', require('./routes/campana.js'))
app.use('/auth', require('./routes/auth.js'));
app.use('/contacto-alumno', require('./routes/contactoAlumno.js'));
app.use('/contacto', require('./routes/contacto.js'));
app.use('/leads/', require('./routes/leads.js'));
app.use('/medio-contacto', require('./routes/medioContacto.js'));
app.use('/promotores', require('./routes/promotores.js'));
app.use('/reasignaciones', require('./routes/reasignaciones.js'));
app.use('/lista-comision', require('./routes/listaComision.js'));
app.use('/alumno', require('./routes/alumno.js'));
app.use('/carrera', require('./routes/carrera.js'));
app.use('/funciones', require('./routes/funciones.js'));
app.use('/cargar-archivo', require('./routes/cargarArchivo.js'))

app.use(require('./routes/index.js'));


//starting server
app.listen(app.get('port'), () =>{
	console.log("Server on port", app.get('port'));
});