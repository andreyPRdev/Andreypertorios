import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowLeft, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'
import Flashcard from '../components/Flashcard.jsx'
import useLocalStorage from '../lib/useLocalStorage.js'

const CORES = ['bg-lima', 'bg-violeta', 'bg-orquidea', 'bg-white', 'bg-lima']
const MAX_HISTORICO = 20

// Guarda as requisições por tema: evita chamada dupla (StrictMode)
const cache = new Map()

// Se o tema já foi gerado antes, reaproveita do histórico (sem chamar a IA)
function doHistorico(tema) {
  try {
    const lista = JSON.parse(localStorage.getItem('repertorio:historico') || '[]')
    const achado = Array.isArray(lista) ? lista.find((h) => h.tema === tema) : null
    return achado?.repertorios?.length ? achado.repertorios : null
  } catch {
    return null
  }
}

function buscar(tema) {
  const salvo = doHistorico(tema)
  if (salvo) return Promise.resolve(salvo)

  if (!cache.has(tema)) {
    const promessa = fetch('/api/gerar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tema }),
    }).then(async (r) => {
      const dados = await r.json().catch(() => null)
      if (!r.ok) throw new Error(dados?.erro || 'Não foi possível gerar os repertórios.')
      if (!Array.isArray(dados?.repertorios) || dados.repertorios.length === 0) {
        throw new Error('Resposta inesperada do servidor.')
      }
      return dados.repertorios
    })
    cache.set(tema, promessa)
    promessa.catch(() => cache.delete(tema))
  }
  return cache.get(tema)
}

function Carregando() {
  return (
    <div className="mt-4 animate-pulse rounded-3xl bg-superficie p-5">
      <div className="h-3 w-12 rounded-full bg-white/10" />
      <div className="mt-3 h-7 w-2/3 rounded-xl bg-white/10" />
      <div className="mt-3 h-6 w-24 rounded-full bg-white/10" />
      <div className="mt-6 space-y-2">
        <div className="h-3 w-full rounded-full bg-white/10" />
        <div className="h-3 w-11/12 rounded-full bg-white/10" />
        <div className="h-3 w-4/5 rounded-full bg-white/10" />
      </div>
      <p className="mt-6 text-center text-xs text-gray-500">
        Gerando repertórios... pode levar até 30 segundos.
      </p>
    </div>
  )
}

export default function Resultados() {
  const [params] = useSearchParams()
  const tema = params.get('tema')

  const [status, setStatus] = useState('carregando')
  const [repertorios, setRepertorios] = useState([])
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)
  const [atual, setAtual] = useState(0)
  const [favoritos, setFavoritos] = useLocalStorage('repertorio:favoritos', [])
  const [, setHistorico] = useLocalStorage('repertorio:historico', [])

  useEffect(() => {
    if (!tema) return
    let ativo = true
    setStatus('carregando')
    setAtual(0)

    buscar(tema)
      .then((dados) => {
        if (!ativo) return
        setRepertorios(dados)
        setStatus('ok')
        setHistorico((h) =>
          [{ tema, data: Date.now(), repertorios: dados }, ...h.filter((x) => x.tema !== tema)].slice(
            0,
            MAX_HISTORICO,
          ),
        )
      })
      .catch((e) => {
        if (!ativo) return
        setErro(e instanceof TypeError ? 'Não foi possível conectar ao servidor.' : e.message)
        setStatus('erro')
      })

    return () => {
      ativo = false
    }
  }, [tema, tentativa, setHistorico])

  function tentarDeNovo() {
    cache.delete(tema)
    setTentativa((t) => t + 1)
  }

  function irPara(i) {
    setAtual(i)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function alternarFavorito(item) {
    const chave = `${tema}::${item.nome}`
    setFavoritos((f) =>
      f.some((x) => x.chave === chave)
        ? f.filter((x) => x.chave !== chave)
        : [{ chave, tema, item, salvoEm: Date.now() }, ...f],
    )
  }

  if (!tema) {
    return (
      <section className="animate-fade-in text-center">
        <p className="text-sm text-gray-400">Nenhum tema informado.</p>
        <Link to="/" className="mt-4 inline-block rounded-2xl bg-lima px-5 py-3 text-sm font-bold text-black">
          Escolher um tema
        </Link>
      </section>
    )
  }

  const total = repertorios.length
  const item = repertorios[atual]
  const ehFavorito = item ? favoritos.some((f) => f.chave === `${tema}::${item.nome}`) : false

  const botaoNav =
    'flex flex-1 items-center justify-center gap-1 rounded-2xl bg-superficie py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-superficie'

  return (
    <section className="animate-fade-in">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Novo tema
      </Link>

      <div className="rounded-3xl bg-superficie p-4">
        <p className="text-xs font-semibold text-gray-400">Tema</p>
        <p className="mt-1 text-sm font-semibold text-white">{tema}</p>
      </div>

      {status === 'carregando' && <Carregando />}

      {status === 'erro' && (
        <div className="mt-4 rounded-3xl bg-superficie p-5 text-center">
          <AlertCircle size={24} className="mx-auto text-red-400" />
          <p className="mt-2 text-sm text-gray-300">{erro}</p>
          <button
            type="button"
            onClick={tentarDeNovo}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-lima px-5 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90"
          >
            <RotateCw size={16} />
            Tentar de novo
          </button>
        </div>
      )}

      {status === 'ok' && item && (
        <>
          <div className="mt-4">
            <Flashcard
              key={item.id}
              item={item}
              cor={CORES[atual % CORES.length]}
              indice={atual + 1}
              total={total}
              favorito={ehFavorito}
              onFavoritar={() => alternarFavorito(item)}
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {repertorios.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => irPara(i)}
                aria-label={`Ir para o repertório ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === atual ? 'w-6 bg-lima' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => irPara(atual - 1)} disabled={atual === 0} className={botaoNav}>
              <ChevronLeft size={18} />
              Anterior
            </button>
            <button type="button" onClick={() => irPara(atual + 1)} disabled={atual === total - 1} className={botaoNav}>
              Próximo
              <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}
    </section>
  )
}