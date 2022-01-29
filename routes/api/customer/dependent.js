const router = require("express").Router();

//room
const {
  view,
  add,
  edit,
  update,
  deleted,
  search,
}= require('../../../controllers/api/customer/dependent');


//
router.get('/view', view )
      .post('/search',  search )
      .post('/add', add )
      .get('/edit/:id', edit)
      .post('/edit/:id', update)
      .get('/delete/:id', deleted)



module.exports = router;