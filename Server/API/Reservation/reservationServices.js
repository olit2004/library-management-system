import prisma from "../../lib/prisma.js";

export async function reserveBook({ bookId, userId }) {
  return await prisma.$transaction(async (tx) => {

    
    const count = await tx.reservation.count({
      where: {
        book_id: bookId,
        status: {
          in: ["PENDING", "READY_FOR_PICKUP"]
        }
      }
    });
    const position = count + 1;    
    const reservation = await tx.reservation.create({

      
      data: {
        user_id: userId,
        book_id: bookId,
        status: "PENDING",
        position_in_queue: position
      }
    });
    return reservation;
  });
}
