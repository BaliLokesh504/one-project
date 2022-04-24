require("./config/config");

const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000
const user = require("./src/routes/user")
const orders = require("./src/routes/orders")
// Routes

app.use('/api/v1/user',user)
app.use('/api/v1/orders',user)


app.listen(PORT,()=>{
    console.log(`server is running on port${PORT}`)
})