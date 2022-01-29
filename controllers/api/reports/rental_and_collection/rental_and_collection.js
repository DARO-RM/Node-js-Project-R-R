const {connect,pool} = require("../../../../utils/connection");

exports.estimate = async (req, res) => {
    var {fromDate,toDate} = req.body;
    try { 
        var query = " SELECT coll.invoice_number AS Invoice_name, "+
                          " coll.collection_time AS Coll_Date, "+
                          " room.name AS Room_Name, "+
                          " peo.full_name AS Cus_name, "+
                          " coll.room_price AS Room_price, "+
                          " coll.service_price AS Service_price,"+
                          " coll.utility_price AS Utility_price, "+
                          " ren.total AS Totals "+
                          " FROM bpos_collection AS coll "+
                          " JOIN bpos_room AS room ON room.id = coll.room_id "+
                          " JOIN bpos_people AS peo ON peo.customer_id = coll.customer_id "+
                          " JOIN bpos_rental AS ren ON ren.room_id = coll.room_id " +
                          " WHERE coll.created_at >='"+fromDate+"' AND coll.created_at <= '"+toDate+"';";
        pool.query (query,(err,rows)  => {
             if(err){
                console.log(err)
            }
            //console.log(rows)
            res.status(200).json({msg:"success",rows});
        });
    } catch (err) {
        res.json({msg:'error'});
    }
}
