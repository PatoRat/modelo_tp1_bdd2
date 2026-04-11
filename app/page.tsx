'use client'
import { useEffect, useState } from 'react'
import JsonViewer from '../components/JsonViewer'

export default function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/clientes/pedidos')
      .then(r => r.json())
      .then(setData)
  }, [])

  return <JsonViewer data={data} /> // Un componente creado para visualizar mejor la Data
}