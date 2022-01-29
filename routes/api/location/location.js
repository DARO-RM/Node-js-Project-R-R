const router = require("express").Router();

//room
const {
  location_view,
  location_add,
  location_edit,
  location_update,
  location_delete,
  location_search,
  delete_file,
}= require('../../../controllers/api/location/location');


router.get('/view', location_view )
      .post('/search', location_search )
      .post('/add', location_add)
      .get('/edit/:id', location_edit)
      .post('/edit/:id', location_update)
      .get('/delete/:id', location_delete)
      .get('/delete_file/:id', delete_file)

module.exports = router;