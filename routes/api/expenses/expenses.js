const router = require("express").Router();
const
    {
        views,
        add,
        search,
        edit,
        deleted,
        update,
        budget,
        payment_type,
        payment_form,
        catagory,
    }=require('../../../controllers/api/expenses/expensesController');


router.get('/views',views);
router.post('/add',add);

//api route  from budget
router.get('/budget',budget);

//api route paymenttype
router.get('/payment_type',payment_type);

//api route payment_type_form
router.get('/payment_form',payment_form);
router.get('/category',catagory);

//api route edit expense
router.get('/edit/:id',edit);
router.post('/edit/:id',update);

//find_data_expense
router.post('/search',search);
router.get('/deleted/:id',deleted);

module.exports = router; 