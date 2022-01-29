const router = require("express").Router();
const checkAuth  = require("../../../middlewares/auth");
const role_permission = require('../../../middlewares/auth_role');
//room
const {
  view_room,
  search_room,
  create_room,
  edit_room,
  update_room,
  delete_room,
  price_select
}= require('../../../controllers/api/room/room');

router.get('/',checkAuth,role_permission.grantAccess("readAny","room"), view_room )
      .post('/search',checkAuth,role_permission.grantAccess("readAny","room"), search_room )
      .post('/add',checkAuth,role_permission.grantAccess("createAny","room"), create_room)
      .get('/edit/:id',checkAuth,role_permission.grantAccess("updateAny","room"), edit_room)
      .post('/edit/:id',checkAuth,role_permission.grantAccess("updateAny","room"), update_room)
      .get('/delete/:id',checkAuth,role_permission.grantAccess("deleteAny","room"), delete_room)
      .get('/append/price', price_select)


      
module.exports = router;