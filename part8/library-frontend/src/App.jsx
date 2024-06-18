import { Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <div>
      <div>
        <button>
          <Link to="/authors">authors</Link>
        </button>
        <button>
          <Link to="/">books</Link>
        </button>
        <button>
          <Link to="/new-book">add book</Link>
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/new-book" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
