const {connect,pool} = require("../../../../utils/connection");

exports.expenses_range = async (req, res) => {
    var {fromDate,toDate} = req.body;
    try { 
        var query = await " SELECT ex.date AS ex_date, pay_t.name AS paymentype_name, pay_f.name AS paymentform_name, bud.name AS budget_name, ex_cat.name AS category_name,"+
                                " ex.amount AS Amount, ex.request_by AS Reuqest_by, ex.approved_by AS Approved_by"+
                                " FROM bpos_expense AS ex "+
                                " JOIN bpos_app_payment_type AS pay_t ON pay_t.id = ex.payment_type_id"+
                                " JOIN bpos_app_payment_form AS pay_f ON pay_f.id = ex.payment_form_id"+
                                " JOIN bpos_app_budget AS bud ON bud.id = ex.budget_id  " +
                                " JOIN bpos_expense_category AS ex_cat ON ex_cat.id =ex.category_id  " +
                                " WHERE ex.created_at >='"+fromDate+"' AND ex.created_at <= '"+toDate+"';";
         pool.query(query,(err,rows)  => {
             if(err){
                console.log(err)
             }
            
            res.status(200).json({msg:"success",rows});
        });
    } catch (err) {
        res.json({msg:'error'});
    }
}