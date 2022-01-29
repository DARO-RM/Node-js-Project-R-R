const router = require("express").Router();

//room
const {
  available,
  booked_view,
  booked,
  cancel_booked,
  price
}= require('../../../controllers/api/rental/available_booked');



 router.get('/available', available )
       .get('/booked_view', booked_view )
       .post('/booked/:id', booked)
       .post('/cancel/booked/:id', cancel_booked)
       .get('/price',price)
       
      //  .get('/available_room',available_room )
      //  .get('/booked_room',booked_room)

//       // .get('/edit/:id', employee_edit)
//       // .post('/edit/:id', employee_update)
//       // .get('/delete/:id', employee_delete)



module.exports = router;