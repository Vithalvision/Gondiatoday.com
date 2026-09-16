const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Gondia@123', 10);

  const user = await prisma.user.create({
  data: {
    id: crypto.randomUUID(),
    name: 'Vanshika',
    email: 'admin@gondiatoday.com',
    password: hashedPassword,
    role: 'Admin',
    status: 'Active',
    updatedAt: new Date(),
  },
});

  console.log('User created:', user);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());