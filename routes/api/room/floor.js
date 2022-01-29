const router = require("express").Router();


//room
const {
  view_floor,
  create_floor,
  update_floor_live,
  delete_floor,
}= require('../../../controllers/api/room/floor');


router.get('/view', view_floor)
      .post('/add', create_floor)
      .post('/edit', update_floor_live)
      .get('/:id', delete_floor)

module.exports = router;