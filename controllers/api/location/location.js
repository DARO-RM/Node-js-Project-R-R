const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();


const {connect,pool} = require("../../../utils/connection");


// View location
exports.location_view = (req, res) => {
  // User the connection
  var query = "SELECT id,company_name,company_logo,location_name,phone,fax,email,website,address FROM bpos_app_location WHERE deleted = 0;";
  pool.query(query, (err, rows) => {
    if(err){
      console.log(err)
      res.status(400).json({msg:'error'});
    }else{
      for(var i in rows){
        rows[i].company_logo+= "";
      }
      res.status(200).json({rows});
    }
  });
}

// Search location
exports.location_search = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  pool.query('SELECT * FROM bpos_app_location WHERE location_name LIKE ? OR phone LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if(err){
      res.json({msg:'error'});
    }else{
      res.status(200).json({msg:"success",rows});
    }
    console.log("search")
  });
}

// Add new  location
exports.location_add = (req, res) => {
  const { company_name, company_logo, location_name, phone, fax,email,website,address,policy } = req.body;

  // User the connection
  var query = "INSERT INTO bpos_app_location SET company_name=?, company_logo=?, location_name=?, phone=?, fax=?, email=?, website=?, address=?, policy=?;"
  data=[company_name, company_logo, location_name, phone, fax,email,website,address,policy];
  pool.query(query,data, (err, rows) => {
    if(err) {
      console.log(err);
      res.status(400).json({msg:'error'}); 
    } else {
      res.status(200).json({msg:"success"});
    }
  });
}

// Edit location
exports.location_edit = (req, res) => {
  // the connection
  var id = req.params.id;
  pool.query('SELECT id,company_name,company_logo,location_name,phone,fax,email,website,address FROM bpos_app_location WHERE deleted = 0 AND id=?;', [id], (err, rows) => {
    if(err){
      res.json({msg:'error'});
    }else{
      for(var i in rows){
        rows[i].company_logo+= "";
      }
      res.status(200).json({msg:"success",rows});
    }
  });
}



// update location
exports.location_update = (req, res) => {

  const { conpany_name,company_logo, location_name, phone, fax,email,website,address,policy } = req.body;
  var query='';
  // User the connection

  if(company_logo == ''){
    query += 'UPDATE bpos_app_location SET company_name=?, location_name=?, phone=?, fax=?,email=?,website=?,address=?,policy=? WHERE id = ?;';
  }else{
    query += 'UPDATE bpos_app_location SET company_name=?, company_logo="'+company_logo+'",  location_name=?, phone=?, fax=?,email=?,website=?,address=?,policy=? WHERE id = ?;';
  }

  const data_update = [ conpany_name, location_name, phone, fax,email,website,address,policy, req.params.id];

  pool.query(query, data_update, (err, rows) => {
     if (err) {
       console.log(err)
      res.json({msg:'error'});
    } else {
      res.json({msg:'success'});
    }
  });
}

// delete location
exports.location_delete = (req, res) => {
  pool.query('UPDATE bpos_app_location SET deleted = ? WHERE id = ?', ['1', req.params.id], (err, rows) => {
    if (!err) {
      res.status(200).json({msg:'success'});
    } else {
      console.log(err);
      res.status(400).json({msg:'error'});
    }
  });

}

exports.delete_file= (req, res) => {
  pool.query('UPDATE bpos_app_location SET company_logo= "" WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.status(200).json({msg:'success'});
    } else {
      console.log(err);
      res.status(400).json({msg:'error'});
    }
  });

}


