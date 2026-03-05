import userModel from "../models/User.js" 
 
 
 async function seedAdmin(){
  try {
    const adminInDb = await userModel.findOne({role:"admin"});

    if(!adminInDb){
      const admin = await userModel.create({
        name:"Admin",
        email:"admin@example.com",
        password:"admin",
        role:"admin"
      })
      console.log("Admin created successfully!")
    }
    else{
      console.log("Admin already present")
    }
  } catch (error) {
    console.log(error.message)
  }
  
 }

 export {seedAdmin};