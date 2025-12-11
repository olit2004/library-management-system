import prisma from "../../lib/prisma.js";


// resgister User
export  async function registerUser (data){
    const {email, password , first_name,last_name, role,address, avatar_url, phone, membership_id}=data;
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
                    membership_id
                }}
    )
        return newUser;
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
    
}