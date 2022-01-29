const router = require("express").Router();

//-expenses
const {
  expenses_range,
}= require('../../../../controllers/api/reports/expenses/expenses');
router.post('/expenses', expenses_range)

module.exports = router;