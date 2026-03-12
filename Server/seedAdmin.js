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
    console.log('Admin user already exists:', email);
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

  console.log('Admin user seeded correctly:');
  console.log('Email:', email);
  console.log('Password:', password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
