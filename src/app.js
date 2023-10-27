const { json } = require('express');
const express = require ('express');
const morgan = require('morgan');

//ininicializaciones
const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//routes
app.use(require('./routes/index.js'));
app.use('/promotores', require('./routes/promotores.js'));


//starting server
app.listen(app.get('port'), () =>{
	console.log("Server on port", app.get('port'));
});