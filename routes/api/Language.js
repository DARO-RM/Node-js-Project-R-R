const router = require("express").Router();
const { body, check } = require("express-validator");
const storage = require('node-sessionstorage');

//
router.post('/', async (req,res)=>{
  var {lang} = req.body;

  //  console.log("req from body",lang);
   storage.setItem('lang', lang)
   await res.json({msg:'success'});
})



module.exports = router;