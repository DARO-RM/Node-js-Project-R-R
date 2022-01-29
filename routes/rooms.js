const router = require("express").Router();
const storage = require('node-sessionstorage');
const language = require('../helpers/store'); //call store
var languageF = {};
languageF = language.storelanguage();

const checkAuth  = require("../middlewares/auth");
const role_permission = require('../middlewares/auth_role');

router.get('/',checkAuth,role_permission.grantAccess("readAny","room"),(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rooms/rooms',{translation});
})

router.get('/add',checkAuth,role_permission.grantAccess("createAny","room"),(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rooms/add-room',{translation});
})

router.get('/edit',checkAuth,role_permission.grantAccess("updateAny","room"),(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];
  res.render('rooms/edit-room',{translation});
})

router.get('/facility', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('rooms/facility',{translation});
});

router.get('/floor', (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('rooms/floor',{translation});
});

module.exports = router;