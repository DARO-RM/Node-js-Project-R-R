const { pool } = require('../../../utils/connection');
var moment = require('moment');
// expenses View
exports.views = (req, res) => {
   try {
        var query = ' SELECT ex.*,ex.date AS ex_date, pay_t.name AS paymenttype_name, pay_f.name AS paymentform_name , bud.name AS budget_name ,cat.name AS categories_name'+
        ' FROM bpos_expense AS ex '+
        ' JOIN bpos_app_payment_type AS pay_t ON pay_t.id = ex.payment_type_id '+
        ' JOIN bpos_app_payment_form AS pay_f ON pay_f.id = ex.payment_form_id '+
        ' JOIN bpos_app_budget AS bud ON bud.id = ex.budget_id '+
        ' JOIN bpos_expense_category AS cat ON cat.id = ex.category_id'+
        ' WHERE ex.deleted=0;';

    pool.query(query,(err,rows)=> {

      for(var i in rows){

        rows[i].ex_date = moment(rows[i].ex_date).format("YYYY/MM/DD");
    }
    res.status(200).json({msg:"success",rows}); 
    });
     
   } catch (error) {
    res.json({msg:'error'});
   }

}

//expenses Find
exports.search = (req, res) => {
  let searchTerm = req.body.search;
  
        var query = ' SELECT ex.*,ex.date AS ex_date,pay_t.name AS paymentype_name, pay_f.name AS paymentform_name, bud.name AS budget_name,cat.name AS categories_name '+
                  ' FROM bpos_expense AS ex '+
                  ' JOIN bpos_app_payment_type AS pay_t ON pay_t.id = ex.payment_type_id '+
                  ' JOIN bpos_app_payment_form AS pay_f ON pay_f.id = ex.payment_form_id '+
                  ' JOIN bpos_app_budget AS bud ON bud.id = ex.budget_id '+
                  ' JOIN bpos_expense_category AS cat ON cat.id = ex.category_id'+
                  ' WHERE ex.amount LIKE ? AND ex.deleted=0;';
    pool.query(query,['%'+searchTerm+'%'],(err,rows)=> {
         
        if(err){
          res.status('400').json({msg:"Error"}); 
          console.log(err)
        }else{
          for(var i in rows){
            rows[i].ex_date = moment(rows[i].ex_date).format("MM/DD/YYYY");
          }
          res.status('200').json({msg:"success",rows});  
        }
    });
}

