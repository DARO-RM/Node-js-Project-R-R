const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();
var moment = require('moment');
const {connect,pool} = require("../../../utils/connection");


exports.payments = (req,res)=>{

  var col_id = req.params.id;
  var {
      payment_total
  } = req.body;

 var query1 = " INSERT INTO bpos_collection_payment "+
              " (collection_id,rental_id,room_id,customer_id) "+
              " SELECT id,rental_id,room_id,customer_id "+
              " FROM bpos_collection where id="+col_id+" AND deleted=0; ";
 var query2 = "UPDATE bpos_collection_payment SET payment_total=? WHERE id=?;";
 var query3 = "Update bpos_collection set paymented=1 where id="+col_id+";";

 pool.query(query1,(err,res1)=>{
   if(err){
     console.log(err);
     res.status(400).json({msg:"error"});
   }else{
     var payment_id = res1.insertId;
     pool.query(query2,[payment_total,payment_id],(err,res2)=>{
       if(err){
         console.log(err);
         res.status(400).json({msg:"error"})
       }else{ 
          pool.query(query3,[payment_total,payment_id],(err,res2)=>{
            if(err){
              console.log(err);
              res.status(400).json({msg:"error"})
            }else{   
              res.status(200).json({msg:"success"})
            }
          })
       }
     })
   }
 })


}
exports.payments_list = (req,res)=>{

  var query1 = " SELECT "+
               " col.id AS id , col.paymented as paymented, col.invoice_number AS inv_Num, "+
               " col.rental_id, col.collection_time as collection_time , "+
               " room.name AS roomName, "+
               " if(peo.full_name='',peo.first_name,peo.full_name) AS cusName, "+
               " col.room_price AS room_price, "+
               " col.service_price AS service_price, "+
               " col.utility_price AS utility_price "+
               " FROM bpos_collection AS col "+
               " LEFT JOIN bpos_people AS peo ON peo.id = col.customer_id "+
               " LEFT JOIN bpos_room AS room ON room.id = col.room_id "+
               " WHERE col.deleted= 0;";


    pool.query(query1,(err,rows)=>{
        if(err){
          console.log(err);
          res.status(400).json({msg:"errors"});
        }else{
          for(var i in rows){
            if(rows[i].collection_time!=""){
              rows[i].collection_time = moment(rows[i].collection_time).format("MM/DD/YYYY");
            }
          }
          res.status(200).json({rows})
        }
    })


}
exports.payments_service = (req,res)=>{
  
 var id = req.params.id;
 var query = " SELECT "+
             " ser.name AS serviceName, "+
             " col_ser.price AS servicePrice, "+
             " col_ser.qty AS serviceQty, "+
             " col_ser.total AS serviceTotal "+
             " FROM bpos_collection_service_used AS col_ser "+
             " JOIN bpos_rental_service AS ser ON ser.id = col_ser.service_id "+
             " WHERE col_ser.collection_id="+id+"; ";


    pool.query(query,(err,rows)=>{
      if(err){
        res.status(400).json({msg:"error"});
      }else{
        res.status(200).json({rows});
      }
    })

      
}
