const express = require("express")
const router = new express()
const {poolConnection} = require("../db/mysqldb")
const {upcomingDate} = require("../dates")
const { generateJWT, verifyToken } = require("../middlewares/jwt");
const crypto = require("crypto");

console.log(upcomingDate)
router.post("/signUp",async (req,res)=>{
try {
    // IF user login with email we can store password encrypted
    // const salt = crypto.randomBytes(128).toString("base64");
    // const pass = hashPwd(salt, req.body.password);
    const userData = await poolConnection.execute("select * from user_master where userName=? and password=?",[
        req.body.userName,
        req.body.password
    ])
    if(!userData){
    
        await poolConnection.execute("insert into user_master(userName,password,emailId) values(?,?,?)",[
            req.body.userName,
            req.body.password
        ]) 
        res.status(200).send({
            status: true,
            msg : "User successfully registerd"
        })
    } else {
        res.status(400).send({
            status: false,
            msg : "User already registerd"
        })
    }
       
} catch (error) {
    res.status(400).send({
        status: false,
        msg : "Error while creating user"
    })
}
})

router.post("/signIn",async(req,res)=>{
    try {
        // We can check password
        // let passHash = hashPwd(userData.salt, req.body.password);
        const userData = await poolConnection.execute('select * from user_master where userName=? and password=?',[
            req.body.userName,
            req.body.password
        ])
        let { accessToken } = generateJWT(userData.id);

        if(!userData){
            res.status(400).send({
                status: false,
                msg : "Invalid credentials"
            })
        }
        res.status(200).send({
            status: true,
            data : upcomingDate(),
            accessToken,
            userId : userData.id
        })
    }
    catch (error) {
        res.status(400).send({
            status: true,
            msg : "Invalid credentials"
        })
    }
})

router.get("/logout",verifyToken, async(req,res)=>{
try {
    res.status(200).send({
        status: true,
        userId : req.params.id,
       msg : "user got logout"

    })
} catch (error) {
    res.status(200).send({
        status: true,
       msg : "error in logout"

    })
}
})

module.exports = router