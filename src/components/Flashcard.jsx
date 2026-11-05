import { useState } from 'react'
import { ExternalLink, Heart, Copy, Check, RotateCw } from 'lucide-react'

function Secao({ titulo, children }) {
  return (
    <div className="mt-4">
      <h3 className="text-[11px] font-bold uppercase tracking-wider text-black/55">
        {titulo}
      </h3>
      <div className="mt-1 text-sm leading-relaxed text-black/85">{children}</div>
    </div>
  )
}

function Tag({ children }) {
  return (
    <span className="rounded-full bg-black px-3 py-1 text-[11px] font-bold text-white">
      {children}
    </span>
  )
}

export default function Flashcard({ item, cor, indice, total, rotulo, favorito, onFavoritar }) {
  const [verso, setVerso] = useState(false)
  const [copiado, setCopiado] = useState(false)

  async function copiar() {
    try {
      await navigator.clipboard.writeText(item.aplicacao)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // clipboard indisponível: ignora
    }
  }

  return (
    <article className={`rounded-3xl p-5 text-black ${cor}`}>
      <div className="flex items-start justify-between">
          <p className="text-xs font-bold text-black/55">
          {rotulo ?? `${indice} de ${total}`}
        </p>
        <button
          type="button"
          onClick={onFavoritar}
          aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={favorito}
          className="-m-1 rounded-full p-1 transition-transform active:scale-90"
        >
          <Heart size={22} className={favorito ? 'fill-black' : ''} />
        </button>
      </div>

      <h2 className="mt-1 text-2xl font-extrabold leading-tight">{item.nome}</h2>
      <div className="mt-2">
        <Tag>{item.categoria}</Tag>
      </div>

      <div key={verso ? 'verso' : 'frente'} className="animate-fade-in">
        {!verso ? (
          <>
            <Secao titulo="Quem foi / o que é">{item.quem}</Secao>
            <Secao titulo="Conceito principal">{item.conceito}</Secao>
            <Secao titulo="Relação com o tema">{item.relacao}</Secao>
          </>
        ) : (
          <>
            <Secao titulo="Como aplicar na redação">
              <p className="rounded-2xl bg-black/10 p-3">{item.aplicacao}</p>
              <button
                type="button"
                onClick={copiar}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-85"
              >
                {copiado ? <Check size={14} /> : <Copy size={14} />}
                {copiado ? 'Copiado!' : 'Copiar exemplo'}
              </button>
            </Secao>

            <Secao titulo="Argumentos que fortalece">
              <ul className="list-disc space-y-0.5 pl-5">
                {item.argumentos.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </Secao>

            <Secao titulo="Outros temas">
              <div className="mt-1 flex flex-wrap gap-1.5">
                {item.outrosTemas.map((t) => (
                  <span key={t} className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </Secao>

            <Secao titulo="Fontes">
              <ul className="space-y-1">
                {item.fontes.map((f) => (
                  <li key={f.titulo}>
                    {f.url ? (
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-1 underline underline-offset-2"
                      >
                        <span>{f.titulo}</span>
                        <ExternalLink size={14} className="mt-0.5 shrink-0" />
                      </a>
                    ) : (
                      f.titulo
                    )}
                  </li>
                ))}
              </ul>
            </Secao>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => setVerso((v) => !v)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-3 text-sm font-bold text-white transition-opacity hover:opacity-85 active:scale-[0.99]"
      >
        <RotateCw size={16} />
        {verso ? 'Voltar ao conceito' : 'Ver como aplicar'}
      </button>
    </article>
  )
}