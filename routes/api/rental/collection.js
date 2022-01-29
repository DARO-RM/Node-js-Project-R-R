const router = require("express").Router();

//room
const {
  collection_view,
  collection,
}= require('../../../controllers/api/rental/collection');


router.get('/view', collection_view )
      .post('/add/:id', collection)
//       .get('/edit/:id', employee_edit)
//       .post('/edit/:id', employee_update)
//       .get('/delete/:id', employee_delete)



module.exports = router;