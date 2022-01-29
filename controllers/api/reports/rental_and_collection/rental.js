
const {connect,pool} = require("../../../../utils/connection");
var moment = require('moment');

exports.rental = async (req, res) => {
  var {fromDate,toDate} = req.body;
  //select from rental
  var query1 = " SELECT ren.id as rental_id,"+
               " room.name AS roomName, "+
               " if(peo.full_name='',peo.first_name,peo.full_name) AS customerName,"+
               " ren.price AS roomFee, "+
               " ren.rental_time AS rentDate, "+ 
               " ren.checked_in AS checked_in, "+ 
               " flr.number AS floorNumber "+
               " FROM bpos_rental AS ren "+
               " LEFT JOIN bpos_people AS peo ON peo.customer_id = ren.customer_id "+
               " LEFT JOIN bpos_room AS room ON room.id = ren.room_id "+
               " LEFT JOIN bpos_room_floor AS flr ON flr.id = room.floor_id"+
               " WHERE ren.checked_in >='"+fromDate+"' AND ren.checked_in<='"+toDate+"' AND  ren.deleted=0 ;"

  //select from utility used
  var query2 =  " SELECT rental_id, "+
                " utility_id, "+ 
                " pre_qty , price"+ 
                " FROM bpos_rental_utility_used ";

  //select from service used 
  var query3 =  " SELECT rental_id,"+ 
                " GROUP_CONCAT(ser.name) AS service_name, "+
                " GROUP_CONCAT(ser_us.service_id) AS service_id, "+
                " GROUP_CONCAT(ser_us.qty) AS qty, "+
                " GROUP_CONCAT(ser_us.price) AS price, "+
                " GROUP_CONCAT(ser_us.total) AS total "+
                " FROM bpos_rental_service_used AS ser_us "+
                " JOIN bpos_rental_service AS ser ON ser.id = ser_us.service_id "+
                " GROUP BY rental_id; ";

   var [util] =  await connect.query(query2);
 
   var [service] =  await connect.query(query3);


   var electric_pre=[];
   var water_pre=[];
   var count_w=0;
   var count_e=0;

   var water_fee = [];
   var electric_fee = [];

   for(var i in util){
     if(util[i].utility_id == 1){
       electric_pre[count_e] = util[i].pre_qty;
       electric_fee[count_e] = util[i].price;
       count_e +=1;
     }else if(util[i].utility_id == 2){
        water_pre[count_w] = util[i].pre_qty;
        water_fee[count_w] = util[i].price;
        count_w+=1;
     }
    
   }
    
   pool.query(query1,(err,rows)=>{
    if(err){
      console.log(err);
      res.status(400).json({msg:"error"});
    }else{

      if(rows.lenght>0){
        if(util.length == 0 ){
          console.log("Cannot read utility");
          res.status(400).json({msg:"error"});
        }
      }
  
      for(var i in rows){
     
        rows[i].checked_in = moment(rows[i].checked_in).format("MM/DD/YYYY");
        rows[i].rentDate = moment(rows[i].rentDate).format("MM/DD/YYYY");

        rows[i].electric_pre = electric_pre[i];
        rows[i].water_pre = water_pre[i];

        rows[i].water_fee = water_fee[i];
        rows[i].electric_fee = electric_fee[i];

        rows[i].service_id =  "";
        rows[i].service_name = "";
        rows[i].service_qty = "";
        rows[i].service_price = "";
        rows[i].service_total_per_unit = "";
        rows[i].service_total =  "0";

       for(var j in service){
         if(rows[i].rental_id == service[j].rental_id){

            rows[i].service_id =  service[j].service_id;
            rows[i].service_name = service[j].service_name;
            rows[i].service_qty = service[j].qty;
            rows[i].service_price = service[j].price;
            rows[i].service_total_per_unit = service[j].total;
            
            var ser_total = service[j].total.split(",");

    
            var service_total = 0 ;
            for(var k in ser_total ){
              
              service_total += parseFloat(ser_total[k]);
            }
           
            rows[i].service_total =  service_total;

         }
       }
      
        rows[i].total =  parseFloat(rows[i].service_total) +  parseFloat(rows[i].roomFee);
        
      }
      res.status(200).json({msg:"success",rows});
    }
  }) 
}


