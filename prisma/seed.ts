import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Limpiar tablas en orden correcto
  await prisma.pedido.deleteMany()
  await prisma.cliente.deleteMany()
  await prisma.producto.deleteMany()

  // Productos
  const productos = await Promise.all([
    prisma.producto.create({ data: { descripcion: 'Laptop Pro 15"', precio: 1299.99 } }),
    prisma.producto.create({ data: { descripcion: 'Mouse Inalámbrico', precio: 29.99 } }),
    prisma.producto.create({ data: { descripcion: 'Teclado Mecánico', precio: 89.99 } }),
    prisma.producto.create({ data: { descripcion: 'Monitor 27" 4K', precio: 499.99 } }),
    prisma.producto.create({ data: { descripcion: 'Auriculares Bluetooth', precio: 149.99 } }),
  ])

  // Clientes con pedidos anidados
  await prisma.cliente.create({
    data: {
      nombre: 'Ana García',
      email: 'ana.garcia@email.com',
      pedidos: {
        create: [
          {
            fecha: new Date('2024-01-15'),
            costoTotal: productos[0].precio + productos[1].precio,
            productos: { connect: [{ id: productos[0].id }, { id: productos[1].id }] },
          },
          {
            fecha: new Date('2024-03-02'),
            costoTotal: productos[4].precio,
            productos: { connect: [{ id: productos[4].id }] },
          },
        ],
      },
    },
  })

  await prisma.cliente.create({
    data: {
      nombre: 'Carlos López',
      email: 'carlos.lopez@email.com',
      pedidos: {
        create: [
          {
            fecha: new Date('2024-02-20'),
            costoTotal: productos[2].precio + productos[3].precio,
            productos: { connect: [{ id: productos[2].id }, { id: productos[3].id }] },
          },
        ],
      },
    },
  })

  await prisma.cliente.create({
    data: {
      nombre: 'María Fernández',
      email: 'maria.fernandez@email.com',
      pedidos: {
        create: [
          {
            fecha: new Date('2024-04-10'),
            costoTotal: productos.reduce((sum, p) => sum + p.precio, 0),
            productos: { connect: productos.map((p) => ({ id: p.id })) },
          },
        ],
      },
    },
  })

  // Cliente sin pedidos
  await prisma.cliente.create({
    data: { nombre: 'Luis Martínez', email: 'luis.martinez@email.com' },
  })

  console.log('✅ Seed completado')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())