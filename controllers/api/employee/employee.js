//module 
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();
var moment = require('moment');

const {connect,pool} = require("../../../utils/connection");


exports.employee_view = async (req, res) => {
  
  var mysql = " select peo.* , p_file.file_data AS image "+
              " from bpos_employee as em "+
              " JOIN bpos_people as peo on peo.employee_id= em.id " +
              " LEFT JOIN bpos_people_file AS p_file ON p_file.id = peo.image_id "+
              " where em.deleted=0; ";
   
        pool.query(mysql,function(err,rows){
          if(err){
            res.status(400).json({msg:'error'});
          }else{
              for(var i in rows){
                rows[i].image = rows[i].image + "";
              }
            res.status(200).json({msg:"success",rows});
          }
        });
}
exports.employee_add = async (req, res) => {

  var { first_name, last_name, full_name, account_number, sex, phone_1, phone_2, email, facebook, telegram,work, company_name, company_address, national_number, national_number_expire,visa_number, visa_number_expire, passport_number, passport_number_expire, address_1, address_2, dob, age, pob, country, city, commune, village, zip_code, description ,file_name ,file_data ,phone_number,password,permission_id} = req.body;

  
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

  const hashPass = await bcrypt.hash(password, 12);

  var image_id=0;
  var employee_id_new=0;

    var query1 =  " INSERT INTO bpos_employee set people_id = 0 , username=? , password=?; ";
    var query2 =  " INSERT INTO bpos_people SET "+
                  " employee_id=?, first_name = ?, last_name = ?, full_name = ?, "+
                  " account_number = ?, sex = ?, "+
                  " phone_1 = ?, phone_2 = ?, "+
                  " email = ?, facebook = ?, telegram = ?, work = ? , "+
                  " company_name = ?, company_address = ?, "+
                  " national_number = ?, national_number_expire = ?, "+
                  " visa_number = ?, visa_number_expire = ?,"+
                  " passport_number = ?, passport_number_expire = ?, "+
                  " address_1 = ?, address_2 = ?, "+
                  " dob = ?,  age = ?, pob = ?, "+
                  " country = ?,city = ?,commune = ?,village = ?, "+
                  " zip_code = ?, description = ?, image_id = ? ;";

    var query3 = "INSERT INTO bpos_people_file set file_name= ? , file_data = ? , people_id = ?;";
    var query4 = "UPDATE bpos_people set image_id = ? where id=?;";
    var query5 = "UPDATE bpos_employee set people_id=? where id=?";
    var query6 = "Insert into bpos_employee_permission_employee set employee_id=?, permission_id=? ;"


    pool.query(query1,[phone_number,hashPass],function(err,result1) {
      if (err) {
        console.log("error 1");
        res.status(400).json({msg:'error'});
      } else {
        employee_id_new = result1.insertId;
        
        var data2 = [employee_id_new,first_name , last_name, full_name, account_number, sex, phone_1, phone_2, email, facebook, telegram, work, company_name, company_address, national_number, Nation_Expire, visa_number, Visa_Expire, passport_number,  Passport_Expire, address_1, address_2,  dOb, age, pob, country, city, commune, village, zip_code, description, image_id]
   
        pool.query(query2, data2, (err, result2) => {

           if(err){
             console.log("error 2"+err)
              res.status(400).json({msg:'error'});
            }
            else{
              var people_id_new = result2.insertId;
              var data3 = [file_name,file_data,people_id_new];
              pool.query(query3,data3,(err,result3)=>{
               if(err){
                 console.log("error 3")
                 res.status(400).json({msg:'error'});
               }
               else{
                 var image_id = result3.insertId;
                 var data4 = [image_id,people_id_new];
                 pool.query(query4,data4,(err,respond)=>{
                   if(err){
                     console.log("error 4")
                     console.log(err)
                     res.status(400).json({msg:'error'});
                   }else{
                     var data5 = [people_id_new,employee_id_new];
                     pool.query(query5,data5,(err,respond)=>{
                       if(err){
                         console.log("error 5"+err)
                         res.status(400).json({msg:'error'});
                       }else{
                         var data6 = [employee_id_new,permission_id];
                          pool.query(query6,data6,(err,respond)=>{
                            if(err){
                              console.log("error 6")
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
              })
            }
       }) //end query
      }
    }) //end query 1 
}//end function
// Edit 
exports.employee_edit = async (req, res) => {
  
  var query1 = " Select peo.* , p_file.file_data AS FileData , p_file.file_name as FileName, p_file.id as file_id , "+
               " em.username,em.password,per.permission_id "+
               " From bpos_employee as em  "+
               " JOIN bpos_people as peo on peo.employee_id=em.id  "+
               " LEFT JOIN bpos_people_file AS p_file ON p_file.id = peo.image_id  "+
               " left join bpos_employee_permission_employee as per on per.employee_id = em.id "+
               " where em.id = ? AND em.deleted=0 ;";


    pool.query(query1, [req.params.id],(err,rows)=>{
        if(err){
          console.log(err);
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

exports.employee_update =async (req, res) => {

  const id = req.params.id;

  var { first_name, last_name, full_name, account_number, sex, phone_1, phone_2, email, facebook, telegram,work, company_name, company_address, national_number, national_number_expire,visa_number, visa_number_expire, passport_number, passport_number_expire, address_1, address_2, dob, age, pob, country, city, commune, village, zip_code, description ,file_name ,file_data ,phone_number,password,permission_id} = req.body;

  
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

  var data1 = [ first_name, last_name, full_name, account_number, sex, phone_1, phone_2, email, facebook, telegram, work, company_name, company_address, national_number, Nation_Expire,visa_number, Visa_Expire, passport_number, Passport_Expire, address_1, address_2, dOb, age, pob, country, city, commune, village, zip_code, description, id];

  var query1 = "UPDATE bpos_people SET  "+
              " first_name = ?, last_name = ?, full_name = ?,  "+
              " account_number = ?, sex = ?, phone_1 = ?, phone_2 = ?,  "+
              " email = ?,facebook = ?,telegram = ?, work=?,  "+
              " company_name = ?,company_address = ?,  "+
              " national_number = ?,national_number_expire = ?,  "+
              " visa_number = ?,visa_number_expire = ?,  "+
              " passport_number = ?,passport_number_expire = ?,  "+
              " address_1 = ?,address_2 = ?,  "+
              " dob = ?,age = ?,pob = ?, "+
              " country = ?,city = ?,commune = ?,village = ?,  "+
              " zip_code = ?,description = ? where employee_id=? ;"

  if(password!=""){
    const hashPass = await bcrypt.hash(password, 12);          
    var data2 = [phone_number,hashPass];
    var query2 = "Update bpos_employee  username=? , password=? where id="+id+";";
  }else{   
    var data2 = [phone_number];
    var query2 = "Update bpos_employee SET username=? WHERE id="+id+";";
  }
  
    var query3 = "Update bpos_employee_permission_employee set permission_id="+permission_id+" where employee_id="+id+";"
   
   var query4 = 'UPDATE bpos_people_file set file_name="'+file_name+'", '+'file_data ="'+file_data+'" WHERE people_id in (select id from bpos_people where employee_id ='+id+');';

  
  pool.query(query1, data1, (err, res1) => {
    if (err) {
      console.log("err1"+err)
        res.status(400).json({msg:"Error"});
    } else{
      pool.query(query2,data2,(err,res2)=>{
        if(err){
          console.log("err2"+err)
          res.status(400).json({msg:"Error"});
        }else{
          pool.query(query3,(err,res3)=>{
            if(err){
              console.log("err3"+err)
              res.status(400).json({msg:"Error"});
            }else{            
                if(file_name != "" && file_data!= ""){
                  pool.query(query4,(err)=>{
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
          })
        }
      })
    }
  })

}

exports.employee_delete = (req, res) => {
  pool.query('UPDATE bpos_employee SET deleted = 1 WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.status(200).json({msg:'success'});
    } else {
      console.log(err);
      res.status(400).json({msg:'error'});
    }
  });
}

exports.employee_search = async (req, res) => {
  var keyword = req.body.search;
  console.log(keyword)
  var sql = "SELECT peo.*, p_file.file_data AS image "+
              "FROM bpos_employee as em "+
              "JOIN bpos_people as peo on peo.employee_id = em.id "+
              "LEFT JOIN bpos_people_file as p_file on p_file.people_id = peo.id "+
              "WHERE (peo.first_name LIKE '%"+ keyword +"%' OR peo.last_name LIKE '%"+ keyword +"%' OR peo.full_name LIKE '%"+ keyword +"%' OR peo.phone_1 LIKE '%"+ keyword +"%' OR peo.address_1 LIKE '%"+ keyword +"%') AND em.deleted=0 ORDER BY em.id,peo.employee_id DESC";
    pool.query(sql, async (err,rows)=>{
      if(err){
        console.log(err);
        res.status(400).json({msg:"error"});
      }else{
        for(var i in rows){
          rows[i].image = rows[i].image +"";;
        }
        await res.status(200).json({rows});
      }
    });
  }




exports.category = async (req, res) => {
  
  var mysql = " SELECT "+
              " if( child.parent_id = 'NULL' , '0' , child.parent_id) AS parentId, "+
              " child.id AS childId, "+
              " if( child.parent_id = 'NULL' ,'ROOT', parent.name )AS parentName , "+
              " child.name AS childName "+
              " FROM bpos_expense_category AS child "+
              " LEFT JOIN bpos_expense_category AS parent ON parent.id = child.parent_id "+
              " WHERE child.deleted=0; ";

  pool.query(mysql,(err,datas)=>{
    if(err){
      res.json({msg:'error'});
    }else{
     //console.log(datas)
     // console.log(JSON.stringify(findNodes('ROOT', datas), undefined, 4));
      var rows = findNodes('ROOT',datas);
      console.log(rows)
      
      res.status('200').json({msg:"success",rows});

    }
  });

}

const partial = (arr = [], condition) => {
   const result = [];
   for (let i = 0; i < arr.length; i++) {
      if(condition(arr[i])){
         result.push(arr[i]);
      }
   }
   return result;
}
const findNodes = (parentKey,items) => {
   let subItems = partial(items, n => n.parentName === parentKey);
   const result = [];
   for (let i = 0; i < subItems.length; i++) {
      let subItem = subItems[i];
      let resultItem = {
         text: {
            id:subItem.childId,
            name:subItem.childName,
            parent:subItem.parentId
         }
      };
      let kids = findNodes(subItem.childName , items);
      if(kids.length){
         resultItem.children = kids;
      }
      result.push(resultItem);
   }
   return result;
}




