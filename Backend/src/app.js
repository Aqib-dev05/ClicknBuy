import express from "express";
  
 const app= express();
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(cors());

 export default app;
  
  app.get("/",(req,res)=>{
    res.send("Hello")
  })