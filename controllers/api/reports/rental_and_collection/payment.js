const {connect,pool} = require("../../../../utils/connection");
var moment = require('moment');
exports.payment = async (req, res) => {
    var {fromDate,toDate} = req.body;
    try { 
        var query = " SELECT coll_pay.id AS payment_id ,coll_pay.created_at AS pay_date,"+
                    " peo.full_name ,room.number AS room_number ,"+
                    " flo.name AS flo_name,coll.invoice_number,"+
                    " coll_pay.payment_total AS payment_total,"+
                    " coll_pay.payment_total AS amount_total  "+
                    " FROM bpos_collection AS coll "+
                    " JOIN bpos_people AS peo ON  coll.customer_id = peo.customer_id"+
                    " JOIN bpos_room AS room ON coll.room_id = room.id "+
                    " JOIN bpos_room_floor AS flo ON coll.id = flo.id "+
                    " JOIN bpos_collection_payment AS coll_pay ON coll_pay.collection_id = coll.id "+
                    " WHERE coll_pay.created_at >= '"+fromDate+"' AND coll_pay.created_at <= '"+toDate+"';";
         pool.query(query,(err,rows)  => {
            var total=0; 
            for(var i in rows){
                total += parseFloat(rows[i].amount_total);
                rows[i].pay_date = moment(rows[i].pay_date).format("MM/DD/YYYY");
             }
                total = parseFloat(total).toFixed(2);
            res.status(200).json({msg:"success",total,rows});
        });
    } catch (err) {
        res.json({msg:'error'});
    }
}