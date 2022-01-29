const { compareSync } = require('bcryptjs');
const { json } = require('body-parser');
require("dotenv").config();
const {connect,pool} = require("../../../utils/connection");

//_Catagory_View
exports.views = (req, res) => {
  var query = 'SELECT * FROM bpos_expense_category WHERE deleted=0'
  pool.query(query,(err,rows)=> {
      if(err){
        res.status(400).json({message:"error"});
        console.log(err);
      }
      else{
          res.status(200).json({message:"success",rows});
          
        }
  });
}
// categories_add
exports.add  = (req, res) => {
  const {parent_id,name} = req.body;
  let data = [parent_id,name];
    pool.query('INSERT INTO bpos_expense_category SET parent_id=?,name=?;',data, (err, rows) => {
      if (!err) {
          res.status('200').json({message:"success",rows});
        } else {
          res.status('200').json({message:'error'});
        }
    });
}
//category_tree
exports.nestable = async (req, res) => {
  
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
      var rows = findNodes('ROOT',datas);
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
exports.edit = (req, res) => {
   var sql =  " SELECT parent.*, parent.id as p_id, child.id as c_id, parent.name as p_name, child.name AS c_name "+
              " FROM bpos_expense_category as parent left join bpos_expense_category as child on parent.id=child.parent_id "+
              " WHERE child.id = ?and parent.deleted =0;";
  pool.query(sql,[req.params.id],(err,rows)=>{
    if(err){
      console.log(err)
      res.json({msg:'error'});
    }else{
    
      res.status('200').json({msg:"success",rows});
    }
  });
}
// Update User
exports.update = (req, res) => {
  const {parent_id,name,id} = req.body;
  const data_update = [parent_id,name,id]
  pool.query('UPDATE bpos_expense_category SET parent_id=?, name= ? WHERE id=?;',data_update,(err, rows) => {
    if (!err) {
            pool.query('SELECT * FROM bpos_expense_category WHERE id=?',data_update,(err, rows) => {
             // console.log(id)
              if(err){
                    res.json({msg:'error'});
                  }else{
                    res.status('200').json({msg:"success",rows});
                    //console.log(rows);
                  }
            });
      } 
  });
}
// Delete User
exports.deleted = (req, res) => {
  pool.query('UPDATE bpos_expense_category  SET deleted= ? WHERE id = ?', ['1', req.params.id], (err, rows) => {
      if (!err) {
        res.json({msg:'success'});
      } else {
        console.log(err);
        res.json({msg:'error'});
      }
  });
}
