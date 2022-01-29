const router = require("express").Router();

//room
const {
  payment,
}= require('../../../../controllers/api/reports/rental_and_collection/payment');
router.post('/payment', payment)

module.exports = router;