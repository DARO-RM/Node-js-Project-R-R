const AccessControl = require('accesscontrol');
const {connect,pool} = require("../utils/connection");

exports.grantAccess = function(action,resource){
  return async (req,res,next)=>{
    
       var result = await read_permission();
       const ac = new AccessControl(result);
       const permission = ac.can(req.user.per_name)[action](resource);
       
       if(!permission.granted){
        
      
           return res.send('<script>alert("You do not have enough permission to perform this action"); </script>')
          // res.redirect("/id/" + req.body.params);
        // return res.status(401).json({
        //   error: "You don't have enough permission to perform this action"
        // });
       }
       else{
         next();
       }
  }
} 
async function read_permission(){
 
  var [permission] =await connect.query('select * from bpos_employee_permission;');
   //console.log(permission[0]);
  var [action] =await connect.query('select * from bpos_employee_action;');
     // console.log(action[0]);

  var [permission_action] = await connect.query('select * from bpos_employee_permission_action;');
 
  var create_ac = [];
  for(var i in permission_action){

    var  role_data;
    var  resource_data;
    var  action_data;
    var  attributes_data="*";


    for(var j in permission){
      if(permission[j].id == permission_action[i].permission_id){
         var role_data= permission[j].name;
      }
    }

    for(var k in action){
      if(action[k].id == permission_action[i].action_id ){
        resource_data= action[k].resource;
        action_data= action[k].action_name;
      }
    }
    create_ac.push({
        "role":role_data,
        "resource":resource_data,
        "action":action_data,
        "attributes":"*"
    });
  }
       //console.log(create_ac);
  return create_ac;
 
}
