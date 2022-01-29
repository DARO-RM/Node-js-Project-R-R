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
  res.render('location/location',{translation});
})

router.get('/add',(req,res)=>{
  var lang = storage.getItem('lang',{translation});
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('location/add-location',{translation});
})

router.get('/edit',(req,res)=>{
  var lang = storage.getItem('lang',{translation});
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('location/edit-location',{translation});
})

module.exports = router;