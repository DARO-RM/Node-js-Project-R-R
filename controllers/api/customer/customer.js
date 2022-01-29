const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();
var moment = require('moment');
const {connect,pool} = require("../../../utils/connection");
// Customers View

exports.view = async (req, res) => {
  
  var query = " select peo.* , p_file.file_data AS image "+
              " from bpos_customer as cus "+
              " JOIN bpos_people as peo on peo.customer_id=cus.id " +
              " LEFT JOIN bpos_people_file AS p_file ON p_file.id = peo.image_id "+
              " where cus.deleted=0 "+
              " ORDER BY cus.id desc;";

      pool.query(query,function(err,rows){
        if(err){
          res.json({msg:'error'});
        }else{

            for(var i in rows){
              rows[i].image = rows[i].image + "";
            }
          res.status(200).json({rows});
        }
      });
}

exports.add = (req, res) => {

 var { first_name, last_name, full_name, account_number, sex, phone_1, phone_2, email, facebook, telegram,work, company_name, company_address, national_number, national_number_expire, visa_number, visa_number_expire,    passport_number,  passport_number_expire ,  address_1, address_2, dob, age, pob, country, city, district,commune, village, zip_code, description ,file_name ,file_data } = req.body;

  if(national_number_expire==''){
    var Nation_Expire=null;
  }else{
    var nation = new Date(national_number_expire);
    var Nation_Expire = moment(nation).format('YYYY-MM-DD hh:mm:ss');
  }

  if(visa_number_expire == ''){
    var  Visa_Expire = null;
  }else{
    var visa = new Date(visa_number_expire);
    var Visa_Expire = moment(visa).format('YYYY-MM-DD hh:mm:ss');
  }

  if(passport_number_expire == ''){
  var  Passport_Expire  = null;
  }else{
    var passport = new Date(passport_number_expire);
    var Passport_Expire = moment(passport).format('YYYY-MM-DD hh:mm:ss');
  }

  if( dob == ''){
   var  dOb  = null;
  }else{
    var Dateofbirth = new Date(dob);
    var dOb = moment(Dateofbirth).format('YYYY-MM-DD hh:mm:ss');
  }

  if( age == ''){
    age = null;
  }


 var image_id=0;
 var customer_id_new=0;

 var query1 =  " INSERT INTO bpos_customer set people_id = 0; ";
 var query2 =  " INSERT INTO bpos_people SET "+
               " customer_id=?, first_name = ?, last_name = ?, full_name = ?, "+
               " account_number = ?, sex = ?, "+
               " phone_1 = ?, phone_2 = ?, "+
               " email = ?, facebook = ?, telegram = ?, work=? ,"+
               " company_name = ?, company_address = ?, "+
               " national_number = ?, national_number_expire = ?, "+
               " visa_number = ?, visa_number_expire = ?,"+
               " passport_number = ?, passport_number_expire = ?, "+
               " address_1 = ?, address_2 = ?, "+
               " dob = ?,  age = ?, pob = ?, "+
               " country = ?,city = ? ,district = ? ,commune = ?,village = ?, "+
               " zip_code = ?, description = ?, image_id = ? ;";

var query3 = "INSERT INTO bpos_people_file set file_name= ? , file_data = ? , people_id = ?;";
var query4 = "UPDATE bpos_people set image_id = ? where id=?;";
var query5 = "UPDATE bpos_customer set people_id=? where id=?";

 pool.query(query1,function(err,result1) {
   if (err) {
     console.log("error 1");
     res.status(400).json({msg:'error'});
   } else {
     customer_id_new = result1.insertId;
     
     var data2 = [customer_id_new,first_name , last_name, full_name, account_number, sex, phone_1, phone_2, email, facebook, telegram,work, company_name, company_address, national_number, Nation_Expire , visa_number, Visa_Expire , passport_number, Passport_Expire, address_1, address_2, dOb , age, pob, country, city,district, commune, village, zip_code, description, image_id]

     pool.query(query2, data2, (err, result2) => {
        if(err){
          console.log("error 2"+err)
           res.status(400).json({msg:'error'});
         }else{
          var people_id_new = result2.insertId;
          var data3 = [file_name,file_data,people_id_new];
           pool.query(query3,data3,(err,result3)=>{
            if(err){
              console.log("error 3")
              res.status(400).json({msg:'error'});
            }else{
              var image_id = result3.insertId;
              var data4 = [image_id,people_id_new];
              pool.query(query4,data4,(err,respond)=>{
                if(err){
                  console.log("error 4")
                  console.log(err)
                  res.status(400).json({msg:'error'});
                }else{
                  var data5 = [people_id_new,customer_id_new];
                  pool.query(query5,data5,(err,respond)=>{
                    if(err){
                      console.log("error 5")
                      res.status(400).json({msg:'error'});
                    }else{
                      res.status(200).json({msg:"success"})
                    }
                  })
                }
              })

            }

           })
         }
    }) //end query
   }
 }) //end query 1 
}//end function
// Edit 
exports.edit = async (req, res) => {
  
   var query1 = " Select peo.* , p_file.file_data AS FileData , p_file.file_name as FileName , p_file.id as file_id"+
              " From bpos_customer as cus "+
              " JOIN bpos_people as peo on peo.customer_id=cus.id " +
              " LEFT JOIN bpos_people_file AS p_file ON p_file.id = peo.image_id "+
              " where cus.id = ? AND cus.deleted=0 "; 

    pool.query(query1, [req.params.id],(err,rows)=>{
   if(err){
     res.json({msg:'error'});
   }else{
    for(var i in rows){

      if(rows[i].national_number_expire== null){
        rows[i].national_number_expire='';
      }else{
        rows[i].national_number_expire = moment(rows[i].national_number_expire).format('MM/DD/YYYY');

      }

      if(rows[i].visa_number_expire== null){
        rows[i].visa_number_expire='';
      }else{
        rows[i].visa_number_expire = moment(rows[i].visa_number_expire).format('MM/DD/YYYY');
      }

      if(rows[i].passport_number_expire== null){
        rows[i].passport_number_expire='';
      }else{
        rows[i].passport_number_expire = moment(rows[i].passport_number_expire).format('MM/DD/YYYY');
      }

      if(rows[i].dob== null){
        rows[i].dob='';
      }else{
        rows[i].dob = moment(rows[i].dob).format('MM/DD/YYYY');
      }

      rows[i].FileData = rows[i].FileData + "";
    }
     res.status(200).json({rows});
   }
 });
}

