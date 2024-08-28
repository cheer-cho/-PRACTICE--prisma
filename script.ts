import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient({ log: ['query'] });
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const existedUser = await prisma.user.findUnique({ where: { email: '1@1.com' } });
  console.log('Existed User: ', existedUser);

  // create one
  // if (!existedUser) {
  //   const user = await prisma.user.create({
  //     data: {
  //       firstName: 'Jon',
  //       lastName: 'Doe',
  //       age: 34,
  //       email: '1@1.com',
  //       password: 'password',
  //       somethingJson: {},
  //       userPreference: {
  //         create: {
  //           emailUpdate: true,
  //         },
  //       },
  //     },
  //     // include: {
  //     //   userPreference: true,
  //     // },
  //     select: {
  //       firstName: true,
  //       lastName: true,
  //       userPreference: { select: { id: true } },
  //     },
  //   });
  //   console.log('new user: ', user);
  // }

  // create many
  if (!existedUser) {
    const users = await prisma.user.createMany({
      data: [
        {
          firstName: 'Jimmy',
          lastName: 'Doe',
          age: 30,
          email: '2@2.com',
          password: 'password',
          somethingJson: {},
          // userPreference: {
          //   create: {
          //     emailUpdate: true,
          //   },
          // },
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          age: 30,
          email: '3@3.com',
          password: 'password',
          somethingJson: {},
          // userPreference: {
          //   create: {
          //     emailUpdate: true,
          //   },
          // },
        },
      ],
    });

    console.log(users);
  }
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
