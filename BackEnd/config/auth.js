const jwt = require("jsonwebtoken");
const config = require('config');


// module.exports = function (req, res, next) {

//   const token = req.header('authorization');
//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorizat ion denied" });
//   }
//   try {
//     const decoded = jwt.verify(token, config.get("jwtSecret"));
//       req.user = decoded.user;
//     next();

//   } catch (error) {
//     res.status(401).json({ msg: "Token is not valid " });

//   }
// };
module.exports = function (req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    try {
      const token = bearerToken;
      const decoded = jwt.verify(token, 'secretkey' );
      req.user = decoded.user;
      next();
    } catch (error) {
           res.status(401).json("Token is not valid ");
    }
  } else {
    // Forbidden
   return res.status(401).json( "No token, authorizat ion denied" );
  }


}
