const router = require("express").Router();
const checkAuth  = require("../../../middlewares/auth");
const role_permission = require('../../../middlewares/auth_role');
const {
  employee_view,
  employee_add,
  employee_edit,
  employee_update,
  employee_delete,
  employee_search,

}= require('../../../controllers/api/employee/employee');


//
// router.get('/view',employee_view)
//       .post('/search', employee_search )
//       .post('/add', employee_add)
//       .get('/edit/:id',employee_edit)
//       .post('/edit/:id',employee_update)
//       .get('/delete/:id',employee_delete)

router.get('/view',checkAuth,role_permission.grantAccess("readAny","employee"),employee_view)
      .post('/search',checkAuth,role_permission.grantAccess("readAny","employee"), employee_search )
      .post('/add', checkAuth,role_permission.grantAccess("createAny","employee"),employee_add)
      .get('/edit/:id',checkAuth,role_permission.grantAccess("updateAny","employee") ,employee_edit)
      .post('/edit/:id',checkAuth,role_permission.grantAccess("updeteAny","employee") ,employee_update)
      .get('/delete/:id',checkAuth,role_permission.grantAccess("deleteAny","employee") ,employee_delete)



module.exports = router;