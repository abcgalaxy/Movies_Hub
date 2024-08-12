const app=require('./project');
const mongoose=require('mongoose')

mongoose.connect(`${process.env.Mongodb_Conn_Str}`,{useNewUrlParser:true}).then(async conn=>{
    console.log("connected to database");
}).catch(err=>{
    console.log("An error occured while connecting to database")
})

app.listen(5000,()=>{
    console.log("server is on air")
})
