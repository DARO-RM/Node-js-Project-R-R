const router = require("express").Router();

//room
const {
  check_in,
  check_out,
}= require('../../../../controllers/api/reports/customers/customers');
router.post('/check_in', check_in)
      .post('/check_out', check_out)
module.exports = router;