import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma.js";


const createAdmin = async () => {

  const email = "admin@fixitnow.com";
  const password = "Admin@12345";


  const existingAdmin =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });


  if (existingAdmin) {

    console.log("Admin already exists");

    return;

  }


  const hashedPassword =
    await bcrypt.hash(
      password,
      12
    );


  const admin =
    await prisma.user.create({

      data: {

        name: "System Admin",

        email,

        password: hashedPassword,

        role: "ADMIN",

      },

    });


  console.log(
    "Admin created successfully:",
    admin.email
  );

};



createAdmin()
  .catch((error) => {

    console.error(error);

    process.exit(1);

  })
  .finally(async () => {

    await prisma.$disconnect();

  });