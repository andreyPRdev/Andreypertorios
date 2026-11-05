import { Link, NavLink } from 'react-router-dom'
import { BookOpen, Library } from 'lucide-react'

export default function Header() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
      isActive
        ? 'bg-lima text-black'
        : 'bg-superficie text-gray-300 hover:bg-white/10'
    }`

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-white">
          <BookOpen size={20} className="text-lima" />
          Andrepertórios
        </Link>
        <nav>
          <NavLink to="/biblioteca" className={linkClass}>
            <Library size={16} />
            Biblioteca
          </NavLink>
        </nav>
      </div>
    </header>
  )
}