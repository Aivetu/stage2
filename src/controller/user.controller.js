const user = require('../model/user.model');

//Create A new User
const createUser = async (req,res) => {
    const name = req.body.name;
    
    if(!name) {
        return res.status(400).json({"message":"Invalid name"});
    }
    if(typeof name != "string") {
        return res.status(400).json({"message":"Name must be a string"});
    }
    const duplicate = await user.findOne({name}).exec();
    if(duplicate) {
        return res.status(400).json({"message":"Name already exist"});
    }
    try {
    const result =  await user.create({
        "name":name
    });
   console.log(result);
   return   res.status(201).json({'message':"New User Created","name":`${name}`,"id":`${result._id}`})

} catch (error) {
        console.log(error);
      return  res.status(500).json({'message':error.message})
}}

//Get A User Detail
const getUser = async (req,res) => {
    try {
    const id = req.params.id;

    if(!id) return res.status(400).json({"message":"Invalid ID"});

    const FindUser =await user.findById(id);
    if(!FindUser) return res.status(400).json({"message":"User does not exist"});

    return res.status(200).json({"message":"success","name":FindUser.name});
} catch (error) {
    console.log(error);
    return  res.status(500).json({'message':error.message});
}}

//Update User Info
const updateUser = async (req,res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        if(typeof name != "string") {
            return res.status(400).json({"message":"Name must be a string"});
        }
        const person = await user.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          if (!person) {
            return res.status(404).json({ error: 'User not found' });
          }
    
        return res.status(200).json({"Message":"User Details successfully changed","user":{"name":`${person.name}`,"id":`${person.id}`}});        
    } 
    catch (error) 
    {
        console.log(error);
        return  res.status(500).json({'message':error.message})
    }

}
// Delete User 
const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
    
        if(!id) return res.status(400).json({"message":"Invalid ID"});
    
        const FindUser =await user.findByIdAndDelete(id);
        if(!FindUser) return res.status(400).json({"message":"User does not exist"});

        const response = await user.deleteOne({id:user._id});
    
        return res.status(200).json({"message":"User has been deleted successfully"});
    } catch (error) {
        console.log(error);
        return  res.status(500).json({'message':error.message});
    }}
    




module.exports = {createUser,getUser,updateUser,deleteUser};