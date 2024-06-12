import { useState } from 'react'
import {
  Routes,
  Route,
  useMatch,
  useNavigate
} from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const addNew = anecdote => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setMessage(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => setMessage(''), 5000)
    return navigate('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const anecdoteMatch = useMatch('/anecdotes/:id')
  const anecdote = anecdoteMatch
    ? anecdotes.find(anecdote => anecdote.id === Number(anecdoteMatch.params.id))
    : null

  return (
    <div>
      <Menu />
      <Notification message={message} />
      <h1>Software anecdotes</h1>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/create" element={<AnecdoteForm addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
