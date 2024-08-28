import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient({ log: ['query'] });
const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany();
  const existedUser = await prisma.user.findMany();
  console.log('Existed User #: ', existedUser);

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
  if (existedUser.length === 0) {
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
        {
          firstName: 'Jane',
          lastName: 'Doe',
          age: 31,
          email: '4@4.com',
          password: 'password',
          somethingJson: {},
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          age: 32,
          email: '5@5.com',
          password: 'password',
          somethingJson: {},
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          age: 33,
          email: '6@6.com',
          password: 'password',
          somethingJson: {},
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          age: 34,
          email: '7@7.com',
          password: 'password',
          somethingJson: {},
        },
      ],
    });

    console.log(users);
  }

  // find unique
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: '2@2.com',
  //   },
  // });
  // console.log('Unique user by email: ', user);
  // const user2 = await prisma.user.findUnique({
  //   where: {
  //     age_firstName_lastName: {
  //       age: 30,
  //       firstName: 'Jane',
  //       lastName: 'Doe',
  //     },
  //   },
  // });
  // console.log('Unique user by age, first and last name: ', user2);

  // find first (normal find)
  // const user = await prisma.user.findFirst({
  //   where: {
  //     email: '3@3.com',
  //   },
  // });

  // find many
  // const users = await prisma.user.findMany({
  //   where: {
  //     firstName: 'Jane',
  //   },
  // });
  // console.log(users);
  // const users = await prisma.user.findMany({
  //   where: {
  //     firstName: 'Jane',
  //   },
  //   distinct: ['firstName'],
  // });
  // console.log(users);

  // const users = await prisma.user.findMany({
  //   where: {
  //     firstName: 'Jane',
  //   },
  //   orderBy: {
  //     age: 'desc',
  //   },
  //   take: 2,
  //   skip: 1,
  // });
  // console.log(users);

  // const users = await prisma.user.findMany({
  //   where: {
  //     firstName: 'Jane',
  //     age: { gte: 33 },
  //   },
  //   orderBy: {
  //     age: 'desc',
  //   },
  //   // take: 2,
  //   // skip: 1,
  // });
  // console.log(users.length);

  // Query Relationship
  // const users = await prisma.user.findMany({
  //   where: {
  //     userPreference: {
  //       emailUpdate: true,
  //     },
  //   },
  // });
  // const users = await prisma.user.findMany({
  //   where: {
  //     writtenPosts: {
  //       every: {
  //         title: { startsWith: 'Test' },
  //       },
  //     },
  //   },
  // });
  // const users = await prisma.post.findMany({
  //   where: {
  //     author: {
  //       is: {
  //         age: 33,
  //       },
  //       isNot: {
  //         firstName: 'Jimmy',
  //       },
  //     },
  //   },
  // });
  // console.log(users);

  // update
  // const user = await prisma.user.update({
  //   where: {
  //     email: '3@3.com',
  //   },
  //   data: {
  //     email: 'jane@jane.com',
  //   },
  // });
  // console.log(user);

  // const users = await prisma.user.updateMany({
  //   where: {
  //     firstName: 'Jane',
  //     age: { gte: 31 },
  //   },
  //   data: {
  //     firstName: 'updated',
  //   },
  // });
  // console.log(users);

  // const user = await prisma.user.update({
  //   where: {
  //     email: '3@3.com',
  //   },
  //   data: {
  //     age: {
  //       increment: 2,
  //       // decrement
  //       // divide
  //       // multiply
  //     },
  //   },
  // });
  // console.log(user);

  const existedUserPreferences = await prisma.userPreference.findMany();
  console.log(existedUserPreferences);
  if (existedUserPreferences.length === 0) {
    const userPreference = await prisma.userPreference.create({
      data: {
        emailUpdate: true,
      },
    });
    console.log(userPreference);
  }

  // Connect existing relationship
  const updatedUser = await prisma.user.update({
    where: {
      id: 'e29ab63b-7ae2-42fa-aada-2a797315dee9',
    },
    data: {
      userPreference: {
        connect: {
          id: '5e7f2821-df5a-4075-bdf0-1c5a504bd01b',
        },
      },
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      id: 'e29ab63b-7ae2-42fa-aada-2a797315dee9',
    },
    include: {
      userPreference: true,
    },
  });
  console.log(user);

  const updatedUser2 = await prisma.user.update({
    where: {
      id: 'e29ab63b-7ae2-42fa-aada-2a797315dee9',
    },
    data: {
      userPreference: {
        disconnect: true,
      },
    },
  });
  console.log(updatedUser2);
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
