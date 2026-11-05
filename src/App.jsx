import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Resultados from './pages/Resultados.jsx'
import Biblioteca from './pages/Biblioteca.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
        </Routes>
      </main>
    </div>
  )
}