'use client'

type Props = {
  data: ({
    pedidos: ({
      productos: {
        id: number;
        precio: number;
        descripcion: string;
      }[];
    } & {
      id: number;
      fecha: Date;
      costoTotal: number;
      clienteId: number | null;
    })[];
  }) | null
}

export default function JsonViewer({ data }: Props) {
  return (
    <pre style={{
      background: '#1e1e1e',
      color: '#d4d4d4',
      padding: '1.5rem',
      borderRadius: '8px',
      overflow: 'auto',
      fontSize: '13px',
      lineHeight: '1.7',
    }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}