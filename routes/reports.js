const router = require("express").Router();
//Start Multi language  
const storage = require('node-sessionstorage');
const language = require('../helpers/store'); //call store
var languageF = {};
languageF = language.storelanguage();
//customer hbs
router.get('/',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('reports/reports',{translation});
})
//customer hbs
router.get('/customers_checked_in',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('reports/customers/checked_in',{translation});
})
router.get('/customers_checked_out',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('reports/customers/checked_out',{translation});
})
//property hbs
router.get('/rental', (req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];

  res.render('reports/rental/rental',{translation});
})

router.get('/payment',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('reports/payment/payment',{translation});
})

//-expenses
router.get('/detail-expenses',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }
  var translation = languageF[lang];
  res.render('reports/expenses-reports/detial-expenses',{translation});
})

//-conllaction 
router.get('/etimate/coll-payment',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }
  var translation = languageF[lang];
  res.render('reports/collactions/etimate-coll-payments',{translation});
})
router.get('/rental/coll-payment',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }
  var translation = languageF[lang];
  res.render('reports/collactions/rental-coll-payments',{translation});
})
router.get('/rental/unpaid-payment',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }
  var translation = languageF[lang];
  res.render('reports/collactions/rental-unpaid-payments',{translation});
})
//- payments
router.get('/reports-payments',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }
  var translation = languageF[lang];
  res.render('reports/payments/report-payments',{translation});
})

module.exports = router;