exports.update = (req, res) => {

  const id = req.params.id;

  var {first_name, last_name, full_name, account_number, sex, phone_1, phone_2, email, facebook, telegram, work, company_name, company_address, national_number, national_number_expire,visa_number, visa_number_expire, passport_number, passport_number_expire, address_1, address_2, dob, age, pob, country, city, district, commune, village, zip_code, description,file_name, file_data} = req.body;



  if(national_number_expire == ''){
    var Nation_Expire=null;
  }else{
    var nation = new Date(national_number_expire);
    var Nation_Expire = moment(nation).format('YYYY-MM-DD hh:mm:ss');
  }

  if(visa_number_expire == ''){
    var  Visa_Expire = null;
  }else{
    var visa = new Date(visa_number_expire);
    var Visa_Expire = moment(visa).format('YYYY-MM-DD hh:mm:ss');
  }

  if(passport_number_expire == ''){
    var  Passport_Expire  = null;
  }else{

    var passport = new Date(passport_number_expire);
    var Passport_Expire = moment(passport).format('YYYY-MM-DD hh:mm:ss');

  }

  if( dob == ''){
   var  dOb  = null;
  }else{
    var Dateofbirth = new Date(dob);
    var dOb = moment(Dateofbirth).format('YYYY-MM-DD hh:mm:ss');
  }

  if( age == ''){
    age = null;
  }

  // User the connection
  const data_update = [ first_name, last_name, full_name, account_number, sex, phone_1, phone_2, email, facebook, telegram,work, company_name, company_address, national_number, Nation_Expire,visa_number, Visa_Expire, passport_number, Passport_Expire, address_1, address_2, dOb, age, pob, country, city,district, commune, village, zip_code, description, id];

  var query1 = "UPDATE bpos_people SET  "+
              " first_name = ?, last_name = ?, full_name = ?,  "+
              " account_number = ?, sex = ?, phone_1 = ?, phone_2 = ?,  "+
              " email = ?,facebook = ?,telegram = ?, work=?, "+
              " company_name = ?,company_address = ?,  "+
              " national_number = ?,national_number_expire = ?,  "+
              " visa_number = ?,visa_number_expire = ?,  "+
              " passport_number = ?,passport_number_expire = ?,  "+
              " address_1 = ?,address_2 = ?,  "+
              " dob = ?,age = ?,pob = ?, "+
              " country = ?,city = ?, district = ? , commune = ?,village = ?,  "+
              " zip_code = ?,description = ? where customer_id=? ;"
   
   var query2 = 'UPDATE bpos_people_file set file_name="'+file_name+'", '+'file_data ="'+file_data+'" WHERE people_id in (select id from bpos_people where customer_id ='+id+');';

  
  pool.query(query1, data_update, (err, rows) => {
    if (err) {
      console.log("err1"+err)
        res.status(400).json({msg:"Error"});
    } 
  })


  if(file_name != "" && file_data!= ""){
    pool.query(query2,(err)=>{
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

exports.deleted = (req, res) => {
  
  pool.query('UPDATE bpos_customer SET deleted = 1 WHERE id = ?;', [req.params.id], (err, rows) => {
    if (err) {
      res.json({msg:'error'});
    } else{
      res.json({msg:'success'});
    }
  });
}

exports.search = async (req, res) => {
var keyword = req.body.search;
var sql = "SELECT peo.*, p_file.file_data AS image "+
            "FROM bpos_customer as cus "+
            "JOIN bpos_people as peo on peo.customer_id=cus.id "+
            "LEFT JOIN bpos_people_file as p_file on p_file.people_id = peo.id "+
            "WHERE (peo.first_name LIKE '%"+ keyword +"%' OR peo.last_name LIKE '%"+ keyword +"%' OR peo.phone_1 LIKE '%"+ keyword +"%' OR peo.address_1 LIKE '%"+ keyword +"%' OR peo.work LIKE '%"+ keyword +"%') AND cus.deleted=0 ORDER BY cus.id,peo.customer_id DESC";
  pool.query(sql, async (err,rows)=>{
    if(err){
      //console.log(err);
      res.json({msg:err});
    }else{
      for(var i in rows){
        rows[i].image = rows[i].image +"";;
      }
      await res.status('200').json({rows});
    }
  });
}
  

exports.delete_file  = (req, res) => {

  const id=req.params.id;

  var query1 = "Update bpos_people_file set file_name='', file_data='' WHERE id="+id+";";
 
  pool.query(query1, (err,res1)=>{
    if(err){
      console.log(err);
      res.status(400).json({msg:"error"});
    }else{
      res.status(200).json({msg:"Success"})
    }
  })
}
