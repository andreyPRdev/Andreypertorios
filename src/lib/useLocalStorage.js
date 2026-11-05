import { useEffect, useState } from 'react'

export default function useLocalStorage(chave, inicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave)
      if (!salvo) return inicial
      const lido = JSON.parse(salvo)
      if (Array.isArray(inicial) && !Array.isArray(lido)) return inicial
      return lido
    } catch {
      return inicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
      // armazenamento cheio ou bloqueado: ignora
    }
  }, [chave, valor])

  return [valor, setValor]
}