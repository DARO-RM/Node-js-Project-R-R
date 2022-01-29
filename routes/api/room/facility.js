const router = require("express").Router();


//room
const {
  view_facility,
  create_facility,
  update_facility_live,
  delete_facility,
}= require('../../../controllers/api/room/facility');


router.get('/view', view_facility)
      .post('/add', create_facility)
      .post('/edit', update_facility_live)
      .get('/:id', delete_facility)

module.exports = router;