//start server
const express = require('express');
const app = express();



//require connection
const {connect,pool} = require("./utils/connection");

// //module
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

// Form render
const Router = require('./routes/route');
const customer = require('./routes/customers');
const employee = require('./routes/employee');
const room = require('./routes/rooms');
const rental = require('./routes/rental_and_collection');
const permission = require('./routes/permission');
const expenses = require('./routes/expenses');
const general_config = require('./routes/general_config');
const location = require('./routes/location');
const login = require('./routes/login');
const reports = require ('./routes/reports');
//API
//room
const roomAPI = require('./routes/api/room/room');
const floorAPI = require('./routes/api/room/floor');
const facilityAPI = require('./routes/api/room/facility');
//customer
const customerAPI = require('./routes/api/customer/customer');
const dependentAPI = require('./routes/api/customer/dependent');
const propertyAPI = require('./routes/api/customer/property');
//employee
const employeeAPI = require('./routes/api/employee/employee');
const permissionAPI = require('./routes/api/employee/permission');

//expenses
const apiExpenses = require('./routes/api/expenses/expenses');
const apiCatagories = require('./routes/api/expenses/categories');

//log in 
const loginAPI = require('./routes/api/login/login');
//location
const locationAPI = require('./routes/api/location/location');
//rental
const avail_bookedAPI = require('./routes/api/rental/available_booked');
const rentedAPI = require('./routes/api/rental/rented');
const collectionAPI = require('./routes/api/rental/collection');
const paymentAPI = require('./routes/api/rental/payment');

//Multi Language
const APIlanguage = require('./routes/api/Language');
//Report 
const APIReport_cus = require ('./routes/api/reports/customer/report');
const  APIReport_payment = require ('./routes/api/reports/rental_and_collection/payment');
const  APIReport_rental = require ('./routes/api/reports/rental_and_collection/rental');
const APIReport_exp = require('./routes/api/reports/expenses/report');
const APIRental_col= require('./routes/api/reports/rental_and_collection/report');
//handlebar set
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');


// //body-parser 
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
//apply limit for file upload
app.use(express.json({limit: '1024mb'}));
app.use(express.urlencoded({limit: '1024mb',extended:true}));


// //publics directory
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'publics')));


//form render
app.use(Router);
app.use('/customers',customer);
app.use('/employees',employee);
app.use('/rooms',room);
app.use('/rental',rental);
app.use('/permission',permission);
app.use('/expenses',expenses);
app.use('/general_config',general_config);
app.use('/location',location);
app.use('/login',login);
app.use('/reports',reports);
//api
// - room
app.use('/api/room',roomAPI);
app.use('/api/room/floor',floorAPI);
app.use('/api/room/facility',facilityAPI);
// - customer
app.use('/api/customers',customerAPI);
app.use('/api/dependent',dependentAPI);
app.use('/api/property',propertyAPI);
// - employee
app.use('/api/employee',employeeAPI);
app.use('/api/permission',permissionAPI);

// - expenses api
app.use('/api/expenses', apiExpenses);
app.use('/api/categories',apiCatagories);
// - loginAPI
app.use('/api/login',loginAPI);
// - LocationAPI
app.use('/api/location',locationAPI);

//Multi Language
app.use('/api/language',APIlanguage);
//rental
app.use('/api/rental',avail_bookedAPI);
app.use('/api/rental/rented', rentedAPI );
app.use('/api/rental/collection', collectionAPI);
app.use('/api/rental/payment', paymentAPI);
//Report 
app.use('/api/reports',APIReport_cus);
app.use('/api/reports',APIReport_payment);
app.use('/api/reports',APIReport_rental);
app.use('/api/reports',APIReport_exp);
app.use('/api/reports',APIRental_col);
//Handle 404 page not found
const notFound = (req, res) => res.status(404).render('404');
app.use(notFound); 

connect.getConnection(function(err){
  //handdle connection Errors
  if(err){
    console.log(err);
  }
})

//server running on http://app.syscambodia.com:8000/
console.log('http://localhost:8000');
app.listen(8000);