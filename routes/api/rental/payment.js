const router = require("express").Router();

//room
const {
  payments,
  payments_list,
  payments_service,
}= require('../../../controllers/api/rental/payment');



 router.post('/add/:id', payments )
       .get('/view', payments_list)
       .get('/service/:id', payments_service)
//       .get('/edit/:id', employee_edit)
//       .post('/edit/:id', employee_update)
//       .get('/delete/:id', employee_delete)



module.exports = router;