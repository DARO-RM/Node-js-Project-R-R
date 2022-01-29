
const {connect,pool} = require("../../../../utils/connection");
var moment = require('moment');
exports.check_in = async (req, res) => {
    var {fromDate,toDate} = req.body;
    try { 
        var query =  " SELECT ren.id AS no_id,ren.checked_in AS checked_in ,"+
                     " peo.full_name AS full_name,peo.phone_1 AS phone,"+
                     " peo.work AS works, peo.company_address AS company_address"+
                     " FROM bpos_rental AS ren"+
                     " JOIN  bpos_people  AS peo ON peo.customer_id = ren.customer_id"+ 
                     " WHERE ren.checked_in >= '"+fromDate+" ' AND ren.checked_in <='"+toDate+"';";
         pool.query(query,(err,rows)  => {

            for(var i in rows){

                rows[i].checked_in = moment(rows[i].checked_in).format("MM/DD/YYYY");
            
            }
            res.status(200).json({msg:"success",rows});
        });
    } catch (err) {
        res.json({msg:'error'});
    }
}

exports.check_out = async (req, res) => {
    var {fromDate,toDate} = req.body;
    try { 
        var query =  " SELECT ren.id AS no_id,ren.checked_out AS checked_out ,"+
                     " peo.full_name AS full_name,peo.phone_1 AS phone,peo.work AS works,"+
                     " peo.company_address AS company_address"+
                     " FROM bpos_rental AS ren JOIN  bpos_people  AS peo ON peo.customer_id = ren.customer_id "+
                     " WHERE ren.checked_out >= '"+fromDate+"' AND ren.checked_out <='"+toDate+"';";
         pool.query(query,(err,rows)  => {
            for(var i in rows){

                rows[i].check_out = moment(rows[i].check_out).format("MM/DD/YYYY");
            
            }
            res.status(200).json({msg:"success",rows});
        });
    } catch (err) {
        res.json({msg:'error'});
    }
}

