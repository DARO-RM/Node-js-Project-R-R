const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();
var moment = require('moment');
const {connect,pool} = require("../../../utils/connection");



exports.collection_view = async (req, res) => {
  
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
               " LEFT JOIN bpos_room_floor AS flr ON flr.id = room.floor_id;";

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
    if(util.length == 0 ){
      console.log("Cannot read utility");
      res.status(400).json({msg:"error"});
    }
   
   var [service] =  await connect.query(query3);


   var electric_pre=[];
   var water_pre=[];
   var count_w=0;
   var count_e=0;


   pool.query(query1,(err,rows)=>{
    if(err){
      console.log(err);
      res.status(400).json({msg:"error"});
    }else{

  
      for(var i in rows){
     
        rows[i].checked_in = moment(rows[i].checked_in).format("MM/DD/YYYY");
        rows[i].rentDate = moment(rows[i].rentDate).format("MM/DD/YYYY");

        for(var j in util){
            if(util[j].rental_id == rows[i].id){
              if(util[j].utility_id == 1){
                rows[i].electric_pre = util[i].pre_qty;
                rows[i].electric_fee = util[i].price;
             
              }else if(util[j].utility_id == 2){
                 rows[i].water_pre  = util[i].pre_qty;
                 rows[i].water_fee = util[i].price;
                
              }
            }
        }

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
exports.collection = (req,res)=>{

  const rental_id = req.params.id;

  var {
    collection_time, service_price, utility_price,
    water_last,water_used,water_price,water_total,
    electric_last,electric_used,electric_price,electric_total
  }= req.body;


  if(collection_time == ''){
    var  Collection_time = null;
  }else{
    var Collectiontime  = new Date(collection_time);
    var  Collection_time = moment(Collectiontime).format('YYYY-MM-DD hh:mm:ss');
  }



//need to insert rental id and need to update
  var query1 = " INSERT INTO bpos_collection (rental_id,room_id,customer_id,room_price)"+
               " SELECT id,room_id,customer_id,price "+
               " FROM bpos_rental"+
               " WHERE id="+rental_id+";";



  //need to input 2 params (but donot need to update)
 var query3 = " INSERT INTO bpos_collection_service_used "+
              " (collection_id,rental_id,room_id,customer_id,service_id,qty,price,total) "+
              " SELECT "+
              " ?,rental_id,room_id,customer_id,service_id,qty,price,total "+
              " FROM bpos_rental_service_used "+
              " WHERE rental_id="+rental_id+";";

//need to update 
var query4 = " INSERT INTO bpos_collection_utility_used "+
             " (collection_id,rental_id,room_id,customer_id,utility_id,pre_qty)"+ 
             " SELECT "+
             " 1,rental_id,room_id,customer_id,utility_id,pre_qty"+
             " FROM bpos_rental_utility_used"+
             " WHERE rental_id="+rental_id+";";

var query5 = " UPDATE bpos_collection_utility_used "+
             " SET last_qty=?,used_qty=?,price=?,total=?"+
             " WHERE utility_id=?; ";



pool.query(query1,(err,res1)=>{
  if(err){
    console.log("Error1"+err);
    res.status(400).json({msg:"errors"})
  }else{
    var collection_id = res1.insertId;
    var data2= [Collection_time,service_price,utility_price]
    
    var query2 =  " UPDATE bpos_collection set "+
                  " collection_time =?, "+
                  " service_price = ? , utility_price = ?"+
                  " where id="+collection_id+" ;";
         
    pool.query(query2,data2,async (err,res2)=>{
      if(err){
        console.log("Error2"+err);
        res.status(400).json({msg:"errors"})
      }else{
        var query3 = " INSERT INTO bpos_collection_service_used "+
        " (collection_id,rental_id,room_id,customer_id,service_id,qty,price,total) "+
        " SELECT "+ collection_id +
        " ,rental_id,room_id,customer_id,service_id,qty,price,total "+
        " FROM bpos_rental_service_used "+
        " WHERE rental_id="+rental_id+";";
      
        pool.query(query3,(err,res3)=>{
          if(err){
            console.log("Error3"+err);
            res.status(400).json({msg:"errors"});
          }else{
            pool.query(query4,(err,res4)=>{
              if(err){
                console.log("Error4"+err);
                res.status(400).json({msg:"errors"});
              }else{
                var data5 = [water_last,water_used,water_price,water_total,2];
                pool.query(query5,data5,(err,res5)=>{
                  if(err){
                    console.log("Error5"+err);
                    res.status(400).json({msg:"errors"});
                  }else{
                    var data6 = [electric_last,electric_used,electric_price,electric_total,1];
                    pool.query(query5,data6,(err,res6)=>{
                      if(err){
                        console.log("Error6"+err);
                        res.status(400).json({msg:"errors"});
                      }else{
                        var query7 = 'UPDATE bpos_collection set invoice_number="RA'+collection_id+'" where id='+collection_id+';';
                        pool.query(query7,(err,res6)=>{
                          if(err){
                            console.log("Error7"+err);
                            res.status(400).json({msg:"errors"});
                          }else{
                            var query8 = " UPDATE bpos_rental_utility_used "+
                                          " SET pre_qty = "+water_last+
                                          " WHERE rental_id="+rental_id+" AND utility_id=2;";

                            pool.query(query8,(err,res8)=>{
                              if(err){
                                console.log("Error8"+err);
                                res.status(400).json({msg:"errors"});
                              }else{
                                var query9 = " UPDATE bpos_rental_utility_used "+
                                              " SET pre_qty = "+electric_last+
                                              " WHERE rental_id="+rental_id+" AND utility_id=1;";
                                            
                                pool.query(query9,(err,res9)=>{
                                  if(err){
                                    console.log("Error9"+err);
                                    res.status(400).json({msg:"errors"});
                                  }else{
                                    res.status(200).json({msg:"success"});
                                  }
                               })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }
})



}
//not yet 
exports.collection_edit = async (req,res)=>{


 var id = req.params.id;
  //select from rental
  var query1 = " SELECT "+
               " ren.id as rental_id,"+
               " room.name AS roomName, "+
               " if(peo.full_name='',peo.first_name,peo.full_name) AS customerName,"+
               " ren.price AS roomFee, "+
               " ren.rental_time AS rentDate, "+ 
               " ren.checked_in AS checked_in, "+ 
               " flr.number AS floorNumber "+
               " FROM bpos_rental AS ren "+
               " LEFT JOIN bpos_people AS peo ON peo.customer_id = ren.customer_id "+
               " LEFT JOIN bpos_room AS room ON room.id = ren.room_id "+
               " LEFT JOIN bpos_room_floor AS flr ON flr.id = room.floor_id;";

  //select from utility used
  var query2 =  " SELECT rental_id, utility_id, "+ 
                " pre_qty , last_qty, used_qty,"+ 
                " price, total"+ 
                " FROM bpos_collection_utility_used ";

  //select from service used 
  var query3 =  " SELECT rental_id, "+
                " GROUP_CONCAT(service_id) AS service_id, "+
                " GROUP_CONCAT(qty) AS qty, "+
                " GROUP_CONCAT(price) AS price, "+
                " GROUP_CONCAT(total) AS total "+
                " FROM bpos_collection_service_used "+
                " GROUP BY rental_id; ";


   var [util] =  await connect.query(query2);
    if(util.length == 0 ){
      console.log("Cannot read utility");
      res.status(400).json({msg:"error"});
    }

   var [service] =  await connect.query(query3);


   var electric_pre;
   var water_pre;
  
 

   for(var i in util){
     if(util[i].utility_id == 1){
       electric_pre = util[i].pre_qty;
     }else if(util[i].utility_id == 2){
        water_pre = util[i].pre_qty;
     }
   }
    
   pool.query(query1,(err,rows)=>{
    if(err){
      console.log(err);
      res.status(400).json({msg:"error"});
    }else{

      for(var i in rows){

        rows[i].checked_in = moment(rows[i].checked_in).format("MM/DD/YYYY");
        rows[i].rentDate = moment(rows[i].rentDate).format("MM/DD/YYYY");

        rows[i].eLectric_pre = electric_pre[i];
        rows[i].water_pre = water_pre[i];
        rows[i].service_id = service[i].service_id;
        rows[i].service_qty = service[i].qty;
        rows[i].service_price = service[i].price;
        rows[i].service_total =  service_total[i];
        
      }
      res.status(200).json({msg:"success",rows});
    }
  }) 


}
//not yet
exports.collection_update = async (req,res)=>{

  const id = req.params.id;
  var {collection_time,water_last,electric_last} = req.body ;
  

}






