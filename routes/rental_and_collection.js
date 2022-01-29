const router = require("express").Router();

//Start Multi language  
const storage = require('node-sessionstorage');
const language = require('../helpers/store'); //call store
var languageF = {};
languageF = language.storelanguage();


router.get('/',(req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rental_and_collection/rental',{translation});
})

router.get('/rented',(req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rental_and_collection/rented',{translation});
})

router.get('/rented/add',(req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rental_and_collection/add-rented',{translation});
})

router.get('/rented/edit',(req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rental_and_collection/edit-rented',{translation});
})


router.get('/booked',(req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rental_and_collection/booked',{translation});
})

router.get('/collection',(req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rental_and_collection/collection',{translation});
})

router.get('/collection/invoice',(req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rental_and_collection/invoice',{translation});
})

router.get('/payment',(req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rental_and_collection/payment',{translation});
})




module.exports = router;