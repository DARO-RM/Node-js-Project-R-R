const router = require("express").Router();

//room
const {
  rented_view,
  rented_add,
  rented_edit,
  rented_update,
  rented_delete,
  rented_service,
  rented_utility,
  room,
  customer,
  get_reservation,
  room_edit,
  rented_checkout,
  rented_deposite
}= require('../../../controllers/api/rental/rented');


router.get('/view', rented_view )
      .post('/add', rented_add)
      .get('/edit/:id', rented_edit)
      .post('/edit/:id', rented_update)
      .post('/checkout/:id', rented_checkout)
      .get('/delete/:id', rented_delete)
      .get('/service',rented_service)
      .get('/utility',rented_utility)
      .get('/room',room)
      .get('/room/:id',room_edit)
      .get('/deposite/:id',rented_deposite )
      .get('/customer',customer)
      .get('/get_reservation/:id',get_reservation)

module.exports = router;