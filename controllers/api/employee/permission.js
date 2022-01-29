const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();


const {connect,pool} = require("../../../utils/connection");


exports.permission_view = async (req, res) => {
  
  var mysql = "SELECT * FROM bpos_employee_permission where deleted=0;";
   
        pool.query(mysql,function(err,rows){
          if(err){
            res.json({msg:'error'});
          }else{
            res.status('200').json({msg:"success",rows});
          }
        });
}
exports.action_append = async (req, res) => {

  var mysql = "SELECT * FROM bpos_employee_action;";
   
        pool.query(mysql,function(err,rows){
          if(err){
            res.status(400).json({msg:'error'});
          }else{
            res.status(200).json({msg:"success",rows});
          }
        });
}
exports.permission_add = async (req, res) => {

  const {name, description, action_id} = req.body;
  
  var action = action_id.split(',');
  var lenght_action = action.length;

  var query1 = "INSERT INTO bpos_employee_permission SET name = ?, description = ?;";
  var query2 = "INSERT INTO bpos_employee_permission_action SET permission_id = ?, action_id= ?;";

  var data1=[name, description]
  pool.query(query1, data1, async (err, rows) => {
    if (err) {
      console.log("error1");
      res.json({msg:'error'});
    } else {
      var permission_id = rows.insertId;
      try{
        for(var i=0 ; i < lenght_action-1 ; i++){

          var action_id = action[i];
          var data2 = [permission_id,action_id];
        
          await connect.query(query2,data2);

        }
      }catch(err){
         console.log(err);
      }finally {
        res.status(200).json({msg:'success'});
      }
    }
  });
}
exports.permission_edit = async (req, res) => {
  
  var query1 = " select per.* , GROUP_CONCAT( per_ac.action_id ) AS action_id "+
               " from bpos_employee_permission AS per "+
               " Left JOIN bpos_employee_permission_action AS per_ac "+
               " ON per_ac.permission_id = per.id "+
               " WHERE per.id=? and per.deleted=0 "+
               " GROUP BY per.id ;"; 

    pool.query(query1, [req.params.id],async(err,rows)=>{
        if(err){
        res.status(400).json({msg:'error'});
        }else{
          await res.status(200).json({msg:"success",rows});
        }
    });

}
exports.permission_update =async (req, res) => {

  const {name, description, action_id} = req.body;
  const id = req.params.id;

    var action = action_id.split(',');
    var lenght_action = action.length;


    var query1 = "Update bpos_employee_permission SET name = ?, description = ? where id=?;";
    var query2 = "DELETE FROM bpos_employee_permission_action WHERE permission_id = ?;"
    var query3 = "INSERT INTO bpos_employee_permission_action SET permission_id = ?, action_id= ?;";

    var data1=[name, description,id]
    pool.query(query1, data1, async (err,old) => {
      if (err) {
        console.log("error1");
        res.status(400).json({msg:'error'});
      } else {
        pool.query(query2,[id],async (err,old) => {
          if (err) {
            console.log("error2");
            res.status(400).json({msg:'error'});
          } else {
              for(var i=0 ; i < lenght_action-1 ; i++){
                var action_id = action[i];
                var data3 = [id,action_id];
                
                await connect.query(query3,data3);
                   
                // pool.query(query3, data3, async(err, rows2)=>{
                //   if(err){
                //     console.log("error2");
                //     res.status(400).json({msg:'error'});
                //   }
                // })

              }
             await res.status(200).json({msg:'success'});
          }      
        })
      }
    });
}
exports.permission_delete = (req, res) => {
  
  pool.query('UPDATE bpos_employee_permission SET deleted = 1 WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      // res.render('add-user', { alert: 'User added successfully.' });
      res.json({msg:'success'});
    } else {
      console.log(err);
      res.json({msg:'error'});
    }
    console.log("completed Delete")
  });
}
exports.permission_search = async (req, res) => {
  
  var searchTerm = req.body.search;

  var mysql = " SELECT * FROM bpos_employee_permission "+
              " WHERE name LIKE '%"+searchTerm+"%' "+
              " OR  description LIKE '%"+searchTerm+"%' "+
              " AND deleted=0;";

  pool.query(mysql,(err,rows)=>{
    if(err){
      console.log(err)
      res.json({msg:'error'});
    }else{
      res.status('200').json({msg:"success",rows});
    }
  });
}
