const router = require("express").Router();

const storage = require('node-sessionstorage');
const language = require('../helpers/store'); //call store
var languageF = {};
languageF = language.storelanguage();
const checkAuth  = require("../middlewares/auth");
const role_permission = require('../middlewares/auth_role');


router.get('/',checkAuth,role_permission.grantAccess("readAny","employee"),(req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];

  res.render('employees/employee',{translation});
})

router.get('/add',checkAuth,role_permission.grantAccess("createAny","employee"),(req,res)=>{

  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
 var translation = languageF[lang];

  res.render('employees/add-employee',{translation});
})

router.get('/edit',checkAuth,role_permission.grantAccess("updateAny","employee"), (req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('employees/edit-employee',{translation});
})


router.get('/permission',checkAuth,role_permission.grantAccess("readAny","employee"),(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('employees/permission',{translation});
})
router.get('/permission/add',checkAuth,role_permission.grantAccess("createAny","employee"),(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('employees/add_permission',{translation});
})
router.get('/permission/edit',checkAuth,role_permission.grantAccess("updateAny","employee"),(req,res)=>{
  var lang = storage.getItem('lang');
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('employees/edit_permission',{translation});
})


module.exports = router;