const express = require("express")
const mongoose = require("mongoose")
const cors =require("cors")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://avanyc:avany25murali@ac-ntafnbk-shard-00-00.s6bk36f.mongodb.net:27017,ac-ntafnbk-shard-00-01.s6bk36f.mongodb.net:27017,ac-ntafnbk-shard-00-02.s6bk36f.mongodb.net:27017/evchargedb?ssl=true&replicaSet=atlas-9ujeqf-shard-0&authSource=admin&appName=Cluster0").then(
    ()=>{
        console.log("mongodb connected")
    }
).catch(
    (error)=>{
console.log(error)
    }
)
const charge=mongoose.model("charge",new mongoose.Schema(
    {
        bookingID:String,
        ownerName:String,
        email:String,
        phone:String,
        regNum:String,
        brand:String,
        model:String,
        batteryCapacity:String,
        connectorType:String,
        chargingDate:String,
        time:String,
        units:String,
        bayNum:String
    }
))

app.post("/add-ev",async(req,res)=>{
    await charge.create(req.body)
    res.json({"status":"success"})
})
app.post("/view-ev",async(req,res)=>{
    const charges=await charge.find()
    res.json(charges)
})


app.listen(3000,()=>{
    console.log("server started")
})