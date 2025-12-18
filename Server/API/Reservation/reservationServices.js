import prisma from "../../lib/prisma.js";


// handler for reserving book

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



// --- Member services ---
export async function findMyReservations(userId) {
  return prisma.reservation.findMany({
    where: {
      user_id: userId,
      status: { in: ['PENDING', 'READY_FOR_PICKUP'] }
    },
    include: { book: true }
  });
}
export async function cancelOwnReservation(userId, reservationId) {
  const reservation = await prisma.reservation.findUnique({ where: { id: reservationId } });
  if (!reservation || reservation.user_id !== userId) {
    throw new Error('Reservation not found or not owned by user');
  }
  return prisma.reservation.update({
    where: { id: reservationId },
    data: { status: 'CANCELLED' }
  });
}

// --- Librarian services ---
export async function findAllReservations() {
  return prisma.reservation.findMany({
    include: { user: true, book: true },
    orderBy: { created_at: 'desc' }
  });
}

export async function findReservationById(reservationId) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { user: true, book: true }
  });
  if (!reservation) throw new Error('Reservation not found');
  return reservation;
}

 export async function markReservationReady(reservationId) {
  return prisma.reservation.update({
    where: { id: reservationId },
    data: { status: 'READY_FOR_PICKUP', notified_at: new Date() }
  });
}

export async function cancelAnyReservation(reservationId) {
  return prisma.reservation.update({
    where: { id: reservationId },
    data: { status: 'CANCELLED' }
  });
}

export async function findReservationsByBook(bookId) {
  return prisma.reservation.findMany({
    where: { book_id: bookId },
    include: { user: true },
    orderBy: { position_in_queue: 'asc' }
  });
}

