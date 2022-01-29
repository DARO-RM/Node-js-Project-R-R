const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();
var moment = require('moment');
const {connect,pool} = require("../../../utils/connection");
const storage = require('node-sessionstorage');
const { json } = require("body-parser");


exports.rented_view = async (req, res) => {
  
  //select from rental
  var query1 = "SELECT ren.id as rental_id, room.name AS roomName, ren.price AS roomFee,ren.rental_time AS rentDate, ren.checked_in AS checked_in,  flr.number AS floorNumber, MAX(CASE WHEN ruu.utility_id=2 THEN ruu.pre_qty END) as w_pre_qty, MAX(CASE WHEN ruu.utility_id=1 THEN ruu.pre_qty END) as e_pre_qty, MAX(CASE WHEN ruu.utility_id=2 THEN ruu.price END) as water_fee, MAX(CASE WHEN ruu.utility_id=1 THEN ruu.price END) as electric_fee, peo.first_name as firstname, peo.last_name as lastname, peo.full_name as fullname FROM bpos_rental AS ren LEFT JOIN bpos_people AS peo ON peo.customer_id = ren.customer_id  LEFT JOIN bpos_room AS room ON room.id = ren.room_id LEFT JOIN bpos_room_floor AS flr ON flr.id = room.floor_id LEFT JOIN bpos_rental_utility_used as ruu ON ruu.rental_id = ren.id WHERE ren.deleted=0 GROUP BY ren.id, peo.id";

  

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

   //var [util] =  await connect.query(query2);
 
   var [service] =  await connect.query(query3);


  

   
   
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
      var water_fee =[];
      var electric_fee=[];
     
      for(var i in rows){
       
        rows[i].checked_in = moment(rows[i].checked_in).format("MM/DD/YYYY");
        rows[i].rentDate = moment(rows[i].rentDate).format("MM/DD/YYYY");
       

          rows[i].electric_pre = rows[i].e_pre_qty;
          rows[i].water_pre = rows[i].w_pre_qty;
      
       // rows[i].water_fee = water_fee[i];
       // rows[i].electric_fee = electric_fee[i];

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
exports.rented_add = (req, res) => {

  var {
        room_id,customer_id,rental_time,checked_in,room_price,
        deposite_price,booked,
        service_id , service_qty , service_price , service_total,
        utility_id , utility_pre_qty , utility_price 
      }= req.body;



  if(checked_in == ''){
    var  Checked_in = null;
  }else{
    var checkIN = new Date(checked_in);
    var Checked_in = moment(checkIN).format('YYYY-MM-DD hh:mm:ss');
  }

  if(rental_time == ''){
    var Rental_time = null;
  }else{
    var RentalTime = new Date(rental_time);
    var Rental_time = moment(RentalTime).format('YYYY-MM-DD hh:mm:ss');
  }


//service 
  var serv_id  = service_id.split(',');
  var serv_qty = service_qty.split(',');
  var serv_pri = service_price.split(',');
  var serv_total= service_total.split(',');

  var serv_length = serv_id.length;

//utility
  var uti_id = utility_id.split(',');
  var uti_pre_qty = utility_pre_qty.split(',');
  var uti_price = utility_price.split(',');

  var uti_lenght = uti_id.length;

  var data1 = [Rental_time,room_id,customer_id,Checked_in,room_price,room_price];

  var query1 = "INSERT INTO bpos_rental SET "+
               " rental_time = ?, "+
               " room_id = ? , customer_id = ? , "+ 
               " checked_in = ?, "+
               " price = ? , total= ?;";


  if(booked==1){
    var query2 = "Update bpos_reservation set rental_id=? where room_id=?";
  }else{
    var query2 =  " INSERT INTO bpos_reservation SET"+
    " reservation_time = ?, "+
    " rental_id=?, room_id = ? , customer_id = ? , "+ 
    " price = ? , checked_in = ?;";
  }
  
  var query3 =  " Insert into bpos_rental_service_used SET "+
                " rental_id = ? , room_id = ? , customer_id = ? , "+ 
                " service_id = ? , qty = ? , price = ? , total= ?;";

  var query4 =  " Insert into bpos_rental_utility_used SET "+
                " rental_id = ? , room_id = ? , customer_id = ? , "+ 
                " utility_id = ? , pre_qty = ? , price=? ;";


  var query5 = "Update bpos_room set rented=1,reserved=1 where id="+room_id+";";

  pool.query(query1,data1,function(err,result1) {
      if (err) {
        console.log("error 1"+err);
        res.status(400).json({msg:'error'});
      }else{
        var rent_id = result1.insertId;
        if(booked==1){
          var data2 = [rent_id,room_id];
        }else{
          var data2 = [Rental_time,rent_id,room_id,customer_id,deposite_price,Checked_in];
        }
        pool.query(query2,data2,function(err,result2){
          if (err) {
            console.log("error 2"+err);
            res.status(400).json({msg:'error'});
          }else{
          
              for(var i=0 ; i < serv_length-1 ; i++){
         
                var data3 = [ rent_id,room_id,customer_id,serv_id[i],serv_qty[i],serv_pri[i],serv_total[i] ];
                pool.query(query3,data3,function(err,result2){
                  if(err){
                    console.log("error3:"+err);
                    res.status(400).json({msg:'error'});
                  }
                })
              }// loop in sert2
              for(var i=0 ; i < uti_lenght ; i++){
                var data4 = [ rent_id,room_id,customer_id,uti_id[i],uti_pre_qty[i],uti_price[i]];
                pool.query(query4,data4,function(err,result3){
                  if(err){
                    console.log("error3:"+err);
                    res.status(400).json({msg:'error'});
                  }
                })
              }// loop in sert2

              pool.query(query5,(err,finish)=>{
                if(err){
                  console.log("error5:"+err);
                  res.status(400).json({msg:'error'});
                }
              })

          } // end else
          
          res.status(200).json({msg:'success'});
        }) /// end query2
      }  // end else
  }) // end query
}
exports.rented_edit = async (req, res) => {
  
  const id = req.params.id;

  var query1 =  " SELECT "+
                " rent.*, "+
                " res.price AS deposite_price "+
                " FROM bpos_rental AS rent  "+
                " JOIN bpos_reservation AS res ON res.rental_id = rent.id "+
                " where rent.id = "+id+" ;";
  //read main

  var query2 = " SELECT  "+
               " utility_id,pre_qty,price "+
               " FROM bpos_rental_utility_used WHERE rental_id = "+id+"; "; 
  // read and past it to rows as utility 
  var query3 =  " SELECT "+
                " GROUP_CONCAT(ser_used.service_id) AS check_id,"+
                " group_concat(ser.id) AS service_id_old , "+
                " group_concat(ser.name) AS name , "+
                " GROUP_CONCAT(IFNULL(ser_used.price,ser.price )) AS price, "+
                " group_concat(IFNULL(ser_used.qty,'1')) AS qty, "+
                " group_concat(IFNULL(ser_used.total,ser.price )) AS total "+
                " FROM bpos_rental_service AS ser "+
                " LEFT JOIN bpos_rental_service_used AS ser_used ON ser_used.service_id = ser.id AND ser_used.rental_id= "+id+"; ";

  var [util] =  await connect.query(query2);

  if(util.length == 0 ){
    console.log("Cannot read utility");
    res.status(400).json({msg:"error"});
  }

  for(var i in util){
    if(util[i].utility_id == 1){
        var eLectric_pre = util[i].pre_qty;
        var electric_fee = util[i].price;
    }else{
      var water_pre = util[i].pre_qty;
      var water_fee =  util[i].price;
    }
  }

  var [service] = await connect.query(query3);



  pool.query(query1,(err,rows)=>{
    if(err){
      console.log(err);
      res.status(400).json({msg:"error"});
    }else{
    
    

      rows[0].checked_in = moment(rows[0].checked_in).format("MM/DD/YYYY");
      rows[0].rentDate = moment(rows[0].rentDate).format("MM/DD/YYYY");

      rows[0].electric_pre = eLectric_pre;
      rows[0].water_pre = water_pre;
      rows[0].electric_fee = electric_fee;
      rows[0].water_fee = water_fee;

      rows[0].service_id = service[0].service_id_old ;
      rows[0].service_name = service[0].name;
      rows[0].service_qty = service[0].qty;
      rows[0].service_price = service[0].price;
      rows[0].service_total = service[0].total;

      if(service[0].check_id==null){
        rows[0].service_check = '';
      }else{
        rows[0].service_check = service[0].check_id;
      }
      
      
      
      res.status(200).json({msg:"success",rows});
    }
  }) 

}
exports.rented_update = async (req, res) => {

  const id = req.params.id; //rental

  var {
    old_room_id,room_id,customer_id,rental_time,checked_in,room_price,
    deposite_price,
    service_id , service_qty , service_price , service_total,
    utility_id , utility_pre_qty , utility_price 
  }= req.body;


  if(checked_in == ''){
    var  Checked_in = null;
  }else{
    var checkIN = new Date(checked_in);
    var Checked_in = moment(checkIN).format('YYYY-MM-DD hh:mm:ss');
  }

  if(rental_time == ''){
    var Rental_time = null;
  }else{
    var RentalTime = new Date(rental_time);
    var Rental_time = moment(RentalTime).format('YYYY-MM-DD hh:mm:ss');
  }


//service 

  var serv_id  = service_id.split(',');
  var serv_qty = service_qty.split(',');
  var serv_pri = service_price.split(',');
  var serv_total= service_total.split(',');

  var serv_length = serv_id.length;

//utility
  var uti_id = utility_id.split(',');
  var uti_pre_qty = utility_pre_qty.split(',');
  var uti_price = utility_price.split(',');

  var uti_lenght = uti_id.length;


var data1 = [Rental_time,room_id,customer_id,Checked_in,room_price,room_price];
var data2 = [Rental_time,id,room_id,customer_id,deposite_price,Checked_in];


var query1 = "UPDATE bpos_rental SET "+
            " rental_time = ?, "+
            " room_id = ? , customer_id = ? , "+ 
            " checked_in = ?, "+
            " price = ? , total= ?"+
            " where id="+id+";";


var query2 =  " UPDATE bpos_reservation SET"+
              " reservation_time = ?, rental_id=?, "+
              " room_id = ? , customer_id = ? , "+ 
              " price = ? , checked_in = ? where rental_id = "+id+";";



var query3 = "Delete from bpos_rental_service_used where rental_id = "+id+";";
var query4 = "Delete from bpos_rental_utility_used where rental_id = "+id+";";




  pool.query(query1,data1,async(err,res)=>{
    if(err){
      console.log("error1"+err);
      res.status(400).json({msg:'error'});
    }else{
      pool.query(query2,data2, async(err,as1)=>{
        if(err){
          console.log("error2"+err);
          res.status(400).json({msg:'error'});
        }else{
          pool.query(query3,async(err,as2)=>{
            if(err){
              console.log("error3"+err);
              res.status(400).json({msg:'error'});
            }else{
              pool.query(query4,async(err,as3)=>{
                if(err){
                  console.log("error4"+err);
                  res.status(400).json({msg:'error'});
                }else{
                    var query5 =  " Insert into bpos_rental_service_used SET "+
                    " rental_id = ? , room_id = ? , customer_id = ? , "+ 
                    " service_id = ? , qty = ? , price = ? , total= ?;";

                    var query6 =  " Insert into bpos_rental_utility_used SET "+
                    " rental_id = ? , room_id = ? , customer_id = ? , "+ 
                    " utility_id = ? , pre_qty = ? , price=? ;";


                      for(var i=0 ; i < serv_length-1 ; i++){
                        var data5 = [ id,room_id,customer_id,serv_id[i],serv_qty[i],serv_pri[i],serv_total[i] ];
                        pool.query(query5,data5,async(err,as4)=>{
                          if(err){
                            console.log("error3:"+err);
                            res.status(400).json({msg:'error'});
                          }
                        })
                      }

                      for(var i=0 ; i < uti_lenght ; i++){
                        var data6 = [ id,room_id,customer_id,uti_id[i],uti_pre_qty[i],uti_price[i]];
                        pool.query(query6,data6,async(err,as5)=>{
                          if(err){
                            console.log("error3:"+err);
                            res.status(400).json({msg:'error'});
                          }
                        })
                      }
                    
                    if(old_room_id!=room_id){
                  
                      var query7 = "Update bpos_room set reserved=0 , rented=0 where id="+old_room_id+";";
                      pool.query(query7,(err,as6)=>{
                        if(err){
                          console.log("Error7:"+err)
                          res.status(400).json({msg:"Errors"});
                        }
                      })

                      var query8 = "Update bpos_room set reserved=1 , rented=1 where id="+room_id+";";
                      pool.query(query8,(err,as7)=>{
                        if(err){
                          console.log("Error7:"+err)
                          res.status(400).json({msg:"Errors"});
                        }
                      })
                  }
                } 
              })
            }
          })
        }
      })
    }
  })
  res.status(200).json({msg:'success'});

}
exports.rented_checkout = async (req, res) => {
  var rental_id = req.params.id;
  var {check_out} = req.body;

  if(check_out == ''){
    var  Checked_out = null;
  }else{
    var checkOUT = new Date(check_out);
    var Checked_out = moment(checkOUT).format('YYYY-MM-DD hh:mm:ss');
  }

  var query1 = " UPDATE bpos_rental SET checked_out =?,deleted=1 WHERE id="+rental_id+";";
  var query2 = " UPDATE bpos_reservation set deleted=1 WHERE id="+rental_id+";";
  var query3 = " UPDATE bpos_room SET rented=0,reserved=0 "+
               " WHERE id IN (SELECT room_id FROM bpos_rental WHERE id="+rental_id+");";

 pool.query(query1,[Checked_out],(err,res1)=>{
   if(err){
     res.status(400).json({msg:"Error"});
   }else{
      pool.query(query2,(err,res1)=>{
        if(err){
          res.status(400).json({msg:"Error"});
        }else{
          pool.query(query3,(err,res1)=>{
            if(err){
              res.status(400).json({msg:"Error"});
            }else{
              res.status(200).json({msg:"Success"})
            }
          })
        }
      })
   }
 }) 

}
exports.rented_deposite = async (req, res) => {
  var rental_id = req.params.id;
  var query = "SELECT price as deposite_price FROM bpos_reservation WHERE deleted=0 AND rental_id="+rental_id+";"

  pool.query(query,(err,rows)=>{
    if(err){
      res.status(400).json({msg:"Error"});
    }else{
      res.status(200).json({rows});
    }
  })

}
exports.rented_delete = (req, res) => {

  const id = req.params.id;
  var query1 = "UPDATE bpos_rental set deleted=1 WHERE id="+id+";";
  pool.query(query1, (err, rows) => {
    if (err) {
      res.json({msg:'error'});
    } else {
      res.json({msg:'success'});
    }
  });

}
exports.rented_service = (req,res)=>{

  var query = " SELECT id,name,price "+
              " FROM bpos_rental_service ";

  pool.query(query,(err,rows)=>{
    if(err){
      res.status(400).json({msg:"Error"});
    }else{
      res.status(200).json({rows});
    }

  })

}
exports.rented_utility = (req,res)=>{

  var query = " SELECT id,name,price "+
              " FROM bpos_rental_utility";

  pool.query(query,(err,rows)=>{
    if(err){
      res.status(400).json({msg:"Error"});
    }else{
      res.status(200).json({rows});
    }

  })

}
exports.room = (req,res)=>{

  var query = " SELECT id,name,number FROM bpos_room WHERE deleted=0 AND rented=0; ";

  pool.query(query,(err,rows)=>{
    if(err){
      res.status(400).json({msg:"Error"});
    }else{
      res.status(200).json({rows});
    }
  })

}
exports.room_edit = (req,res)=>{

  var id = req.params.id;
  var query = " SELECT id,name,number FROM bpos_room WHERE (id="+id+") or (deleted=0 AND rented=0); ";

  pool.query(query,(err,rows)=>{
    if(err){
      res.status(400).json({msg:"Error"});
    }else{
      res.status(200).json({rows});
    }
  })

}
exports.customer = (req,res)=>{

  var query = " SELECT cus.id AS cus_id, "+
              " if(peo.full_name = '',peo.first_name,peo.full_name) AS customer_name "+
              " FROM bpos_customer AS cus "+
              " left join bpos_people AS peo ON peo.customer_id = cus.id ";

  pool.query(query,(err,rows)=>{
    if(err){
      res.status(400).json({msg:"Error"});
    }else{
      res.status(200).json({rows});
    }
  })
}

exports.get_reservation = (req,res)=>{

  var reserv_id = req.params.id;
  var sql = "SELECT * FROM bpos_reservation WHERE room_id="+reserv_id+" AND cancel=0 AND deleted=0;"

  pool.query(sql,(err,rows)=>{
    if(err){
      res.status(400).json({msg:"Error"});
    }else{
      for(var i in rows){

        if(rows[i].checked_in== null){
          rows[i].checked_in='';
        }else{
          rows[i].checked_in = moment(rows[i].checked_in).format('MM/DD/YYYY');
        }

      }
      res.status(200).json({rows});
    }
  })
}


