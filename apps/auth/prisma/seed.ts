const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    // 1. Tạo Roles
  const [adminRole, userRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: { name: 'ADMIN' }
    }),
    prisma.role.upsert({
      where: { name: 'USER' },
      update: {},
      create: { name: 'USER' }
    })
  ])

  // 2. Tạo Menus phân cấp
  const dashboard = await prisma.menu.create({
    data: {
      name: 'Dashboard',
      path: '/dashboard',
      children: {
        create: [
          {
            name: 'Analytics',
            path: '/dashboard/analytics',
            children: {
              create: [
                { name: 'Realtime', path: '/dashboard/analytics/realtime' },
                { name: 'Historical', path: '/dashboard/analytics/historical' }
              ]
            }
          },
          { name: 'Reports', path: '/dashboard/reports' }
        ]
      }
    },
    include: {
      children: {
        include: { children: true }
      }
    }
  })

  // Lấy tất cả menu chính để gán RoleMenu
  const allMenus = await prisma.menu.findMany({ include: { children: { include: { children: true } } } })

  // 3. Gán RoleMenu cho ADMIN trên tất cả các menu
  for (const m of allMenus) {
    await prisma.roleMenu.upsert({
      where: { roleId_menuId: { roleId: adminRole.id, menuId: m.id } },
      update: {},
      create: {
        role: { connect: { id: adminRole.id } },
        menu: { connect: { id: m.id } }
      }
    })
  }

  // 4. Tạo Users với salt + hash password
  const plainPassword = 'P@ssw0rd123'
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hashed = await bcrypt.hash(plainPassword, salt)

  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      fullName: 'Super Admin',
      password: hashed,
      salt: salt,
      status: "ACTIVE",
      userRoles: {
        create: { role: { connect: { id: adminRole.id } } }
      }
    }
  })

  const normalUser = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      fullName: 'John Doe',
      password: hashed,
      salt: salt,
      status: "ACTIVE",
      userRoles: {
        create: { role: { connect: { id: userRole.id } } }
      }
    }
  })

  console.log('Create Data Success');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
