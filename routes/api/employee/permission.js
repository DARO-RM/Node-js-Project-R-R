const router = require("express").Router();
const checkAuth  = require("../../../middlewares/auth");
const role_permission = require('../../../middlewares/auth_role');

const {
  permission_view,
  permission_add,
  permission_edit,
  permission_update,
  permission_delete,
  permission_search,
  action_append,
}= require('../../../controllers/api/employee/permission');


//
// router.get('/view', permission_view )
//       .post('/search', permission_search )
//       .post('/add', permission_add)
//       .get('/edit/:id', permission_edit)
//       .post('/edit/:id', permission_update)
//       .get('/delete/:id', permission_delete)
//       .get('/view_action', action_append )
router.get('/view',checkAuth,role_permission.grantAccess("readAny","employee"), permission_view )
      .post('/search',checkAuth,role_permission.grantAccess("readAny","employee"), permission_search )
      .post('/add',checkAuth,role_permission.grantAccess("createAny","employee"), permission_add)
      .get('/edit/:id',checkAuth,role_permission.grantAccess("updateAny","employee"), permission_edit)
      .post('/edit/:id',checkAuth,role_permission.grantAccess("updateAny","employee"), permission_update)
      .get('/delete/:id',checkAuth,role_permission.grantAccess("deleteAny","employee"), permission_delete)
      .get('/view_action', action_append )


module.exports = router;