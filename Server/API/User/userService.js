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





export async function checkUser (id ){
    if (!id){
        throw new Error( " Id is not provided");
    }
    const user = await prisma.user.findUnique({where:{id:Number(id)}});
    if (!user){
        throw new Error(" not  a memeber")

    }
    return  user



}




export async function getAllUsers(page = 1, limit = 10) {
  const p = Math.max(1, parseInt(page));
  const l = Math.max(1, parseInt(limit));
  const skip = (p - 1) * l;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: l,
      where :{role:"MEMBER"},
      orderBy: { created_at: "desc" },
      include: {
        _count: {
          select: {
            // This counts active loans for the "Active Loans" column in your UI
            loans: { where: { status: "ACTIVE" } },
          },
        },
      },
    }),
    prisma.user.count(),
  ]);

  return {
    data: users.map((u) => ({
      ...u,
      // Flatten the count for easier frontend access (member.loans_count)
      loans_count: u._count.loans,
    })),
    meta: {
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
    },
  };
}


export  async function  getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        loans: {
          include: { book: true },
        },
        reservations: {
          include: { book: true },
        },
      },
    });
    return user;
  }


export async function   deleteUser(id) {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        membership_id: null,
        role: 'MEMBER',
      },
    });
    return user;
  }


export async  function getReservations(userId) {
    const reservations = await prisma.reservation.findMany({
      where: { user_id: Number(userId) },
      include: {
        book: true,
      },
      orderBy: { created_at: 'desc' },
    });
    return reservations;
  }

