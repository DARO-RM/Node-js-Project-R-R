const router = require("express").Router();
const storage = require('node-sessionstorage');
const language = require('../helpers/store'); //call store
var languageF = {};
languageF = language.storelanguage();
const checkAuth  = require("../middlewares/auth");
const role_permission = require('../middlewares/auth_role');

router.get('/',checkAuth,role_permission.grantAccess("readAny","employee"),(req,res)=>{
  var lang = storage.getItem('lang',{translation});
  if(lang!='km'){
    lang = 'en';
  }   
  var translation = languageF[lang];
  res.render('permission/permission_list',{translation});
})

router.get('/new',checkAuth,role_permission.grantAccess("readAny","employee"),(req,res)=>{
  res.render('permission/new_permission',{translation});
})

router.get('/userlist',checkAuth,role_permission.grantAccess("readAny","employee"),(req,res)=>{
  res.render('permission/user_list',{translation});
})


module.exports = router;