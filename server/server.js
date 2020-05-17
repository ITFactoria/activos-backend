require('../config/config')
const express = require('express')

//Initializations
const app = express()

//Mongoose
const mongoose = require('mongoose');

const port = process.env.PORT;
const bodyParser = require('body-parser');

//Middlewares
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Routes
app.use(require('../routes/activo'));
app.use(require('../routes/usuario'));
app.use(require('../routes/rol'));
app.use(require('../routes/usurolact'));


//Controllers
app.use(require('../controllers/activo'));
app.use(require('../controllers/usuario'));
app.use(require('../controllers/rol'));


//DB Conn
/*mongoose.connect('mongodb://localhost:27017/activos',(err,res)=>{
    if(err) throw err;
    console.log("Base de datos Online");
});*/

mongoose.connect('mongodb://localhost:27017/activostest',{
    useCreateIndex : true, 
    useNewUrlParser: true, 
    useFindAndModify: false,
    useUnifiedTopology: true,

}, (err,res)=>{
    if(err) throw err;
    console.log("Base de datos Online");
});


//Server listenning
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))