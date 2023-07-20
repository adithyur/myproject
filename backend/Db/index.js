const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/New2U').then(()=>{
    console.log("db connected")
}).catch((e)=>{
    console.log('db not connected',e)
})