const jwt = require("jsonwebtoken");
const config = process.env;
const store = require("store2")

const verifyToken = (req, res, next) => {
  const token = store.get(process.env.SECRETE);
 // console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.SECRETE);
    req.user = decoded
   //console.log(decoded)

  } catch (err) {
     //console.log(err) 
    return res.redirect("/login");
  }
  return next();
};
module.exports = verifyToken