// Add new Expenses
exports.add = (req, res) => {
    const {payment_type_id,payment_form_id,budget_id,category_id,date,amount,expense_note,request_by,approved_by,file_name,file_data}=req.body;
    var data_expenses = [payment_type_id, payment_form_id, budget_id,category_id,date, amount, expense_note,request_by,approved_by];
    
    if(date==''){
      var ed_date=null;
    }else{
      var ed_date = new Date(date);
          ed_date= moment(ed_date).format('YYYY/MM/DD');
    }

    var insert_expenese= " INSERT INTO bpos_expense SET payment_type_id=?,payment_form_id=?,budget_id=?,category_id=?,date=?,amount=?,expense_note=?,request_by=?,approved_by=?;";
      
    var insert_expense_file= " INSERT INTO bpos_expense_file SET file_name=?, file_data=?, expense_id= ?;";
    pool.query(insert_expenese,data_expenses, (err, rows) => {
      if (err) {
        console.log("err1"+err)
        res.status(400).json({msg:'error'});
      } else{

        expense_id = rows.insertId;
        var data_ex_file = [file_name,file_data,expense_id];
          pool.query(insert_expense_file,data_ex_file,function(err,data){
              if(err) {
                console.log("err2"+err)
                res.status(400).json({msg:'error'});
            
              } else{
                res.status(200).json({msg:'success'});
                
              }
          })//insert room file
      }
  })//insert room
}
//budget
exports.budget = (req,res)=>{
    pool.query('SELECT * FROM bpos_app_budget',(err,rows)=> {
        if(!err){
          res.status('200').json({message:"success",rows}); 
        }
        else{
          console.log("err ")
          res.status('400').json({message:"error"});
        }
    });
}
//payment_type
exports.payment_type = (req,res)=>{
  pool.query('SELECT * FROM bpos_app_payment_type',(err,rows)=> {
    if(!err){
      res.status('200').json({message:"success",rows});  
    }
    else{
      res.status('400').json({message:"error"});
    }
  });
}
//payment_form
exports.payment_form = (req,res)=>{
  pool.query('SELECT * FROM bpos_app_payment_form',(err,rows)=> {
      if(!err){
        res.status('200').json({message:"success",rows});  
      }
      else{
        res.status('400').json({message:"error"});
      }
  });
}
//Categories_view
exports.catagory = (req,res)=>{
  pool.query('SELECT * FROM bpos_expense_category',(err,rows)=> {
      if(!err){
        res.status('200').json({message:"success",rows});  
      }
      else{
        res.status('400').json({message:"error"});
      }
  });
}
// Edit_ expense
exports.edit = async(req, res) => {
  var query_edit=" SELECT ex.date AS ex_date,ex.amount AS Amount,ex.expense_note AS expense_note, "+
             " ex.request_by AS request_by,ex.approved_by AS approved_by, "+
              " pay_t.name AS paymentype_name, pay_f.name AS paymentform_name , bud.name AS budget_name, "+
              " cat.name AS categories_name, cat.id as cat_id,"+
              " pay_t.id as pay_t_id, pay_f.id as pay_f_id, bud.id as bud_id,"+
              " exf.file_name AS FileName,exf.file_data AS FileData "+
              " FROM bpos_expense AS ex "+
              " JOIN bpos_app_payment_type AS pay_t ON pay_t.id = ex.payment_type_id " +
              " JOIN bpos_app_payment_form AS pay_f ON pay_f.id = ex.payment_form_id " +
              " JOIN bpos_app_budget AS bud ON bud.id = ex.budget_id "+
              " JOIN bpos_expense_file AS exf ON exf.expense_id = ex.id "+
              " JOIN bpos_expense_category AS cat ON cat.id = ex.category_id "+
              " WHERE ex.id = ? AND ex.deleted=0;";
    
    pool.query(query_edit, [req.params.id],(err,rows)=>{
        if(err){
          console.log("error",err)
          res.json({message:"error"});
        }else{
          for(var i in rows){
            rows[i].ex_date = moment(rows[i].ex_date).format("YYYY/MM/DD");
            rows[i].FileData = rows[i].FileData + "";
          }
          res.status('200').json({message:"success",rows});
        }
    });
}

exports.update = (req, res) => {
  const id = req.params.id;
  let {payment_type_id, payment_form_id, budget_id,category_id,date,amount, expense_note,request_by,approved_by,file_name,file_data} = req.body;
      if(date==''){
        var ed_date=null;
      }else{
        var ed_date = new Date(date);
            ed_date= moment(ed_date).format('YYYY/MM/DD');
      }
  const data_update = [payment_type_id, payment_form_id, budget_id,category_id,date,amount,expense_note,request_by,approved_by,id,file_name,file_data];

  var query1='UPDATE bpos_expense SET payment_type_id=?,payment_form_id=?,budget_id=?,category_id=?,date=?,amount=?,expense_note=?,request_by=?,approved_by=? WHERE id=?';
  var query2 = 'UPDATE bpos_expense_file set file_name="'+file_name+'", '+'file_data ="'+file_data+'" WHERE expense_id in (select id from bpos_expense_file where expense_id ="'+id+'")';
  
  pool.query(query1, data_update, (err, rows) => {
    if (err) {
      console.log("err1")
        res.status(400).json({msg:"Error"});
    } 
  })

  if(file_name != "" && file_data!= ""){
    pool.query(query2,(err)=>{
      if(err){
        console.log("err2")
        res.status(400).json({msg:"error"});
      }else{
        res.status(200).json({msg:"success"});
      }
    })
  }else{
    res.status(200).json({msg:"success"});
  }
}
// Expense_Delete
exports.deleted = (req, res) => {
  pool.query('UPDATE bpos_expense SET deleted = ?  WHERE id = ?', ['1', req.params.id], (err, rows) => {
      if (!err) {
        res.json({message:'success',rows});
      } else {
        res.json({message:'error'});
      }
  });
}


