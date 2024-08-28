import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({ data: { name: 'Cheer' } });
  // const users = await prisma.user.findMany();
  // console.log(users);
  await prisma.user.deleteMany();
}

main()
  .catch((e) => {
    console.log(e.message);
    console.log('a');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
