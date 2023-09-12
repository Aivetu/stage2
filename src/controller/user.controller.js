const user = require('../model/user.model');
const createUser = async (req,res) => {
    const name = req.body.name;
    if(!(name instanceof String)) {
        return res.status(400).json({"message":"Input is not a String"});
    }
    if(!name) {
        return res.status(400).json({"message":"Invalid name"});
    }
    const duplicate =await user.findOne({name}).exec();
    if(duplicate) {
        return res.status(400).json({"message":"Name already exist"});
    }

    try {
    
    const result =  await user.create({
        "name":name
    });
   console.log(result);
   return   res.status(200).json({'message':"New User Created"})

} catch (error) {
        console.log(error);
      return  res.status(500).json({'message':error.message})
}


}
const getUser = async (req,res) => {
    try {
    const id = req.params.id;

    if(!id) return res.status(400).json({"message":"Invalid ID"});

    const FindUser =await user.findOne({id:user._id}).exec();
    if(!FindUser) return res.status(400).json({"message":"User does not exist"});

    return res.status(200).json(FindUser.name);
} catch (error) {
    console.log(error);
    return  res.status(500).json({'message':error.message});
}}


const updateUser = async (req,res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;

        if(!id || !name) {
        return res.status(400).json({"message":"Incomplete Details"});
        }
       
        const findUser = await user.findOne({id:user._id}).exec();
        if(!findUser){
        return res.status(400).json({"message":"User does not exist"});
        }
        if(findUser.name == name){
            return res.status(400).json({"message":"User information is the same"});

        }
    
        const response = await user.updateOne(
            {id:user._id},
            {$set:{
                name :req.body.name
            }}
        );
        return res.status(200).json({"Message":`Name successfully changed to ${name}`});        
    } 
    catch (error) 
    {
        console.log(error);
        return  res.status(500).json({'message':error.message})
    }

}
const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
    
        if(!id) return res.status(400).json({"message":"Invalid ID"});
    
        const FindUser =await user.findOne({id:user._id}).exec();
        if(!FindUser) return res.status(400).json({"message":"User does not exist"});

        const response = await user.deleteOne({id:user._id});
    
        return res.status(200).json({"message":`${FindUser.name} has been deleted successfully`});
    } catch (error) {
        console.log(error);
        return  res.status(500).json({'message':error.message});
    }}
    




module.exports = {createUser,getUser,updateUser,deleteUser};