import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../index"

export async function GET(req: NextRequest) {
  const clientes = await prisma.cliente.findMany({
    include: {
      pedidos: {
        include: {
          productos: true
        }
      }
    }
  });
  
  return NextResponse.json(clientes);
}