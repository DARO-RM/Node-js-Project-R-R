const router = require("express").Router();

const {
  login,
  
}= require('../../../controllers/api/login/login');

router.post("/",login);

  
module.exports = router;