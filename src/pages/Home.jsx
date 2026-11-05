import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Search, BookMarked, Lightbulb } from 'lucide-react'

const SUGESTOES = [
  'Desafios para combater a desinformação no Brasil',
  'Impactos das redes sociais na saúde mental dos jovens',
  'Invisibilidade do trabalho de cuidado no Brasil',
  'Inclusão de pessoas com deficiência no mercado de trabalho',
  'Caminhos para combater a insegurança alimentar no Brasil',
  'Valorização das comunidades tradicionais no Brasil',
]

const PASSOS = [
  { icone: Search, titulo: 'Digite o tema', texto: 'Cole o tema da redação ou escolha uma sugestão.', cor: 'bg-violeta' },
  { icone: BookMarked, titulo: 'Receba 5 repertórios', texto: 'Referências variadas, em flashcards detalhados.', cor: 'bg-orquidea' },
  { icone: Lightbulb, titulo: 'Aplique na redação', texto: 'Veja exemplos prontos e os argumentos que cada um reforça.', cor: 'bg-lima' },
]

const MIN = 5
const MAX = 200

export default function Home() {
  const [tema, setTema] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  function gerar(texto) {
    const limpo = texto.trim()
    if (limpo.length < MIN) {
      setErro(`Digite um tema com pelo menos ${MIN} caracteres.`)
      return
    }
    if (limpo.length > MAX) {
      setErro(`O tema pode ter no máximo ${MAX} caracteres.`)
      return
    }
    setErro('')
    navigate(`/resultados?tema=${encodeURIComponent(limpo)}`)
  }

  function aoEnviar(e) {
    e.preventDefault()
    gerar(tema)
  }

  return (
    <div className="animate-fade-in">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Andrepertórios
        </h1>
        <p className="mt-3 font-semibold text-lima">Rumo aos 900+</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-400">
          Encontre referências socioculturais para a sua redação e veja como
          aplicá-las no texto, com fontes que você pode conferir.
        </p>
      </section>

      <form onSubmit={aoEnviar} className="mt-8">
        <label htmlFor="tema" className="mb-2 block text-sm font-semibold text-gray-300">
          Tema da redação
        </label>
        <textarea
          id="tema"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          maxLength={MAX}
          rows={3}
          placeholder="Ex.: Desafios para combater a desinformação no Brasil"
          className="w-full resize-none rounded-3xl bg-superficie p-4 text-sm text-white placeholder-gray-500 outline-none ring-2 ring-transparent transition focus:ring-lima"
        />
        <div className="mt-1 flex items-center justify-between px-2 text-xs">
          <span className="text-red-400">{erro}</span>
          <span className="text-gray-500">{tema.length}/{MAX}</span>
        </div>
        <button
          type="submit"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-lima py-3.5 text-sm font-bold text-black transition-opacity hover:opacity-90 active:scale-[0.99]"
        >
          Gerar repertórios
          <ArrowRight size={18} />
        </button>
      </form>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-gray-300">Sugestões de temas</h2>
        <div className="flex flex-wrap gap-2">
          {SUGESTOES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => gerar(s)}
              className="rounded-full bg-superficie px-4 py-2 text-left text-xs font-medium text-gray-300 transition-colors hover:bg-white/10"
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold text-gray-300">Como funciona</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {PASSOS.map(({ icone: Icone, titulo, texto, cor }) => (
            <div key={titulo} className={`rounded-3xl p-4 text-black ${cor}`}>
              <Icone size={20} />
              <h3 className="mt-3 text-sm font-bold">{titulo}</h3>
              <p className="mt-1 text-xs leading-relaxed text-black/70">{texto}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}