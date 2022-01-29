const router = require("express").Router();
//API
const 
        {
            views,
            add,
            nestable,
            edit,
            deleted,
            update,
           
        }=require('../../../controllers/api/expenses/catagoryController')

router.get('/view',views);
router.post('/add',add);
router.get('/nestable',nestable);
router.get('/edit/:id',edit);
router.post('/update/',update);
router.get('/deleted/:id',deleted);

module.exports = router; 