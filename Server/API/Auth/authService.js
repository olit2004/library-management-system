import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt"


// resgister User
export  async function registerUser (data){

    const {email, password , first_name,last_name, role,address, avatar_url, phone}=data;

    try{
        if (!email||!password||!first_name){
            throw new Error ("email, password and first name is required")
        }

    const newUser =await prisma.user.create(
        {data :
                { 
                    email, 
                    password , 
                    first_name,
                    last_name,
                    role,
                    address, 
                    avatar_url,
                    phone, 
                }}
    )

    
    //creating memeber id for members
    if (role==="MEMBER"){
     
        const year =  new Date().getFullYear()
        const membership_id = `LIB-MEMB-${year}-${newUser.id}`
        const member = await prisma.user.update({
            data:{membership_id},
            where:{ id:newUser.id}
        })
        const {password:_removed,...user }= member;
        return user;

        
    }
        const {password:_removed,...user }= newUser;
        return user;
    }

    catch(err){
     if (err.code === "P2002") {
      throw new Error("This email is already registered");
    }
    throw err;
    }
}



// log user in 

export async function loginUser (data){
    const {email, password}= data;
    if (!email ||!password){
        new Error ("Both email and password is required");
    }
    const user =await prisma.user.findUnique({where:{email}});
    if (!user){
        new Error ("Incorrect password or Email ")
    } 

    const auth = await bcrypt.compare (password,user.password);
    if (!auth){
        throw new Error ("Incorrect password or Email ")
    }
    const {password:_removed,...safeUser}= user;
    return safeUser;
}