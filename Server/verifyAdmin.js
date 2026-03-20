import prisma from './lib/prisma.js';

async function main() {
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  });

  if (admin) {
    console.log('Admin user found:');
    console.log(JSON.stringify(admin, null, 2));
  } else {
    console.log('Admin user NOT found.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
