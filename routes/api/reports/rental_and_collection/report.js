const router = require("express").Router();
const {
  estimate,

}= require('../../../../controllers/api/reports/rental_and_collection/rental_and_collection');

router.post('/estimate',estimate)
module.exports = router;