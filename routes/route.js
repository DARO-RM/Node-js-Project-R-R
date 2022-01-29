const router = require("express").Router();
const storage = require('node-sessionstorage');
const language = require('../helpers/store'); //call store
const checkAuth  = require("../middlewares/auth");

var languageF = {};
languageF = language.storelanguage();

router.get('/',checkAuth,(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('dashboard',{translation});
})

module.exports = router;