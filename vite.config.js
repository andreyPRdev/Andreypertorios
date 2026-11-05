import { existsSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Só em desenvolvimento: serve /api/gerar usando o mesmo arquivo da Vercel Function
function apiLocal() {
  return {
    name: 'api-local',
    configureServer(server) {
      server.middlewares.use('/api/gerar', async (req, res) => {
        // Lê o .env.local a cada requisição (não precisa reiniciar ao editar)
        const env = loadEnv('development', process.cwd(), '')
        Object.assign(process.env, env)

        console.log(
          '[api-local] pasta:', process.cwd(),
          '| .env.local existe?', existsSync('.env.local'),
          '| variáveis encontradas:', Object.keys(env).filter((k) => /API|GEMINI|OPENAI|MOCK/.test(k)),
        )

        let corpo = ''
        for await (const parte of req) corpo += parte
        try {
          req.body = corpo ? JSON.parse(corpo) : {}
        } catch {
          req.body = {}
        }

        res.status = (codigo) => {
          res.statusCode = codigo
          return res
        }
        res.json = (dados) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(dados))
        }

        try {
          const { default: handler } = await server.ssrLoadModule('/api/gerar.js')
          await handler(req, res)
        } catch (e) {
          console.error(e)
          res.status(500).json({ erro: 'Erro interno no servidor local.' })
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiLocal()],
})