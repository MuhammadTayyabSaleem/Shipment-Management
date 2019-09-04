const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const shipment = require('./routes/api/shipment');
const assignShipment = require('./routes/api/assign-shipment');
const passport = require('passport');
var boolParser = require('express-query-boolean');


const app = express();
app.get('/',(req,res) => res.send('Hello sir'));

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(boolParser());

// mongoose
// .connect('mongodb://localhost:27017/Shipment-Management', { useNewUrlParser: true })
// .then(() => console 
// .log(`mongo db connected`))
// .catch(err => console.log(err));

 mongoose
   .connect('mongodb+srv://tayyab:mongoDB@cluster0-n5n6m.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
   .then(() => console.log('MongoDB Connected Atlas'))
   .catch(err => console.log(err));


//passport middleware
app.use(passport.initialize());

//passport config               \/passing in passport itself
require('./config/passport')(passport);


//Use Routes 
app.use('/api/users',users);
app.use('/api/shipment',shipment);
app.use('/api/assign-shipment',assignShipment);



const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server running ${port}`));