import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../index"

export async function GET(req: NextRequest) {
  const clientes = await prisma.cliente.findMany();
  return NextResponse.json(clientes);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cliente = await prisma.cliente.create({ data: body });
  return NextResponse.json(cliente, { status: 201 });
}