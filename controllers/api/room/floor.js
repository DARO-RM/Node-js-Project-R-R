//module 
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();

//function
const {connect,pool} = require("../../../utils/connection");

// View Room
exports.view_floor = (req, res) => {
  // User the connection
  pool.query('SELECT * FROM bpos_room_floor where deleted=0', (err, rows) => {
    if(err){
      res.json({msg:'error'});
    }else{
      res.status('200').json({msg:"success",rows});
    }
  });
}

// Add new user
exports.create_floor = (req, res) => {
  const {name, number, note} = req.body;
  var data=[name, number, note]
  pool.query('INSERT INTO bpos_room_floor SET name = ?, number = ?, note = ?;', data, (err, rows) => {
    if (!err) {
      res.json({msg:'success'});
    } else {
      console.log(err);
      res.json({msg:'error'});
    }
  });
}

exports.update_floor_live = (req, res) => {
  const {id, column_name , value} = req.body;
  // User the connection
  var idint = parseInt(id)

  const data_update = [value,idint];
  
  pool.query('UPDATE bpos_room_floor SET '+column_name+' = ? WHERE id = ?; ', data_update, (err, rows) => {
     if (!err) {
      // User the connection
      pool.query('SELECT * FROM bpos_room_floor WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
          if(err){
            res.json({msg:'error'});
          }else{
            res.status('200').json({msg:"success",rows});
          }
        
      });
    } else {
      console.log(err);
    }
  });
}



// Delete floor
exports.delete_floor = (req, res) => {
  pool.query('UPDATE bpos_room_floor SET deleted= ? WHERE id = ?', [1, req.params.id], (err, rows) => {

    if (!err) {
      res.json({msg:'success'});
    } else {
      console.log(err);
      res.json({msg:'error'});
    }
  });
}




