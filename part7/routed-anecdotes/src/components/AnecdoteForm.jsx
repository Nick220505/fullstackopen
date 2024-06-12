import PropTypes from 'prop-types'
import { useField } from '../hooks/index'

const AnecdoteForm = (props) => {
  const [content, resetContent] = useField('content', 'text')
  const [author, resetAuthor] = useField('author', 'text')
  const [info, resetInfo] = useField('info', 'text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )

}

AnecdoteForm.propTypes = {
  addNew: PropTypes.func.isRequired
}

export default AnecdoteForm
