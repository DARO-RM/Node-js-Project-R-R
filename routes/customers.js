const router = require("express").Router();

const storage = require('node-sessionstorage');
const language = require('../helpers/store'); //call store

const checkAuth  = require("../middlewares/auth");
const role_permission = require('../middlewares/auth_role');

var languageF = {};
languageF = language.storelanguage();


router.get('/',checkAuth,(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('customers/customers',{translation});
})
router.get('/add', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('customers/add-customer',{translation});
})

router.get('/edit',checkAuth,role_permission.grantAccess("updateAny","customer"),(req,res)=>{
  
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('customers/edit-customer',{translation});
})

//dependent hbs
router.get('/dependent', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  } 
  var translation = languageF[lang];
  res.render('customers/dependent',{translation});
})
router.get('/dependent/add', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  } 
  var translation = languageF[lang];
  res.render('customers/add-dependent',{translation});
})
router.get('/dependent/edit', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  } 
  var translation = languageF[lang];
  res.render('customers/edit-dependent',{translation});
})

//property hbs
router.get('/property', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  } 
  var translation = languageF[lang];
  res.render('customers/property',{translation});
})
router.get('/property/add', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  } 
  var translation = languageF[lang];
  res.render('customers/add-property',{translation});
})
router.get('/property/edit', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  } 
  var translation = languageF[lang];
  res.render('customers/edit-property',{translation});
})

module.exports = router;