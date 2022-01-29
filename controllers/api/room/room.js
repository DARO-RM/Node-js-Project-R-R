//module 
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();




const {connect,pool} = require("../../../utils/connection");

// View Room
exports.view_room = async (req, res) => {


 var statement =  " SELECT room.* , flr.name AS floor, pri.price AS price , file.file_data AS image " +  
                  " FROM bpos_room AS room "+
                  " JOIN bpos_room_floor AS flr on flr.id = room.floor_id "+
                  " JOIN bpos_rental_price AS pri on pri.id = room.rental_price_id "+
                  " JOIN bpos_room_file AS file on file.id = room.image_id "+
                  " where room.deleted=0; ";


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

// Search
exports.search_room = (req, res) => {
 
  var search = req.body.search;

  var statement =  " SELECT room.* , flr.name AS floor, pri.price AS price , file.file_data AS image " +  
  " FROM bpos_room AS room "+
  " JOIN bpos_room_floor AS flr on flr.id = room.floor_id "+
  " JOIN bpos_rental_price AS pri on pri.id = room.rental_price_id "+
  " JOIN bpos_room_file AS file on file.id = room.image_id "+
  " where flr.name LIKE '%"+search+"%' OR " +
  " pri.price LIKE '%"+search+"%' OR " +
  " room.name LIKE '%"+search+"%' OR " +
  " room.description LIKE '%"+search+"%' AND " +
  " room.deleted=0 AND flr.deleted=0 AND pri.deleted=0 AND file.deleted=0;"; 

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

// Add Room
exports.create_room = async (req, res) => {
  
  const { floor_id,rental_price_id,facility_id,name,number,description,file_name,file_data} = await req.body;
  

  var image_id = 0;
  
  var data_room=[floor_id,rental_price_id,facility_id,name,number,description,image_id];

  var insert_room =" INSERT INTO bpos_room SET " +
              " floor_id = ?, " +
              " rental_price_id = ?, " +
              " facility_id = ?, " +
              " name = ?, " +
              " number = ?, " +
              " description = ?, " +
              " image_id=? ; ";

  
  var insert_room_file = "Insert into bpos_room_file SET "+
                            " file_name = ?  , " +
                            " file_data = ?  , " +
                            " room_id = ? ; ";

  var update_room = "UPDATE bpos_room SET image_id = ? where id = ?;";


  pool.query(insert_room, data_room, (err, rows) => {
      if (err) {
        console.log("err1"+err)
        res.status(400).json({msg:'error'});
      } else{

        room_id = rows.insertId;
        var data_room_file = [file_name,file_data,room_id];

          pool.query(insert_room_file,data_room_file,function(err,data){
              if(err) {
                console.log("err2"+err)
                res.status(400).json({msg:'error'});
            
              } else{
                var room_file_id =  data.insertId;
                var data_update = [room_file_id,room_id];
                pool.query(update_room,data_update,function(err){
                  if (err) {
                    console.log("err2"+err)
                    res.status(400).json({msg:'error'});
                  } else{
                    res.status(200).json({msg:'success'});
                  }  
                })//update
              }
          })//insert room file
      }
  })//insert room
} //end function

// Edit Room
exports.edit_room = (req, res) => {
  // User the connection
  var id=req.params.id;
  var query_select =  'SELECT room.*,room_f.file_name as FileName,room_f.file_data as FileData '+
                      ' FROM bpos_room room '+
                      ' JOIN bpos_room_file as room_f ON room_f.room_id = room.id '+
                      ' WHERE room.id='+id+' and room.deleted =0; ';
  
  pool.query( query_select, (err, rows) => {
    if(err){
      res.json({msg:'error'});
    }else{
      rows[0].FileData = rows[0].FileData + "";
      res.status('200').json({msg:"success",rows});
    }
    console.log("completed4")
  });

}
// Update Room
exports.update_room = (req, res) => {

  const {floor_id,rental_price_id,facility_id,name,number,description,file_name,file_data} = req.body;
  const id = req.params.id;

  var query_file = 'UPDATE bpos_room_file set file_name="'+file_name+'", '+
                    'file_data ="'+file_data+'" WHERE room_id='+id+';';

  // User the connection
  const data_update = [floor_id, rental_price_id, facility_id, name, number, description, id];


  pool.query('UPDATE bpos_room SET floor_id = ?, rental_price_id = ?, facility_id = ?, name = ?, number = ?, description = ? WHERE id = ?;', data_update, (err, row) => {
      if(err) {
        res.status('400').json({msg:"error"});
      }
  });

 //update file
  if(file_name != "" && file_data!= ""){
    pool.query(query_file,(err)=>{
      if(err){
        res.status('400').json({msg:"error"});
      }else{
        res.status('200').json({msg:"success"});
      }
    })
  }else{
    res.status('200').json({msg:"success"});
  }

}
// Delete Room
exports.delete_room = (req, res) => {
  const id = req.params.id
  pool.query('UPDATE bpos_room SET deleted = 1 WHERE id = ?', [id], (err, rows) => {
    if (!err) {
      res.json({msg:'success'});
    } else {
      console.log(err);
      res.json({msg:'error'});
    }
  });
}

exports.price_select = (req,res)=>{

 var statement = 'SELECT * FROM bpos_rental_price where deleted=0;' 
  pool.query(statement, (err, rows) => {
    
    if(err){
      res.status('400').json({msg:'error'});
    }else{
      console.log("finish select");
      res.status('200').json({msg:"success",rows});  
    }
  });
}




