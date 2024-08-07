const express = require("express");
const app = express();
const port = 5000;
const userRouter = require("./Routes/user");
const adminRouter = require("./Routes/admin");
const carRouter = require("./Routes/car");
const bodyParser = require('body-parser');


app.set("view engine" , "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/" , userRouter);
app.use("/admin" , adminRouter);
app.use("/cars" , carRouter);








app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
    
})