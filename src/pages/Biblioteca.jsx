import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Trash2 } from 'lucide-react'
import Flashcard from '../components/Flashcard.jsx'
import useLocalStorage from '../lib/useLocalStorage.js'

const CORES = ['bg-lima', 'bg-violeta', 'bg-orquidea', 'bg-white']

function formatarData(timestamp) {
  return new Date(timestamp).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function Vazio({ children }) {
  return (
    <div className="rounded-3xl bg-superficie p-6 text-center text-sm text-gray-400">{children}</div>
  )
}

export default function Biblioteca() {
  const [aba, setAba] = useState('favoritos')
  const [aberto, setAberto] = useState(null)
  const [favoritos, setFavoritos] = useLocalStorage('repertorio:favoritos', [])
  const [historico, setHistorico] = useLocalStorage('repertorio:historico', [])

  function removerFavorito(chave) {
    setFavoritos((f) => f.filter((x) => x.chave !== chave))
    if (aberto === chave) setAberto(null)
  }

  function removerHistorico(tema) {
    setHistorico((h) => h.filter((x) => x.tema !== tema))
  }

  function limparHistorico() {
    if (window.confirm('Apagar todo o histórico?')) setHistorico([])
  }

  const abaClasse = (ativa) =>
    `flex-1 rounded-xl py-2.5 text-sm font-bold transition-colors ${
      ativa ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'
    }`

  return (
    <section className="animate-fade-in">
      <h1 className="text-2xl font-extrabold text-white">Biblioteca</h1>

      <div className="mt-4 flex gap-1 rounded-2xl bg-superficie p-1">
        <button type="button" onClick={() => setAba('favoritos')} className={abaClasse(aba === 'favoritos')}>
          Favoritos ({favoritos.length})
        </button>
        <button type="button" onClick={() => setAba('historico')} className={abaClasse(aba === 'historico')}>
          Histórico ({historico.length})
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {aba === 'favoritos' && favoritos.length === 0 && (
          <Vazio>Nenhum favorito ainda. Toque no coração de um repertório para salvar.</Vazio>
        )}

        {aba === 'favoritos' &&
          favoritos.map((f, i) => {
            const cor = CORES[i % CORES.length]
            return (
              <div key={f.chave}>
                <div className={`flex items-center gap-2 rounded-3xl p-4 text-black ${cor}`}>
                  <button
                    type="button"
                    onClick={() => setAberto(aberto === f.chave ? null : f.chave)}
                    className="flex-1 text-left"
                  >
                    <p className="font-extrabold leading-tight">{f.item.nome}</p>
                    <p className="mt-0.5 text-xs text-black/60">
                      {f.item.categoria} · {f.tema}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => removerFavorito(f.chave)}
                    aria-label="Excluir favorito"
                    className="rounded-full p-2 transition-colors hover:bg-black/10"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {aberto === f.chave && (
                  <div className="mt-2">
                    <Flashcard
                      item={f.item}
                      cor={cor}
                      rotulo="Favorito"
                      favorito
                      onFavoritar={() => removerFavorito(f.chave)}
                    />
                  </div>
                )}
              </div>
            )
          })}

        {aba === 'historico' && historico.length === 0 && (
          <Vazio>Nenhuma pesquisa ainda. Os temas que você gerar aparecem aqui.</Vazio>
        )}

        {aba === 'historico' &&
          historico.map((h) => (
            <div key={h.tema} className="flex items-center gap-1 rounded-3xl bg-superficie p-2 pl-4">
              <Link to={`/resultados?tema=${encodeURIComponent(h.tema)}`} className="flex flex-1 items-center gap-2 py-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{h.tema}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {formatarData(h.data)} · {h.repertorios?.length ?? 0} repertórios
                  </p>
                </div>
                <ChevronRight size={18} className="text-gray-500" />
              </Link>
              <button
                type="button"
                onClick={() => removerHistorico(h.tema)}
                aria-label="Excluir pesquisa"
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

        {aba === 'historico' && historico.length > 0 && (
          <button
            type="button"
            onClick={limparHistorico}
            className="w-full rounded-2xl py-3 text-sm font-semibold text-gray-500 transition-colors hover:text-red-400"
          >
            Limpar histórico
          </button>
        )}
      </div>
    </section>
  )
}