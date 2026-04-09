-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "costoTotal" REAL NOT NULL,
    "clienteId" INTEGER,
    CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "precio" REAL NOT NULL,
    "descripcion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DetalleProductoEnPedido" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DetalleProductoEnPedido_A_fkey" FOREIGN KEY ("A") REFERENCES "Pedido" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DetalleProductoEnPedido_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_DetalleProductoEnPedido_AB_unique" ON "_DetalleProductoEnPedido"("A", "B");

-- CreateIndex
CREATE INDEX "_DetalleProductoEnPedido_B_index" ON "_DetalleProductoEnPedido"("B");
