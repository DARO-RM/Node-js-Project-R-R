const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const store = require('store2');

const {connect,pool} = require("../../../utils/connection");

exports.login = async (req, res, next) => {
   
   const { username,password } = req.body;
  
   
   try {
          const [user] = await connect.execute('SELECT * FROM bpos_employee WHERE username=? ;', [username]);
          if (user.length != 1) {
           console.log("err username");
           return res.status(400).send({error:"err username"});
          return; //Usage break this block
         
          }
    
          const checkPass = await bcrypt.compare(password, user[0].password)
          if(checkPass === false){
            console.log("Invalid password");
            res.status(401).json({error:"Invalid password"});
         
          
         
          }else{
          
             const id =user[0].id;
    
             const [role] = await connect.execute('SELECT * FROM bpos_employee_permission_employee WHERE employee_id=?  ;', [id]);
             if (role.length != 1) {
               console.log("err permission");
               res.status(400).json({msg:"err permission"});
               
             }
    
             const permission_id = role[0].permission_id;
    
             const [permission_role] = await connect.execute('SELECT * FROM bpos_employee_permission WHERE id=? ;', [permission_id]);
             if (permission_role.length != 1) {
                console.log("err permission");
                res.status(400).json({msg:"err username"});
                
             }
    
             var per_name = permission_role[0].name;
                
             const token = await jwt.sign({per_name},process.env.SECRETE,
                   { expiresIn: '24h' })
                   store.set(process.env.SECRETE,token);
                    //res.redirect('/');  
                    //console.log(token);
    
                  res.status(200).json({msg:"success"});
          
          }
        }catch (err) {
           console.log(err)
        }
}



