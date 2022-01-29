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
  res.render('expenses/expenses',{translation});
})

router.get('/add', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('expenses/add-expense',{translation});
})
router.get('/edit', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('expenses/edit-expense',{translation});
})


router.get('/categories', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('expenses/categories',{translation});
})

module.exports = router;