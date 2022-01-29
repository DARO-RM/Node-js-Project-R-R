const router = require("express").Router();
const checkAuth  = require("../../../middlewares/auth");
const role_permission = require('../../../middlewares/auth_role');


const {
  view,
  add,
  edit,
  update,
  deleted,
  search,
  delete_file,
}= require('../../../controllers/api/customer/customer');

router.get('/view',checkAuth,role_permission.grantAccess("readAny","customer"),view);   
router.post('/search',checkAuth, search);
router.post('/add', checkAuth,role_permission.grantAccess("createAny","customer"),add);
router.get('/edit/:id', checkAuth,role_permission.grantAccess("updateAny","customer"),edit);
router.post('/edit/:id',checkAuth,role_permission.grantAccess("updateAny","customer"),update);
router.get('/delete/:id', checkAuth,role_permission.grantAccess("deleteAny","customer"),deleted);
router.get('/delete_file/:id',checkAuth,role_permission.grantAccess("deleteAny","customer"),delete_file);



module.exports = router;