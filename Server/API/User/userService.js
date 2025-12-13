import prisma from "../../lib/prisma.js";




// fetch the user from data base 

export async function fetchUser(id){
    
    if (!id ){
        throw new Error ("id is  required")
    }
    try{
    const  user = await   prisma.user.findUnique({
        where:{id},
        select:{
                id: true,
                first_name: true,
                last_name: true,
                role: true,
                email: true,
                avatar_url: true,
                phone      :true,   
                membership_id :true,
        }
    })
    if (!user){
        throw new Error (" Couldn't fetch user ")
    }
    return user
}
catch(err){
    throw err;

} 
}

// update user profile on the data base 

export async function patchUser(data){
    console.log(data)
    const { id ,avatar_url,phone} =data;
    try{
        if (!avatar_url&&!phone){
            throw new Error (" you  have  to update profile pic or phone number")
        }
        const  updatedMember = await prisma.user.update({
                                                         where:{id},
                                                         data:{
                                                           avatar_url,
                                                           phone
}
})
}catch(err){
        throw err
}
}

