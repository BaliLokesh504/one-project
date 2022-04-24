const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const refreshToken = crypto.randomBytes(64).toString("hex");
const { TokenExpiredError } = jwt;
// const config = require("../config");

function generateJWT(user) {
  let accessToken =  jwt.sign({data: `${user.id}`,},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXP }
    );

    return { "accessToken" : accessToken,"refreshToken" : accessToken}
    
}

const verifyToken = (req, res, next) => {
    try {
        console.log("<<<<<<<<<<<<<<<<",req.header["authorization"])
      const header = req.headers["authorization"];
      const bearer = header.split(" ");
      const token = bearer[1];
      req["jwtAccessToken"] = token;
      if (!header) {
        return res.status(403).send({status :false, message: "No token provided!" });
      }
      jwt.verify(
        req.jwtAccessToken,
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            return catchError(err, res);
          }
          console.log("decoded", decoded);
          req.userId = decoded.data;
          next();
        }
      );
    } catch (error) {
     return res.status(400).send({status :false, message: "error in validating token" });
    }
  };

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({status :false, message: "Unauthorized! Access Token was expired!" });
  }
  return res.status(401).send({status :false, message: "Unauthorized!" });
};



module.exports = {
    generateJWT: generateJWT,
  verifyToken: verifyToken,
};
