const router = require("express").Router();
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
  res.render('general_config/general_config',{translation});
})

router.get('/general_config_new',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('general_config/general_config_new',{translation});
})

router.get('/currency_exchange',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('general_config/currency_exchange',{translation});
})

router.get('/payment_type',(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('general_config/payment_type',{translation});
})
module.exports = router;