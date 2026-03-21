import prisma from './lib/prisma.js';
import bcrypt from 'bcrypt';

async function main() {
  const email = 'admin@example.com';
  const password = 'adminpassword';
  const first_name = 'System';
  const last_name = 'Admin';

  const saltRound = 10;
  const hashed_password = await bcrypt.hash(password, saltRound);

  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    return;
  }

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashed_password,
      first_name,
      last_name,
      role: 'ADMIN',
    },
  });

}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
