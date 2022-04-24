const express = require("express")
const router = new express()
const {poolConnection} = require("../db/mysqldb")
const { generateJWT, verifyToken } = require("../middlewares/jwt");

router.post('/createOrder',verifyToken,async(req,res)=>{

    try {
        const d = new Date()
        if(req.body.orderDate.getDate() == d.getDate() && (req.body.orderSlot==="lunch" && d.getHours()<=9) || (req.body.orderSlot==="dinner" && d.getHours()<=18)){
          const data =   await poolConnection.execute("insert into user_orders(userId, orderSlot, orderDate, status) values(?,?,?,?)",[
                req.body.userId,
                req.body.orderSlot,
                req,body.orderDate,
                req.body.status
            ])
            res.status(200).send({
                status:true,
                msg : "order created successfully",
                orderId : data.id
            })
        }
        res.status(400).send({
            status:true,
            msg : "error while creating order",

        })   
    } catch (error) {
        res.status(400).send({
            status:true,
            msg : "error while creating order"
        })
    }

})


router.patch('/cancelOrder',verifyToken,async(req,res)=>{

    try {
        const d = new Date()
        if(req.body.orderDate.getDate() == d.getDate() && (req.body.orderSlot==="lunch" && d.getHours()<=9) || (req.body.orderSlot==="dinner" && d.getHours()<=18)){
            await poolConnection.execute("update user_orders set status=? where id = ? and userId=?",[
                "Order",
                req.body.orderId,
                req.body.userId
            ])
            res.status(200).send({
                status:true,
                msg : "order cancelled successfully"
            })
        }
        res.status(400).send({
            status:true,
            msg : "error while cancel order"
        })   
    } catch (error) {
        res.status(400).send({
            status:true,
            msg : "error while cancel order"
        })
    }

})

module.exports = router