const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();

const {connect,pool} = require("../../../utils/connection");



exports.view = async (req, res) => {

  var query =  ' SELECT pro.*, '+
               ' if(pro.customer_id = "0","", peo1.full_name ) AS customer_name ,'+
               ' if(pro.dependent_id = "0","", peo2.full_name) AS dependent_name,'+
               ' p_file.file_data AS image  '+
               ' FROM bpos_customer_property AS pro '+
               ' LEFT JOIN bpos_people AS peo1 ON peo1.customer_id = pro.customer_id '+
               ' LEFT JOIN bpos_people AS peo2 ON peo2.dependent_id = pro.dependent_id '+
               'LEFT JOIN bpos_people_file AS p_file ON p_file.property_id = pro.id'+
               ' WHERE pro.deleted = 0 '+
               ' ORDER BY pro.id desc; ';

      pool.query(query, (err, rows) => {
         //console.log(rows) 
        if (err) {
          res.status(400).json({msg:'error'});
        } else {
          for(var i in rows){
            rows[i].image = rows[i].image + "";
          }
          res.status('200').json({rows});
        }
     });
 }
 
 exports.add = (req, res) => {
   const {customer_id,dependent_id,name,qty, description,file_name,file_data} = req.body;
   var image_id = "0";
   var data1 = [customer_id,dependent_id,name , qty, description];

   var query1 = " INSERT INTO bpos_customer_property SET customer_id =?, dependent_id=?,name = ?, qty= ?, description= ? ,image_id=0 ;"
   var query2 = "INSERT INTO bpos_people_file SET file_name=? , file_data=? ,property_id = ?;"
   var query3 = "UPDATE bpos_customer_property SET image_id = ? where id=?;";

   pool.query(query1,data1, (err, result1) => {
      if (err) {
        console.log("err1"+err)
        res.status(400).json({message:"error"});
      } else {
        var property_id = result1.insertId;
        var data2 = [file_name,file_data,property_id];
        pool.query(query2,data2, (err, result2) => {
          if (err) {
            console.log("err2"+err)
            res.status(400).json({message:"error"});
          }else{
            var image_id = result2.insertId;
            var data3 = [ image_id ,property_id ]
            pool.query(query3,data3, (err, result3) => {
              if (err) {
                console.log("err3"+err)
                res.status(400).json({message:"error"});
              }else{
                res.status(200).json({message:"success"});
              }
            })
          }
        })
      }
  });
 }
 
 exports.edit =  (req, res) => {
   var pro_id = req.params.id

   var query =' SELECT pro.*,peo1.full_name AS customer_name ,peo2.full_name AS dependent_name , p_file.file_data AS FileData , p_file.file_name as FileName , p_file.id as file_id'+
         ' FROM bpos_customer_property AS pro ' +
         ' LEFT JOIN bpos_people AS peo1 ON peo1.customer_id = pro.customer_id '+
         ' LEFT JOIN bpos_people AS peo2 ON peo2.dependent_id = pro.dependent_id '+
         ' LEFT JOIN bpos_people_file AS p_file ON p_file.property_id = pro.id '+
         ' WHERE pro.id = '+pro_id+'; '
      
         pool.query(query, (err, rows) => {
       //console.log(rows) 
       if (err) {
           
            res.status(400).json({msg:'error'});
       } else {

        for(var i in rows){
          rows[i].FileData = rows[i].FileData + "";
        }
        res.status(200).json({rows});
       }
 
   });
 }
 
 exports.update = async (req, res) => {
   const {customer_id,dependent_id, name , qty, description,file_name,file_data } = req.body;
   const id =  req.params.id;
  
   const data_update1 = [ customer_id,dependent_id, name , qty, description,id];

   var query1 = "UPDATE bpos_customer_property SET customer_id =?, dependent_id=?,name = ?, qty= ?, description= ? where id=? ;"

   var query2 = 'UPDATE bpos_people_file set file_name="'+file_name+'", '+'file_data ="'+file_data+'" WHERE property_id = '+ id +'; ';


   pool.query(query1 , data_update1, async (err, rows) => {
     if (err) {
      console.log("err1"+err)
       await res.status(400).json({msg:'error'});
      }
   })

    
  if(file_name != "" && file_data!= ""){
      pool.query(query2, async (err)=>{
      if(err){
        console.log("err2"+err)
        res.status(400).json({msg:"error"});
      }else{
        res.status(200).json({msg:"success"});
      }
    })
  }else{
    res.status(200).json({msg:"success"});
  }




 }
 
 exports.deleted = async (req, res) => {
  
  pool.query('UPDATE bpos_customer_property SET deleted=1 WHERE id = ?', [req.params.id], (err, rows) => {
     if (err) {
      res.status(400).json({msg:'error'});
     }else{
      res.status(200).json({msg:'success'});
     }
   });
 
 }
 
exports.search = async (req,res)=>{
 
  var keyword = req.body.search;

  var mysql = ' SELECT DISTINCT pro.*,peo1.full_name AS customer_name ,peo2.full_name AS dependent_name, p_file.file_data AS image  '+
              ' FROM bpos_customer_property AS pro '+
              ' LEFT JOIN bpos_people AS peo1 ON peo1.customer_id = pro.customer_id '+
              ' LEFT JOIN bpos_people AS peo2 ON peo2.dependent_id = pro.dependent_id '+
              ' LEFT JOIN bpos_people_file AS p_file ON p_file.property_id = pro.id'+
              ' WHERE ( pro.name LIKE "%'+keyword+'%" AND pro.deleted=0 )'+
              ' OR ( pro.qty LIKE "%'+keyword+'%" AND pro.deleted=0 )  ' +
              ' OR ( pro.description LIKE "%'+keyword+'%" AND pro.deleted=0 )  ' +
              ' OR ( pro.description LIKE "%'+keyword+'%" AND pro.deleted=0 );';

  pool.query(mysql, async (err,rows)=>{
    if(err){
      console.log(err);
      await res.json({msg:'error'});
    }else{
      for(var i in rows){
        rows[i].image = rows[i].image + "";
      }
      await res.status('200').json({rows});
    }
  });


}
 

 
 
 
 
 
 
 