const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();
var moment = require('moment');
const {connect,pool} = require("../../../utils/connection");




// View Room
exports.available = async (req, res) => {


  var statement =  " SELECT room.* , flr.name AS floor, pri.price AS price , file.file_data AS image " +  
                   " FROM bpos_room AS room "+
                   " JOIN bpos_room_floor AS flr on flr.id = room.floor_id "+
                   " JOIN bpos_rental_price AS pri on pri.id = room.rental_price_id "+
                   " JOIN bpos_room_file AS file on file.id = room.image_id "+
                   " where room.deleted=0 AND room.rented=0 AND room.reserved=0; ";
 
   // User the connection
   pool.query(statement,async (err, rows) => {
     if(err){
       res.json({msg:'error'});
     }else{
       
 
       for(var i in rows){
         rows[i].image = rows[i].image + "";
       }
 

       for(var i in rows){
           var facility = "" + rows[i].facility_id;
           var new_facility = "";
 
           var facility_number = facility.split(',');
 
           for(var j=0 ; j < facility_number.length-1 ; j++){
             var statement_facility = "select name from bpos_room_facility where id = "+facility_number[j]+" ;";
             var [data] = await connect.query(statement_facility);
 
             if(j == facility_number.length-2){
               new_facility += "" +data[0].name ;
             }else{
               new_facility += "" + data[0].name +", ";
             }
         }
         rows[i].facility_id = new_facility;
       }
       res.status('200').json({msg:"success",rows});
     }
 
   });
}
 
exports.booked_view = async (req, res) => {

  var statement =   " SELECT res.id as id,  room.id as roomId , room.name AS roomName, "+
                    " if(file.file_data='','',file.file_data) AS image, "+
                    " if(peo.full_name='',peo.first_name,peo.full_name) AS customerName,  "+
                    " if(peo.phone_1 = '',peo.phone_2,peo.phone_1) AS customerPhone,  "+
                    " flr.name as floorName,"+
                    " res.price AS deposite, "+
                    " res.checked_in AS checked_in  "+
                    " from bpos_reservation AS res  "+
                    " LEFT JOIN bpos_people AS peo ON peo.customer_id = res.customer_id  "+
                    " LEFT JOIN bpos_room AS room ON room.id = res.room_id  "+
                    " LEFT JOIN bpos_room_floor AS flr on flr.id = room.floor_id   "+
                    " LEFT JOIN bpos_rental_price AS pri on pri.id = room.rental_price_id  "+
                    " LEFT JOIN bpos_people_file AS file on file.id = peo.image_id "+
                    " where room.deleted=0 AND room.rented=0 AND room.reserved=1 AND res.cancel=0 AND res.deleted=0; ";       
  
 
   // User the connection
   pool.query(statement,async (err, rows) => {
     if(err){
       console.log("error"+err);
       res.json({msg:'error'});
     }else{
       
       for(var i in rows){    

            rows[i].image += "";
            rows[i].checked_in = moment(rows[i].checked_in).format("MM/DD/YYYY");

       }
 

       res.status(200).json({msg:"success",rows});
     }
 
   });
}

exports.booked = async (req, res) => {

 const id = req.params.id;

 var {customer_id,customer_name,customer_phonenumber,deposit,checked_in,description} = req.body;

 var newCus = 0; 


  if(customer_id == "0"){
      newCus = 1;
  }


  if(checked_in == ''){
    var  Checked_in = null;
  }else{
    var checkIN = new Date(checked_in);
    var Checked_in = moment(checkIN).format('YYYY-MM-DD hh:mm:ss');
  }

 var query1 = " INSERT INTO bpos_customer SET people_id=0;";
 var query2 = " INSERT INTO bpos_people SET customer_id= ? , full_name = ? , phone_1= ?;";
 var query3 = " Update bpos_customer set people_id=? where id=?";
 var query4=  "  INSERT INTO bpos_reservation SET "+
              "  room_id = ? , "+
              "  customer_id = ?, "+
              "  price= ? , "+
              "  checked_in = ?, "+
              "  description = ? ;";
var query5 = "Update bpos_room set reserved=1 where id="+id+";";



  if(newCus == 1 ){
    pool.query(query1, (err,rows)=>{
      if(err){
        console.log('error1',err);
        res.status(400).json({msg:"error"});
      }else{
        var customerID = rows.insertId;
        var data2=[customerID,customer_name,customer_phonenumber];
        pool.query(query2,data2,(err,rows1)=>{
          if(err){
            console.log('error2',err);
            res.status(400).json({msg:"error"});
          }else{
            var people_id = rows1.insertId;
            var data3=[customerID,people_id];
            pool.query(query3,data3, (err,answer)=>{
              if(err){
                console.log('error3',err);
                res.status(400).json({msg:"error"});
              }else{
                var data4 = [id,customerID,deposit,Checked_in,description];
                  pool.query(query4,data4,async (err,answer)=>{
                      if(err){
                        console.log('error4',err);
                        res.status(400).json({msg:"error"});
                      }else{
                        pool.query(query5,async (err,answer)=>{
                            if(err){
                              console.log('error5',err);
                              res.status(400).json({msg:"error"});
                            }else{
                              res.status(200).json({msg:"success"});
                            }
                        })//end pool5
                      }
                  })//end pool4
              }
            })//end 3
          }
        }) //end 2
      }
    })//end pool
   }else if(newCus == 0){

    var data4 = [id,customer_id,deposit,Checked_in,description];
        pool.query(query4,data4,async (err,rows1)=>{
            if(err){
              console.log('error1',err);
              res.status(400).json({msg:"error"});
            }else{
              pool.query(query5,async (err,answer)=>{
                  if(err){
                    console.log('error2',err);
                    res.status(400).json({msg:"error"});
                  }else{
                    res.status(200).json({msg:"success"});
                  }
              })//end pool2 
            }

        })//end pool1
   }
 }


exports.cancel_booked = async (req, res) => {
  var room_id = req.params.id;
  
  var query1 = "Update bpos_reservation set cancel=1 where room_id="+room_id+";";
  var query2 = "Update bpos_room set reserved = 0 where id="+room_id+";";
  
  pool.query(query1,(err,res)=>{
    if(err){
      console.log(err);
      res.status(400).json({msg:"error"});
    }
  })

  pool.query(query2,(err,res)=>{
    if(err){
      console.log(err);
      res.status(400).json({msg:"error"});
    }
  })
  res.status(200).json({msg:"success"});
}
 


exports.price = async (req,res)=>{

  var query = "SELECT id,price,unit FROM bpos_rental_price;";
  
  pool.query(query,function(err,rows){
    if(err){
      console.log(err);
      res.status(400).json({msg:"Error"});
    }else{
      res.status(200).json({rows});
    }
  })

}