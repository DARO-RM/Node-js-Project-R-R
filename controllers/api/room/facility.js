//module 
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();

//function
const {connect,pool} = require("../../../utils/connection");

// View Room
exports.view_facility = (req, res) => {
  // User the connection
  pool.query('SELECT * FROM bpos_room_facility where deleted=0', (err, rows) => {
    if(err){
      res.json({msg:'error'});
    }else{
      res.status(200).json({msg:"success",rows});
    }
  });
}

// Add facility
exports.create_facility = (req, res) => {
  const {name, cost, qty , total , note} = req.body;

  var data=[name, cost, qty ,total, note]
  pool.query('INSERT INTO bpos_room_facility SET name = ?, cost = ?, qty = ? ,total = ? , note = ?;', data, (err, rows) => {
    if (!err) {
      res.status(200).json({msg:'success'});
    } else {
      console.log(err);
      res.status(400).json({msg:'error'});
    }
  });
}


exports.update_facility_live = (req, res) => {
  const {id, column_name , value} = req.body;
  // User the connection
  var idint = parseInt(id)

  const data_update = [value,idint];

  
  pool.query('UPDATE bpos_room_facility SET '+column_name+' = ? WHERE id = ?; ', data_update, (err, rows) => {
     if (!err) {
      // User the connection
      pool.query('SELECT * FROM bpos_room_floor WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
          if(err){
            res.status(400).json({msg:'error'});
          }else{
            res.status(200).json({msg:"success",rows});
          }  
      });
    } else {
      res.status(400).json({msg:'error'});
    }
  });
}

// Delete floor
exports.delete_facility = (req, res) => {
  pool.query('UPDATE bpos_room_facility SET deleted= ? WHERE id = ?', [1, req.params.id], (err, rows) => {

    if (!err) {
      res.json({msg:'success'});
    } else {
      console.log(err);
      res.json({msg:'error'});
    }
  });
}




