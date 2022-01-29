const router = require("express").Router();

const {
    rental,
}= require('../../../../controllers/api/reports/rental_and_collection/rental');
router.post('/rental', rental)

module.exports = router;